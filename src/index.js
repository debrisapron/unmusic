import { merge as mergeInPlace } from 'lodash'
import Player from './Player'
import * as core from './core'

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
  um.play = player.play
  um.stop = player.stop

  return um
}

export default Unmusic
