let Envelope = require('envelope-generator')

module.exports = {
  out: true,
  configure: false,
  factory: (um, params) => new Envelope(um.ac, params),
  finish: (node, time) => {
    node.release(time)
    return node.getReleaseCompleteTime()
  }
}
