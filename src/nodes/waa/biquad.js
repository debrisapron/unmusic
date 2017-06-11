let WaaNode = require('../support/WaaNode')

let biquad = WaaNode({
  in: true,
  out: true,
  audioParams: ['frequency', 'detune', 'Q', 'gain'],
  defaultParam: 'frequency',
  factory: (um) => um.ac.createBiquadFilter()
})

module.exports = biquad
