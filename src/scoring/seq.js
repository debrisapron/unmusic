let h = require('./support/helpers')

let seq = (...args) => h.concatScores(args)

module.exports = seq

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('seq', () => {

    it('can parse a seq string with just a command', () => {
      let s = 'A'
      let expected = { actions: [
        { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
      ] }
      expect(seq(s)).to.deep.equal(expected)
    })

    it('can sequence two scores', () => {
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
      expect(seq(s1, s2)).to.deep.equal(expected)
    })

    it('can sequence a score with a string', () => {
      let s1 = 'A'
      let s2 = { actions: [
        { type: 'NOTE', payload: { time: 0,   nn: 70, dur: 1/4 } },
        { type: 'NOTE', payload: { time: 1/4, nn: 70, dur: 1/4 } }
      ] }
      let expected = { actions: [
        { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
        { type: 'NOTE', payload: { time: 1/4, nn: 70, dur: 1/4 } },
        { type: 'NOTE', payload: { time: 1/2, nn: 70, dur: 1/4 } }
      ] }
      expect(seq(s1, s2)).to.deep.equal(expected)
    })
  })
}
