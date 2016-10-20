'use strict'
let _ = require('lodash/fp')
let shortid = require('shortid')
let Tone = require('tone')

// let DEFAULT_TEMPO = 120
let playingPart
let playingPartLength
let stopCbs = {}

let wholeNotesToSecs = (wholeNotes) => {
  // We avoid using 1n because Tone translates 1n to 1m
  return Tone.Transport.toSeconds('2n') * 2 * wholeNotes
}

let toneEventsFrom = (score) => {
  let nestedDisorderedEvents = score.events
    .filter((ev) => !ev.meta)
    .map((ev) => {
      let time = wholeNotesToSecs(ev.time)
      let id = shortid.generate()
      let start = { id, time, ev }
      if (!ev.dur) return [start]
      // TODO when we move to independent duration & period, it will be possible
      // for end of event to be after end of part, in which case it will need to
      // wrap to beginning to part
      let endTime = time + wholeNotesToSecs(ev.dur)
      let stop = { id, time: endTime }
      return [start, stop]
    })
  return _.sortBy('time', _.flatten(nestedDisorderedEvents))
}

let lengthInWholeNotesOf = (score) => {
  let lastEv = _.last(score.events)
  return lastEv.time + (lastEv.dur || 0)
}

let triggerEvent = (time, { id, ev }) => {
  if (!ev) {
    let stopCb = stopCbs[id]
    if (stopCb) {
      stopCbs[id] = undefined
      stopCb(time)
    }
    return
  }
  if (!ev.dest) return
  let fn = ev.dest.trigger || ev.dest
  if (!_.isFunction(fn)) return
  let stopCb = fn(time, ev)
  if (!_.isFunction(stopCb)) return
  stopCbs[id] = stopCb
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
  _.forEach((stopCb) => {
    if (stopCb) stopCb(Tone.Transport.context.currentTime)
  }, stopCbs)
  stopCbs = {}
}

let Player = (audioContext) => {
  if (audioContext) { Tone.Transport.context = audioContext }
  return { play, start, stop }
}

module.exports = Player
