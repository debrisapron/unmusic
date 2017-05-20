require('./um.conf.js')(um) // TODO um-atom should require this automagically

let saw = um.oneOsc({
  osc: { detune: 600, type: 'sawtooth' },
  filter: { frequency: 500, Q: 5 },
  filterEnv: { attackTime: 0.2, releaseTime: 0.2 },
  ampEnv: { attackTime: 0.1, decayTime: 0.5, releaseTime: 0.5 }
})

return saw('/16 C E G')
