let fs = require('fs')
let path = require('path')

// TODO Move to um.cache
// TODO urls
let fileCache = {}

let audioBufferFromFile = (ac, file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, buffer) => {
      if (err) reject(err)
      let arrayBuffer = buffer.buffer
      ac.decodeAudioData(arrayBuffer)
        .then((audioBuffer) => resolve(audioBuffer))
        .catch((err) => reject(err))
    })
  })
}

// Exports

let loadFile = (um, filename) => {
  if (fileCache[filename]) return Promise.resolve(fileCache[filename])
  let filePath = filename
  if (um.config.cwd) filePath = path.resolve(um.config.cwd, filename)
  let promiseOfAudioBuffer = audioBufferFromFile(um.ac, filePath)
  promiseOfAudioBuffer.then((audioBuffer) => fileCache[filename] = audioBuffer)
  fileCache[filename] = promiseOfAudioBuffer
  return promiseOfAudioBuffer
}

let getLoadedFile = (filename) => {
  let audioBuffer = fileCache[filename]
  if (!audioBuffer || audioBuffer.then) {
    throw new Error(
      'File has not been loaded or has not finished loading. Please check the prepare function ' +
      'of the node you are trying to create as it may contain an error.'
    )
  }
  return audioBuffer
}

module.exports = { loadFile, getLoadedFile }
