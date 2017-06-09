let fs = require('fs')
let path = require('path')
let loadAudio = require('audio-loader')

// TODO Move to um.cache
let fileCache = {}
let urlCache = {}

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

let audioBufferFromUrl = (ac, url) => {
  return loadAudio(url, { context: ac })
}

// Exports

let loadFile = (um, filename) => {
  if (fileCache[filename]) return Promise.resolve(fileCache[filename])
  filePath = path.join(um.__config.cwd || '', um.__config.audio.pathPrefix || '', filename)
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

let loadUrl = (um, url) => {
  if (urlCache[url]) return Promise.resolve(urlCache[url])
  let promiseOfAudioBuffer = audioBufferFromUrl(um.ac, url)
  promiseOfAudioBuffer.then((audioBuffer) => urlCache[url] = audioBuffer)
  urlCache[url] = promiseOfAudioBuffer
  return promiseOfAudioBuffer
}

let getLoadedUrl = (url) => {
  let audioBuffer = urlCache[url]
  if (!audioBuffer || audioBuffer.then) {
    throw new Error(
      'URL has not been loaded or has not finished loading. Please check the prepare function ' +
      'of the node you are trying to create as it may contain an error.'
    )
  }
  return audioBuffer
}

module.exports = { loadFile, getLoadedFile, loadUrl, getLoadedUrl }

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {
  let ac = window.__umAudioContext || (window.__umAudioContext = new window.AudioContext())

  describe('node helpers', () => {

    it('can get an audio buffer from a local file', () => {
      let mockUm = {
        ac,
        __config: {
          cwd: path.resolve(__dirname, '..', '..', '..'),
          audio: { pathPrefix: 'testSupport/' }
        }
      }
      let expAudioBuffer = {
        length: 14400,
        duration: 0.32653061224489793,
        sampleRate: 44100,
        numberOfChannels: 1
      }
      return loadFile(mockUm, 'clap808.wav').then(() => {
        expect(getLoadedFile('clap808.wav')).to.containSubset(expAudioBuffer)
      })
    })
  })
}
