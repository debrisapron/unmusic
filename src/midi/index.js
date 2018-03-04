import * as helpers from './helpers'

export function Out({ device = 0, channel = 'all' } = {}) {
  let midiOut

  async function prepare() {
    await helpers.enable()
    midiOut = helpers.MidiOut(device)
  }

  function handle(action) {
    let note = action.payload.nn || 69
    let cha = action.payload.cha || channel
    let vel = action.payload.vel || 80
    let time = action.meta.time
    midiOut.playNote(note, cha, {
      time,
      velocity: vel,
      rawVelocity: true,
    })
    let stopCb = (time) => midiOut.stopNote(note, cha, { time })
    return _.merge(action, { meta: { stopCbs: [stopCb] } })
  }

  return { prepare, handle }
}
