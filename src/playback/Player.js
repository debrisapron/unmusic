import _ from 'lodash/fp'

let depsCache = {}

function Player(sequencer) {
  let stopCbs = {}

  function sequenceFrom(score) {
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

  function wrap(time, length) {
    time = time % length
    if(time >= 0) return time
    return time + length
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
    return callback && callback(_.merge(action, { meta: { deadline: time } }))
  }

  //////////////////////////////////////////////////////////////////////////////

  function prepare(score) {
    let promises = Object.keys(score.dependencies || {}).map((k) => {
      return depsCache[k] || (depsCache[k] = score.dependencies[k]())
    })
    return Promise.all(promises)
  }

  async function play(score) {
    let sequence = sequenceFrom(score)
    sequencer.setTempo(score.tempo || 120)
    sequencer.setSequence(sequence)
    await prepare(score)
    sequencer.start()
  }

  function stop() {
    let stopTime = sequencer.stop()
    _.forEach((stopCb) => {
      if (stopCb) stopCb(stopTime)
    }, stopCbs)
    stopCbs = {}
  }

  return { play, stop, prepare }
}

export default Player
