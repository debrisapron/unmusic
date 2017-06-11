let _ = require('lodash/fp')
let _$ = require('lodash')

module.exports = finishGraph

function finishGraph(graph, time) {
  _.forEach((node) => finishNode(node, time), graph)
}

////////////////////////////////////////////////////////////////////////////////

function finishNode(node, time, andStop = true) {
  let nd = node.__um.nodeDef
  if (nd.finish) return nd.finish(node, time, andStop)
  if (nd.vgraph) {
    let nodes = Object.keys(nd.vgraph).map((key) => node[key])
    let finishTimes = _.map((n) => finishNode(n, time, false), nodes)
    let stopTime = _.max(finishTimes)
    _.forEach((n) => stop(n, stopTime), nodes)
    return stopTime
  }
}

function stop(node, time) {
  let nd = node.__um.nodeDef
  delete cache[node.__um.id]
  if (nd.stop) return nd.stop(node, time)
  if (nd.vgraph) return _.forEach((key) => stop(node[key], time), Object.keys(nd.vgraph))
  if (node.stop) return node.stop(time)
}
