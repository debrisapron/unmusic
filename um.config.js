module.exports = (um) => {
  um.useNode('oneOsc', {
    out: 'filter',
    freqIn: 'osc.freq',
    vgraph: {
      osc: { type: 'osc' },
      filter: { type: 'biquad', params: { type: 'lowpass' } },
      env: { type: 'adsr', connect: 'filter.frequency' }
    }
  })
}
