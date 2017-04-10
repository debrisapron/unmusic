let _ = require('lodash/fp')
let shortid = require('shortid')

let Player = (sequencer) => {
  let stopCbs = {}

  let play = (score) => {
    let events = sequencerEventsFrom(score)
    sequencer.play(events)
  }

  let stop = () => {
    let stopTime = sequencer.stop()
    _.forEach((stopCb) => {
      if (stopCb) stopCb(stopTime)
    }, stopCbs)
    stopCbs = {}
  }

  let sequencerEventsFrom = (score) => {
    let lastPayload = _.last(score.actions).payload
    let length = lastPayload.time + (lastPayload.dur || 0)
    let nestedDisorderedEvents = score.actions
      .filter((action) => action.type != 'NOOP')
      .map((action) => {
        let { payload } = action
        let id = shortid.generate()
        let startEvent = [payload.time, (time) => startAction(time, id, action)]
        if (!payload.dur) return [startEvent]
        let endTime = (payload.time + payload.dur) % length
        let stopEvent = [endTime, (time) => endAction(time, id)]
        return [startEvent, stopEvent]
      })
    let events = _.sortBy(0, _.flatten(nestedDisorderedEvents))
    if (_.last(events)[0] < length) events.push([length])
    return events.map((ev, i) => {
      if (i == 0) return ev
      return _.set(0, ev[0] - events[i - 1][0], ev)
    })
  }

  let startAction = (time, id, action) => {
    let { payload } = action
    if (!payload.dest) return
    let fn = payload.dest.trigger || payload.dest
    if (!_.isFunction(fn)) return
    let stopCb = fn(time, action)
    if (!_.isFunction(stopCb)) return
    stopCbs[id] = stopCb
  }

  let endAction = (time, id) => {
    let stopCb = stopCbs[id]
    if (!stopCb) return
    stopCbs[id] = undefined
    stopCb(time)
  }

  return { play, stop }
}

module.exports = Player

////////////////////////////////////////////////////////////////////////////////

if (!process.env.TEST) return

test('player can play a simple score', (assert) => {
  let events
  let starts = []
  let stops = []
  let dur = 1/4
  let mockSeq = {
    play: (_events) => events = _events,
    stop: () => 999
  }
  let dest = (time, action) => {
    starts.push([time, action])
    return (time) => stops.push([time, action])
  }
  let score = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 0, dur, dest } },
    { type: 'NOTE', payload: { time: 1/4, nn: 1, dur, dest } },
    { type: 'NOTE', payload: { time: 1/2, nn: 2, dur, dest } },
    { type: 'NOTE', payload: { time: 3/4, nn: 3, dur, dest } }
  ] }
  let player = Player(mockSeq)
  player.play(score)
  const times = events.map((ev) => ev[0])
  const expTimes = [0, 0, 0.25, 0, 0.25, 0, 0.25, 0, 0.25]
  assert.deepEqual(times, expTimes, 'sequencer should be passed expected list of times')
  // Simulate sequencer calling first 6 callbacks
  events.slice(0, 6).forEach((ev) => ev[1](0))
  player.stop()
  const notes = starts.map((start) => start[1].payload.nn)
  const expNotes = [0, 1, 2]
  assert.deepEqual(notes, expNotes, 'callbacks should play expected notes')
  const stoppedNotes = stops.map((stop) => stop[1].payload.nn)
  assert.deepEqual(stoppedNotes, expNotes, 'callbacks should stop all notes including hanging ones')
  assert.end()
})
