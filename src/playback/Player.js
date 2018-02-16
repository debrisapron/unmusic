import _ from 'lodash/fp'

let Player = (sequencer) => {
  let stopCbs = {}

  let play = async (score) => {
    let sequence = sequenceFrom(score)
    sequencer.setTempo(score.tempo || 120)
    sequencer.setSequence(sequence)
    await Promise.all(Object.values(score.dependencies || {}))
    sequencer.start()
  }

  let stop = () => {
    let stopTime = sequencer.stop()
    _.forEach((stopCb) => {
      if (stopCb) stopCb(stopTime)
    }, stopCbs)
    stopCbs = {}
  }

  let sequenceFrom = (score) => {
    let lastPayload = _.last(score.actions).payload
    let length = lastPayload.time + (lastPayload.dur || 0)
    let nestedDisorderedEvents = score.actions
      .filter((action) => action.type !== 'NOOP')
      .map((action) => {
        let { payload } = action
        let id = _.uniqueId()
        let startTime = payload.time + (payload.offset || 0)
        startTime = wrap(startTime, length)
        let startEvent = { time: startTime, fn: (t) => startAction(t, id, action), ord: 1 }
        if (!payload.dur) return [startEvent]
        let endTime = startTime + payload.dur
        endTime = wrap(endTime, length)
        let stopEvent = { time: endTime, fn: (t) => endAction(t, id), ord: 0 }
        return [startEvent, stopEvent]
      })
    let events = _.sortBy(['time', 'ord'], _.flatten(nestedDisorderedEvents))
      .map((ev) => [ev.time, ev.fn])
    return { events, length }
  }

  let wrap = (time, length) => {
    time = time % length
    if(time >= 0) return time
    return time + length
  }

  let startAction = (time, id, action) => {
    let { payload } = action
    let stopCb = handle(time, action)
    if (!_.isFunction(stopCb)) return
    stopCbs[id] = stopCb
  }

  let endAction = (time, id) => {
    let stopCb = stopCbs[id]
    if (!stopCb) return
    stopCbs[id] = undefined
    stopCb(time)
  }

  function handle(time, action) {
    let callback = action.payload.callback
    return callback && callback(_.merge(action, { meta: { deadline: time } }))
  }

  return { play, stop }
}

export default Player
