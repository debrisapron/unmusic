'use strict'
let _ = require('lodash/fp')
let test = require('tape')
let Player = require('../../src/Player')

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

let approxEqual = (a, b) => _.round(5, a) === _.round(5, b)

test('simple sequence', (assert) => {
  let dest = Recorder()
  let dur = 1/8
  let score = { events: [
    { time: 0,   nn: 0, dur, dest },
    { time: 1/4, nn: 1, dur, dest },
    { time: 1/2, nn: 2, dur, dest },
    { time: 3/4, nn: 3, dur, dest },
    { time: 1,   meta: true }
  ] }
  let ac = new AudioContext()
  let player = Player(ac)
  // let startTime = ac.currentTime
  player.play(score)

  setTimeout(finish, 1900)

  function finish() {
    player.stop()
    let log = dest.log
    assert.equal(log.length, 8)
    let durs = _.chunk(2, log).map(([a, b]) => b.time - a.time)
    assert.ok(durs.every((d) => approxEqual(d, 0.25)))
    assert.end()
  }
})
