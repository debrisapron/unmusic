let _ = require('lodash/fp')
let RenderContext = require('./RenderContext')

let Controller = (nodeDefs, um) => {

  let prepare = (score) => {
    let promises = []
    score.actions.forEach((action) => {
      let vgraph = _.get('payload.vgraph', action)
      _.forIn(({ type, params }) => {
        let prepareFn = nodeDefs[type].prepare
        if (!prepareFn) return
        promises.push(prepareFn(um, params))
      }, vgraph)
    })
    return Promise.all(promises)
  }

  let handle = (time, action) => {
    let renderContext = RenderContext(nodeDefs, um)
    let vgraph = _.get('payload.vgraph', action)
    if (!vgraph) { return }
    let graph = renderContext.render(vgraph, time, true, um.ac.destination)
    return (time) => {
      renderContext.finish(vgraph, time)
    }
  }

  return { prepare, handle }
}

module.exports = Controller
