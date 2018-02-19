import _ from 'lodash/fp'

let INSTRUMENTS = [
  'AMSynth',
  'DuoSynth',
  'FMSynth',
  'MembraneSynth',
  'MetalSynth',
  'MonoSynth',
  'NoiseSynth',
  'PluckSynth',
  'Sampler'
]

function Instrument(Tone, instrName) {
  return (params) => (action) => {
    let instrument = new Tone[instrName](params).toMaster()
    let note = action.payload.nn || 69
    let velocity = (action.payload.vel || 80) / 127
    let deadline = action.meta.deadline
    instrument.triggerAttack(note, deadline, velocity)
    return (deadline) => instrument.triggerRelease(deadline)
  }
}

function ToneInstruments(Tone) {
  let instruments = {}
  INSTRUMENTS.forEach((instrName) => {
    instruments[_.camelCase(instrName)] = Instrument(Tone, instrName)
  })
  return instruments
}

export default ToneInstruments
