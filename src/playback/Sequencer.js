import _ from 'lodash/fp'
import WaaClock from 'waaclock'

let INITIAL_LATENCY = 0.01

function Sequencer(ac) {
  let clock = new WaaClock(ac, { toleranceEarly: 0.01 })
  let events = []
  let playing = false
  let tempo = 120
  let nextIndex
  let nextTick

  function setEvents(eventsByTime) {
    let oldEvents = events

    events = _.sortBy('[0]', eventsByTime).map(([time, cb], i, arr) => {
      let delta = i === 0 ? time : (time - arr[i - 1][0])
      return { time, delta, cb }
    })

    if (!playing) return
    let newLength = _.last(events).time
    let oldLength = _.last(oldEvents).time
    if (newLength !== oldLength) {
      // TODO If seqs are different lengths, snap to nearest note
      stop()
      play()
      return
    }

    // This is horrible. Must be an easier way.
    let now = ac.currentTime
    let secsToNextDeadline = nextTick.deadline - now
    nextTick.clear()
    let pos = oldEvents[nextIndex].time - notesFrom(secsToNextDeadline)
    if (pos < 0) pos = pos + newLength // Not sure this is needed
    nextIndex = events.findIndex((ev) => ev.time > pos)
    let nextDeadline = now + secsFrom(events[nextIndex].time - pos)
    scheduleNext(nextDeadline)
  }

  function setTempo(bpm) {
    tempo = bpm
  }

  function play() {
    if (playing || !events.length) return
    playing = true
    let firstTime = secsFrom(events[0].time)
    let now = ac.currentTime
    let firstDeadline = now + firstTime + INITIAL_LATENCY
    clock.start()
    nextIndex = 0
    scheduleNext(firstDeadline)
    return now + INITIAL_LATENCY
  }

  function stop() {
    if (!playing) return
    playing = false
    clock.stop()
    return ac.currentTime
  }

  function dispatch(index, deadline) {
    let cb = events[index].cb
    if (cb) cb(deadline)
    nextIndex = index + 1
    if(nextIndex === events.length) nextIndex = 0
    let nextDeadline = deadline + secsFrom(events[nextIndex].delta)
    scheduleNext(nextDeadline)
  }

  function scheduleNext(deadline) {
    nextTick = clock.callbackAtTime(
      () => dispatch(nextIndex, deadline),
      deadline
    )
  }

  function secsFrom(notes) {
    return notes * notesPerSec()
  }

  function notesFrom(secs) {
    return secs / notesPerSec()
  }

  function notesPerSec() {
    return 240 / tempo
  }

  return { setEvents, setTempo, play, stop }
}

export default Sequencer
