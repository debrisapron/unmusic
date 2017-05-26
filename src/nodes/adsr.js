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

module.exports = adsr
