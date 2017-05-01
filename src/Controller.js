let _ = require('lodash/fp')
let RenderContext = require('./nodes/RenderContext')
let NodeHelper = require('./nodes/NodeHelper')

let Controller = (nodeDefs, ac) => {

  let renderContext = RenderContext(nodeDefs, ac)
  let nh = NodeHelper(nodeDefs)

  let handle = (time, action) => {
    let vgraph = _.get('payload.vgraph', action)
    if (!vgraph) { return }
    let graph = renderContext.render(vgraph, time)
    return (t) => nh.finish(graph, t)
  }

  return { handle }
}

module.exports = Controller
