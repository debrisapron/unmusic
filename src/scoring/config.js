let _ = require('lodash/fp')

let config = (opts, score) => _.set('config', _.merge(score.config || {}, opts), score)

module.exports = config

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('config', () => {

    it('can set config options for a score', () => {
      let s = { actions: [
        { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
      ] }
      let expected = { actions: [
        { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
      ], config: { a: 1 } }
      expect(config({ a: 1 }, s)).to.deep.equal(expected)
    })
  })
}
