'use strict'
let _ = require('lodash/fp')
let requireFromString = require('require-from-string')
let um = require('unmusic-core')

um.orch = _.curry((orch, score) => ({ ...score, orch }))

let umScoreFromJs = (js) => {
  let scoreFn = requireFromString(js)
  let score = scoreFn(um)
  return score && score.actions ? score : null
}

module.exports = umScoreFromJs
