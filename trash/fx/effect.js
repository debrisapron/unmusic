'use strict'
let _ = require('lodash/fp')

let init = (transform) => {

  let dests = []

  let connect = (dest) => {
    if (!dests.includes(dest)) { dests.push(dest) }
    return dest
  }

  let trigger = (time, data) => {
    transform(emit, time, data)
  }

  let emit = (time, data) => {
    dests.forEach((dest) => {
      let destTrigger = dest.trigger || dest
      destTrigger(time, data)
    })
  }

  return { trigger, connect }
}

module.exports = init
