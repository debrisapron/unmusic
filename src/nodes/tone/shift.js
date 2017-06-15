module.exports = {
  in: true,
  out: true,
  audioParams: ['delayTime', 'feedback', 'wet'],
  defaultParam: 'pitch',
  factory: (um) => new um.Tone.PitchShift()
}
