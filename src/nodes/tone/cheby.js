module.exports = {
  in: true,
  out: true,
  audioParams: ['wet'],
  defaultParam: 'order',
  factory: (um) => new um.Tone.Chebyshev()
}
