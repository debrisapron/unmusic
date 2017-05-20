let _ = require('lodash/fp')
let WaaClock = require('waaclock')

const TEMPO = 120
const INITIAL_LATENCY = 0.01

let Sequencer = (audioContext) => {
  let clock = new WAAClock(audioContext, { toleranceEarly: 0.01 })
  let events = []

  let setEvents = (eventsByTime) => {
    events = _.sortBy('[0]', eventsByTime).map(([time, cb], i, arr) => {
      let delta = i === 0 ? time : (time - arr[i - 1][0])
      return { time, delta, cb }
    })
  }

  let play = () => {
    if (!events.length) return
    let firstTime = secsFrom(events[0].time)
    let now = audioContext.currentTime
    let firstDispatchTime = now + firstTime + INITIAL_LATENCY
    clock.start()
    clock.callbackAtTime(
      () => dispatch(0, firstDispatchTime),
      firstDispatchTime
    )
    return now + INITIAL_LATENCY
  }

  let stop = () => {
    clock.stop()
    return audioContext.currentTime
  }

  let dispatch = (index, deadline) => {
    let cb = events[index].cb
    if (cb) cb(deadline)
    let nextIndex = index + 1
    if(nextIndex === events.length) nextIndex = 0
    let nextDeadline = deadline + secsFrom(events[nextIndex].delta)
    clock.callbackAtTime(() => dispatch(nextIndex, nextDeadline), nextDeadline)
  }

  let secsFrom = (notes) => notes * (240 / TEMPO)

  return { setEvents, play, stop }
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
  let sequence = [
    [0,   cb],
    [3/4, cb],
    [1/4, cb],
    [1/2, cb],
    [1]
  ]
  let ac = new AudioContext()
  let sequencer = Sequencer(ac)
  startTime = ac.currentTime
  sequencer.setEvents(sequence)
  sequencer.play()
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
