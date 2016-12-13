let h = require('./support/helpers')

let seq = (...args) => {
  let actionLists = args.map(h.getActions)
  return h.wrapActions(h.cleanActions(h.concatActions(actionLists)))
}

module.exports = seq

////////////////////////////////////////////////////////////////////////////////

if (!process.env.TEST) return

test('Can parse a seq string with just a command', (assert) => {
  let s = '69'
  let expected = { actions: [
    { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
  ] }
  assert.deepEqual(seq(s), expected)
  assert.end()
})

test('Can sequence two scores', (assert) => {
  let s1 = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/4, nn: 69, dur: 1/4 } },
    { type: 'NOOP', payload: { time: 3/4 } }
  ] }
  let s2 = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/4, nn: 70, dur: 1/4 } }
  ] }
  let expected = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/4, nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 3/4, nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1,   nn: 70, dur: 1/4 } }
  ] }
  assert.deepEqual(seq(s1, s2), expected)
  assert.end()
})

test('Can sequence a score with a string', (assert) => {
  let s1 = '69'
  let s2 = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/4, nn: 70, dur: 1/4 } }
  ] }
  let expected = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/4, nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/2, nn: 70, dur: 1/4 } }
  ] }
  assert.deepEqual(seq(s1, s2), expected)
  assert.end()
})
