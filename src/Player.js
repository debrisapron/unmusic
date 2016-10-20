'use strict'

let Tone = require('tone')
let _ = require('lodash/fp')

// let DEFAULT_TEMPO = 120
let playingPart
let playingPartLength

let wholeNotesToSecs = (wholeNotes) => {
  // We avoid using 1n because Tone translates 1n to 1m
  return Tone.Transport.toSeconds('2n') * 2 * wholeNotes
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

let triggerEvent = (time, { ev }) => {
  if (!ev.dest) return
  let fn = ev.dest.trigger || ev.dest
  if (!_.isFunction(fn)) return
  let endFn = fn(time, ev)
  if (!_.isFunction(endFn)) return
  // FIXME AFAIK this only works correctly if the tick length > lookahead
  // Really we need a way of knowing what the Transport Time *will be* at [time]
  let endTime = Tone.Transport.seconds + wholeNotesToSecs(ev.dur || 0)
  Tone.Transport.schedule(endFn, endTime)
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
  let newPart = new Tone.Part(triggerEvent, evs)
  newPart.loop = true
  newPart.loopEnd = wholeNotesToSecs(length)
  // TODO snap to nearest quarter note
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
