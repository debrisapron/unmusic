'use strict'
let _ = require('lodash/fp')

let route = (...args) => {
  return args.reverse().reduce(connectPair)
}

let connectPair = (dest, src) => {
  if (src.actions) {
    return setScoreDest(dest, src)
  }
  if (src.connect) {
    src.connect(dest)
    return src
  }
  throw new Error('You tried to route from an object that neither is a score nor has a connect method')
}

let setScoreDest = (dest, score) => {
  let actions = score.actions.map((a) => {
    return a.type === 'NOOP' ? a : _.set('payload.dest', dest, a)
  })
  return _.set('actions', actions, score)
}

module.exports = route

////////////////////////////////////////////////////////////////////////////////

if (!global.test) return

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
  let s1 = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 3/8, nn: 69, dur: 1/4 } },
    { type: 'NOOP', payload: { time: 1 } }
  ] }
  let c2 = { connect: (dest) => conns.c2 = dest, name: 'c2' }
  let c3 = { connect: (dest) => conns.c3 = dest, name: 'c3' }
  let s2 = route(s1, c2, c3)
  assert.deepEqual(conns, { c2: c3 })
  assert.equal(s2.actions[0].payload.dest, c2)
  assert.equal(s2.actions[1].payload.dest, c2)
  assert.false(s2.actions[2].payload.dest)
  assert.end()
})
