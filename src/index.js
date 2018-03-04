import { merge as mergeInPlace } from 'lodash'
import Player from './Player'
import evalUmlang from './core/umlang/eval'
import * as core from './core'
import * as processors from './processors'

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
  um.eval = evalUmlang
  um.play = player.play
  um.playOnce = player.playOnce
  um.stop = player.stop
  um.proc = processors

  return um
}

export default Unmusic
