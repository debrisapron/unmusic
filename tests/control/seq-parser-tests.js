'use strict'

let test = require('tape')
let { parse } = require('../../src/control/seq-parser')

test('Can parse a seq string with just a command', (assert) => {
  let seq = '69'
  let expected = [
    [0, 'TRIG', { nn: 69, dur: 1/4 }]
  ]
  assert.deepEqual(parse(seq), expected)
  assert.end()
})

test('Should use duration as period', (assert) => {
  let seq = 'd=/8 69'
  let expected = [
    [0, 'TRIG', { nn: 69, dur: 1/8 }]
  ]
  assert.deepEqual(parse(seq), expected)
  assert.end()
})

test('Can chain commands and rests', (assert) => {
  let seq = 'd=/8 C d=/16 C# d=/8 _ d=/4 D _'
  let expected = [
    [0,    'TRIG', { nn: 36, dur: 1/8 }],
    [1/8,  'TRIG', { nn: 37, dur: 1/16 }],
    [5/16, 'TRIG', { nn: 38, dur: 1/4 }],
    [13/16]
  ]
  assert.deepEqual(parse(seq), expected)
  assert.end()
})
