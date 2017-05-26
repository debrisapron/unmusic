let WaaNode = require('./support/WaaNode')

let delay = WaaNode({
  in: true,
  out: true,
  audioParams: ['delayTime'],
  factory: (ac, params) => ac.createDelay(params.maxDelayTime || 1)
})

module.exports = delay
