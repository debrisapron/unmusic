let _ = require('lodash')

let loop = require('./composers/loop')
let mix = require('./composers/mix')
let route = require('./composers/route')
let seq = require('./composers/seq')

let Player = require('./Player')
let nativeNodes = require('./nodes/native')
let Patch = require('./nodes/Patch')
// let Synth = require('./src/nodes/Synth')

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

    loop, mix, route, seq,

    play: player.play,
    stop: player.stop,

    patch: Patch(audioContext),
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
