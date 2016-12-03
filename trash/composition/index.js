'use strict'
let _ = require('lodash/fp')
let parse = require('./parse')

let seq = (...args) => {
  let eventLists = args.map(getEventList)
  return wrap(clean(concatEventLists(eventLists)))
}

let loop = (...args) => _.set('loop', true, seq(...args))

let mix = (...args) => {
  let [loops, nonLoops] = _.partition((arg) => arg.loop, args)
    .map((args) => args.map(getEventList))

  if (loops.length) {
    // If there are any non-loops, adjust the length of any loops to the length
    // of the longest non-loop.
    // If there are only loops, adjust their lengths to the lowest common
    // multiple of all their lengths.
    let length = nonLoops.length
      ? _.max(nonLoops.map(lengthOf))
      : lcm(loops.map(lengthOf))
    loops = loops.map(extend(length))
  }
  
  let eventLists = loops.concat(nonLoops)
  let mixed = _.flatten(eventLists)
  let sorted = _.sortBy('time', mixed)
  let score = wrap(clean(sorted))
  if (!nonLoops.length) score.loop = true
  return score
}

let setDest = _.curry((dest, scoreOrStr) => {
  let events = getEventList(scoreOrStr)
  events = events.map((ev) => ev.meta ? ev : _.set('dest', dest, ev))
  return wrap(events)
})

////////////////////////////////////////////////////////////////////////////////

let concatEventLists = (eventLists) => {
  return eventLists.reduce((acc, curr) => {
    return acc.concat(nudge(lengthOf(acc), curr))
  })
}

let nudge = (amount, events) => {
  return events.map((ev) => _.set('time', ev.time + amount, ev))
}

let endOf = (ev) => ev.time + (ev.dur || 0)

let lengthOf = (events) => endOf(_.last(events))

// Repeat or trim a list of events to the given length.
let extend = _.curry((length, events) => {
  let loopLength = lengthOf(events)
  let wholeRepetitions = Math.floor(length / loopLength)
  let lastRepetitionLength = length % loopLength
  let lastEvents = trim(lastRepetitionLength, events)
  let eventLists = wholeRepetitions ? Array(wholeRepetitions).fill(events) : []
  eventLists.push(lastEvents)
  return concatEventLists(eventLists)
})

// Trim a list of events to the given length, shortening the last event if
// necessary.
// TODO should just shorten period, not dur
let trim = (length, events) => {
  events = events.filter((ev) => ev.time < length)
  if (!events.length) return events
  if (lengthOf(events) > length) {
    let lastEv = _.last(events)
    lastEv = _.set('dur', length - lastEv.time, lastEv)
    events = _.initial(events).concat(lastEv)
  }
  return events
}

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

let getEventList = (thing) => {
  return (Array.isArray(thing) && thing) || thing.events || parse(thing)
}

let wrap = (events) => {
  return { events }
}

// Next 3 function adapted from
// https://github.com/felipernb/algorithms.js/tree/master/src/algorithms/math

let pairGcd = (a, b) => {
  let tmp = a
  a = Math.max(a, b)
  b = Math.min(tmp, b)
  while (b !== 0) {
    tmp = b
    b = a % b
    a = tmp
  }

  return a
}

let pairLcm = (a, b) => {
  if (a === 0 || b === 0) return 0
  a = Math.abs(a)
  b = Math.abs(b)
  return a / pairGcd(a, b) * b
}

let lcm = (values) => values.reduce(pairLcm)

module.exports = { seq, loop, mix, setDest }
