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
      let defaultDest = nextIn
      nextIn = nodeDef.in && (id + '.' + (nodeDef.in === true ? 'main' : nodeDef.in))
      if (!nodeDef.out) return
      let conns = vnode.connect || defaultDest
      if (!conns) return
      let sourceNode = nodes[id]
      _.castArray(conns).forEach((destName) => {
        let [destId, ...inParts] = destName.split('.')
        let destNode = nodes[destId]
        let destPath = inParts.length ? inParts.join('.') : 'main'
        nh.connect(sourceNode, destNode, destPath)
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
  
  // The test node definitions
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
      in: 'baz1',
      out: 'baz2',
      vgraph: {
        baz1: { type: 'baz', params: { answer: 42 } },
        baz2: { type: 'baz' }
      }
    },
    baz: {
      in: true,
      out: true,
      factory: () => {
        let _conns = []
        return { _conns, isBaz: true, connect: (dest) => _conns.push(dest) }
      }
    }
  }

  // The vgraph to render
  let vgraph = {
    foo: { type: 'foo', params: { aaa: 42, bbb: 69 } },
    bar: { type: 'bar', params: { baz1: { question: '6 by 9' } } },
    foo2: { type: 'foo', connect: 'foo.bbb' }
  }

  // The graph we expect to see rendered
  let expGraph = {
    foo: { isFoo: true, aaa: 42, bbb: { value: 69, isBbb: true } },
    bar: {
      baz1: { isBaz: true, answer: 42, question: '6 by 9' },
      baz2: { isBaz: true }
    },
    foo2: { isFoo: true }
  }
  expGraph.foo._conns = [expGraph.bar.baz1]
  expGraph.bar.baz2._conns = []
  expGraph.foo2._conns = [expGraph.foo.bbb]
  
  // Run the test
  let renderContext = RenderContext(nodeDefs)
  let graph = renderContext.render(vgraph, null, false)
  assert.ok(h.deepMatches(graph, expGraph))
  assert.end()
})
