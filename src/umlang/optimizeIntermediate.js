let _ = require('lodash/fp')

// Filter out all rests unless at the end of the sequence & make trailing rests durationless.
let optimizeIntermediate = (instructions) => {
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

module.exports = optimizeIntermediate
