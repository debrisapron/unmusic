let _ = require('lodash/fp')
let teoria = require('teoria')

const DEFAULT_PERIOD = 1/4

// PUBLIC

let parse = (raw) => {
  let words = raw.split(' ').filter((w) => w)
  return processWords(words)
}

// PRIVATE

let processWords = (words) => {
  let actions = []
  let time = 0
  let settings = { dur: DEFAULT_PERIOD }
  let addDelimiter = false

  words.forEach((word) => {
    if (isSetting(word)) {
      settings = _.merge(settings, parseSetting(word))
      return
    }
    let action = parseCommand(time, word, settings)
    if (action) { actions.push(action) }
    time += settings.dur
    addDelimiter = !action
  })

  if (addDelimiter) {
    actions.push({ type: 'NOOP', payload: { time } })
  }

  return actions
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
  let payload = _.mergeAll([settings, dataFor(word), { time }])
  return { payload, type: payload.word ? 'TRIG' : 'NOTE' }
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

module.exports = parse

////////////////////////////////////////////////////////////////////////////////

if (!process.env.TEST) return

test('Can parse a string with just a command', (assert) => {
  let s = '69'
  let expected = [
    { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
  ]
  assert.deepEqual(parse(s), expected)
  assert.end()
})

test('Should use duration as period', (assert) => {
  let s = 'd=/8 69'
  let expected = [
    { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/8 } }
  ]
  assert.deepEqual(parse(s), expected)
  assert.end()
})

test('Can chain commands and rests', (assert) => {
  let s = 'd=/8 C d=/16 C# d=/8 _ d=/4 D _'
  let expected = [
    { type: 'NOTE', payload: { time: 0,     nn: 36, dur: 1/8 } },
    { type: 'NOTE', payload: { time: 1/8,   nn: 37, dur: 1/16 } },
    { type: 'NOTE', payload: { time: 5/16,  nn: 38, dur: 1/4 } },
    { type: 'NOOP', payload: { time: 13/16 } }
  ]
  assert.deepEqual(parse(s), expected)
  assert.end()
})
