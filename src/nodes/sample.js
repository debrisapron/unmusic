let path = require('path')
let h = require('./support/helpers')
let WaaNode = require('./support/WaaNode')

// TODO Move to um.cache
let fileCache = {}

let sample = WaaNode({
  out: true,
  audioParams: ['playbackRate', 'detune'],
  factory: (um, params) => {
    let node = um.ac.createBufferSource()
    fileCache[params.file].then((audioBuffer) => node.buffer = audioBuffer)
    return node
  },
  prepare: (um, params) => {
    let file = params.file
    if (!file) return Promise.resolve()
    if (fileCache[file]) return fileCache[file]
    let filePath = file
    if (um.config.cwd) filePath = path.resolve(um.config.cwd, file)
    let promiseOfAudioBuffer = h.audioBufferFromFile(um.ac, filePath)
    fileCache[file] = promiseOfAudioBuffer
    return promiseOfAudioBuffer
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
