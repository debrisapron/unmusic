'use strict'

let test = require('tape')
let Player = require('../../src/control/Player')

test('single note', (assert) => {
  let ac = AudioContext()
  let player = Player(ac)
  let t1 = performance.now()
  let dest = (t2, ev) => {
    let elapsed = t2 - t1
    assert.ok(elapsed < 10)
    assert.equal(ev.nn, 1)
    player.stop()
    assert.end()
  }
  let score = { events: [
    { time: 0, nn: 1, dur: 1/4, dest }
  ] }
  player.play(score)
})
