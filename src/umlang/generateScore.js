let _ = require('lodash/fp')

let MIDDLE_A_NN = 69
let PITCH_CLASSES = {
  'C': -9, 'C♯': -8, 'D♭': -8, 'D': -7,
  'D♯': -6, 'E♭': -6, 'E': -5, 'F': -4,
  'F♯': -3, 'G♭': -3, 'G': -2, 'G♯': -1,
  'A♭': -1, 'A': 0, 'A♯': 1, 'B♭': 1, 'B': 2
}

let noteActionFrom = (instruction) => {
  let nn = nnFrom(instruction)
  let payload = _.omit(['oct'], instruction.context)
  payload = _.set('nn', nn, payload)
  return { payload, type: 'NOTE' }
}

let nnFrom = (instruction) => {
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

let restActionFrom = (instruction) => {
  return { type: 'NOOP', payload: { time: instruction.context.time } }
}

// Exports

let generateScore = (instructions) => {
  return instructions.map((instruction) => {
    switch(instruction.type) {
      case 'NOTE': return noteActionFrom(instruction)
      case 'REST': return restActionFrom(instruction)
    }
    throw new Error('This instruction type is unknown to the score generator')
  })
}

module.exports = generateScore
