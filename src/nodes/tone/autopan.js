module.exports = {
  in: true,
  out: true,
  audioParams: ['depth', 'frequency', 'wet'],
  defaultParam: 'frequency',
  factory: (um) => new um.Tone.AutoPanner()
}
