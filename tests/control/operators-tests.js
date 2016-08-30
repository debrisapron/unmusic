'use strict'

let test = require('tape')
let { mix, seq } = require('../../src/control/operators')

let score = (events) => ({ events })

test('Can mix two scores', (assert) => {
  let s1 = score([
    [0,   'TRIG', { nn: 69, dur: 1/4 }],
    [3/8, 'TRIG', { nn: 69, dur: 1/4 }]
  ])
  let s2 = score([
    [0,   'TRIG', { nn: 70, dur: 1/4 }],
    [1/4, 'TRIG', { nn: 70, dur: 1/4 }],
    [3/8]
  ])
  let expected = score([
    [0,   'TRIG', { nn: 69, dur: 1/4 }],
    [0,   'TRIG', { nn: 70, dur: 1/4 }],
    [1/4, 'TRIG', { nn: 70, dur: 1/4 }],
    [3/8, 'TRIG', { nn: 69, dur: 1/4 }]
  ])
  assert.deepEqual(mix(s1, s2), expected)
  assert.end()
})

test('Can sequence two scores', (assert) => {
  let s1 = score([
    [0,   'TRIG', { nn: 69, dur: 1/4 }],
    [1/4, 'TRIG', { nn: 69, dur: 1/4 }],
    [3/4]
  ])
  let s2 = score([
    [0,   'TRIG', { nn: 70, dur: 1/4 }],
    [1/4, 'TRIG', { nn: 70, dur: 1/4 }],
  ])
  let expected = score([
    [0,   'TRIG', { nn: 69, dur: 1/4 }],
    [1/4, 'TRIG', { nn: 69, dur: 1/4 }],
    [3/4, 'TRIG', { nn: 70, dur: 1/4 }],
    [1,   'TRIG', { nn: 70, dur: 1/4 }]
  ])
  assert.deepEqual(seq(s1, s2), expected)
  assert.end()
})

test('Can sequence a score with a string', (assert) => {
  let s1 = '69'
  let s2 = score([
    [0,   'TRIG', { nn: 70, dur: 1/4 }],
    [1/4, 'TRIG', { nn: 70, dur: 1/4 }]
  ])
  let expected = score([
    [0,   'TRIG', { nn: 69, dur: 1/4 }],
    [1/4, 'TRIG', { nn: 70, dur: 1/4 }],
    [1/2, 'TRIG', { nn: 70, dur: 1/4 }]
  ])
  assert.deepEqual(seq(s1, s2), expected)
  assert.end()
})
