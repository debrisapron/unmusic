'use strict'

let Tone = require('tone')
let _ = require('./prelude')
let ih = require('./instr-helpers')

// let DEFAULT_TEMPO = 120
let playingPart
let playingPartLength

let wholeNotesToSecs = (wholeNotes) => {
  // We avoid using 1n because Tone translates 1n to 1m
  return Tone.Transport.notationToSeconds('2n') * 2 * wholeNotes
}

let toneEventsFrom = (instrs) => {
  return instrs
    .filter(ih.actionOf)
    .map((instr) => {
      let time = wholeNotesToSecs(ih.timeOf(instr))
      return { time, instr }
    })
}

let lengthInWholeNotesOf = (instrs) => ih.endOf(_.last(instrs))

let fireEvent = (time, ev) => {
  let data = ih.dataOf(ev.instr)
  if (data.dest) { data.dest(time, data) }
}

let play = (instrs) => {
  let length = lengthInWholeNotesOf(instrs)
  let evs = toneEventsFrom(instrs)
  if (playingPartLength === length) {
    mutatePlayingPart(evs)
  } else {
    replacePlayingPart(evs, length)
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

let init = (audioContext) => {
  if (audioContext) { Tone.Transport.context = audioContext }
  return { play, start, stop }
}

module.exports = init
