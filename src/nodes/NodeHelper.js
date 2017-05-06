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

  let getNodeInput = (node, inputPath) => {
    // let inputPaths = normalizePathCollection(nodeDef(node).inputs || {})
    // let internalPath = inputPaths[inputPath] || 'main'
    return inputPath == 'main' ? node : _.get(inputPath, node)
  }

  // let normalizePathCollection = (coll) => {
  //   if (_.isPlainObject(coll)) return coll
  //   return _.zipObject(coll, coll)
  // }

  let normalizeParamName = (name) => {
    return PARAM_ALIASES[name] || name
  }

  let twelveTet = (nn) => {
    return nn && Math.pow(2, ((nn - 69) / 12)) * 440
  }

  // Exports

  let connect = (fromNode, toNode, toInputPath) => {
    let toInput = getNodeInput(toNode, toInputPath)
    fromNode.connect(toInput)
  }

  let set = (node, params) => {
    let nd = nodeDef(node)
    if (nd.set) return nd.set(node, params)
    // let inputPaths = normalizePathCollection(opts.inputs)
    mapValuesWithId((val, key) => {
      key = normalizeParamName(key)
      if (key === 'nn') {
        _.forEach((freqInput) => {
          set(node, { [freqInput]: twelveTet(val) })
        }, nd.freqInputs || [])
        return
      }
      if (nd.audioParams && nd.audioParams.includes(key)) {
        _.get(key, node).value = val
        return
      }
      mutate(node, key, val)
    }, params)
  }

  let start = (node, time) => {
    let nd = nodeDef(node)
    if (nd.start) return nd.start(node, time)
    if (nd.vgraph) return _.forEach((n) => start(n, time), node)
    if (node.start) return node.start(time)
  }

  let stop = (node, time) => {
    let nd = nodeDef(node)
    if (nd.stop) return nd.stop(node, time)
    if (nd.vgraph) return _.forEach((n) => stop(n, time), node)
    if (node.stop) return node.stop(time)
  }

  let finish = (node, time, andStop = true) => {
    let nd = nodeDef(node)
    if (nd.finish) return nd.finish(node, time, andStop)
    if (nd.vgraph) {
      let finishTimes = _.map((n) => finish(n, time, false), node)
      let stopTime = _.max(finishTimes)
      _.forEach((n) => stop(n, stopTime), node)
      return stopTime
    }
  }

  return { connect, set, start, stop, finish }
}

module.exports = NodeHelper
