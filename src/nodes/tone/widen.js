module.exports = {
  in: true,
  out: true,
  audioParams: ['width', 'wet'],
  defaultParam: 'width',
  factory: (um) => new um.Tone.StereoWidener()
}
