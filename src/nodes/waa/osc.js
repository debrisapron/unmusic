module.exports =  {
  out: true,
  audioParams: ['frequency', 'detune'],
  defaultParam: 'frequency',
  factory: (um) => um.ac.createOscillator()
}
