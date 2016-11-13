'use strict'

let _ = require('lodash')

let makeVoice = (um) => {
  return um.patch({
    nodes: {
      osc: um.saw(),
      filter: um.biquad(),
      filterEnv: um.adsr({ value: 15000 }),
      amp: um.gain(0),
      ampEnv: um.adsr()
    },
    conns: [
      'noteIn > osc.freq > filter > amp > out',
      'filterEnv > filter.detune',
      'ampEnv > amp.gain'
    ]
  })
}

let init = (um) => {
  return (defaultParams) => um.synth(_.merge({ makeVoice }, defaultParams))
}

module.exports = init
