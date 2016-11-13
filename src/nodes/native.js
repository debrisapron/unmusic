'use strict'
let _ = require('lodash/fp')
let UmNode = require('./UmNode')

let Biquad = UmNode({
  Node: (audioContext) => audioContext.createBiquadFilter(),
  primaryParam: 'frequency',
  defaultParams: { freq: 0 }
})

let BuffSrc = UmNode({
  Node: (audioContext) => audioContext.createBufferSource(),
  primaryParam: 'buffer'
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

module.exports = { Biquad, BuffSrc, Gain, Osc, Sin, Sqr, Saw, Tri }
