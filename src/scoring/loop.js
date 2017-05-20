let _ = require('lodash/fp')
let h = require('./support/helpers')

let loop = (score) => _.set('loop', true, score)

module.exports = loop

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {
  
  test('Can loop a seq', (assert) => {
    let s = { actions: [
      { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
    ] }
    let expected = { actions: [
      { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
    ], loop: true }
    assert.deepEqual(loop(s), expected)
    assert.end()
  })
}
