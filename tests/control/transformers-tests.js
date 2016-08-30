'use strict'

let test = require('tape')
let { setDest } = require('../../src/control/transformers')

let score = (events) => ({ events })

test('Can route a score to a dest', (assert) => {
  let fn = () => {}
  let s = score([
    [0, 'TRIG', { nn: 69 }]
  ])
  let expected = score([
    [0, 'TRIG', { dest: fn, nn: 69 }]
  ])
  assert.deepEqual(setDest(fn, s), expected)
  assert.end()
})

test('Can route a string to a dest', (assert) => {
  let fn = () => {}
  let s = '69'
  let expected = score([
    [0, 'TRIG', { dest: fn, nn: 69, dur: 1/4 }]
  ])
  assert.deepEqual(setDest(fn, s), expected)
  assert.end()
})
