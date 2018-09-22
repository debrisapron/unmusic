import WebMidi from 'webmidi'

let midiEnabled

function getMidiOut(device) {
  if (!WebMidi.outputs.length) {
    throw new Error('No MIDI output found.')
  }
  if (!isNaN(device)) {
    if (WebMidi.outputs.length <= device) {
      throw new Error('MIDI output index not found.')
    }
    return WebMidi.outputs[device]
  }
  return WebMidi.getOutputByName(device)
}

export function init() {
  if (midiEnabled) { return midiEnabled }
  midiEnabled = new Promise((resolve, reject) => {
    WebMidi.enable((err) => {
      if (err) { reject(err) }
      resolve()
    })
  })
    .then(() => {
      console.log('MIDI enabled successfully.')
      console.log('Available outputs:')
      console.log(WebMidi.outputs)
    })
    .catch((err) => {
      console.log('MIDI could not be enabled.')
      console.error(err)
    })
  return midiEnabled
}

export function playNote({ cha, dev, nn, time, vel }) {
  return getMidiOut(dev).playNote(nn, cha, {
    time,
    velocity: vel,
    rawVelocity: true,
  })
}

export function stopNote({ cha, dev, nn, time }) {
  return getMidiOut(dev).stopNote(nn, cha, { time })
}
