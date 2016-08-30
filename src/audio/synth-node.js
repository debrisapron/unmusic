'use strict'

let _ = require('lodash')

let twelveTet = (nn) => {
  return nn && Math.pow(2, ((nn - 69) / 12)) * 440
}

let synth = _.curry((um, defaultParams) => {
  // TODO Input (e.g. vocoder)
  // TODO Expose (creates an input which goes to dest on every voice)
  // TODO Set (goes to all voices)
  // TODO Tunings!!!

  let output = um.gain()
  let isConnected = false

  let play = (when, params) => {
    params = _.merge({}, defaultParams, params)
    let voice = params.makeVoice(um)
    voice.set(params)
    voice.connect(output)
    if (voice.noteInput) {
      let nn = params.noteNumber || params.nn
      if (nn) {
        let freqSignal = p.signal(twelveTet(nn))
        freqSignal.connect(voice.noteInput)
      }
    }
    if (!isConnected) { connect(p.master) }
    voice.start(when)
    return voice
  }

  let connect = (dest) => {
    isConnected = true
    return output.connect(dest)
  }

  // let set = ()

  return { connect, play }
})

module.exports = synth
