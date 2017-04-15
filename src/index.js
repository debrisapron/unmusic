let _ = require('lodash')

let loop = require('./scoring/loop')
let mix = require('./scoring/mix')
let seq = require('./scoring/seq')

let Sequencer = require('./Sequencer')
let Player = require('./Player')

let getDefaultAudioContext = () => {
  return window.__umAudioContext ||
    (window.__umAudioContext = new AudioContext())
}

let Unmusic = (audioContext = getDefaultAudioContext()) => {
  let sequencer = Sequencer(audioContext)
  let player = Player(sequencer)

  let um = {
    audioContext,
    master: audioContext.destination,

    loop, mix, seq,

    play: player.play,
    stop: player.stop
  }

  return um
}

module.exports = Unmusic
