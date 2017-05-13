let Envelope = require('envelope-generator')

let adsr = {
  out: true,
  factory: (ac, params) => new Envelope(ac, params),
  finish: (node, time, andStop = true) => {
    node.release(time)
    let fTime = node.getReleaseCompleteTime()
    if (andStop) node.stop(fTime)
    return fTime
  }
}

let biquad = {
  in: true,
  out: true,
  audioParams: ['frequency', 'detune', 'Q', 'gain'],
  factory: (ac) => ac.createBiquadFilter()
}

let gain = {
  in: true,
  out: true,
  audioParams: ['gain'],
  factory: (ac) => ac.createGain()
}

let osc = {
  out: true,
  audioParams: ['frequency', 'detune'],
  factory: (ac) => ac.createOscillator()
}

module.exports = { adsr, biquad, gain, osc }
