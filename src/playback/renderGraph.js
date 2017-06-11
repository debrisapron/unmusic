let _ = require('lodash/fp')
let _$ = require('lodash')

module.exports = renderGraph

function renderGraph({ um, vgraph, time, andStart, dest, cache = {} }) {
  let graph = createNodes(um, vgraph, cache)
  connectNodes(graph, dest)
  if (andStart) startNodes(graph, time)
  return graph
}

////////////////////////////////////////////////////////////////////////////////

function createNodes(um, vgraph, cache) {
  return mapValuesWithId((vnode, id) => {
    if (cache[id]) return cache[id]
    vnode = _.merge(vnode, { id, nodeDef: _.get(vnode.type, um.__nodeDefs) })
    let node = renderNode(um, vnode)
    // Cache nodes which have an input, so sources all converge to the same dest.
    if (vnode.nodeDef.in) cache[id] = node
    return node
  }, vgraph)
}

function mapValuesWithId(iteratee, obj) {
  return _$.mapValues(obj, iteratee)
}

function renderNode(um, vnode) {
  let nd = vnode.nodeDef
  if (!nd) throw new Error('Unrecognized node type')
  let params = paramsFrom(vnode)
  let node = nd.factory
    ? nd.factory(um, params)
    : renderSubGraph(um, nd.vgraph, params)
  node.__um = vnode
  return node
}

function paramsFrom(vnode) {
  let nd = vnode.nodeDef
  let params = vnode.params || {}
  if (params.nn) {
    if (nd.freqIn) params = _.set(nd.freqIn, twelveTet(params.nn), params)
    if (nd.rateIn) params = _.set(nd.rateIn, twelveTet(params.nn, 1), params)
  }
  return params
}

function twelveTet(nn, ref = 440) {
  return nn && Math.pow(2, ((nn - 69) / 12)) * ref
}

function renderSubGraph(um, vgraph, params) {
  vgraph = mapValuesWithId((vnode, id) => _.merge(vnode, { params: params[id] }), vgraph)
  return renderGraph({ um, vgraph, andStart: false })
}

// TODO This needs some love.
function connectNodes(graph, dest) {
  let nextDest = dest
  _.forEachRight((sourceNode) => {
    let nd = sourceNode.__um.nodeDef
    let defaultDest = nextDest
    nextDest = nd.in && (nd.in === true ? sourceNode : _.get(nd.in, sourceNode))
    if (!nd.out) return
    let connections = sourceNode.__um.connect
    if (connections) {
      _.castArray(connections).forEach((destName) => {
        let [destId, ...inParts] = destName.split('.')
        let destNode = graph[destId]
        let destPath = inParts.length ? inParts.join('.') : 'main'
        connect(sourceNode, destNode, destPath)
      })
      return
    }
    if (defaultDest) {
      connect(sourceNode, defaultDest, 'main')
    }
  }, graph)
}

function connect(fromNode, toNode, toInputPath) {
  let fromOutput = getNodeOutput(fromNode)
  let toInput = getNodeInput(toNode, toInputPath)
  fromOutput.connect(toInput)
}

function getNodeOutput(node) {
  let outputPath = node.__um.nodeDef.out
  return outputPath === true ? node : _.get(outputPath, node)
}

function getNodeInput(node, inputPath) {
  // Node may not have an __um prop as it may be a naked destination node
  let nd = node.__um && node.__um.nodeDef
  if (inputPath === 'main') inputPath = nd ? nd.in : true
  return inputPath === true ? node : _.get(inputPath, node)
}

function startNodes(graph, time) {
  _.forEach((node) => start(node, time), graph)
}

function start(node, time) {
  let nd = node.__um.nodeDef
  if (nd.start) return nd.start(node, time)
  if (nd.vgraph) return _.forEach((key) => start(node[key], time), Object.keys(nd.vgraph))
  if (node.start) return node.start(time)
}

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('renderGraph', () => {

    it('can render an example graph', () => {

      // The test node definitions
      let nodeDefs = {
        foo: {
          out: true,
          freqIn: 'frq',
          factory: (um, params) => {
            let _conns = []
            let _started = []
            return {
              _conns, _started, params, isFoo: true, ap: {},
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
          rateIn: 'rate',
          factory: (um, params) => {
            let _conns = []
            let _started = []
            return {
              _conns, _started, params, isBaz: true,
              start: (t) => _started.push(t),
              connect: (dest) => _conns.push(dest)
            }
          }
        }
      }

      // The vgraph to render
      let vgraph = {
        foo: { type: 'foo', params: { blah: 42 } },
        bar: { type: 'bar', params: { baz1: { question: '6 by 9' }, baz2: { nn: 81 } } },
        foo2: { type: 'foo', params: { nn: 69 }, connect: 'foo.ap' },
        foo3: { type: 'foo' }
      }

      // The graph we expect to see rendered
      let expGraph = {
        foo: { isFoo: true, params: { blah: 42 }, ap: {}, _started: [1] },
        bar: {
          baz1: { isBaz: true, params: { answer: 42, question: '6 by 9' }, _started: [1] },
          baz2: { isBaz: true, params: { rate: 2 }, _started: [1] }
        },
        foo2: { isFoo: true, params: { frq: 440 }, _started: [1] },
        foo3: { isFoo: true, _started: [1] }
      }
      expGraph.foo._conns = [expGraph.bar.baz1]
      expGraph.bar.baz2._conns = []
      expGraph.foo2._conns = [expGraph.foo.ap]
      expGraph.foo3._conns = ['finalDest']

      // The test
      let graph = renderGraph({
        vgraph,
        um: { __nodeDefs: nodeDefs },
        time: 1,
        andStart: true,
        dest: 'finalDest'
      })
      expect(graph).to.containSubset(expGraph)
    })
  })
}
