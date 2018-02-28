import _ from 'lodash/fp'
import { instrument as createInstrument } from 'soundfont-player'
import musyngkite from 'soundfont-player/musyngkite.json'

function Instrument(audioContext, name) {
  let player

  async function prepare() {
    player = await createInstrument(audioContext, name)

    // Override player's destination, we will do the patching ourselves.
    player.out.disconnect(audioContext.destination)
  }

  return (params = {}) => {

    function start(action) {
      let note = action.payload.nn || 69
      let gain = ((action.payload.vel || 80) / 127) * (params.gain || 1)
      let deadline = action.meta.deadline
      let destination = action.meta.destination || audioContext.destination
      let node = player.play(note, deadline, _.merge(params, { gain }))
      node.connect(destination)
      return (deadline) => node.stop(deadline)
    }

    return { prepare, start, id: `sf-${name}` }
  }
}

function Soundfont(audioContext) {
  let instruments = {}
  musyngkite.forEach((instrName) => {
    instruments[_.camelCase(instrName)] = Instrument(audioContext, instrName)
  })
  return instruments
}

export default Soundfont
