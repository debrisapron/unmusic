let _ = require('lodash/fp')

let Renderer = (inventory, ac) => {
  let nodes = {}

  let render = (vgraph, time) => {
    createNodes(vgraph)
    connectNodes(vgraph)
    configureNodes(vgraph)
    startNodes(vgraph, time)
    return nodes
  }

  let createNodes = (vgraph) => {
    _.forEach((vnode, id) => {
      if (!nodes[id]) {
        let factory = inventory[vnode.type]
        if (!factory) throw new Error('Unrecognized node type')
        nodes[id] = factory(ac)
      }
    }, vgraph)
  }

  let connectNodes = (vgraph) => {
    let nextId
    _.forEachRight((vnode, id) => {
      let sourceNode = nodes[id]
      let conns = vnode.conns || (nextId && { main: nextId })
      _.forEach((destNames, outPath) => {
        let source = _.get(outPath, sourceNode.outputs)
        destNames = _.isArray(destNames) ? destNames : [destNames]
        destNames.forEach((destName) => {
          let [destId, ...inParts] = destName.split('.')
          let destNode = nodes[destId]
          let destPath = inParts.length ? inParts.join('.') : 'main'
          let dest = _.get(destPath, destNode.inputs)
          source.connect(dest)
        })
      }, conns)
      nextId = id
    }, vgraph)
  }

  let configureNodes = (vgraph) => _.forEach((vnode, id) => nodes[id].set(vnode.params), vgraph)

  let startNodes = (vgraph, time) => {
    _.forEachRight((__, id) => {
      if (nodes[id].start) nodes[id].start(time)
    }, vgraph)
  }

  return render
}

module.exports = Renderer
