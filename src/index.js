'use strict'

let _ = require('lodash')

// Control
let operators = require('./control/operators')
let transformers = require('./control/transformers')
let Player = require('./control/player')

// Audio
let nodes = require('./audio/nodes')
let patcher = require('./audio/patcher')
let synthNode = require('./audio/synth-node')

// Synths
let subtract3 = require('./audio/synths/subtract-3')

let getDefaultAudioContext = () => {
  return window.__umAudioContext ||
    (window.__umAudioContext = new window.AudioContext())
}

let init = (audioContext = getDefaultAudioContext()) => {
  let um = {}
  let player = Player(audioContext)

  return _.merge(um, {
    // General
    audioContext,

    // Control
    mix: operators.mix,
    seq: operators.seq,
    route: transformers.route,
    play: player.play,
    stop: player.stop,

    // Audio
    master: audioContext.destination,
    patch: patcher.patch(audioContext),
    adsr: nodes.adsr(audioContext),
    biquad: nodes.biquad(audioContext),
    buffSrc: nodes.buffSrc(audioContext),
    gain: nodes.gain(audioContext),
    osc: nodes.osc(audioContext),
    signal: nodes.signal(audioContext),
    synth: synthNode(um),

    // Synths
    synths: {
      subtract3: subtract3(um)
    }
  })
}

module.exports = init
