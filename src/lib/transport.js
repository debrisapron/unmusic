'use strict'
let umScoreFromJs = require('./umScoreFromJs')

let isPlaying = false

let play = (js) => {
  if (isPlaying) return
  try {
    let umScore = umScoreFromJs(js)
    console.log(umScore)
    if (!umScore) return
    isPlaying = true
  } catch (err) {
    isPlaying = false
    throw err
  }
}

let stop = () => {
  if (!isPlaying) return
  isPlaying = false
}

let togglePlayback = (js) => {
  isPlaying ? stop() : play(js)
}

module.exports = { togglePlayback }
