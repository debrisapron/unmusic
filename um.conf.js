module.exports = (um) => {
  um.useNode('oneOsc', {
    out: 'amp',
    freqIn: 'osc.frequency',
    vgraph: {
      osc: { type: 'osc' },
      filter: { type: 'biquad', params: { type: 'lowpass' } },
      amp: { type: 'gain', params: { gain: 0 } },
      filterEnv: { type: 'adsr', params: { attackTime: 0.2, releaseTime: 0.2 } },
      filterEnvAmt: { type: 'gain', params: { gain: '9600' }, connect: 'filter.detune' },
      ampEnv: { type: 'adsr', params: { attackTime: 0.1, decayTime: 0.5, releaseTime: 1 }, connect: 'amp.gain' }
    }
  })
}
