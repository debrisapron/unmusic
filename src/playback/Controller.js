let _ = require('lodash/fp')
let renderGraph = require('./renderGraph')
let finishGraph = require('./finishGraph')

module.exports = Controller

function Controller(um) {

  // Our top-level render context. This is what we use to persist nodes between renders.
  // It's wiped every time a new score is prepared.
  let cache

  return { prepare, handle }

  function prepare(score) {
    cache = {}
    let promises = []
    score.actions.forEach((action) => {
      let vgraph = _.get('payload.vgraph', action)
      _.forIn(({ type, params }) => {
        let prepareFn = _.get(type, um.__nodeDefs).prepare
        if (!prepareFn) return
        let promise = prepareFn(um, params)
        if (promise) promises.push(promise)
      }, vgraph)
    })
    return Promise.all(promises)
  }

  function handle(time, action) {
    let vgraph = _.get('payload.vgraph', action)
    if (!vgraph) return
    let graph = renderGraph({
      um, vgraph, time, cache,
      andStart: true,
      dest: um.ac.destination
    })
    return (time) => finishGraph(graph, time, cache)
  }
}
