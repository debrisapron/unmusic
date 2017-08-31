let _ = require('lodash/fp')
let path = require('path')

module.exports = { expr }

// function deps({ config, params }) {
//   return filePath(config, params)
// }

function expr({ config, params }) {
  let rate = params.nn ? twelveTet(params.nn, 1) : 1
  let f = filePath(config, params)
  return `Pan2.ar(PlayBuf.ar(numChannels: 1, bufnum: b(${f}).bufnum, rate: ${rate}), 0)`
}

////////////////////////////////////////////////////////////////////////////////

function filePath(config, params) {
  return path.join(config.cwd || '', config.audio.pathPrefix || '', params.file)
}

function twelveTet(nn, middleA = 440) {
  return nn && Math.pow(2, ((nn - 69) / 12)) * middleA
}
