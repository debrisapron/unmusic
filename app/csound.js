let csoundApi = require('csound-api')

let csound = null

let play = (orch, score) => {
  if (csound) stop()
  csound = csoundApi.Create()

  csoundApi.SetOption(csound, '--output=dac')
  csoundApi.CompileOrc(csound, '0dbfs = 1\n' + orch)
  csoundApi.ReadScore(csound, score)
  if (csoundApi.Start(csound) !== csoundApi.SUCCESS) {
    console.error('There was an error starting csound!')
    csoundApi.Destroy(csound)
    return
  }
  csoundApi.PerformAsync(csound, () => csoundApi.Destroy(csound))
}

let stop = () => {
  if (!csound) return
  csoundApi.Stop(csound)
  csound = null
}

module.exports = { play, stop }
