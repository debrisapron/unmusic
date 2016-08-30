'use strict'

let test = require('tape')
let { route } = require('../src/router')

test('Can route connectables to each other returning a new connectable', (assert) => {
  let conns = {}
  let data
  let c1 = { connect: (dest) => conns.c1 = dest, trigger: (d) => data = d, input: 'BAZ' }
  let c2 = { connect: (dest) => conns.c2 = dest }
  let c3 = { connect: (dest) => conns.c3 = dest }
  let c4 = route(c1, c2, c3)
  c4.connect('BAR')
  assert.deepEqual(conns, { c1: c2, c2: c3, c3: 'BAR' })
  assert.equal(c4.input, 'BAZ')
  c4.trigger('FOO')
  assert.equal(data, 'FOO')
  assert.end()
})

test('Can route events lists to connectables returning a new event list', (assert) => {
  let conns = {}
  let l1 = [
    [0,   'TRIG', { nn: 69, dur: 1/4 }],
    [3/8, 'TRIG', { nn: 69, dur: 1/4 }]
  ]
  let c2 = { connect: (dest) => conns.c2 = dest }
  let c3 = { connect: (dest) => conns.c3 = dest }
  let l2 = route(l1, c2, c3)
  assert.equal(l2[0][2].dest.connect, c3.connect)
  assert.equal(l2[1][2].dest.connect, c3.connect)
  assert.deepEqual(conns, { c2: c3 })
  assert.end()
})
