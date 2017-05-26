let parse = require('./parse')
let generateIntermediate = require('./generateIntermediate')
let optimizeIntermediate = require('./optimizeIntermediate')
let generateScore = require('./generateScore')

let evalUmlang = (s) => generateScore(optimizeIntermediate(generateIntermediate(parse(s))))

module.exports = evalUmlang

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('umlang evaluator', () => {

    it('can eval a string with a single note', () => {
      let s = 'A'
      let expected = [
        { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
      ]
      expect(evalUmlang(s)).to.deep.equal(expected)
    })

    it('can set duration', () => {
      let s = 'd=/8 A'
      let expected = [
        { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/8 } }
      ]
      expect(evalUmlang(s)).to.deep.equal(expected)
    })

    it('can set octave', () => {
      let s = '> A'
      let expected = [
        { type: 'NOTE', payload: { time: 0, nn: 81, dur: 1/4 } }
      ]
      expect(evalUmlang(s)).to.deep.equal(expected)
    })

    it('can chain different settings, notes and rests', () => {
      let s = '< d=/8 C dur=/16 -10 /8 _ /4 M55 _'
      let expected = [
        { type: 'NOTE', payload: { time: 0,     nn: 48, dur: 1/8 } },
        { type: 'NOTE', payload: { time: 1/8,   nn: 47, dur: 1/16 } },
        { type: 'NOTE', payload: { time: 5/16,  nn: 55, dur: 1/4 } },
        { type: 'NOOP', payload: { time: 13/16 } }
      ]
      expect(evalUmlang(s)).to.deep.equal(expected)
    })
  })
}
