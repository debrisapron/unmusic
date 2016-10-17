'use strict'
let _ = require('lodash/fp')
let scoring = require('./control/scoring')

let route = (...args) => {
  return args.reverse().reduce(_connectPair)
}

let _connectPair = (dest, src) => {
  console.log(src, dest)
  if (src.events) {
    return scoring.setDest(dest, src)
  }
  if (src.connect) {
    src.connect(dest)
    return src
  }
  throw new Error('You tried to route from an object that neither is a score nor has a connect method')
}

module.exports = { route }
