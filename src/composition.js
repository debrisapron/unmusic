'use strict'
let _ = require('lodash/fp')
let teoria = require('teoria')

const DEFAULT_PERIOD = 1/4

// ***** PUBLIC *****

let seq = (...args) => {
  let eventLists = args.map(unwrapOrParse)
  let sequenced = eventLists.reduce((acc, curr) => {
    let prevEv = _.last(acc)
    let prevEnd = endOf(prevEv)
    return acc.concat(nudge(prevEnd, curr))
  })
  return wrap(clean(sequenced))
}

let mix = (...args) => {
  let eventLists = args.map(unwrapOrParse)
  let mixed = _.flatten(eventLists)
  let sorted = _.sortBy('time', mixed)
  return wrap(clean(sorted))
}

let setDest = (dest, scoreOrStr) => {
  let events = unwrapOrParse(scoreOrStr)
  events = events.map((ev) => ev.meta ? ev : _.set('dest', dest, ev))
  return wrap(events)
}

// ***** PRIVATE *****

let nudge = (amount, events) => {
  return events.map((ev) => _.set('time', ev.time + amount, ev))
}

let endOf = (ev) => {
  return ev.time + (ev.dur || 0)
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

let unwrapOrParse = (scoreOrStr) => {
  return scoreOrStr.events || parse(scoreOrStr)
}

let wrap = (events) => {
  return { events }
}

// ***** PARSING *****

let parse = (raw) => {
  let words = raw.split(' ').filter((w) => w)
  return processWords(words)
}

let processWords = (words) => {
  let evs = []
  let time = 0
  let settings = { dur: DEFAULT_PERIOD }
  let delimit

  words.forEach((word) => {
    if (isSetting(word)) {
      settings = _.merge(settings, parseSetting(word))
      return
    }
    let ev = parseCommand(time, word, settings)
    if (ev) { evs.push(ev) }
    time += settings.dur
    delimit = !ev
  })

  if (delimit) {
    evs.push({ time, meta: true })
  }

  return evs
}

let strContains = (needle, haystack) => haystack.indexOf(needle) > -1

let isSetting = (word) => strContains('=', word) || strContains('/', word)

let parseSetting = (setting) => {
  let [val, name] = setting.split('=').reverse()
  name = name || 'dur'
  if(name === 'd') { name = 'dur' }
  if(name === 'v') { name = 'vel' }
  if(name === 'c') { name = 'ch' }
  val = parseSettingVal(val)
  return { [name]: val }
}

let parseSettingVal = (val) => {
  if(strContains('/', val)) {
    let [a, b] = val.split('/').map((i) => parseInt(i || 1))
    return a / b
  }
  if(_.isNumeric(val)) {
    return parseFloat(val)
  }
  return val
}

let parseCommand = (time, word, settings) => {
  if (word === '_') return null
  return _.mergeAll([settings, dataFor(word), { time }])
}

let dataFor = (word) => {
  if (!isNaN(word)) return { nn: parseFloat(word) }
  if (isNoteName(word)) return { nn: noteNumber(word) }
  return { word }
}

// ***** MUSIC HELPERS *****

let noteNumber = (noteName) => teoria.note(noteName).midi()

let isNoteName = (str) => {
  try {
    noteNumber(str)
    return true
  }
  catch(_) {
    return false
  }
}

module.exports = { seq, mix, setDest }
