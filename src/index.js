import 'babel-polyfill' // BOOOOOO
import { merge as mergeInPlace } from 'lodash'
import * as core from './core'
import evalUmlang from './core/umlang/eval'
import * as effects from './effects'
import * as midi from './midi'
import Player from './Player'
import * as processors from './processors'
import soundfont from './soundfont'

function getDefaultAudioContext() {
  return window.__umAudioContext ||
    (window.__umAudioContext = new window.AudioContext())
}

function Unmusic(audioContext = getDefaultAudioContext()) {
  let player = Player(audioContext)

  // um itself is the seq function
  let um = core.seq
  mergeInPlace(um, core)
  um.audioContext = audioContext
  audioContext._um = {}
  um.effects = effects
  um.eval = evalUmlang
  um.midi = midi
  um.processors = processors
  um.play = player.play
  um.playOnce = player.playOnce
  um.soundfont = soundfont
  um.stop = player.stop

  return um
}

export default Unmusic
