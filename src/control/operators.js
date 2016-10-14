'use strict'

let _ = require('lodash/fp')
let parser = require('./seq-parser')
let score = require('./score')

let seq = (...args) => {
  let eventLists = args.map((arg) => arg.events || parser.parse(arg))
  let sequenced = eventLists.reduce((acc, curr) => {
    let prevEv = _.last(acc)
    let prevEnd = endOf(prevEv)
    return acc.concat(nudge(prevEnd, curr))
  })
  return score(clean(sequenced))
}

let mix = (...args) => {
  let eventLists = args.map((arg) => arg.events || parser.parse(arg))
  let mixed = _.flatten(eventLists)
  let sorted = _.sortBy('time', mixed)
  return score(clean(sorted))
}

let nudge = (amount, events) => {
  return events.map((ev) => _.set('time', ev.time + amount, ev))
}

let endOf = (ev) => ev.time + (ev.dur || 0)

// Remove any redundant placeholder instructions
let clean = (events) => {
  let lastIndex = events.length - 1
  return events.filter((ev, i) => {
    // Include all non-meta events
    if (!ev.meta) { return true }
    // Reject meta events unless they are at the end
    if (i !== lastIndex) { return false }
    // Reject redundant meta events (i.e. onset during a non-meta event)
    let prevEv = events[i - 1]
    return ev.time > endOf(prevEv)
  })
}

module.exports = { seq, mix }
