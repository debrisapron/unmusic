'use strict'
let _ = require('lodash/fp')
let effect = require('./effect')

let DEFAULT_MAP = {
  'C#': 'C#maj' // etc
}

let init = (map = DEFAULT_MAP) => {
  return effect(transform(map))
}

let transform = _.curry((map, cb, time, data) => {
  if (data.nn == null) {
    cb(time, data)
    return
  }
  let chord = chordFromNote(data.nn)
  chord.forEach((nn) => cb(time, _.merge(data, { nn })))
}

module.exports = init
