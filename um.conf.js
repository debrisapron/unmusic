module.exports = (um) => {
  um.useNode('oneOsc', {
    out: 'amp',
    freqIn: 'osc.frequency',
    vgraph: {
      osc: { type: 'osc' },
      filter: { type: 'biquad', params: { type: 'lowpass' } },
      amp: { type: 'gain', params: { gain: 0 } },
      filterEnv: { type: 'adsr' },
      filterEnvAmt: { type: 'gain', params: { gain: '9600' }, connect: 'filter.detune' },
      ampEnv: { type: 'adsr', connect: 'amp.gain' }
    }
  })
}
