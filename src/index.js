let _ = require('lodash')
let { getScore } = require('./scoring/support/helpers')
let mix = require('./scoring/mix')
let seq = require('./scoring/seq')
let loop = require('./scoring/loop')
let tempo = require('./scoring/tempo')
let arrange = require('./scoring/arrange')
let addNode = require('./scoring/addNode')
let Controller = require('./Controller')
let Sequencer = require('./Sequencer')
let Player = require('./Player')
let coreNodes = require('./nodes/coreNodes')

let getDefaultAudioContext = () => {
  return window.__umAudioContext ||
    (window.__umAudioContext = new AudioContext())
}

let Unmusic = (audioContext = getDefaultAudioContext()) => {
  let um = {}
  let nodeDefs = {}
  let controller = Controller(nodeDefs, audioContext)
  let sequencer = Sequencer(audioContext)
  let player = Player(sequencer, controller.handle)

  let use = (key, value) => {
    um[key] = value
  }

  let useComposer = (key, fn) => {
    let wrappedFn = fn.length === 1
      ? (thing) => fn(getScore(thing))
      : _.curry((options, thing) => fn(options, getScore(thing)))
    um[key] = wrappedFn
  }

  let useNode = (type, nodeDef) =>{
    nodeDefs[type] = nodeDef
    um.useComposer(
      type,
      (params, score) => addNode({ type, params }, score)
    )
  }

  use('use', use)

  use('audioContext', audioContext)
  use('ac', audioContext)
  use('out', audioContext.destination)

  use('play', player.play)
  use('stop', player.stop)

  use('mix', mix)
  use('seq', seq)

  use('useComposer', useComposer)
  useComposer('loop', loop)
  useComposer('arrange', arrange)
  useComposer('tempo', tempo)

  use('useNode', useNode)
  useNode('adsr', coreNodes.adsr)
  useNode('biquad', coreNodes.biquad)
  useNode('gain', coreNodes.gain)
  useNode('osc', coreNodes.osc)

  return um
}

module.exports = Unmusic

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {
  let h = require('./testHelpers')

  test('can generate a simple score with a custom instrument', (assert) => {
    let um = Unmusic()
    um.useNode('oneOsc', {
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
        { type: 'NOTE', payload: { time: 0,   nn: 45, dur: 1/4 } },
        { type: 'NOTE', payload: { time: 0,   nn: 40, dur: 1/4 } },
        { type: 'NOTE', payload: { time: 1/4, nn: 47, dur: 1/4 } },
        { type: 'NOTE', payload: { time: 1/2, nn: 36, dur: 1/8 } },
        { type: 'NOTE', payload: { time: 5/8, nn: 38, dur: 1/8 } }
      ],
      tempo: 150
    }
    assert.ok(h.deepMatches(score, expScore))
    assert.end()
  })
}
