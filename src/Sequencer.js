let _ = require('lodash/fp')
let WaaClock = require('waaclock')

const TEMPO = 120
const INITIAL_LATENCY = 0.01

let Sequencer = (audioContext) => {
  let clock = new WAAClock(audioContext, { toleranceEarly: 0.01 })
  let playingEvents

  let play = (events) => {
    if (playingEvents || !events.length) return
    playingEvents = events
    let firstDeltaTime = secsFrom(deltaOf(playingEvents[0]))
    let now = audioContext.currentTime
    let firstDispatchTime = now + firstDeltaTime + INITIAL_LATENCY
    clock.start()
    clock.callbackAtTime(
      () => dispatch(0, firstDispatchTime),
      firstDispatchTime
    )
    return now + INITIAL_LATENCY
  }

  let stop = () => {
    clock.stop()
    playingEvents = null
    return audioContext.currentTime
  }

  let dispatch = (index, deadline) => {
    let cb = callbackOf(playingEvents[index])
    if (cb) cb(deadline)
    let nextIndex = index + 1
    if(nextIndex === playingEvents.length) nextIndex = 0
    let nextDeadline = deadline + secsFrom(deltaOf(playingEvents[nextIndex]))
    clock.callbackAtTime(() => dispatch(nextIndex, nextDeadline), nextDeadline)
  }

  let secsFrom = (notes) => notes * (240 / TEMPO)
  let deltaOf = _.get(0)
  let callbackOf = _.get(1)

  return { play, stop }
}

module.exports = Sequencer

////////////////////////////////////////////////////////////////////////////////

if (!process.env.SLOW_TEST) return

// lodash fp round doesn't support precision :/
let round = require('lodash').round

let approxEqual = (a, b) => round(a, 5) === round(b, 5)

test('sequencer can play simple sequence', (assert) => {
  let startTime
  let times = []
  let cb = (time) => times.push(time - startTime)
  let events = [
    [0,   cb],
    [1/4, cb],
    [1/4, cb],
    [1/4, cb],
    [1/4]
  ]
  let ac = new AudioContext()
  let sequencer = Sequencer(ac)
  startTime = ac.currentTime
  sequencer.play(events)
  setTimeout(finish, 2100)

  function finish() {
    sequencer.stop()
    assert.equal(times.length, 5, 'callback should have been called five times')
    let intervalsOK = true
    times.reduce((prev, next) => {
      intervalsOK = intervalsOK && approxEqual(next - prev, 0.5)
      return next
    })
    assert.ok(intervalsOK, 'interval between each callback should be close to 0.5')
    assert.end()
  }
})
