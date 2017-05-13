require('./um.config.js')(um) // TODO um-atom should require this automagically

let saw = um.oneOsc({
  osc: { detune: 600, type: 'sawtooth' },
  filter: { frequency: 1000, Q: 5 },
  env: { attackTime: 0.1, releaseTime: 0.1 }
})

return saw('1/1 C')
