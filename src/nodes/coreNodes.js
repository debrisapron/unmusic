let Envelope = require('envelope-generator')

let adsr = {
  outputs: ['main'],
  factory: (ac) => new Envelope(ac),
  finish: (node, time, andStop = true) => {
    node.release(time)
    let fTime = node.getReleaseCompleteTime()
    if (andStop) node.stop(fTime)
    return fTime
  }
}

let biquad = {
  inputs: ['main'],
  outputs: ['main'],
  audioParams: ['frequency', 'detune', 'Q', 'gain'],
  factory: (ac) => ac.createBiquadFilter()
}

let osc = {
  outputs: ['main'],
  audioParams: ['frequency', 'detune'],
  factory: (ac) => ac.createOscillator()
}

module.exports = { adsr, biquad, osc }
