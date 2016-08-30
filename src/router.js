'use strict'
let _ = require('lodash/fp')

let route = (...args) => {
  args.reduce(connectPair)
  let first = _.first(args)
  let last = _.last(args)
  return {
    input: first.input,
    trigger: first.trigger,
    events: first.events,
    connect: last.connect
  }
}

let connectPair = (src, dest) => {
  if (!src.connect) {
    throw new Error(
      'You tried to route from an object that does not have a connect method'
    )
  }
  src.connect(dest)
  return dest
}

module.exports = { route }
