module.exports = {
  in: true,
  out: true,
  audioParams: ['roomSize', 'dampening', 'wet'],
  defaultParam: 'roomSize',
  factory: (um) => new um.Tone.Freeverb()
}
