let _ = require('lodash/fp')
let h = require('./src/scoring/support/helpers')

let oneOsc = h.scoreTransformer({ transformScore: (score, params) => {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload }) => {
    payload.dest = (t, a) => handleAction(t, a)
    let graph = payload.graph = payload.graph || { nodes: {}, conns: [] }
    let lastNodeId = _.last(Object.keys(graph.nodes))
    let nodeId = _.uniqueId('node_')
    graph.nodes[nodeId] = { type: 'oneOsc', params }
    if (lastNodeId) graph.conns.push = [lastNodeId, nodeId]
  })
  return score
} })

let twelveTet = (nn) => {
  return nn && Math.pow(2, ((nn - 69) / 12)) * 440
}

let OneOsc = () => {
  let trigger = (time, params) => {
    let osc = audioContext.createOscillator()
    osc.frequency.value = twelveTet(params.nn)
    if (params.osc && params.osc.type) osc.type = params.osc.type
    if (params.osc && params.osc.detune) osc.detune.value = params.osc.detune

    let filter = audioContext.createBiquadFilter()
    if (params.filter) {
      if (params.filter.type) filter.type = params.filter.type
      if (params.filter.frequency) filter.frequency.value = params.filter.frequency
      if (params.filter.Q) filter.Q.value = params.filter.Q
    }
    let attack = (params.filter && params.filter.attack) || 0
    let release = (params.filter && params.filter.release) || 0
    filter.detune.setValueAtTime(0, time)
    filter.detune.linearRampToValueAtTime(4800, time + attack)

    osc.connect(filter)
    filter.connect(master)
    osc.start(time)
    return (time) => {
      filter.detune.linearRampToValueAtTime(0, time + release)
      osc.stop(time + release)
    }
  }

  return { trigger }
}

let handleAction = (time, action) => {
  let graph = _.get('payload.graph', action) || { nodes: {}, conns: [] }
  let realNodes = _.mapValues(instantiateNode, graph.nodes)
  graph.conns.forEach(([from, to]) => realNodes[from].connect(realNodes[to]))
  let stopFns = []
  _.forEachRight((vnode, id) => {
    let params = _.merge(vnode.params, { nn: action.payload.nn })
    let stopFn = realNodes[id].trigger(time, params)
    if (stopFn) stopFns.push(stopFn)
  })
  return (t) => stopFns.forEach((stopFn) => stopFn(t))
}

let instantiateNode = (vnode) => {
  switch(vnode.type) {
    case 'oneOsc': return OneOsc()
    case 'delay': return Delay()
    default: throw new Error('Unrecognized node type')
  }
}

let saw = oneOsc({
  osc: { detune: 600, type: 'sawtooth' },
  filter: { frequency: 220, attack: 0.1, release: 0.1, Q: 5 }
})
play(saw('/16 C E G A'))
