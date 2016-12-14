let _ = require('lodash/fp')
let UmNode = require('./support/UmNode')

let Biquad = UmNode({
  Node: (audioContext) => audioContext.createBiquadFilter(),
  primaryParam: 'frequency',
  defaultParams: { freq: 0 }
})

let BuffSrc = UmNode({
  Node: (audioContext) => audioContext.createBufferSource(),
  primaryParam: 'buffer'
})

let Delay = UmNode({
  Node: (audioContext, { maxDelayTime = 1 }) => {
    return audioContext.createDelay(maxDelayTime)
  },
  primaryParam: 'delayTime'
})

let Gain = UmNode({
  Node: (audioContext) => audioContext.createGain(),
  primaryParam: 'gain'
})

let makeOscFactory = (type = 'sine') => {
  return UmNode({
    Node: (audioContext) => audioContext.createOscillator(),
    primaryParam: 'frequency',
    defaultParams: { type, freq: 0 }
  })
}

let Osc = makeOscFactory()
let Sin = makeOscFactory('sine')
let Sqr = makeOscFactory('square')
let Saw = makeOscFactory('sawtooth')
let Tri = makeOscFactory('triangle')

module.exports = { Biquad, BuffSrc, Delay, Gain, Osc, Sin, Sqr, Saw, Tri }

////////////////////////////////////////////////////////////////////////////////

if (!process.env.TEST) return

let BuggedAudioContext = require('./support/BuggedAudioContext')

let ac = BuggedAudioContext()

test('can create native nodes', (assert) => {
  assert.ok(Gain(ac)() instanceof GainNode)
  assert.ok(Delay(ac)() instanceof DelayNode)
  assert.ok(Osc(ac)() instanceof OscillatorNode)
  assert.ok(Biquad(ac)() instanceof BiquadFilterNode)
  assert.end()
})

test('can create node with default parameter', (assert) => {
  let gain = Gain(ac)(0.5)
  assert.equal(gain.gain.value, 0.5)
  assert.end()
})

test('can set parameter on node', (assert) => {
  let biquad = Biquad(ac)({ Q: 4 })
  assert.equal(biquad.Q.value, 4)
  biquad.set({ Q: 5 })
  assert.equal(biquad.Q.value, 5)
  assert.end()
})

test('can set aliased parameter on node', (assert) => {
  let biquad = Biquad(ac)({ freq: 100 })
  assert.equal(biquad.frequency.value, 100)
  biquad.set({ freq: 200 })
  assert.equal(biquad.frequency.value, 200)
  assert.end()
})

test('can set creation parameter on node', (assert) => {
  let delay = Delay(ac)({ maxDelayTime: 2 })
  assert.equal(delay.delayTime.maxValue, 2)
  delay = Delay(ac)()
  assert.equal(delay.delayTime.maxValue, 1)
  assert.end()
})
