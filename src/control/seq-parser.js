'use strict'

let _ = require('lodash/fp')
let music = require('./music')

const DEFAULT_PERIOD = 1/4

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
  if (music.isNoteName(word)) return { nn: music.noteNumber(word) }
  return { word }
}

module.exports = { parse }
