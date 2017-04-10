let _ = require('lodash')

let loop = require('./composers/loop')
let mix = require('./composers/mix')
let part = require('./composers/part')
let seq = require('./composers/seq')

let Sequencer = require('./Sequencer')
let Player = require('./Player')
// let NativeNodes = require('./nodes/NativeNodes')
// let Patch = require('./nodes/Patch')
// let Synth = require('./src/nodes/Synth')

// // Synths
// let subtract3 = require('./audio/synths/subtract-3')

let getDefaultAudioContext = () => {
  return window.__umAudioContext ||
    (window.__umAudioContext = new AudioContext())
}

let Unmusic = (audioContext = getDefaultAudioContext()) => {
  let sequencer = Sequencer(audioContext)
  let player = Player(sequencer)
  // let nativeNodes = NativeNodes(audioContext)

  let um = {
    audioContext,
    master: audioContext.destination,

    loop, mix, part, seq,

    play: player.play,
    stop: player.stop,

    // patch: Patch(audioContext),
    // adsr: nodes.adsr(audioContext),
    // Biquad: nativeNodes.Biquad,
    // BuffSrc: nativeNodes.BuffSrc,
    // Delay: nativeNodes.Delay,
    // Gain: nativeNodes.Gain,
    // Osc: nativeNodes.Osc,
    // signal: nodes.signal(audioContext),
    // synth: synthNode(um)
  }

  return um
}

module.exports = Unmusic
