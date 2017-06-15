module.exports = {
  in: true,
  out: true,
  audioParams: ['wet'],
  defaultParam: 'distortion',
  factory: (um) => new um.Tone.Distortion()
}
