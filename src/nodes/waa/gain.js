module.exports = {
  in: true,
  out: true,
  audioParams: ['gain'],
  defaultParam: 'gain',
  factory: (um) => um.ac.createGain()
}
