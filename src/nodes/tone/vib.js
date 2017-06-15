module.exports = {
  in: true,
  out: true,
  audioParams: ['frequency', 'depth', 'wet'],
  defaultParam: 'frequency',
  factory: (um) => new um.Tone.Vibrato()
}
