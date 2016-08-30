'use strict'

let _ = require('./prelude')
let parser = require('./seq-parser')
let score = require('./score')

let setDest = _.curry((dest, scoreOrStr) => {
  let events = scoreOrStr.events || parser.parse(scoreOrStr)
  events = events.map(_.adjust(_.merge({ dest }), 2))
  return score(events)
})

module.exports = { setDest }
