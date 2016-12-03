'use strict'
let _ = require('lodash')
let h = require('./support/helpers')

let getConnPairs = (plan) => {
  let connStrs = (plan.conns || plan.connections || [])
  return _.flatMap(connStrs, (connStr) => {
    let points = _.compact(connStr.replace(/>/g, '').split(' '))
    return _.tail(points).map((point, i) => [points[i], point])
  })
}

let connectNodes = (nodes, connPairs) => {
  let inputs = []
  let noteInputs = []
  let outputs = []
  connPairs.forEach(([from, to]) => {
    let [fromName, _] = from.split('.')
    let [toName, toParamName] = to.split('.')
    toParamName = h.normalizeParamName(toParamName)
    let isPatchIn = fromName === 'in' || fromName === 'input'
    let isNoteIn = fromName === 'noteIn' || fromName === 'noteInput'
    let isPatchOut = toName === 'out' || toName === 'output'
    if ((isPatchIn || isNoteIn) && isPatchOut) {
      throw new Error('You tried to connect an input directly to an output but this is not allowed.')
    }
    let fromNode = nodes[fromName]
    let toNode = nodes[toName]
    if (!isPatchIn && !isNoteIn && !fromNode) {
      throw new Error(`You tried to make a connection from a node called ${ fromName } but I couldn't find it in the node list.`)
    }
    if (!isPatchOut && !toNode) {
      throw new Error(`You tried to make a connection to a node called ${ toName } but I couldn't find it in the node list.`)
    }
    if (isPatchOut) {
      outputs.push(fromNode)
      return
    }
    let toDest = toParamName ? toNode[toParamName] : (toNode.input || toNode)
    if (isPatchIn) {
      inputs.push(toDest)
      return
    }
    if (isNoteIn) {
      noteInputs.push(toDest)
      return
    }
    fromNode.connect(toDest)
  })
  return { inputs, noteInputs, outputs }
}

let wrap = ({ audioContext, nodes, inputs, noteInputs, outputs }) => {
  let input = inputs[0]
  if (inputs.length > 1) {
    input = audioContext.createGain()
    inputs.forEach(input.connect)
  }

  let noteInput = noteInputs[0]
  if (noteInputs.length > 1) {
    noteInput = audioContext.createGain()
    noteInputs.forEach(noteInput.connect)
  }

  let isConnected = false
  let self

  let connect = (dest) => {
    isConnected = true
    let retVal
    outputs.forEach((output) => {
      retVal = output.connect(dest)
    })
    return retVal
  }

  let start = (when) => {
    when = when || audioContext.currentTime
    _.forEach(nodes, (node) => {
      if (node.start) { node.start(when) }
    })
    return self
  }

  let stop = (when) => {
    when = when || audioContext.currentTime
    _.forEach(nodes, (node) => {
      if (node.stop) { node.stop(when) }
    })
    return self
  }

  let finish = (when) => {
    when = when || audioContext.currentTime
    let finishTimes = []
    _.forEach(nodes, (node) => {
      if (node.finish) {
        finishTimes.push(node.finish(when))
      }
    })
    let patchFinishTime = _.max(finishTimes)
    stop(patchFinishTime)
    return self
  }

  let sound = (when) => {
    if (!isConnected) { connect(audioContext.destination) }
    start(when)
    return self
  }

  let set = (...args) => {
    let params = _.merge(...args)
    _.forEach(nodes, (node, name) => {
      let nodeParams = params[name]
      if (node.set) {
        node.set(nodeParams)
      } else {
        h.setNodeParams(node, nodeParams)
      }
    })
    return self
  }

  self = { nodes, input, noteInput, connect, start, stop, finish, sound, set }
  return self
}

let Patch = _.curry((audioContext, plan) => {
  let nodes = plan.nodes
  let connPairs = getConnPairs(plan)
  let { inputs, noteInputs, outputs } = connectNodes(nodes, connPairs)
  return wrap({ audioContext, nodes, inputs, noteInputs, outputs })
})

module.exports = Patch
