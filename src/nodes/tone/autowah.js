module.exports = {
  in: true,
  out: true,
  audioParams: ['gain', 'Q', 'wet'],
  defaultParam: 'baseFrequency',
  factory: (um) => new um.Tone.AutoWah()
}
