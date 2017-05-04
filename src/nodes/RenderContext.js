let _ = require('lodash/fp')
let _$ = require('lodash')
let NodeHelper = require('./NodeHelper')

let mapValuesWithId = (iteratee, obj) => _$.mapValues(obj, iteratee)
let forEachRightWithId = (iteratee, coll) => _$.forEachRight(coll, iteratee)

let RenderContext = (nodeDefs, ac) => {
  let nodes = {}
  let nh = NodeHelper(nodeDefs)

  let createNodes = (vgraph) => {
    return mapValuesWithId((vnode, id) => nodes[id] || (nodes[id] = renderNode(vnode)), vgraph)
  }

  let renderNode = (vnode) => {
    let nodeDef = nodeDefs[vnode.type]
    if (!nodeDef) throw new Error('Unrecognized node type')
    let node = nodeDef.factory
      ? nodeDef.factory(ac)
      : RenderContext(nodeDefs, ac).render(nodeDef.vgraph, null, false)
    node.__umType = vnode.type
    return node
  }

  let connectNodes = (vgraph) => {
    let nextId
    forEachRightWithId((vnode, id) => {
      let node = nodes[id]
      let conns = vnode.conns || (nextId && { main: nextId })
      mapValuesWithId((destNames, outPath) => {
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
    mapValuesWithId((vnode, id) => nh.set(nodes[id], vnode.params), vgraph)
  }

  let startNodes = (graph, time) => {
    _.forEach((node) => nh.start(node, time), graph)
  }

  // Exports

  let render = (vgraph, time, andStart = true) => {
    let graph = createNodes(vgraph)
    connectNodes(vgraph)
    configureNodes(vgraph)
    if (andStart) startNodes(graph, time)
    return graph
  }

  return { render }
}

module.exports = RenderContext

////////////////////////////////////////////////////////////////////////////////

if (!process.env.TEST) return

test('can render an example vgraph', (assert) => {
  let fooConns = []
  let nodeDefs = {
    foo: {
      outputs: ['main'],
      factory: () => ({ isFoo: true, connect: (dest) => fooConns.push(dest) })
    },
    bar: {
      inputs: ['main'],
      factory: () => ({ isBar: true })
    }
  }
  let vgraph = {
    foo: { type: 'foo' },
    bar: { type: 'bar' }
  }
  let renderContext = RenderContext(nodeDefs)
  let graph = renderContext.render(vgraph, null, false)
  assert.ok(graph.foo.isFoo)
  assert.ok(graph.bar.isBar)
  assert.equal(fooConns.length, 1)
  assert.ok(fooConns[0].isBar)
  assert.end()
})
