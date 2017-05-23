let _ = require('lodash/fp')
let nearley = require('nearley')
let grammar = require('./grammar.js')

let parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)

let parse = (s) => _.compact(parser.feed(s))

module.exports = parse
