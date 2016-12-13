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
  let length = lengthInWholeNotesOf(score)
  let nestedDisorderedEvents = score.events
    .filter((ev) => !ev.meta)
    .map((ev) => {
      let id = shortid.generate()
      let start = { id, ev, time: wholeNotesToSecs(ev.time) }
      if (!ev.dur) return [start]
      let endTime = (ev.time + ev.dur) % length
      let stop = { id, time: wholeNotesToSecs(endTime) }
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

////////////////////////////////////////////////////////////////////////////////

if (!process.env.SLOW_TEST) return

// lodash fp round doesn't support precision
let round = require('lodash').round

let Recorder = () => {
  let log = []
  let stop = (time) => {
    log.push({ time })
  }
  let trigger = (time, ev) => {
    log.push({ time, ev })
    return stop
  }
  return { trigger, log }
}

let approxEqual = (a, b) => round(a, 5) === round(b, 5)

test('simple sequence', (assert) => {
  let dest = Recorder()
  let dur = 1/4
  let score = { events: [
    { time: 0,   nn: 0, dur, dest },
    { time: 1/4, nn: 1, dur, dest },
    { time: 1/2, nn: 2, dur, dest },
    { time: 3/4, nn: 3, dur, dest }
  ] }
  let ac = new AudioContext()
  let player = Player(ac)
  // let startTime = ac.currentTime
  player.play(score)

  setTimeout(finish, 2010)

  function finish() {
    player.stop()
    let log = dest.log
    assert.equal(log.length, 10)
    let durs = _.chunk(2, log).map(([a, b]) => b.time - a.time)
    assert.ok(durs.slice(0, -1).every((d) => approxEqual(d, 0.5)))
    // assert.ok(approxEqual(_.last(durs), 0.01))
    assert.end()
  }
})
