'use strict'
let test = require('tape')
let route = require('../../src/route')

test('Can route connectables to each other returning first', (assert) => {
  let conns = {}
  let data
  let c1 = { connect: (dest) => conns.c1 = dest }
  let c2 = { connect: (dest) => conns.c2 = dest }
  let c3 = { connect: (dest) => conns.c3 = dest }
  let c4 = route(c1, c2, c3)
  assert.deepEqual(conns, { c1: c2, c2: c3 })
  assert.equal(c1, c4)
  assert.end()
})

test('Can route score to connectables returning a new event list', (assert) => {
  let conns = {}
  let s1 = { events: [
    { time: 0,   nn: 69, dur: 1/4 },
    { time: 3/8, nn: 69, dur: 1/4 },
    { time: 1,   meta: true }
  ] }
  let c2 = { connect: (dest) => conns.c2 = dest, name: 'c2' }
  let c3 = { connect: (dest) => conns.c3 = dest, name: 'c3' }
  let s2 = route(s1, c2, c3)
  assert.deepEqual(conns, { c2: c3 })
  assert.equal(s2.events[0].dest, c2)
  assert.equal(s2.events[1].dest, c2)
  assert.false(s2.events[2].dest)
  assert.end()
})
