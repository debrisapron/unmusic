'use strict'
let _ = require('lodash/fp')
let test = require('tape')
let { mix, seq, loop, setDest } = require('../src/composition')

let sort = (score) => {
  let sortedEvents = _.sortBy(['time', 'nn'], score.events)
  return _.set('events', sortedEvents, score)
}

test('Can parse a seq string with just a command', (assert) => {
  let s = '69'
  let expected = { events: [
    { time: 0, nn: 69, dur: 1/4 }
  ] }
  assert.deepEqual(seq(s), expected)
  assert.end()
})

test('Should use duration as period', (assert) => {
  let s = 'd=/8 69'
  let expected = { events: [
    { time: 0, nn: 69, dur: 1/8 }
  ] }
  assert.deepEqual(seq(s), expected)
  assert.end()
})

test('Can chain commands and rests', (assert) => {
  let s = 'd=/8 C d=/16 C# d=/8 _ d=/4 D _'
  let expected = { events: [
    { time: 0,     nn: 36, dur: 1/8 },
    { time: 1/8,   nn: 37, dur: 1/16 },
    { time: 5/16,  nn: 38, dur: 1/4 },
    { time: 13/16, meta: true }
  ] }
  assert.deepEqual(seq(s), expected)
  assert.end()
})

test('Can loop a seq', (assert) => {
  let s = '69'
  let expected = { events: [
    { time: 0, nn: 69, dur: 1/4 }
  ], loop: true }
  assert.deepEqual(loop(s), expected)
  assert.end()
})

test('Can mix two scores', (assert) => {
  let s1 = { events: [
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 3/8, nn: 69, dur: 1/4 }
  ] }
  let s2 = { events: [
    { time: 0,   nn: 70, dur: 1/4 },
    { time: 1/4, nn: 70, dur: 1/4 },
    { time: 3/8, meta: true }
  ] }
  let expected = { events: [
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 0,   nn: 70, dur: 1/4 },
    { time: 1/4, nn: 70, dur: 1/4 },
    { time: 3/8, nn: 69, dur: 1/4 }
  ] }
  assert.deepEqual(mix(s1, s2), expected)
  assert.end()
})

test('Can mix two scores, one looped, one not', (assert) => {
  let s1 = { events: [
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 3/8, nn: 69, dur: 1/4 }
  ], loop: true }
  let s2 = { events: [
    { time: 0,   nn: 70, dur: 1/4 },
    { time: 1/4, nn: 70, dur: 1/4 },
    { time: 3/4, nn: 70, dur: 1/4 }
  ] }
  let expected = { events: [
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 0,   nn: 70, dur: 1/4 },
    { time: 1/4, nn: 70, dur: 1/4 },
    { time: 3/8, nn: 69, dur: 1/4 },
    { time: 5/8, nn: 69, dur: 1/4 },
    { time: 3/4, nn: 70, dur: 1/4 }
  ] }
  assert.deepEqual(sort(mix(s1, s2)), expected)
  assert.end()
})

test('Can mix two looped scores', (assert) => {
  let s1 = { events: [
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 1/4, nn: 69, dur: 1/4 }
  ], loop: true }
  let s2 = { events: [
    { time: 0,   nn: 70, dur: 1/4 },
    { time: 1/2, nn: 70, dur: 1/4 }
  ], loop: true }
  let expected = { events: [
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 0,   nn: 70, dur: 1/4 },
    { time: 1/4, nn: 69, dur: 1/4 },
    { time: 1/2, nn: 69, dur: 1/4 },
    { time: 1/2, nn: 70, dur: 1/4 },
    { time: 3/4, nn: 69, dur: 1/4 },
    { time: 3/4, nn: 70, dur: 1/4 },
    { time: 1,   nn: 69, dur: 1/4 },
    { time: 5/4, nn: 69, dur: 1/4 },
    { time: 5/4, nn: 70, dur: 1/4 }
  ], loop: true }
  assert.deepEqual(sort(mix(s1, s2)), expected)
  assert.end()
})

test('Can sequence two scores', (assert) => {
  let s1 = { events: [
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 1/4, nn: 69, dur: 1/4 },
    { time: 3/4, meta: true }
  ] }
  let s2 = { events: [
    { time: 0,   nn: 70, dur: 1/4 },
    { time: 1/4, nn: 70, dur: 1/4 }
  ] }
  let expected = { events: [
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 1/4, nn: 69, dur: 1/4 },
    { time: 3/4, nn: 70, dur: 1/4 },
    { time: 1,   nn: 70, dur: 1/4 }
  ] }
  assert.deepEqual(seq(s1, s2), expected)
  assert.end()
})

test('Can sequence a score with a string', (assert) => {
  let s1 = '69'
  let s2 = { events: [
    { time: 0,   nn: 70, dur: 1/4 },
    { time: 1/4, nn: 70, dur: 1/4 }
  ] }
  let expected = { events: [
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 1/4, nn: 70, dur: 1/4 },
    { time: 1/2, nn: 70, dur: 1/4 }
  ] }
  assert.deepEqual(seq(s1, s2), expected)
  assert.end()
})

test('Can route a score to a dest', (assert) => {
  let fn = () => {}
  let s = { events: [
    { time: 0, nn: 69 }
  ] }
  let expected = { events: [
    { time: 0, dest: fn, nn: 69 }
  ] }
  assert.deepEqual(setDest(fn, s), expected)
  assert.end()
})

test('Can route a string to a dest', (assert) => {
  let fn = () => {}
  let s = '69'
  let expected = { events: [
    { time: 0, dest: fn, nn: 69, dur: 1/4 }
  ] }
  assert.deepEqual(setDest(fn, s), expected)
  assert.end()
})
