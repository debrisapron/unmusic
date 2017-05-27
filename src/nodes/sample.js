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
  audioParams: ['playbackRate', 'detune'],
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

module.exports = sample

////////////////////////////////////////////////////////////////////////////////

// Fiddly to test right now
// if (process.env.TEST === 'SLOW') {
//   let ac = window.__umAudioContext || (window.__umAudioContext = new window.AudioContext())
//
//   describe('sample node', () => {
//
//     it('can get an audio buffer from a local file', async () => {
//       let expAudioBuffer = {
//         length: 14400,
//         duration: 0.32653061224489793,
//         sampleRate: 44100,
//         numberOfChannels: 1
//       }
//       let clap808 = path.resolve(__dirname, '..', '..', 'testSupport', 'clap808.wav')
//       let audioBuffer = await audioBufferFromFile(ac, clap808)
//       expect(audioBuffer).to.containSubset(expAudioBuffer)
//     })
//   })
// }
