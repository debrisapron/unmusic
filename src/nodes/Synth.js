let _ = require('lodash/fp')

let twelveTet = (nn) => {
  return nn && Math.pow(2, ((nn - 69) / 12)) * 440
}

let Synth = _.curry((um, defaultParams) => {
  // TODO Input (e.g. vocoder)
  // TODO Expose (creates an input which goes to dest on every voice)
  // TODO Set (goes to all voices)
  // TODO Tunings!!!

  let output = um.Gain()
  let isConnected = false

  let play = (when, params) => {
    params = _.merge(defaultParams, params)
    let voice = params.Voice(um)
    voice.set(params)
    voice.connect(output)
    if (voice.noteInput) {
      let nn = params.noteNumber || params.nn
      if (nn) {
        let freqSignal = um.Signal(twelveTet(nn))
        freqSignal.connect(voice.noteInput)
      }
    }
    if (!isConnected) { connect(um.master) }
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

module.exports = Synth
