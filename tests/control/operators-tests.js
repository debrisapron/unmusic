'use strict'

let test = require('tape')
let { mix, seq } = require('../../src/control/operators')

let score = (events) => ({ events })

test('Can mix two scores', (assert) => {
  let s1 = score([
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 3/8, nn: 69, dur: 1/4 }
  ])
  let s2 = score([
    { time: 0,   nn: 70, dur: 1/4 },
    { time: 1/4, nn: 70, dur: 1/4 },
    { time: 3/8, meta: true }
  ])
  let expected = score([
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 0,   nn: 70, dur: 1/4 },
    { time: 1/4, nn: 70, dur: 1/4 },
    { time: 3/8, nn: 69, dur: 1/4 }
  ])
  assert.deepEqual(mix(s1, s2), expected)
  assert.end()
})

test('Can sequence two scores', (assert) => {
  let s1 = score([
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 1/4, nn: 69, dur: 1/4 },
    { time: 3/4, meta: true }
  ])
  let s2 = score([
    { time: 0,   nn: 70, dur: 1/4 },
    { time: 1/4, nn: 70, dur: 1/4 }
  ])
  let expected = score([
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 1/4, nn: 69, dur: 1/4 },
    { time: 3/4, nn: 70, dur: 1/4 },
    { time: 1,   nn: 70, dur: 1/4 }
  ])
  assert.deepEqual(seq(s1, s2), expected)
  assert.end()
})

test('Can sequence a score with a string', (assert) => {
  let s1 = '69'
  let s2 = score([
    { time: 0,   nn: 70, dur: 1/4 },
    { time: 1/4, nn: 70, dur: 1/4 }
  ])
  let expected = score([
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 1/4, nn: 70, dur: 1/4 },
    { time: 1/2, nn: 70, dur: 1/4 }
  ])
  assert.deepEqual(seq(s1, s2), expected)
  assert.end()
})
