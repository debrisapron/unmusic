import * as helpers from './helpers'

export function out({ device = 0, channel = 'all' } = {}) {
  let midiOut

  async function prepare() {
    await helpers.enable()
    midiOut = helpers.MidiOut(device)
  }

  function handle(action) {
    let note = action.payload.nn || 69
    let cha = action.payload.cha || channel
    let vel = action.payload.vel || 80
    let deadline = action.meta.deadline
    midiOut.playNote(note, cha, {
      velocity: vel,
      rawVelocity: true,
      time: deadline
    })
    return (deadline) => midiOut.stopNote(note, cha, { time: deadline })
  }

  return { prepare, handle }
}
