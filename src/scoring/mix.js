let _ = require('lodash/fp')
let h = require('./support/helpers')

let mixScores = (scores) => {
  let [loops, nonLoops] = _.partition((score) => score.loop, scores)
    .map((scores) => scores.map(h.getActions))

  if (loops.length) {
    // If there are any non-loops, adjust the length of any loops to the length
    // of the longest non-loop.
    // If there are only loops, adjust their lengths to the lowest common
    // multiple of all their lengths.
    let length = nonLoops.length
      ? _.max(nonLoops.map(h.lengthOf))
      : lcm(loops.map(h.lengthOf))
    loops = loops.map(extend(length))
  }

  let actionLists = loops.concat(nonLoops)
  let mixed = _.flatten(actionLists)
  let sorted = _.sortBy('payload.time', mixed)
  let score = h.wrapActions(h.cleanActions(sorted))
  if (!nonLoops.length) score.loop = true
  return score
}

let mix = h.scoreTransformer({ mergeScores: mixScores })

// Repeat or trim a list of actions to the given length.
let extend = _.curry((length, actions) => {
  let loopLength = h.lengthOf(actions)
  let wholeRepetitions = Math.floor(length / loopLength)
  let lastRepetitionLength = length % loopLength
  let lastActions = trim(lastRepetitionLength, actions)
  let actionLists = wholeRepetitions
    ? Array(wholeRepetitions).fill(actions)
    : []
  actionLists.push(lastActions)
  return h.concatActions(actionLists)
})

// Trim a list of actions to the given length, shortening the last event if
// necessary.
// TODO should just shorten period, not dur
let trim = (length, actions) => {
  actions = actions.filter((a) => a.payload.time < length)
  if (!actions.length) return actions
  if (h.lengthOf(actions) > length) {
    let lastAction = _.last(actions)
    lastAction = _.set('payload.dur', length - lastAction.payload.time, lastAction)
    actions = _.initial(actions).concat(lastAction)
  }
  return actions
}

// Next 3 function adapted from
// https://github.com/felipernb/algorithms.js/tree/master/src/algorithms/math

let pairGcd = (a, b) => {
  let tmp = a
  a = Math.max(a, b)
  b = Math.min(tmp, b)
  while (b !== 0) {
    tmp = b
    b = a % b
    a = tmp
  }

  return a
}

let pairLcm = (a, b) => {
  if (a === 0 || b === 0) return 0
  a = Math.abs(a)
  b = Math.abs(b)
  return a / pairGcd(a, b) * b
}

let lcm = (values) => values.reduce(pairLcm)

module.exports = mix

////////////////////////////////////////////////////////////////////////////////

if (!process.env.TEST) return

let sort = (score) => {
  let sortedActions = _.sortBy(['payload.time', 'payload.nn'], score.actions)
  return _.set('actions', sortedActions, score)
}

test('Can mix two scores', (assert) => {
  let s1 = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 3/8, nn: 69, dur: 1/4 } }
  ] }
  let s2 = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/4, nn: 70, dur: 1/4 } },
    { type: 'NOOP', payload: { time: 3/8 } }
  ] }
  let expected = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 0,   nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/4, nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 3/8, nn: 69, dur: 1/4 } }
  ] }
  assert.deepEqual(mix(s1, s2), expected)
  assert.end()
})

test('Can mix two scores, one looped, one not', (assert) => {
  let s1 = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 3/8, nn: 69, dur: 1/4 } }
  ], loop: true }
  let s2 = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/4, nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 3/4, nn: 70, dur: 1/4 } }
  ] }
  let expected = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 0,   nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/4, nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 3/8, nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 5/8, nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 3/4, nn: 70, dur: 1/4 } }
  ] }
  assert.deepEqual(sort(mix(s1, s2)), expected)
  assert.end()
})

test('Can mix two looped scores', (assert) => {
  let s1 = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/4, nn: 69, dur: 1/4 } }
  ], loop: true }
  let s2 = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/2, nn: 70, dur: 1/4 } }
  ], loop: true }
  let expected = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 0,   nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/4, nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/2, nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/2, nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 3/4, nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 3/4, nn: 70, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 5/4, nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 5/4, nn: 70, dur: 1/4 } }
  ], loop: true }
  assert.deepEqual(sort(mix(s1, s2)), expected)
  assert.end()
})
