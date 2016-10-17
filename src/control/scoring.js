'use strict'

let _ = require('lodash/fp')
let parser = require('./seq-parser')

function seq(...args) {
  let eventLists = args.map(_unwrapOrParse)
  let sequenced = eventLists.reduce((acc, curr) => {
    let prevEv = _.last(acc)
    let prevEnd = _endOf(prevEv)
    return acc.concat(_nudge(prevEnd, curr))
  })
  return _wrap(_clean(sequenced))
}

function mix(...args) {
  let eventLists = args.map(_unwrapOrParse)
  let mixed = _.flatten(eventLists)
  let sorted = _.sortBy('time', mixed)
  return _wrap(_clean(sorted))
}

function setDest(dest, scoreOrStr) {
  let events = _unwrapOrParse(scoreOrStr)
  events = events.map((ev) => ev.meta ? ev : _.set('dest', dest, ev))
  return _wrap(events)
}

function _nudge(amount, events) {
  return events.map((ev) => _.set('time', ev.time + amount, ev))
}

function _endOf(ev) {
  return ev.time + (ev.dur || 0)
}

// Remove any redundant placeholder instructions
function _clean(events) {
  let lastIndex = events.length - 1
  return events.filter((ev, i) => {
    // Include all non-meta events
    if (!ev.meta) { return true }
    // Reject meta events unless they are at the end
    if (i !== lastIndex) { return false }
    // Reject redundant meta events (i.e. onset during a non-meta event)
    let prevEv = events[i - 1]
    return ev.time > _endOf(prevEv)
  })
}

function _unwrapOrParse(scoreOrStr) {
  return scoreOrStr.events || parser.parse(scoreOrStr)
}

function _wrap(events) {
  return { events }
}

module.exports = { seq, mix, setDest }
