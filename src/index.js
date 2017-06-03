let _ = require('lodash')
let { getScore } = require('./scoring/support/helpers')
let mix = require('./scoring/mix')
let seq = require('./scoring/seq')
let loop = require('./scoring/loop')
let tempo = require('./scoring/tempo')
let arrange = require('./scoring/arrange')
let addNode = require('./scoring/addNode')
let multi = require('./scoring/multi')
let offset = require('./scoring/offset')
let Controller = require('./Controller')
let Sequencer = require('./Sequencer')
let Player = require('./Player')
let adsr = require('./nodes/adsr')
let biquad = require('./nodes/biquad')
let delay = require('./nodes/delay')
let gain = require('./nodes/gain')
let osc = require('./nodes/osc')
let sample = require('./nodes/sample')

let getDefaultAudioContext = () => {
  return window.__umAudioContext ||
    (window.__umAudioContext = new AudioContext())
}

// Exports

let Unmusic = ({ audioContext = getDefaultAudioContext(), cwd = '/' } = {}) => {
  let um = {}
  let nodeDefs = {}
  let config = { cwd }
  let controller = Controller(nodeDefs, um)
  let sequencer = Sequencer(audioContext)
  let player = Player(sequencer, controller)

  let use = (name, config) => {
    let resource = getResource(name, config)
    um[name] = resource
  }

  let useResource = (name, resource) => {
    use(name, { resource })
  }

  let useComposer = (name, composerFn) => {
    use(name, { composerFn, type: 'COMPOSER' })
  }

  let useNode = (name, nodeDef) => {
    use(name, { nodeDef, type: 'NODE' })
  }

  let getResource = (name, config) => {
    switch(config.type) {
      case 'COMPOSER': return wrapComposer(config.composerFn)
      case 'NODE':
        nodeDefs[name] = config.nodeDef
        return wrapComposer((params, score) => addNode({ type: name, params }, score))
    }
    return config.resource
  }

  let wrapComposer = (fn) => {
    return fn.length === 1
      ? (thing) => fn(getScore(thing))
      : _.curry((options, thing) => fn(options, getScore(thing)))
  }

  useResource('config', config)
  useResource('use', use)

  useResource('audioContext', audioContext)
  useResource('ac', audioContext)
  useResource('out', audioContext.destination)

  useResource('play', player.play)
  useResource('stop', player.stop)

  useResource('mix', mix)
  useResource('seq', seq)

  useComposer('loop', loop)
  useComposer('arrange', arrange)
  useComposer('multi', multi)
  useComposer('tempo', tempo)

  useNode('adsr', adsr)
  useNode('biquad', biquad)
  useNode('delay', delay)
  useNode('gain', gain)
  useNode('osc', osc)
  useNode('sample', sample)

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
      um.use('oneOsc', {
        type: 'NODE',
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
