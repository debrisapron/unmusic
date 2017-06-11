let _ = require('lodash/fp')
let _$ = require('lodash')

let mapValuesWithId = (iteratee, obj) => _$.mapValues(obj, iteratee)
let forEachRightWithId = (iteratee, coll) => _$.forEachRight(coll, iteratee)

// TODO Clean this mess up.
let Renderer = (nodeDefs, um) => {
  let cache = {}

  let createNodes = (vgraph) => {
    return mapValuesWithId((vnode, id) => {
      if (cache[id]) return cache[id]
      vnode = _.merge(vnode, { id, nodeDef: _.get(vnode.type, nodeDefs) })
      let node = renderNode(vnode)
      // Persist nodes which have an input, so sources will be joined before processing
      if (vnode.nodeDef.in) cache[id] = node
      return node
    }, vgraph)
  }

  let renderNode = (vnode) => {
    let nd = vnode.nodeDef
    if (!nd) throw new Error('Unrecognized node type')
    let params = paramsFrom(vnode)
    let node = nd.factory
      ? nd.factory(um, params)
      : renderSubGraph(nd.vgraph, params)
    node.__um = vnode
    return node
  }

  let paramsFrom = (vnode) => {
    let nd = vnode.nodeDef
    let params = vnode.params || {}
    if (params.nn) {
      if (nd.freqIn) params = _.set(nd.freqIn, twelveTet(params.nn), params)
      if (nd.rateIn) params = _.set(nd.rateIn, twelveTet(params.nn, 1), params)
    }
    return params
  }

  let twelveTet = (nn, ref = 440) => {
    return nn && Math.pow(2, ((nn - 69) / 12)) * ref
  }

  let renderSubGraph = (vgraph, params) => {
    vgraph = mapValuesWithId((vnode, id) => _.merge(vnode, { params: params[id] }), vgraph)
    return Renderer(nodeDefs, um).render(vgraph, null, false)
  }

  let connectNodes = (graph, dest) => {
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

  let getNodeOutput = (node) => {
    let outputPath = node.__um.nodeDef.out
    return outputPath === true ? node : _.get(outputPath, node)
  }

  let getNodeInput = (node, inputPath) => {
    // Node may not have an __um prop as it may be a naked destination node
    let nd = node.__um && node.__um.nodeDef
    if (inputPath === 'main') inputPath = nd ? nd.in : true
    return inputPath === true ? node : _.get(inputPath, node)
  }

  let connect = (fromNode, toNode, toInputPath) => {
    let fromOutput = getNodeOutput(fromNode)
    let toInput = getNodeInput(toNode, toInputPath)
    fromOutput.connect(toInput)
  }

  let startNodes = (graph, time) => {
    _.forEach((node) => start(node, time), graph)
  }

  let start = (node, time) => {
    let nd = node.__um.nodeDef
    if (nd.start) return nd.start(node, time)
    if (nd.vgraph) return _.forEach((key) => start(node[key], time), Object.keys(nd.vgraph))
    if (node.start) return node.start(time)
  }

  let stop = (node, time) => {
    let nd = node.__um.nodeDef
    delete cache[node.__um.id]
    if (nd.stop) return nd.stop(node, time)
    if (nd.vgraph) return _.forEach((key) => stop(node[key], time), Object.keys(nd.vgraph))
    if (node.stop) return node.stop(time)
  }

  let finishNode = (node, time, andStop = true) => {
    let nd = node.__um.nodeDef
    if (nd.finish) return nd.finish(node, time, andStop)
    if (nd.vgraph) {
      let nodes = Object.keys(nd.vgraph).map((key) => node[key])
      let finishTimes = _.map((n) => finishNode(n, time, false), nodes)
      let stopTime = _.max(finishTimes)
      _.forEach((n) => stop(n, stopTime), nodes)
      return stopTime
    }
  }

  // Exports

  let render = (vgraph, time, andStart, dest) => {
    let graph = createNodes(vgraph)
    connectNodes(graph, dest)
    if (andStart) startNodes(graph, time)
    return graph
  }

  let finish = (graph, time) => {
    _.forEach((node) => finishNode(node, time), graph)
  }

  // let set = (node, params) => {
  //   let nd = nodeDef(node)
  //   if (nd.set) return nd.set(node, params)
  //   // let inputPaths = normalizePathCollection(opts.inputs)
  //   mapValuesWithId((val, key) => {
  //     key = normalizeParamName(key)
  //     if (key === 'nn' && nd.freqIn) {
  //       _.forEach((freqInput) => {
  //         set(node, { [freqInput]: twelveTet(val) })
  //       }, _.castArray(nd.freqIn))
  //       return
  //     }
  //     if (nd.audioParams && nd.audioParams.includes(key)) {
  //       node[key].value = val
  //       return
  //     }
  //     if (_.isPlainObject(val)) {
  //       set(node[key], val)
  //       return
  //     }
  //     mutate(node, key, val)
  //   }, params)
  // }
  //

  return { render, finish }
}

module.exports = Renderer

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('renderer', () => {

    it('can render an example vgraph', () => {

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
      let renderer = Renderer(nodeDefs)
      let graph = renderer.render(vgraph, 1, true, 'finalDest')
      expect(graph).to.containSubset(expGraph)
    })
  })
}
