let _ = require('lodash/fp')
let h = require('./src/scoring/support/helpers')
let Renderer = require('./src/nodes/Renderer')
let wrappers = require('./src/nodes/wrappers')
let Envelope = require('envelope-generator')

let twelveTet = (nn) => {
  return nn && Math.pow(2, ((nn - 69) / 12)) * 440
}

let inventory = {
  osc: {
    inputs: ['frequency', 'detune'],
    outputs: ['main'],
    factory: (ac) => ac.createOscillator()
  ),
  biquad: {
    inputs: ['main', 'frequency', 'detune', 'Q', 'gain'],
    outputs: ['main'] },
    factory: (ac) => ac.createBiquadFilter()
  },
  adsr: {
    outputs: ['main'],
    factory: (ac) => new Envelope(ac),
    finish: (node, time) => {
      node.release(time)
      let fTime = node.getReleaseCompleteTime()
      node.stop(fTime)
      return fTime
    }
  },
  oneOsc: {
    outputs: { main: graph.filter.outputs.main },
    factory: (ac) => {
      return Renderer(inventory, ac)({
        osc: { type: 'osc' }, // freqIn: 'freq' // implicit for osc nodes (but not lfo nodes)
        filter: { type: 'biquad', params: { type: 'lowpass' } }, // conns: { main: 'out' } // implicit for last node with a main out
        env: { type: 'adsr', conns: { main: 'filter.frequency' } }
      })
    },
    set: (node, params) => {
      if (params.nn) node.osc.set({ freq: twelveTet(params.nn) })
      node.osc.set(params.osc)
      node.filter.set(params.filter)
      node.env.set(params.env)
    },
    start: (node, time) => {
      node.osc.start(t)
      node.env.start(t)
    },
    stop: (node, time) => {
      node.osc.stop(t)
      node.env.stop(t)
    },
    finish: (node, time) => {
      node.osc.stop(node.env.finish(t))
    }
  }
}

let render = Renderer(inventory, ac)

let oneOsc = h.scoreTransformer({ transformScore: (score, params) => {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload }) => {
    payload.dest = (t, a) => handleAction(t, a)
    let vgraph = payload.vgraph = payload.vgraph || {}
    let nodeId = _.uniqueId('node_')
    vgraph[nodeId] = { type: 'oneOsc', params }
  })
  return score
} })

let handleAction = (time, action) => {
  let vgraph = _.get('payload.vgraph', action)
  if (!vgraph) { return }
  let graph = render(vgraph, time)
  return (t) => _.forEach((node) => node.finish && node.finish(), graph)
}

let saw = oneOsc({
  osc: { detune: 600, type: 'sawtooth' },
  filter: { frequency: 220, Q: 5 },
  env: { attack: 0.1, release: 0.1 }
})
play(saw('/16 C E G A'))
