let parse = require('./parse')
let generateIntermediate = require('./generateIntermediate')
let generateScore = require('./generateScore')

let evalUmlang = (s) => generateScore(generateIntermediate(parse(s)))

module.exports = evalUmlang
