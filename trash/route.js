'use strict'
let _ = require('lodash/fp')
let composition = require('./composition')

let route = (...args) => {
  return args.reverse().reduce(connectPair)
}

////////////////////////////////////////////////////////////////////////////////

let connectPair = (dest, src) => {
  if (src.events) {
    return composition.setDest(dest, src)
  }
  if (src.connect) {
    src.connect(dest)
    return src
  }
  throw new Error('You tried to route from an object that neither is a score nor has a connect method')
}

module.exports = route
