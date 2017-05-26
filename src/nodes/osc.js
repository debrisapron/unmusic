let WaaNode = require('./support/WaaNode')

let osc = WaaNode({
  out: true,
  audioParams: ['frequency', 'detune'],
  factory: (ac) => ac.createOscillator()
})

module.exports = osc
