let _ = require('lodash/fp')

let Subtract3 = _.curry((um, params) => {
  return um.Synth(_.merge({ Voice }, params))
})

let Voice = (um) => {
  return um.Patch({
    nodes: {
      osc: um.Saw(),
      filter: um.Biquad(),
      filterEnv: um.Adsr({ value: 15000 }),
      amp: um.Gain(0),
      ampEnv: um.Adsr()
    },
    conns: [
      'noteIn > osc.freq > filter > amp > out',
      'filterEnv > filter.detune',
      'ampEnv > amp.gain'
    ]
  })
}

Subtract3.Voice = Voice

module.exports = Subtract3
