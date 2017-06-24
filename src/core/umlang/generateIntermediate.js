let _ = require('lodash/fp')

let DEFAULT_DURATION = 1/4
let PARAM_ALIASES = {
  d: 'dur',
  duration: 'dur',
  v: 'vel',
  velocity: 'vel'
}

let normalizeParamName = (param) => {
  return PARAM_ALIASES[param] || param
}

let generateIntermediate = (parsings) => {
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

module.exports = generateIntermediate
