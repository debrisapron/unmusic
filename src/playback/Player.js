import _ from 'lodash/fp'

function Player(sequencer) {
  let stopCbs = {}

  function play(score) {
    let events = sequencerEventsFrom(score)
    sequencer.setTempo(score.tempo || 120)
    sequencer.setEvents(events)
    sequencer.play()
  }

  function stop() {
    let stopTime = sequencer.stop()
    _.forEach((stopCb) => {
      if (stopCb) stopCb(stopTime)
    }, stopCbs)
    stopCbs = {}
  }

  function sequencerEventsFrom(score) {
    let lastPayload = _.last(score.actions).payload
    let length = lastPayload.time + (lastPayload.dur || 0)
    let nestedDisorderedEvents = score.actions
      .filter((action) => action.type != 'NOOP')
      .map((action) => {
        let { payload } = action
        let id = _.uniqueId()
        let startEvent = { time: payload.time, fn: (time) => startAction(time, id, action), ord: 1 }
        if (!payload.dur) return [startEvent]
        let endTime = (payload.time + payload.dur) % length
        let stopEvent = { time: endTime, fn: (time) => endAction(time, id), ord: 0 }
        return [startEvent, stopEvent]
      })
    let events = _.sortBy(['time', 'ord'], _.flatten(nestedDisorderedEvents))
    if (_.last(events).time < length) events.push({ time: length })
    return events.map((ev) => [ev.time, ev.fn])
  }

  function startAction(time, id, action) {
    let { payload } = action
    let stopCb = handle(time, action)
    if (!_.isFunction(stopCb)) return
    stopCbs[id] = stopCb
  }

  function endAction(time, id) {
    let stopCb = stopCbs[id]
    if (!stopCb) return
    stopCbs[id] = undefined
    stopCb(time)
  }

  function handle(time, action) {
    let callback = action.payload.callback
    return callback && callback(time, action)
  }

  return { play, stop }
}

export default Player
