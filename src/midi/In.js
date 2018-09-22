import * as helpers from './helpers'

// Pseudocode
export default function In({ device, channel = 'all' } = {}) {

  async function prepare() {
    await helpers.init()
  }

  function handle(action) {
    if (action.type === 'INIT') {
      helpers.onBlah((data) => onMidiIn(action.payload.handlers, data))
    }
  }

  function onMidiIn(handlers, data) {
    let action = { type: 'NOTE', payload: { data, handlers } }
    Player.dispatch(data.time, action)
  }

  return { prepare, handle }
}
