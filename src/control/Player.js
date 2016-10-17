'use strict'

let Tone = require('tone')
let _ = require('lodash/fp')

// let DEFAULT_TEMPO = 120
let playingPart
let playingPartLength

let wholeNotesToSecs = (wholeNotes) => {
  // We avoid using 1n because Tone translates 1n to 1m
  return Tone.Transport.notationToSeconds('2n') * 2 * wholeNotes
}

let toneEventsFrom = (score) => {
  return score.events
    .filter((ev) => !ev.meta)
    .map((ev) => {
      let time = wholeNotesToSecs(ev.time)
      return { time, ev }
    })
}

let lengthInWholeNotesOf = (score) => {
  let lastEv = _.last(score.events)
  return lastEv.time + (lastEv.dur || 0)
}

let fireEvent = (time, { ev }) => {
  if (!ev.dest) return
  let fn = ev.dest.trigger || ev.dest 
  if (!_.isFunction(fn)) return
  fn(time, ev)
}

let play = (score) => {
  let length = lengthInWholeNotesOf(score)
  let tevs = toneEventsFrom(score)
  if (playingPartLength === length) {
    mutatePlayingPart(tevs)
  } else {
    replacePlayingPart(tevs, length)
  }
  start()
}

let mutatePlayingPart = (evs) => {
  playingPart.removeAll()
  evs.forEach((ev) => playingPart.add(ev))
}

let replacePlayingPart = (evs, length) => {
  let newPart = new Tone.Part(fireEvent, evs)
  newPart.loop = true
  newPart.loopEnd = wholeNotesToSecs(length)
  // TODO snap to nearest quarter note
  startNewPart(newPart)
}

let startNewPart = (newPart) => {
  if (playingPart) {
    playingPart.stop()
    playingPart.dispose()
  }
  newPart.start()
  playingPart = newPart
  playingPartLength = length
}

let start = () => {
  if (Tone.Transport.state !== 'started') { Tone.Transport.start() }
}

let stop = () => {
  Tone.Transport.stop()
  if (playingPart) {
    playingPart.stop()
    playingPart.dispose()
    playingPart = null
  }
}

let Player = (audioContext) => {
  if (audioContext) { Tone.Transport.context = audioContext }
  return { play, start, stop }
}

module.exports = Player
