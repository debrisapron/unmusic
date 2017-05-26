let _ = require('lodash/fp')
let _$ = require('lodash')

let mapValuesWithId = (iteratee, obj) => _$.mapValues(obj, iteratee)
let forEachRightWithId = (iteratee, coll) => _$.forEachRight(coll, iteratee)

// TODO Clean this mess up.
let RenderContext = (nodeDefs, ac) => {
  let nodes = {}

  let createNodes = (vgraph) => {
    return mapValuesWithId((vnode, id) => nodes[id] || (nodes[id] = renderNode(vnode)), vgraph)
  }

  let renderNode = (vnode) => {
    let nodeDef = nodeDefs[vnode.type]
    if (!nodeDef) throw new Error('Unrecognized node type')
    let params = paramsFrom(vnode)
    let node = nodeDef.factory
      ? nodeDef.factory(ac, params)
      : renderNodeGraph(nodeDef.vgraph, params)
    node.__umType = vnode.type
    return node
  }

  let paramsFrom = (vnode) => {
    let params = vnode.params || {}
    let nodeDef = nodeDefs[vnode.type]
    if (params.nn && nodeDef.freqIn) {
      params = _.set(nodeDef.freqIn, twelveTet(params.nn), params)
    }
    return params
  }

  let twelveTet = (nn) => {
    return nn && Math.pow(2, ((nn - 69) / 12)) * 440
  }

  let renderNodeGraph = (vgraph, params) => {
    vgraph = mapValuesWithId((vnode, id) => _.merge(vnode, { params: params[id] }), vgraph)
    return RenderContext(nodeDefs, ac).render(vgraph, null, false)
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
          connect(sourceNode, destNode, destPath)
        })
        return
      }
      if (defaultDest) {
        connect(sourceNode, defaultDest, 'main')
      }
    }, vgraph)
  }

  let defFrom = (node) => nodeDefs[node.__umType]

  let getNodeOutput = (node) => {
    let outputPath = defFrom(node).out
    return outputPath === true ? node : _.get(outputPath, node)
  }

  let getNodeInput = (node, inputPath) => {
    let nd = defFrom(node)
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
    let nd = defFrom(node)
    if (nd.start) return nd.start(node, time)
    if (nd.vgraph) return _.forEach((key) => start(node[key], time), Object.keys(nd.vgraph))
    if (node.start) return node.start(time)
  }

  let stop = (node, time) => {
    let nd = defFrom(node)
    if (nd.stop) return nd.stop(node, time)
    if (nd.vgraph) return _.forEach((key) => stop(node[key], time), Object.keys(nd.vgraph))
    if (node.stop) return node.stop(time)
  }

  let finishNode = (node, time, andStop = true) => {
    let nd = defFrom(node)
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
    connectNodes(vgraph, dest)
    if (andStart) startNodes(graph, time)
    return graph
  }

  let finish = (vgraph, time) => {
    _.forEach((key) => finishNode(nodes[key], time), Object.keys(vgraph))
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

module.exports = RenderContext

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('render context', () => {

    it('can render an example vgraph', () => {

      // The test node definitions
      let nodeDefs = {
        foo: {
          out: true,
          freqIn: 'frq',
          factory: (ac, params) => {
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
          factory: (ac, params) => {
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
        bar: { type: 'bar', params: { baz1: { question: '6 by 9' } } },
        foo2: { type: 'foo', params: { nn: 69 }, connect: 'foo.ap' },
        foo3: { type: 'foo' }
      }

      // The graph we expect to see rendered
      let expGraph = {
        foo: { isFoo: true, params: { blah: 42 }, ap: {}, _started: [1] },
        bar: {
          baz1: { isBaz: true, params: { answer: 42, question: '6 by 9' }, _started: [1] },
          baz2: { isBaz: true, _started: [1] }
        },
        foo2: { isFoo: true, params: { frq: 440 }, _started: [1] },
        foo3: { isFoo: true, _started: [1] }
      }
      expGraph.foo._conns = [expGraph.bar.baz1]
      expGraph.bar.baz2._conns = []
      expGraph.foo2._conns = [expGraph.foo.ap]
      expGraph.foo3._conns = ['finalDest']

      // The test
      let renderContext = RenderContext(nodeDefs)
      let graph = renderContext.render(vgraph, 1, true, 'finalDest')
      expect(graph).to.containSubset(expGraph)
    })
  })
}
