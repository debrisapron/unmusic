let _ = require('lodash/fp')
let _$ = require('lodash')

module.exports = finishGraph

function finishGraph(graph, time, cache) {
  finishNodes(_.values(graph), time, cache)
}

////////////////////////////////////////////////////////////////////////////////

function finishNodes(nodes, time, cache) {
  let finishTimes = _.map((n) => finishNode(n, time), nodes)
  let stopTime = _.max(finishTimes)
  _.forEach((n) => stopNode(n, stopTime, cache), nodes)
  return stopTime
}

function finishNode(node, time) {
  let nd = node.__um.nodeDef
  if (nd.finish) return nd.finish(node, time)
  if (nd.vgraph) {
    let nodes = Object.keys(nd.vgraph).map((key) => node[key])
    return finishNodes(nodes, time)
  }
  return time
}

function stopNode(node, time, cache = {}) {
  let nd = node.__um.nodeDef
  delete cache[node.__um.id]
  if (nd.stop) return nd.stop(node, time)
  if (nd.vgraph) return _.forEach((key) => stopNode(node[key], time), Object.keys(nd.vgraph))
  if (node.stop) node.stop(time)
}

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('renderGraph', () => {
    let events
    let log = (...args) => events = events + (events && ' ') + args.join(':')

    // TODO Test subgraphs

    it('can finish a graph with only nodes that stop immediately', () => {
      events = ''
      let graph = {
        foo: { stop: (t) => log(t, 'foo:stop'), __um: { id: 'foo', nodeDef: {} } },
        bar: { __um: { id: 'bar', nodeDef: { stop: (__, t) => log(t, 'bar:stop') } } }
      }
      let cache = { bar: graph.bar }
      finishGraph(graph, 3, cache)
      expect(events).to.equal('3:foo:stop 3:bar:stop')
      expect(cache).to.be.empty
    })

    it('can finish a graph with nodes that need time to finish', () => {
      let events = ''
      let log = (...args) => events = events + (events && ' ') + args.join(':')
      // TODO Test subgraphs
      let graph = {
        foo: { stop: (t) => log(t, 'foo:stop'), __um: { nodeDef: {} } },
        bar: {
          stop: (t) => log(t, 'bar:stop'),
          __um: { nodeDef: { finish: (__, t) => {
            log(t, 'bar:finish')
            return t + 10
          } } }
        }
      }
      finishGraph(graph, 3, {})
      expect(events).to.equal('3:bar:finish 13:foo:stop 13:bar:stop')
    })
  })
}
