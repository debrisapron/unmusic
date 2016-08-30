'use strict'

let _ = require('./prelude')
let music = require('./music')

const DEFAULT_PERIOD = 1/16

// let processIfPatt = ({ seq, settings }, word) => {
//   if(!_.strContains('|', word)) { return null }
//   let patt = parsePatt(word)
//   let ev = _.last(seq)
//   let initPattSeq = _.map((x) => _.merge(ev, x), _.init(patt))
//   let endPattEv = _.merge(_.last(patt), { type: 'end' })
//   let pattSeq = _.append(endPattEv, initPattSeq)
//   return {
//     settings,
//     seq: _.concat(_.init(seq), pattSeq)
//   }
// }
//
// let parsePatt = (str) => {
//   let strWithoutPipes = str.replace(/\|/g, '')
//   let chars = _.eachChar(strWithoutPipes)
//   return timesFromChars(chars).map((time) => ({ time }))
// }
//
// let timesFromChars = (chars) => {
//   return chars
//     .map((c, i) => c === '-' ? null : i * DEFAULT_PATT_PERIOD)
//     .filter((t) => t != null)
//     .concat(chars.length * DEFAULT_PATT_PERIOD)
// }

module.exports = { parse }
