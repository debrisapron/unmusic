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
    let nextIn
    forEachRightWithId((vnode, id) => {
      let nodeDef = nodeDefs[vnode.type]
      let defaultDestId = nextIn
      nextIn = nodeDef.in && id
      if (!nodeDef.out) return
      let conns = vnode.connect || defaultDestId
      if (!conns) return
      let node = nodes[id]
      _.castArray(conns).forEach((destName) => {
        let [destId, ...inParts] = destName.split('.')
        let destNode = nodes[destId]
        let destPath = inParts.length ? inParts.join('.') : 'main'
        nh.connect(node, destNode, destPath)
      })
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
let h = require('../testHelpers')

test('can render an example vgraph', (assert) => {
  let nodeDefs = {
    foo: {
      out: true,
      audioParams: ['bbb'],
      factory: () => {
        let _conns = []
        return { _conns, isFoo: true, bbb: { isBbb: true }, connect: (dest) => _conns.push(dest) }
      }
    },
    bar: {
      in: true,
      out: true,
      factory: () => ({ isBar: true })
    }
  }

  let vgraph = {
    foo: { type: 'foo', params: { aaa: 42, bbb: 69 } },
    bar: { type: 'bar' },
    foo2: { type: 'foo', connect: 'foo.bbb' }
  }

  let renderContext = RenderContext(nodeDefs)
  let graph = renderContext.render(vgraph, null, false)

  let expectedBar = { isBar: true }
  let expectedFooBbb = { value: 69, isBbb: true }
  let expectedGraph = {
    foo: { isFoo: true, aaa: 42, bbb: expectedFooBbb, _conns: [expectedBar] },
    bar: expectedBar,
    foo2: { isFoo: true, _conns: [expectedFooBbb] }
  }

  assert.ok(h.deepMatches(graph, expectedGraph))
  assert.end()
})
