let _ = require('lodash/fp')
let h = require('./support/helpers')
// let UmNode = require('./support/UmNode')

let NativeNodes = (ac) => {

  let Biquad = NativeNode(
    () => ac.createBiquadFilter(),
    'frequency',
    { freq: 0 }
  )

  // let BuffSrc = UmNode({
  //   Node: (audioContext) => audioContext.createBufferSource(),
  //   primaryParam: 'buffer'
  // })

  let Delay = NativeNode(
    ({ maxDelayTime = 1 }) => ac.createDelay(maxDelayTime),
    'delayTime'
  )

  let Gain = NativeNode(
    () => ac.createGain(),
    'gain'
  )

  let TypedOsc = (type = 'sine') => {
    return NativeNode(
      () => ac.createOscillator(),
      'frequency',
      { type, freq: 0 }
    )
  }

  let Osc = TypedOsc()
  let Sin = TypedOsc('sine')
  let Sqr = TypedOsc('square')
  let Saw = TypedOsc('sawtooth')
  let Tri = TypedOsc('triangle')

  return { Biquad, Delay, Gain, Osc, Sin, Sqr, Saw, Tri } //, BuffSrc }
}

let NativeNode = (create, primaryParam, defaultParams) => {
  return (...args) => {
    let params = _.merge(defaultParams, h.paramsFromArgObjects(primaryParam, args))
    let node = create(params)
    node.__um = node.__um || {}
    node.__um.primaryParam = primaryParam
    h.setNodeParams(node, [params])
    return node
  }
}

module.exports = NativeNodes

////////////////////////////////////////////////////////////////////////////////

if (!process.env.TEST) return

let BuggedAudioContext = require('./support/BuggedAudioContext')

let ac = BuggedAudioContext()
let { Biquad, Delay, Gain, Osc, Sin, Sqr, Saw, Tri } = NativeNodes(ac)

test('can create native nodes', (assert) => {
  assert.ok(Biquad() instanceof BiquadFilterNode)
  assert.ok(Delay() instanceof DelayNode)
  assert.ok(Gain() instanceof GainNode)
  assert.ok(Osc() instanceof OscillatorNode)
  assert.end()
})

test('can create typed oscillators', (assert) => {
  assert.ok(Sin() instanceof OscillatorNode)
  assert.equal(Sin().type, 'sine')
  assert.ok(Sqr() instanceof OscillatorNode)
  assert.equal(Sqr().type, 'square')
  assert.ok(Saw() instanceof OscillatorNode)
  assert.equal(Saw().type, 'sawtooth')
  assert.ok(Tri() instanceof OscillatorNode)
  assert.equal(Tri().type, 'triangle')
  assert.end()
})

test('can create node with default parameter', (assert) => {
  let gain = Gain(0.5)
  assert.equal(gain.gain.value, 0.5)
  assert.end()
})

test('should create node with default value', (assert) => {
  let biquad = Biquad()
  assert.equal(biquad.frequency.value, 0)
  assert.end()
})

test('can set parameter on node', (assert) => {
  let biquad = Biquad({ Q: 4 })
  assert.equal(biquad.Q.value, 4)
  // biquad.set({ Q: 5 })
  // assert.equal(biquad.Q.value, 5)
  assert.end()
})

test('can set aliased parameter on node', (assert) => {
  let biquad = Biquad({ freq: 100 })
  assert.equal(biquad.frequency.value, 100)
  // biquad.set({ freq: 200 })
  // assert.equal(biquad.frequency.value, 200)
  assert.end()
})

test('can set creation parameter on node', (assert) => {
  let delay = Delay({ maxDelayTime: 2 })
  assert.equal(delay.delayTime.maxValue, 2)
  delay = Delay()
  assert.equal(delay.delayTime.maxValue, 1)
  assert.end()
})
