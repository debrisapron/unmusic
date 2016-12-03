'use strict'
let _ = require('lodash')

let composition = require('./src/composition')
let Player = require('./src/Player')
let nativeNodes = require('./src/nodes/native')
let Patch = require('./src/nodes/Patch')
let Synth = require('./src/nodes/Synth')
let route = require('./src/route')

// // Synths
// let subtract3 = require('./audio/synths/subtract-3')

let getDefaultAudioContext = () => {
  return window.__umAudioContext ||
    (window.__umAudioContext = new AudioContext())
}

let Unmusic = (audioContext = getDefaultAudioContext()) => {
  let player = Player(audioContext)

  let um = {
    audioContext,
    master: audioContext.destination,

    mix: composition.mix,
    seq: composition.seq,
    setDest: composition.setDest,

    play: player.play,
    stop: player.stop,

    route: route,

    // patch: patcher.patch(audioContext),
    // adsr: nodes.adsr(audioContext),
    Biquad: nativeNodes.Biquad(audioContext),
    BuffSrc: nativeNodes.BuffSrc(audioContext),
    Delay: nativeNodes.Delay(audioContext),
    Gain: nativeNodes.Gain(audioContext),
    Osc: nativeNodes.Osc(audioContext),
    // signal: nodes.signal(audioContext),
    // synth: synthNode(um)
  }

  return um
}

module.exports = Unmusic
