let Envelope = require('envelope-generator')

let adsr = {
  out: true,
  factory: (um, params) => new Envelope(um.ac, params),
  finish: (node, time, andStop = true) => {
    node.release(time)
    let fTime = node.getReleaseCompleteTime()
    if (andStop) node.stop(fTime)
    return fTime
  }
}

module.exports = adsr
