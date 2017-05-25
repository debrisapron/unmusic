let _ = require('lodash/fp')
let nearley = require('nearley')
let grammar = require('./grammar.js')

let parse = (s) => {
  let parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)
  parser.feed(s)
  let parsings = parser.results
  if (parsings.length > 1) {
    throw new Error('Syntax error in sequence: combination is ambiguous')
  }
  return _.compact(parsings[0])
}

module.exports = parse

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('umlang parser', () => {

    it('Can parse an umlang string', () => {
      let s = 'C /16 x=1 >'
      let expected = [
        ['NOTE', { type: 'PITCH_CLASS', value: 'C' }],
        ['SETTING', { param: 'duration', value: 1/16 }],
        ['SETTING', { param: 'x', value: 1 }],
        ['OCTAVE_CHANGE', 1],
      ]
      expect(parse(s)).to.deep.equal(expected)
    })
  })
}
