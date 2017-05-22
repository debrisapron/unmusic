let _ = require('lodash/fp')

let tempo = (bpm, score) => _.set('tempo', bpm, score)

module.exports = tempo

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {
  
  test('Can set tempo of a seq', (assert) => {
    let s = { actions: [
      { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
    ] }
    let expected = { actions: [
      { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
    ], tempo: 105 }
    assert.deepEqual(tempo(105, s), expected)
    assert.end()
  })
}
