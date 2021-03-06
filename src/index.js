import 'babel-polyfill' // BOOOOOO
import { merge as mergeInPlace } from 'lodash'
import Partch from 'partch'
import * as core from './core'
import evalUmlang from './core/umlang/eval'
import * as effects from './effects'
import Instruments from './instruments'
import * as midi from './midi'
import Player from './Player'
import * as processors from './processors'
import soundfont from './soundfont'

function getDefaultAudioContext() {
  return window.__umAudioContext ||
    (window.__umAudioContext = new window.AudioContext())
}

export default function Unmusic(audioContext = getDefaultAudioContext()) {
  let player = Player(audioContext)
  let P = Partch(audioContext)

  // um itself is the seq function
  let um = core.seq
  mergeInPlace(um, core)
  um.audioContext = audioContext
  audioContext._um = {}
  um.effects = effects
  um.instruments = Instruments(P)
  um.eval = evalUmlang
  um.midi = midi
  um.processors = processors
  um.play = player.play
  um.playOnce = player.playOnce
  um.soundfont = soundfont
  um.stop = player.stop
  um.P = P

  return um
}
