let test = require('tape'
let { play } = require('../src/player'

test('Can play a sequence once at 120bpm', (assert) => {
  events = []
  scheduleCount = 0
  let seq = [
    { delta: 0,   type: 'note', nn: 69 },
    { delta: 1/4, type: 'note', nn: 69 },
    { delta: 1/4, type: 'end' }
  ]
  let expected = [
    [0.01, { delta: 0,   type: 'note', nn: 69 }],
    [0.51, { delta: 1/4, type: 'note', nn: 69 }]
  ]
  play({ schedule, defaultDest: record, latency: 0.01 }, seq)
  scheduledCallback() // play first note
  scheduledCallback() // play second note
  scheduledCallback() // play end
  assert.equal(scheduleCount, 3)
  assert.deepEqual(events, expected)
  assert.end()
})

test('Can play a sequence once at 60bpm', (assert) => {
  events = []
  scheduleCount = 0
  let seq = [
    { delta: 0,   type: 'note', nn: 69 },
    { delta: 1/4, type: 'note', nn: 69 },
    { delta: 1/4, type: 'end' }
  ]
  let expected = [
    [0.01, { delta: 0,   type: 'note', nn: 69 }],
    [1.01, { delta: 1/4, type: 'note', nn: 69 }]
  ]
  play({ schedule, defaultDest: record, latency: 0.01, tempo: 60 }, seq)
  scheduledCallback() // play first note
  scheduledCallback() // play second note
  scheduledCallback() // play end
  assert.equal(scheduleCount, 3) // last callback shouldn't schedule anything
  assert.deepEqual(events, expected)
  assert.end()
})

test('Can play a sequence in a loop at 60bpm', (assert) => {
  events = []
  let seq = [
    { delta: 0,   type: 'note', nn: 69 },
    { delta: 1/4, type: 'note', nn: 69 },
    { delta: 1/4, type: 'end' }
  ]
  let expected = [
    [0.01, { delta: 0,   type: 'note', nn: 69 }],
    [1.01, { delta: 1/4, type: 'note', nn: 69 }],
    [2.01, { delta: 0,   type: 'note', nn: 69 }],
    [3.01, { delta: 1/4, type: 'note', nn: 69 }]
  ]
  play({ schedule, defaultDest: record, latency: 0.01, tempo: 60, loop: true }, seq)
  scheduledCallback() // play first note
  scheduledCallback() // play second note
  scheduledCallback() // play end
  scheduledCallback() // play first note again
  scheduledCallback() // play second note again
  assert.deepEqual(events, expected)
  assert.end()
})

test('Can play a sequence with custom destinations', (assert) => {
  events = []
  let noop = () => {}
  let seq = [
    { delta: 0,   dest: noop,   type: 'note', nn: 69 },
    { delta: 1/4, dest: record, type: 'note', nn: 69 },
    { delta: 1/4, type: 'end' }
  ]
  let expected = [
    [1.01, { delta: 1/4, dest: record, type: 'note', nn: 69 }]
  ]
  play({ schedule, tempo: 60, latency: 0.01 }, seq)
  scheduledCallback() // play first note into the void
  scheduledCallback() // play second note into record
  assert.deepEqual(events, expected)
  assert.end()
})

let scheduledCallback
let scheduleCount
let schedule = (callback) => {
  if(callback) {
    scheduleCount++
    scheduledCallback = callback
  }
  return 0
}

let events
let record = (...args) => events.push(args)
