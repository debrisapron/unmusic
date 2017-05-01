require('./um.config.js') // TODO um-atom should require this automagically

let saw = um.oneOsc({
  osc: { detune: 600, type: 'sawtooth' },
  filter: { frequency: 220, Q: 5 },
  env: { attack: 0.1, release: 0.1 }
})

return saw('/16 C E G B')
