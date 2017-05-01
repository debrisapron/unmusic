let _ = require('lodash/fp')
let NodeHelper = require('./NodeHelper')

let RenderContext = (nodeDefs, ac) => {
  let nodes = {}
  let nh = NodeHelper(nodeDefs)

  let createNodes = (vgraph) => {
    return _.map((vnode, id) => {
      if (!nodes[id]) {
        let factory = (nodeDefs[vnode.type] || {}).factory
        if (!factory) throw new Error('Unrecognized node type')
        let node = factory(ac)
        node.__umType = vnode.type
        nodes[id] = node
      }
      return nodes[id]
    }, vgraph)
  }

  let connectNodes = (vgraph) => {
    let nextId
    _.forEachRight((vnode, id) => {
      let node = nodes[id]
      let conns = vnode.conns || (nextId && { main: nextId })
      _.forEach((destNames, outPath) => {
        _.castArray(destNames).forEach((destName) => {
          let [destId, ...inParts] = destName.split('.')
          let destNode = nodes[destId]
          let destPath = inParts.length ? inParts.join('.') : 'main'
          nh.connect(node, outPath, destNode, destPath)
        })
      }, conns)
      nextId = id
    }, vgraph)
  }

  let configureNodes = (vgraph) => {
    return _.forEach((vnode, id) => nh.set(nodes[id], vnode.params), vgraph)
  }

  let startNodes = (vgraph, time) => {
    return _.forEachRight((__, id) => nh.start(nodes[id], time), vgraph)
  }

  // Exports

  let render = (vgraph, time) => {
    let graphNodes = createNodes(vgraph)
    connectNodes(vgraph)
    configureNodes(vgraph)
    startNodes(vgraph, time)
    return graphNodes
  }

  return { render }
}

module.exports = RenderContext
