let _ = require('lodash/fp')
let csoundApi = require('csound-api')
let midi = require('./midi')

const DEFAULT_SETTINGS = {
  '0dbfs': 1,
  sr: 44100,
  nchnls: 2
}

const MIDI_INSTR = `
  instr midi
    istatus init p4
    ichan init p5
    idata1 init p6
    idata2 init p7
    midiout istatus, ichan, idata1, idata2
    turnoff
  endin`

let csound = null

let teardown = () => {
  if (!csound) return
  csoundApi.Destroy(csound)
  csound = null
}

let getOrchestraHeader = (config) => {
  const settings = _.merge(
    DEFAULT_SETTINGS,
    _.pick(Object.keys(DEFAULT_SETTINGS), config)
  )
  const settingsStr = Object.keys(settings)
    .map((key) => `${key} = ${settings[key]}\n`)
    .join('')
  return settingsStr + MIDI_INSTR
}

////////////////////////////////////////////////////////////////////////////////

let play = (orch, score, config) => {
  let header = getOrchestraHeader(config)
  let midiOutId = 0 //midi.getOutputId(config && config.midiOut)

  if (csound) stop()
  csound = csoundApi.Create()
  csoundApi.SetOption(csound, '--output=dac')
  if (midiOutId != null) {
    csoundApi.SetOption(csound, '--iobufsamps=128')
    csoundApi.SetOption(csound, `-Q${midiOutId}`)
  }
  orch = header + (orch || '')
  console.log(orch)
  csoundApi.CompileOrc(csound, orch)
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
