let _ = require('lodash/fp')

let offset = (amount, score) => {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload, type }) => {
    if (type === 'NOOP') { return }
    payload.offset = amount
  })
  return score
}

module.exports = offset

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('offset', () => {

    it('can offset every action in a score', () => {
      let score = { actions: [
        { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
        { type: 'NOOP', payload: { time: 3/4 } }
      ] }
      let expScore = { actions: [
        { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4, offset: -1/32 } },
        { type: 'NOOP', payload: { time: 3/4 } }
      ] }
      expect(offset(-1/32, score)).to.deep.equal(expScore)
    })
  })
}
