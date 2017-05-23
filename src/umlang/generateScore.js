
let PITCH_CLASSES = {
  'C': -9, 'C♯': -8, 'D♭': -8, 'D': -7,
  'D♯': -6, 'E♭': -6, 'E': -5, 'F': -4,
  'F♯': -3, 'G♭': -3, 'G': -2, 'G♯': -1,
  'A♭': -1, 'A': 0, 'A♯': 1, 'B♭': 1, 'B': 2
}

let generateScore = (instructions) => {
  return instructions.map((instruction) => {
    switch(instruction.type) {
      case 'NOTE': return noteActionFrom(instruction)
      case 'REST': return restActionFrom(instruction)
    }
    throw new Error('This instruction type is unknown to the score generator')
  })
}

let generateNoteAction = (instruction) => {
  let nn = nnFrom(instruction)
  let payload = _.omit(['octave'], instruction.context)
  payload = _.set('nn', nn, payload)
  return { payload, type: 'NOTE' }
}

let nnFrom(instruction) => {
  switch(instruction.data.type) {
    case 'PITCH_CLASS':
      return (instruction.context.octave * 12) + PITCH_CLASSES[instruction.data.value]
    case 'RELATIVE':
      return (instruction.context.octave * 12) + instruction.data.value
    case 'MIDI':
      return instruction.data.value
  }
  throw new Error('This note type is unknown to the score generator')
}

let restActionFrom = (instruction) => {
  return { type: 'NOOP', payload: { time: instruction.context.time } }
}

module.exports = generateScore
