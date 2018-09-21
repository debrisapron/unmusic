let csoundApi = require('csound-api')

let play = (orch, score) => {
  let csound = csoundApi.Create()

  csoundApi.SetOption(csound, '--output=dac')
  csoundApi.CompileOrc(csound, '0dbfs = 1\n' + orch)
  csoundApi.ReadScore(score)
  if (csoundApi.Start(csound) === csoundApi.SUCCESS) csoundApi.Perform(csound)
  csoundApi.Destroy(csound)
}

module.exports = { play }
