'use strict'
let _ = require('lodash/fp')
let test = require('tape')
let Player = require('../../src/Player')

let Recorder = (length, cb) => {
  let log = []
  let stop = (time) => {
    log.push({ time })
    if (log.length === length) cb(log)
  }
  let trigger = (time, ev) => {
    log.push({ time, ev })
    return stop
  }
  return { trigger }
}

let approxEqual = (a, b) => _.round(5, a) === _.round(5, b)

test('simple sequence', (assert) => {
  let dest = Recorder(10, finish)
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

  function finish(log) {
    player.stop()
    assert.equal(log.length, 10)
    let intervals = _.chunk(2, log).map(([a, b]) => b.time - a.time)
    assert.ok(intervals.every((interval) => approxEqual(interval, 0.5)))
    assert.end()
  }
})
