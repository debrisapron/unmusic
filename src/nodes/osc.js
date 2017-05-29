let WaaNode = require('./support/WaaNode')

let osc = WaaNode({
  out: true,
  audioParams: ['frequency', 'detune'],
  factory: (um) => um.ac.createOscillator()
})

module.exports = osc
