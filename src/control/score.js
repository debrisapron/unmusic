'use strict'
let transformers = require('./transformers')

let init = (events) => {

  // This code is clunky due to straddling the oo-functional divide.

  // TODO change to add destinations rather than set them, so as to match the
  // WAA connect semantics
  let connect = (dest) => {
    self.events = transformers.setDest(dest, self).events
    return dest
  }

  let self = { events, connect }
  return self
}

module.exports = init
