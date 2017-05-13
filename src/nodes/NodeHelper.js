let _ = require('lodash/fp')
let _$ = require('lodash')
let { set: mutate } = require('lodash')

let PARAM_ALIASES = {
  freq: 'frequency',
  rate: 'playbackRate'
}

let mapValuesWithId = (iteratee, obj) => _$.mapValues(obj, iteratee)

let NodeHelper = (nodeDefs) => {

  let nodeDef = (node) => nodeDefs[node.__umType]

  let getNodeOutput = (node) => {
    let outputPath = nodeDef(node).out
    return outputPath === true ? node : _.get(outputPath, node)
  }

  let getNodeInput = (node, inputPath) => {
    if (inputPath === 'main') inputPath = nodeDef(node).in
    return inputPath === true ? node : _.get(inputPath, node)
  }

  let normalizeParamName = (name) => {
    return PARAM_ALIASES[name] || name
  }

  let twelveTet = (nn) => {
    return nn && Math.pow(2, ((nn - 69) / 12)) * 440
  }

  // Exports

  let connect = (fromNode, toNode, toInputPath) => {
    let fromOutput = getNodeOutput(fromNode)
    let toInput = getNodeInput(toNode, toInputPath)
    fromOutput.connect(toInput)
  }

  let set = (node, params) => {
    let nd = nodeDef(node)
    if (nd.set) return nd.set(node, params)
    // let inputPaths = normalizePathCollection(opts.inputs)
    mapValuesWithId((val, key) => {
      key = normalizeParamName(key)
      if (key === 'nn' && nd.freqIn) {
        _.forEach((freqInput) => {
          set(node, { [freqInput]: twelveTet(val) })
        }, _.castArray(nd.freqIn))
        return
      }
      if (nd.audioParams && nd.audioParams.includes(key)) {
        node[key].value = val
        return
      }
      if (_.isPlainObject(val)) {
        set(node[key], val)
        return
      }
      mutate(node, key, val)
    }, params)
  }

  let start = (node, time) => {
    let nd = nodeDef(node)
    if (nd.start) return nd.start(node, time)
    if (nd.vgraph) return _.forEach((n) => start(n, time), graphNodes(node))
    if (node.start) return node.start(time)
  }

  let stop = (node, time) => {
    let nd = nodeDef(node)
    if (nd.stop) return nd.stop(node, time)
    if (nd.vgraph) return _.forEach((n) => stop(n, time), graphNodes(node))
    if (node.stop) return node.stop(time)
  }

  let finish = (node, time, andStop = true) => {
    let nd = nodeDef(node)
    if (nd.finish) return nd.finish(node, time, andStop)
    if (nd.vgraph) {
      let nodes = graphNodes(node)
      let finishTimes = _.map((n) => finish(n, time, false), nodes)
      let stopTime = _.max(finishTimes)
      _.forEach((n) => stop(n, stopTime), nodes)
      return stopTime
    }
  }

  let graphNodes = (node) => {
    return _.omit('__umType', node)
  }

  return { connect, set, start, stop, finish }
}

module.exports = NodeHelper
