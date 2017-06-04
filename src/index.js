let _ = require('lodash')
let { getScore } = require('./scoring/support/helpers')
let addNode = require('./scoring/addNode')
let Controller = require('./Controller')
let Sequencer = require('./Sequencer')
let Player = require('./Player')

let SCORING = [
  { name: 'mix', resource: require('./scoring/mix') },
  { name: 'seq', resource: require('./scoring/seq') },
  { name: 'loop', composerFn: require('./scoring/loop') },
  { name: 'arrange', composerFn: require('./scoring/arrange') },
  { name: 'multi', composerFn: require('./scoring/multi') },
  { name: 'multiSample', composerFn: require('./scoring/multiSample') },
  { name: 'offset', composerFn: require('./scoring/offset') },
  { name: 'tempo', composerFn: require('./scoring/tempo') }
]

let NODES = [
  { name: 'adsr', nodeDef: require('./nodes/adsr') },
  { name: 'biquad', nodeDef: require('./nodes/biquad') },
  { name: 'delay', nodeDef: require('./nodes/delay') },
  { name: 'gain', nodeDef: require('./nodes/gain') },
  { name: 'osc', nodeDef: require('./nodes/osc') },
  { name: 'sample', nodeDef: require('./nodes/sample') },
]

let getDefaultAudioContext = () => {
  return window.__umAudioContext ||
    (window.__umAudioContext = new AudioContext())
}

let wrapComposerFn = (fn) => {
  return fn.length === 1
    ? (thing) => fn(getScore(thing))
    : _.curry((options, thing) => fn(options, getScore(thing)))
}

// Exports

let Unmusic = ({ audioContext = getDefaultAudioContext(), cwd = '/' } = {}) => {
  let um = {}
  let nodeDefs = {}
  let config = { cwd }
  let controller = Controller(nodeDefs, um)
  let sequencer = Sequencer(audioContext)
  let player = Player(sequencer, controller)

  let use = (plugins) => {
    plugins = _.castArray(plugins)
    plugins.forEach((plugin) => {
      if (plugin.resource) {
        um[plugin.name] = plugin.resource
        return
      }
      if (plugin.composerFn) {
        um[plugin.name] = wrapComposerFn(plugin.composerFn)
        return
      }
      if (plugin.nodeDef) {
        nodeDefs[plugin.name] = plugin.nodeDef
        um[plugin.name] = wrapComposerFn(
          (params, score) => addNode({ type: plugin.name, params }, score)
        )
        return
      }
      throw new Error('Unrecognized plugin type.')
    })
  }

  use([
    { name: 'use', resource: use },
    { name: 'config', resource: config },
    { name: 'audioContext', resource: audioContext },
    { name: 'ac', resource: audioContext },
    { name: 'out', resource: audioContext.destination },
    { name: 'play', resource: player.play },
    { name: 'stop', resource: player.stop },
  ])

  use(SCORING)

  use(NODES)

  return um
}

module.exports = Unmusic

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {
  const chaiSubset = require('chai-subset')

  chai.use(chaiSubset)

  describe('unmusic', () => {

    it('can generate a super-simple score with one trigger of one sample', () => {
      let um = Unmusic()
      let score = um.sample({ file: 'foo.wav' }, 'foo')
      let expScore = {
        actions: [
          { type: 'TRIG', payload: { time: 0, name: 'foo', dur: 1/4, vgraph: {
            node_0: { type: 'sample', params: { file: 'foo.wav', name: 'foo' } }
          } } },
        ]
      }
      expect(score).to.containSubset(expScore)
    })

    it('can generate a simple score with a custom instrument', () => {
      let um = Unmusic()
      um.use({
        name: 'oneOsc',
        nodeDef: {
          out: 'amp',
          freqIn: 'osc.frequency',
          vgraph: {
            osc: { type: 'osc' },
            filter: { type: 'biquad', params: { type: 'lowpass' } },
            amp: { type: 'gain', params: { gain: 0 } },
            filterEnv: { type: 'adsr' },
            filterEnvAmt: { type: 'gain', params: { gain: '9600' }, connect: 'filter.detune' },
            ampEnv: { type: 'adsr', connect: 'amp.gain' }
          }
        }
      })
      let saw = um.oneOsc({
        osc: { detune: 600, type: 'sawtooth' },
        filter: { frequency: 500, Q: 5 },
        filterEnv: { attackTime: 0.2, releaseTime: 0.2 },
        ampEnv: { attackTime: 0.1, decayTime: 0.5, releaseTime: 0.5 }
      })
      let score =
        um.tempo(150,
          saw(
            um.mix(
              um.seq('A B', '/8 C D'),
              'E')))
      let expScore = {
        actions: [
          { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
          { type: 'NOTE', payload: { time: 0,   nn: 64, dur: 1/4 } },
          { type: 'NOTE', payload: { time: 1/4, nn: 71, dur: 1/4 } },
          { type: 'NOTE', payload: { time: 1/2, nn: 60, dur: 1/8 } },
          { type: 'NOTE', payload: { time: 5/8, nn: 62, dur: 1/8 } }
        ],
        tempo: 150
      }
      expect(score).to.containSubset(expScore)
    })
  })
}
