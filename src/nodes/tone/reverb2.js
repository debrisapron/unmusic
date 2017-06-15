module.exports = {
  in: true,
  out: true,
  audioParams: ['roomSize', 'wet'],
  defaultParam: 'roomSize',
  factory: (um) => new um.Tone.JCReverb()
}
