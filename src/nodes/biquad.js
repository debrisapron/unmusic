let WaaNode = require('./support/WaaNode')

let biquad = WaaNode({
  in: true,
  out: true,
  audioParams: ['frequency', 'detune', 'Q', 'gain'],
  factory: (ac) => ac.createBiquadFilter()
})

module.exports = biquad
