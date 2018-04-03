import Instrument from './Instrument'

export default function ThreeOsc(P, config) {
  return Instrument(P, Voice)

  function Voice(frequency) {
    return P({
      osc1: P.Osc({ frequency, type: 'sawtooth' }),
      osc2: P.Osc({ frequency, type: 'sawtooth', detune: 10 }),
      osc3: P.Osc({ frequency, type: 'square', octave: -1 }),
      filter: P.Lpf(40),
      filterFb: P.Gain(0.3),
      filterEnv: P.Adsr({ a: 0.1, d: 0.2, s: 0.6, r: 1, level: 0.7 }),
      amp: P.Gain(0),
      ampEnv: P.Adsr({ a: 0.01, r: 1.5 })
    },
      'osc1 > filter',
      'osc2 > filter',
      'osc3 > filter',
      'filter > amp > out',
      'filter > filterFb > filter',
      'filterEnv > filter.frequencyCv',
      'ampEnv > amp.gainCv'
    ).set(config)
  }
}
