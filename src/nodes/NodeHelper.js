let _ = require('lodash/fp')
let { set: mutate } = require('lodash')

let PARAM_ALIASES = {
  freq: 'frequency',
  rate: 'playbackRate'
}

let NodeHelper = (inventory) => {

  let getNodeOutput = (node, outputPath) => {
    let outputPaths = normalizePathCollection(inventory[node.__umType].outputs)
    let internalPath = outputPaths[outputName]
    return internalPath == 'main' ? node : _.get(internalPath, node)
  }

  let getNodeInput = (node, inputPath) => {
    let inputPaths = normalizePathCollection(inventory[node.__umType].inputs)
    let internalPath = inputPaths[inputName]
    return internalPath == 'main' ? node : _.get(internalPath, node)
  }

  let normalizePathCollection = (coll) => {
    if (_.isObject(coll)) return coll
    return _.zipObject(coll, coll)
  }

  let normalizeParamName = (name) => {
    return PARAM_ALIASES[name] || name
  }

  let twelveTet = (nn) => {
    return nn && Math.pow(2, ((nn - 69) / 12)) * 440
  }

  // Exports

  let connect = (fromNode, fromOutputPath, toNode, toInputPath) => {
    let fromOutput = getNodeOutput(fromNode, fromOutputPath)
    let toInput = getNodeInput(toNode, toInputPath)
    fromOutput.connect(toInput)
  }

  let set = (node, params) => {
    let opts = inventory[node.__umType]
    if (opts.set) return opts.set(node, params)
    // let inputPaths = normalizePathCollection(opts.inputs)
    _.forEach((val, key) => {
      key = normalizeParamName(key)
      if (key === 'nn') {
        _.forEach((freqInput) => {
          set(node, { [freqInput]: twelveTet(val) })
        }, opts.freqInputs || [])
        return
      }
      if (opts.audioParams.includes(key)) {
        _.get(key, node).value = val
        return
      }
      mutate(node, key, val)
    }, params)
  }

  let start = (node, time) => {
    let opts = inventory[node.__umType]
    if (opts.start) return opts.start(node, time)
    if (opts.isPatch) return _.forEachRight((n) => start(n, time), node)
    if (node.start) return node.start(time)
  }

  let stop = (node, time) => {
    let opts = inventory[node.__umType]
    if (opts.stop) return opts.stop(node, time)
    if (opts.isPatch) return _.forEach((n) => stop(n, time), node)
    if (node.stop) return node.stop(time)
  }

  let finish = (node, time, andStop = true) => {
    let opts = inventory[node.__umType]
    if (opts.finish) return opts.finish(node, time, andStop)
    if (opts.isPatch) {
      let finishTimes = _.map((n) => finish(n, time, false), node)
      let stopTime = _.max(finishTimes)
      _.forEach((n) => stop(n, stopTime), node)
      return stopTime
    }
  }

  return { connect, set, start, stop, finish }
}

module.exports = NodeHelper
