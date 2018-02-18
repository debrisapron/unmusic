import _ from 'lodash/fp'
import { instrument as createInstrument } from 'soundfont-player'
import musyngkite from 'soundfont-player/musyngkite.json'

function Instrument(audioContext, name) {
  let player

  async function prepare() {
    player = await createInstrument(audioContext, name)
  }

  function handle(action) {
    let nn = action.payload.nn || 69
    let vel = action.payload.vel || 80
    let deadline = action.meta.deadline
    let node = player.play(nn, deadline, { gain: vel / 127 })
    return (deadline) => node.stop(deadline)
  }

  return { prepare, handle, id: `sf-${name}` }
}

function Soundfont(audioContext) {
  let instruments = {}
  musyngkite.forEach((instrName) => {
    instruments[_.camelCase(instrName)] = Instrument(audioContext, instrName)
  })
  return instruments
}

export default Soundfont
