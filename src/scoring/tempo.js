let _ = require('lodash/fp')

let tempo = (bpm, score) => _.set('tempo', bpm, score)

module.exports = tempo

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('tempo', () => {

    it('can set tempo of a seq', () => {
      let s = { actions: [
        { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
      ] }
      let expected = { actions: [
        { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
      ], tempo: 105 }
      expect(tempo(105, s)).to.deep.equal(expected)
    })
  })
}
