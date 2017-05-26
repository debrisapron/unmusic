let _ = require('lodash/fp')

let loop = (score) => _.set('loop', true, score)

module.exports = loop

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('loop', () => {

    it('can loop a seq', () => {
      let s = { actions: [
        { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
      ] }
      let expected = { actions: [
        { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
      ], loop: true }
      expect(loop(s)).to.deep.equal(expected)
    })
  })
}
