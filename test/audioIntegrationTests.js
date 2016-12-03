'use strict'
let sinon = require('sinon')
let BuggedAudioContext = require('./BuggedAudioContext')
let Unmusic = require('..')

let ac = BuggedAudioContext()
let um = Unmusic(ac)

test('can create native nodes', (assert) => {
  assert.ok(um.Gain() instanceof GainNode)
  assert.ok(um.Delay() instanceof DelayNode)
  assert.ok(um.Osc() instanceof OscillatorNode)
  assert.ok(um.Biquad() instanceof BiquadFilterNode)
  assert.end()
})

// test('can connect nodes together in a chain', () => {
//   p(p.gain(), p.gain(), p.gain()).render()
//   ac.nodes[0].connect.should.have.been.calledWtesth(ac.nodes[1])
//   ac.nodes[1].connect.should.have.been.calledWtesth(ac.nodes[2])
// })
//
// test('can create nodes wtesth fully qualified parameters', () => {
//   p(p.gain({ gain: { value: 0.5 } })).render()
//   ac.nodes[0].gain.value.should.eq(0.5)
// })
//
// it('can create nodes with shorthand audio parameters', () => {
//   p(p.gain({ gain: 0.5 })).render()
//   ac.nodes[0].gain.value.should.eq(0.5)
// })
//
// it('can create nodes with default parameters', () => {
//   p(p.gain(0.5)).render()
//   ac.nodes[0].gain.value.should.eq(0.5)
// })
//
// it('can fork vnodes to create new vnodes', () => {
//   p(p.gain(0.75)(0.5)).render()
//   ac.nodes[0].gain.value.should.eq(0.5)
// })
//
// it('can fork plans', () => {
//   const threeQuarters = p(p.gain(0.75))
//   const half = threeQuarters({ gain: 0.5 })
//   half.render()
//   ac.nodes[0].gain.value.should.eq(0.5)
// })
//
// it('can fork plans using assigned vnode names', () => {
//   const threeQuarters = p(p.gain('vol', 0.75))
//   const half = threeQuarters({ vol: 0.5 })
//   half.render()
//   ac.nodes[0].gain.value.should.eq(0.5)
// })
//
// it('can nest plans inside plans', () => {
//   const half = p(p.gain(0.5))
//   const halfAgain = p(half)
//   halfAgain.render()
//   ac.nodes[0].gain.value.should.eq(0.5)
// })
//
// it('can fork nested plans using assigned plan names', () => {
//   const one = p('one', p.gain(1))
//   const oneAgain = p(one)
//   const half = oneAgain({ one: { gain: 0.5 } })
//   half.render()
//   ac.nodes[0].gain.value.should.eq(0.5)
// })
//
// it('can rename forked plans', () => {
//   const one = p('one', p.gain(1))
//   const two = p(one('too', { gain: 2 }))
//   const half = two({ too: { gain: 0.5 } })
//   half.render()
//   ac.nodes[0].gain.value.should.eq(0.5)
// })
