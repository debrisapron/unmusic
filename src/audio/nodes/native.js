'use strict' 
let NodeFactory = require('./NodeFactory')

let biquad = NodeFactory({
  makeNode: (audioContext) => audioContext.createBiquadFilter(),
  primaryParam: 'frequency',
  defaultParams: { freq: 0 }
})

let buffSrc = NodeFactory({
  makeNode: (audioContext) => audioContext.createBufferSource(),
  primaryParam: 'buffer'
})

let gain = NodeFactory({
  makeNode: (audioContext) => audioContext.createGain(),
  primaryParam: 'gain'
})

let makeOscFactory = (type = 'sine') => {
  return NodeFactory({
    makeNode: (audioContext) => audioContext.createOscillator(),
    primaryParam: 'frequency',
    defaultParams: { type, freq: 0 }
  })
}

let osc = makeOscFactory()

let sin = makeOscFactory('sine')
let sqr = makeOscFactory('square')
let saw = makeOscFactory('sawtooth')
let tri = makeOscFactory('triangle')

module.exports = { biquad, buffSrc, gain, osc, sin, sqr, saw, tri }
