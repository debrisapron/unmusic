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
      ? nodeDef.factory(ac, vnode.params)
      : RenderContext(nodeDefs, ac).render(nodeDef.vgraph, null, false)
    node.__umType = vnode.type
    return node
  }

  let connectNodes = (vgraph, dest) => {
    let nextDest = dest
    forEachRightWithId((vnode, id) => {
      let nodeDef = nodeDefs[vnode.type]
      let sourceNode = nodes[id]
      let defaultDest = nextDest
      nextDest = nodeDef.in && (nodeDef.in === true ? sourceNode : _.get(nodeDef.in, sourceNode))
      if (!nodeDef.out) return
      if (vnode.connect) {
        _.castArray(vnode.connect).forEach((destName) => {
          let [destId, ...inParts] = destName.split('.')
          let destNode = nodes[destId]
          let destPath = inParts.length ? inParts.join('.') : 'main'
          nh.connect(sourceNode, destNode, destPath)
        })
        return
      }
      if (defaultDest) {
        nh.connect(sourceNode, defaultDest, 'main')
      }
    }, vgraph)
  }

  let configureNodes = (vgraph) => {
    mapValuesWithId((vnode, id) => nh.set(nodes[id], vnode.params), vgraph)
  }

  let startNodes = (graph, time) => {
    _.forEach((node) => nh.start(node, time), graph)
  }

  // Exports

  let render = (vgraph, time, andStart, dest) => {
    let graph = createNodes(vgraph)
    connectNodes(vgraph, dest)
    configureNodes(vgraph)
    if (andStart) startNodes(graph, time)
    return graph
  }

  let finish = (vgraph, time) => {
    _.forEach((key) => nh.finish(nodes[key], time), Object.keys(vgraph))
  }

  return { render, finish }
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
      audioParams: ['ap', 'frq'],
      freqIn: 'frq',
      factory: () => {
        let _conns = []
        let _started = []
        return {
          _conns, _started, isFoo: true, ap: { isAp: true }, frq: {},
          start: (t) => _started.push(t),
          connect: (dest) => _conns.push(dest)
        }
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
        let _started = []
        return {
          _conns, _started, isBaz: true,
          start: (t) => _started.push(t),
          connect: (dest) => _conns.push(dest)
        }
      }
    }
  }

  // The vgraph to render
  let vgraph = {
    foo: { type: 'foo', params: { blah: 42, ap: 69 } },
    bar: { type: 'bar', params: { baz1: { question: '6 by 9' } } },
    foo2: { type: 'foo', params: { nn: 69 }, connect: 'foo.ap' },
    foo3: { type: 'foo' }
  }

  // The graph we expect to see rendered
  let expGraph = {
    foo: { isFoo: true, blah: 42, ap: { value: 69, isAp: true }, _started: [1] },
    bar: {
      baz1: { isBaz: true, answer: 42, question: '6 by 9', _started: [1] },
      baz2: { isBaz: true, _started: [1] }
    },
    foo2: { isFoo: true, frq: { value: 440 }, _started: [1] },
    foo3: { isFoo: true, _started: [1] }
  }
  expGraph.foo._conns = [expGraph.bar.baz1]
  expGraph.bar.baz2._conns = []
  expGraph.foo2._conns = [expGraph.foo.ap]
  expGraph.foo3._conns = ['finalDest']

  // Run the test
  let renderContext = RenderContext(nodeDefs)
  let graph = renderContext.render(vgraph, 1, true, 'finalDest')
  assert.ok(h.deepMatches(graph, expGraph))
  assert.end()
})
