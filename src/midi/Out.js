import * as helpers from './helpers'

export default function Out({ device = 0, channel = 'all' } = {}) {

  async function prepare() {
    await helpers.init()
  }

  function handle(action) {
    let dev = action.payload.dev || device
    let nn = action.payload.nn || 69
    let cha = action.payload.cha || channel
    let vel = action.payload.vel || 80
    let time = action.meta.time
    helpers.playNote({ cha, dev, nn, time, vel })
    let stopCb = (time) => helpers.stopNote({ nn, cha, time })
    return _.merge(action, { meta: { stopCbs: [stopCb] } })
  }

  return { prepare, handle }
}
