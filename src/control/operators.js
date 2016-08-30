'use strict'

let _ = require('./prelude')
let parser = require('./seq-parser')
let eh = require('./event-helpers')
let score = require('./score')

let seq = (...args) => {
  let eventLists = args.map((arg) => arg.events || parser.parse(arg))
  let sequenced = eventLists.reduce((acc, curr) => {
    let prevEv = _.last(acc)
    let prevEnd = eh.endOf(prevEv)
    return acc.concat(nudge(prevEnd, curr))
  })
  return score(clean(sequenced))
}

let mix = (...args) => {
  let eventLists = args.map((arg) => arg.events || parser.parse(arg))
  let mixed = _.unnest(eventLists)
  let sorted = _.sortBy(_.prop(0), mixed)
  return score(clean(sorted))
}

let nudge = (amount, events) => {
  return events.map((ev) => _.adjust((t) => t + amount, 0, ev))
}

// Remove any redundant placeholder instructions
let clean = (events) => {
  let lastIndex = events.length - 1
  return events.filter((ev, i) => {
    if (eh.actionOf(ev)) { return true }
    if (i !== lastIndex) { return false }
    let prevEv = events[i - 1]
    return eh.timeOf(ev) > eh.endOf(prevEv)
  })
}

module.exports = { seq, mix }
