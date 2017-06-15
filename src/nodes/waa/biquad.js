module.exports = {
  in: true,
  out: true,
  audioParams: ['frequency', 'detune', 'Q', 'gain'],
  defaultParam: 'frequency',
  factory: (um) => um.ac.createBiquadFilter()
}
