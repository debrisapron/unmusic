let _ = require('lodash/fp')
let _$ = require('lodash')
let { getScore } = require('./scoring/support/helpers')
let addNode = require('./scoring/addNode')
let Controller = require('./playback/Controller')
let Sequencer = require('./playback/Sequencer')
let Player = require('./playback/Player')

let SCORING = [
  { name: 'mix', resource: require('./scoring/mix') },
  { name: 'seq', resource: require('./scoring/seq') },
  { name: 'loop', composerFn: require('./scoring/loop') },
  { name: 'multi', composerFn: require('./scoring/multi') },
  { name: 'multiSample', composerFn: require('./scoring/multiSample') },
  { name: 'offset', composerFn: require('./scoring/offset') },
  { name: 'tempo', composerFn: require('./scoring/tempo') },
  { name: 'config', composerFn: require('./scoring/config') }
]

let NODES = [
  { name: 'waa.biquad', nodeDef: require('./nodes/waa/biquad') },
  { name: 'waa.constant', nodeDef: require('./nodes/waa/constant') },
  { name: 'waa.delay', nodeDef: require('./nodes/waa/delay') },
  { name: 'waa.gain', nodeDef: require('./nodes/waa/gain') },
  { name: 'waa.osc', nodeDef: require('./nodes/waa/osc') },
  { name: 'adsr', nodeDef: require('./nodes/adsr') },
  { name: 'sample', nodeDef: require('./nodes/sample') },
  { name: 'vol', nodeDef: require('./nodes/vol') },
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

let Unmusic = (config = {}) => {
  let audioContext = config.audioContext || getDefaultAudioContext()
  config = _.merge(_.omit('audioContext', config), {
    cwd: '/',
    audio: {}
  })
  let um = {}
  let state = {}
  let nodeDefs = {}
  let controller = Controller(nodeDefs, um)
  let sequencer = Sequencer(audioContext)
  let player = Player(sequencer, controller)

  let use = (plugins) => {
    plugins = _.castArray(plugins)
    plugins.forEach(({ name, resource, composerFn, nodeDef }) => {
      if (resource) {
        _$.set(um, name, resource)
        return
      }
      if (composerFn) {
        resource = wrapComposerFn(composerFn)
        use({ name, resource })
        return
      }
      if (nodeDef) {
        _$.set(nodeDefs, name, nodeDef)
        composerFn = (params, score) => {
          if (_.isString(params) || _.isNumber(params)) {
            params = { [nodeDef.defaultParam]: params }
          }
          return addNode({ type: name, params }, score)
        }
        use({ name, composerFn })
        return
      }
      throw new Error('Unrecognized plugin type.')
    })
  }

  let play = (score) => {
    // TODO move this into player & make it into a constant node
    // TODO Just generally fix this fucking mess
    if (score.tempo) state.tempo = score.tempo
    if (score.config) um.__config = _.merge(um.__config, score.config)
    return player.play(score)
  }

  use([
    { name: 'use', resource: use },
    { name: '__config', resource: config },
    { name: 'audioContext', resource: audioContext },
    { name: 'ac', resource: audioContext },
    { name: 'out', resource: audioContext.destination },
    { name: 'play', resource: play },
    { name: 'stop', resource: player.stop },
    { name: '__state', resource: state },
    { name: 'pipe', resource: _.pipe }
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
      let expScore = {
        actions: [
          { type: 'TRIG', payload: { time: 0, name: 'foo', dur: 1/4, vgraph: {
            node_1: { type: 'sample', params: { file: 'foo.wav', name: 'foo' } }
          } } },
        ]
      }
      let uid = _.uniqueId
      _.uniqueId = () => 1
      let score = um.sample({ file: 'foo.wav' }, 'foo')
      expect(score).to.containSubset(expScore)
      _.uniqueId = uid
    })

    it('can generate a simple score with a custom instrument', () => {
      let um = Unmusic()
      um.use({
        name: 'oneOsc',
        nodeDef: {
          out: 'amp',
          freqIn: 'osc.frequency',
          vgraph: {
            osc: { type: 'waa.osc' },
            filter: { type: 'waa.biquad', params: { type: 'lowpass' } },
            amp: { type: 'waa.gain', params: { gain: 0 } },
            filterEnv: { type: 'adsr' },
            filterEnvAmt: { type: 'waa.gain', params: { gain: '9600' }, connect: 'filter.detune' },
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
