'use strict'

let _ = require('./prelude')
let music = require('./music')

const DEFAULT_PERIOD = 1/4

let parse = (raw) => {
  let words = _.words(raw)
  return processWords(words)
}

let processWords = (words) => {
  let instrs = []
  let time = 0
  let settings = { dur: DEFAULT_PERIOD }
  let delimit

  words.forEach((word) => {
    if (isSetting(word)) {
      settings = _.merge(settings, parseSetting(word))
      return
    }
    let instr = parseCommand(time, word, settings)
    if (instr) { instrs.push(instr) }
    time += settings.dur
    delimit = !instr
  })

  if (delimit) {
    instrs.push([time])
  }

  return instrs
}

let isSetting = (word) => _.strContains('=', word) || _.strContains('/', word)

let parseSetting = (setting) => {
  let [val, name] = _.reverse(_.split('=', setting))
  name = name || 'dur'
  if(name === 'd') { name = 'dur' }
  if(name === 'v') { name = 'vel' }
  if(name === 'c') { name = 'ch' }
  val = parseSettingVal(val)
  return { [name]: val }
}

let parseSettingVal = (val) => {
  // This is messy
  if(_.strContains('/', val)) {
    let [a, b] = _.map((i) => parseInt(i || 1), _.split('/', val))
    return a / b
  }
  if(_.isNumeric(val)) {
    return parseFloat(val)
  }
  return val
}

let parseCommand = (time, word, settings) => {
  let action = actionFor(word)
  if (!action) { return null }
  let data = _.merge(settings, dataFor(word))
  return makeInstr(time, action, data)
}

let actionFor = (word) => {
  if (word === '_') return null
  return 'TRIG'
}

let dataFor = (word) => {
  if (_.isNumeric(word)) return { nn: parseInt(word) }
  if (music.isNoteName(word)) return { nn: music.noteNumber(word) }
  return { word }
}

let makeInstr = (...args) => args

module.exports = { parse }
