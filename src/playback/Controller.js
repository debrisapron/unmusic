let _ = require('lodash/fp')
let Renderer = require('./Renderer')

let Controller = (nodeDefs, um) => {

  let renderer

  let prepare = (score) => {
    renderer = Renderer(nodeDefs, um)
    let promises = []
    score.actions.forEach((action) => {
      let vgraph = _.get('payload.vgraph', action)
      _.forIn(({ type, params }) => {
        let prepareFn = _.get(type, nodeDefs).prepare
        if (!prepareFn) return
        let promise = prepareFn(um, params)
        if (promise) promises.push(promise)
      }, vgraph)
    })
    return Promise.all(promises)
  }

  let handle = (time, action) => {
    let vgraph = _.get('payload.vgraph', action)
    if (!vgraph) { return }
    let graph = renderer.render(vgraph, time, true, um.ac.destination)
    return (time) => {
      renderer.finish(vgraph, time)
    }
  }

  return { prepare, handle }
}

module.exports = Controller
