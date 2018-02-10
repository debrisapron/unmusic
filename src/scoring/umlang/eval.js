import _ from 'lodash/fp'
import nearley from 'nearley'
import grammar from './grammar.js'

let DEFAULT_DURATION = 1/4
let PARAM_ALIASES = {
  d: 'dur',
  duration: 'dur',
  v: 'vel',
  velocity: 'vel'
}
let MIDDLE_A_NN = 69
let PITCH_CLASSES = {
  'C': -9, 'C♯': -8, 'D♭': -8, 'D': -7,
  'D♯': -6, 'E♭': -6, 'E': -5, 'F': -4,
  'F♯': -3, 'G♭': -3, 'G': -2, 'G♯': -1,
  'A♭': -1, 'A': 0, 'A♯': 1, 'B♭': 1, 'B': 2
}

function noteActionFrom(instruction) {
  let nn = nnFrom(instruction)
  let payload = _.omit(['oct'], instruction.context)
  payload = _.set('nn', nn, payload)
  return { payload, type: 'NOTE' }
}

function nnFrom(instruction) {
  switch(instruction.data.type) {
    case 'PITCH_CLASS':
      let value = instruction.data.value.replace('#', '♯').replace('b', '♭')
      return (instruction.context.oct * 12) + MIDDLE_A_NN + PITCH_CLASSES[value]
    case 'RELATIVE':
      return (instruction.context.oct * 12) + MIDDLE_A_NN + instruction.data.value
    case 'MIDI':
      return instruction.data.value
  }
  throw new Error('This note type is unknown to the score generator')
}

function trigActionFrom(instruction) {
  let payload = _.omit(['oct'], instruction.context)
  payload = _.set('name', instruction.data, payload)
  return { payload, type: 'TRIG' }
}

function restActionFrom(instruction) {
  return { type: 'NOOP', payload: { time: instruction.context.time } }
}

function generateScore(instructions) {
  return instructions.map((instruction) => {
    switch(instruction.type) {
      case 'NOTE': return noteActionFrom(instruction)
      case 'TRIG': return trigActionFrom(instruction)
      case 'REST': return restActionFrom(instruction)
    }
    throw new Error('This instruction type is unknown to the score generator')
  })
}

function optimizeIntermediate(instructions) {
  let lastIndex = instructions.length - 1
  instructions = instructions.filter(({ type }, i) => type !== 'REST' || i === lastIndex)
  let last = _.last(instructions)
  if (last.type === 'REST') {
    // HACK all aboard for mutation central
    last.context.time = last.context.time + last.context.dur
    delete last.context.dur
  }
  return instructions
}

function normalizeParamName(param) {
  return PARAM_ALIASES[param] || param
}

function generateIntermediate(parsings) {
  let context = { time: 0, oct: 0, dur: DEFAULT_DURATION }
  return _.compact(parsings.map((parsing) => {
    let [type, data] = parsing
    if (type === 'SETTING') {
      context = _.set(normalizeParamName(data.param), data.value, context)
      return null
    }
    if (type === 'OCTAVE_CHANGE') {
      context = _.set('oct', context.oct + data, context)
      return null
    }
    let instruction = { context, data, type }
    context = _.set('time', context.time + context.dur, context)
    return instruction
  }))
}

function parse(s) {
  let parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart)
  parser.feed(s)
  let parsings = parser.results
  if (parsings.length > 1) {
    throw new Error('Syntax error in sequence: combination is ambiguous')
  }
  return _.compact(parsings[0])
}

////////////////////////////////////////////////////////////////////////////////

function eval(s) {
  s = (s || '').trim()
  return generateScore(optimizeIntermediate(generateIntermediate(parse(s))))
}

export default eval
