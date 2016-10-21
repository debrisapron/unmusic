'use strict'
let _ = require('lodash/fp')
let test = require('tape')
let Player = require('../../src/Player')

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
    console.log(durs)
    assert.ok(durs.slice(0, -1).every((d) => approxEqual(d, 0.5)))
    // assert.ok(approxEqual(_.last(durs), 0.01))
    assert.end()
  }
})
