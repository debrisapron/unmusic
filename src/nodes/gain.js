let WaaNode = require('./support/WaaNode')

let gain = WaaNode({
  in: true,
  out: true,
  audioParams: ['gain'],
  factory: (um) => um.ac.createGain()
})

module.exports = gain
