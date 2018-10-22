'use strict'
let _ = require('lodash/fp')
let requireFromString = require('require-from-string')
let um = require('unmusic-core')
let midiHandler = require('./midiHandler')

um.orch = _.curry((orch, score) => ({ ...score, orch }))

um.midi = _.curry((config, score) => {
  score = {
    ...score,
    actions: score.actions.map(({ type, payload }) => {
      if (type !== 'NOTE') return { type, payload }
      return { type, payload: { ...config, ...payload } }
    })
  }
  return um.arrange(midiHandler, score)
})

let umScoreFromJs = (js) => {
  let scoreFn = requireFromString(js)
  let score = scoreFn(um)
  return score && score.actions ? score : null
}

module.exports = umScoreFromJs
