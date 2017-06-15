module.exports = {
  in: true,
  out: true,
  audioParams: ['delayTime', 'feedback', 'wet'],
  defaultParam: 'delayTime',
  factory: (um) => new um.Tone.PingPongDelay()
}
