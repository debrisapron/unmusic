module.exports = {
  in: true,
  out: true,
  audioParams: ['frequency', 'wet'],
  defaultParam: 'frequency',
  factory: (um) => new um.Tone.Chorus()
}
