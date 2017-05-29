let h = require('./support/helpers')
let WaaNode = require('./support/WaaNode')

let sample = WaaNode({
  out: true,
  audioParams: ['playbackRate', 'detune'],
  factory: (um, params) => {
    let node = um.ac.createBufferSource()
    node.buffer = h.getLoadedFile(params.file)
    return node
  },
  prepare: (um, params) => {
    if (params.file) return h.loadFile(um, params.file)
    throw new Error('sample node must have file param specified.')
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