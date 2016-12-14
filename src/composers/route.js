let _ = require('lodash/fp')
let seq = require('./seq')

let route = (dest, ...args) => {
  let score = seq(...args)
  let actions = score.actions.map((a) => {
    return a.type === 'NOOP' ? a : _.set('payload.dest', dest, a)
  })
  return _.set('actions', actions, score)
}

module.exports = route

////////////////////////////////////////////////////////////////////////////////

if (!process.env.TEST) return

test('can route score to dest', (assert) => {
  let s1 = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 3/8, nn: 69, dur: 1/4 } },
    { type: 'NOOP', payload: { time: 1 } }
  ] }
  let s2 = route('foo', s1)
  assert.equal(s2.actions[0].payload.dest, 'foo')
  assert.equal(s2.actions[1].payload.dest, 'foo')
  assert.false(s2.actions[2].payload.dest)
  assert.end()
})
