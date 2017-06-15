module.exports = {
  in: true,
  out: true,
  audioParams: ['delayTime'],
  defaultParam: 'delayTime',
  factory: (um, params) => um.ac.createDelay(params.maxDelayTime || 1)
}
