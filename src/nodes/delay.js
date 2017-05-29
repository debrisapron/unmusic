let WaaNode = require('./support/WaaNode')

let delay = WaaNode({
  in: true,
  out: true,
  audioParams: ['delayTime'],
  factory: (um, params) => um.ac.createDelay(params.maxDelayTime || 1)
})

module.exports = delay
