let Envelope = require('envelope-generator')

module.exports = {
  out: true,
  configure: false,
  factory: (um, params) => new Envelope(um.ac, params),
  finish: (node, time, andStop = true) => {
    node.release(time)
    let fTime = node.getReleaseCompleteTime()
    if (andStop) node.stop(fTime)
    return fTime
  }
}
