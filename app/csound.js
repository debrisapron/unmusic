let _ = require('lodash/fp')
let csoundApi = require('csound-api')

let DEFAULT_CONFIG = {
  '0dbfs': 1,
  sr: 44100,
  nchnls: 2
}

let csound = null

let teardown = () => {
  if (!csound) return
  csoundApi.Destroy(csound)
  csound = null
}

let play = (orch, score) => {
  const config = _.merge(
    DEFAULT_CONFIG,
    _.pick(Object.keys(DEFAULT_CONFIG), score.config)
  )
  const header = Object.keys(config)
    .map((key) => `${key} = ${config[key]}\n`)
    .join('')

  if (csound) stop()
  csound = csoundApi.Create()
  csoundApi.SetOption(csound, '--output=dac')
  csoundApi.CompileOrc(csound, header + orch)
  csoundApi.ReadScore(csound, score)

  if (csoundApi.Start(csound) !== csoundApi.SUCCESS) {
    console.error('There was an error starting csound!')
    teardown()
    return
  }

  csoundApi.PerformAsync(csound, teardown)
}

let stop = () => {
  if (!csound) return
  csoundApi.Stop(csound)
}

module.exports = { play, stop }
