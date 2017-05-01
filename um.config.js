module.exports = (um) => {
  um.useNode('oneOsc', {
    outputs: { main: 'filter' },
    freqInputs: ['osc.freq'],
    vgraph: {
      osc: { type: 'osc' }, // freqIn: 'freq' // implicit for osc nodes (but not lfo nodes)
      filter: { type: 'biquad', params: { type: 'lowpass' } }, // conns: { main: 'out' } // implicit for last node with a main out
      env: { type: 'adsr', conns: { main: 'filter.freq' } }
    }
  })
}
