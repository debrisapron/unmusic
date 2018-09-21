'use strict'
let umScoreFromJs = require('./umScoreFromJs')
let csScoreFromUmScore = require('./csScoreFromUmScore')
let csound = require('./csound')

let playJs = (js) => {
  let umScore = umScoreFromJs(js)
  if (!(umScore && umScore.orch)) {
    return
  }
  let csScore = csScoreFromUmScore(umScore)
  if (!csScore) {
    return
  }
  console.info('EVALUATING...')
  console.info({
    'um score': umScore,
    'csound score': csScore
  })
  csound.play(umScore.orch, csScore)
}

module.exports = playJs
