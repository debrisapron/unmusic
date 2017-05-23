let _ = require('lodash/fp')

let DEFAULT_DURATION = 1/4

let generateIntermediate = (parsings) => {
  let context = { time: 0, octave: 0 }
  return _.compact(parsings.map((parsing) => {
    let [type, data] = parsing
    if (type === 'SETTING') {
      context = _.set(data.param, data.value, context)
      return null
    }
    if (type === 'OCTAVE_CHANGE') {
      context = _.set('octave', context.octave + data, context)
      return null
    }
    let dur = context.duration || DEFAULT_DURATION
    let instruction = { context, data, type }
    context = _.set('time', context.time + dur, context)
    return instruction
  }))
}

module.exports = generateIntermediate
