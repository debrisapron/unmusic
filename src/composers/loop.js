'use strict'
let _ = require('lodash/fp')
let seq = require('./seq')

let loop = (...args) => _.set('loop', true, seq(...args))

module.exports = loop

////////////////////////////////////////////////////////////////////////////////

if (!global.test) return

test('Can loop a seq', (assert) => {
  let s = '69'
  let expected = { actions: [
    { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
  ], loop: true }
  assert.deepEqual(loop(s), expected)
  assert.end()
})
