let fs = require('fs')

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

module.exports = { audioBufferFromFile }
