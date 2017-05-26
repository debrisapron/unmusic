let _ = require('lodash/fp')
let RenderContext = require('./RenderContext')

let Controller = (nodeDefs, ac) => {

  let handle = (time, action) => {
    let renderContext = RenderContext(nodeDefs, ac)
    let vgraph = _.get('payload.vgraph', action)
    if (!vgraph) { return }
    let graph = renderContext.render(vgraph, time, true, ac.destination)
    return (time) => {
      renderContext.finish(vgraph, time)
    }
  }

  return { handle }
}

module.exports = Controller
