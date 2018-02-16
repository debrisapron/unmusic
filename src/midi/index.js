import * as helpers from './helpers'

export function out({ dev = 0, cha = 'all' } = {}) {
  let midiOut

  function prepare() {
    return helpers.enable()
  }

  function handle(action) {
    midiOut = midiOut || helpers.MidiOut(dev)
    let note = action.payload.nn || 69
    let channel = action.payload.cha || cha
    let velocity = action.payload.vel || 80
    let deadline = action.meta.deadline
    midiOut.playNote(note, channel, {
      velocity,
      rawVelocity: true,
      time: deadline
    })
    return (deadline) => midiOut.stopNote(note, channel, { time: deadline })
  }

  return { prepare, handle, id: 'midi' }
}
