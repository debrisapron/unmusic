let fs = require('fs')
let WaaNode = require('./support/WaaNode')

let fileCache = {}

let audioBufferFromFile = (ac, file) => {
  if (fileCache[file]) return fileCache[file]

  let resolve
  let reject
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  fileCache[file] = promise

  fs.readFile(file, (err, buffer) => {
    if (err) reject(err)
    let arrayBuffer = buffer.buffer
    ac.decodeAudioData(arrayBuffer)
      .then((audioBuffer) => resolve(audioBuffer))
      .catch((err) => reject(err))
  })

  return promise
}

let sample = WaaNode({
  out: true,
  audioParams: ['playbackRate', 'detune']
  factory: (ac, params) => {
    let audioBuffer = fileCache[params.file]
    let node = ac.createBufferSource()
    node.buffer = audioBuffer
    return node
  },
  prepare: (ac, params) => {
    return audioBufferFromFile(ac, params.file)
  }
})

module.exports = adsr
