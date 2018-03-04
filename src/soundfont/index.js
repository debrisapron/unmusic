import _ from 'lodash/fp'
import { instrument as createInstrument } from 'soundfont-player'
import musyngkite from 'soundfont-player/musyngkite.json'

function Instrument(name) {
  let _player

  async function prepare({ audioContext }) {
    // Make sure subsequent invocations of this function don't reload font.
    if (_player) { return }
    _player = '__LOADING__'
    _player = await createInstrument(audioContext, name)

    // Override player's destination, we will do the patching ourselves.
    _player.out.disconnect(audioContext.destination)
  }

  return (params = {}) => {

    function handle(action) {
      let note = action.payload.nn || 69
      let gain = ((action.payload.vel || 80) / 127) * (params.gain || 1)
      let time = action.meta.time
      let node = _player.play(note, time, _.merge(params, { gain }))
      let stopCb = (time) => node.stop(time)
      return _.merge(action, { meta: {
        stopCbs: [stopCb],
        outputNode: node
      } })
    }

    return { prepare, handle }
  }
}

let soundfont = {}
musyngkite.forEach((name) => {
  soundfont[_.upperFirst(_.camelCase(name))] = Instrument(name)
})

export default soundfont
