'use strict'
let _ = require('lodash/fp')
let shortid = require('shortid')
let h = require('./support/helpers')
let seq = require('./seq')

let osc = (params) => {
  let id = shortid.generate()
  return (...args) => {
    let score = seq(...args)
    return h.mapScore(createPatchAction(id, params))
  }
}

let createPatchAction = _.curry((id, params, sourceAction) => {
  let sourceParams = _.pick(['freq', 'phase', 'type'], sourceAction.payload)
  sourceParams.freq = sourceParams.freq || twelveTet(sourceParams.nn) || 440
  params = _.merge(params, sourceParams)
  const payload = _.merge(sourceAction.payload, {
    vag: { [id]: ['oscillator', 'output', params] }
  })
  return { action: 'PTCH', payload }
})

let twelveTet = (nn) => {
  return nn && Math.pow(2, ((nn - 69) / 12)) * 440
}

module.exports = seq

////////////////////////////////////////////////////////////////////////////////

if (!global.test) return

test('Can parse a seq string with just a command', (assert) => {
  let s = '69'
  let expected = { actions: [
    { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
  ] }
  assert.deepEqual(seq(s), expected)
  assert.end()
})
