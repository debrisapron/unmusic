import _ from 'lodash/fp'
import { instrument as createInstrument } from 'soundfont-player'
import musyngkite from 'soundfont-player/musyngkite.json'

function Instrument(name) {
  return (params = {}) => {
    let _player

    async function prepare({ audioContext }) {
      // Make sure subsequent invocations of this function don't reload font.
      if (_player) { return }
      _player = '__LOADING__'
      let outNode = audioContext.createGain()
      _player = await createInstrument(audioContext, name, {
        soundfont: 'MusyngKite',
        destination: outNode
      })
    }

    function handle(action) {
      let note = action.payload.nn || 69
      let gain = ((action.payload.vel || 80) / 127) * (params.gain || 1)
      let time = action.meta.time
      let node = _player.play(note, time, _.merge(params, { gain }))
      let stopCb = (time) => node.stop(time)
      return _.merge(action, { meta: {
        stopCbs: [stopCb],
        outputNode: _player.out
      } })
    }

    return { prepare, handle }
  }
}

export default musyngkite.reduce((obj, name) => {
  obj[_.upperFirst(_.camelCase(name))] = Instrument(name)
  return obj
}, {})
