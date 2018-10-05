'use strict'
let umScoreFromJs = require('./umScoreFromJs')
let csScoreFromUmScore = require('./csScoreFromUmScore')
let csound = require('./csound')

let play = (js) => {
  let umScore = umScoreFromJs(js)
  console.log(umScore)
  if (!(umScore && umScore.orch)) {
    return
  }
  let csScore = csScoreFromUmScore(umScore)
  if (!csScore) {
    return
  }
  console.info('Compiling to csound score...')
  console.info(csScore)
  csound.play(umScore.orch, csScore)
}

let stop = () => {
  csound.stop()
}

module.exports = { play, stop }
