import _ from 'lodash/fp'
import Sequencer from 'um-sequencer'

let depsCache = {}

function Player(audioContext) {
  let sequencer = Sequencer(() => audioContext.currentTime)
  let stopCbs = {}

  function lengthOf(score) {
    let lastPayload = _.last(score.actions).payload
    return lastPayload.time + (lastPayload.dur || 0)
  }

  function eventsFrom(score) {
    let length = lengthOf(score)
    let nestedDisorderedEvents = score.actions
      .filter((action) => action.type !== 'NOOP')
      .map((action) => {
        let { payload } = action
        let id = _.uniqueId()
        let startTime = payload.time + (payload.offset || 0)
        startTime = wrap(startTime, length)
        let startEvent = {
          time: startTime,
          callback: (t) => startAction(t, id, action),
          ord: 1
        }
        if (!payload.dur) return [startEvent]
        let endTime = startTime + payload.dur
        endTime = wrap(endTime, length)
        let stopEvent = {
          time: endTime,
          callback: (t) => endAction(t, id),
          ord: 0
        }
        return [startEvent, stopEvent]
      })
    return _.sortBy(['time', 'ord'], _.flatten(nestedDisorderedEvents))
  }

  function wrap(time, length) {
    time = time % length
    if(time >= 0) return time
    return time + length
  }

  function startAction(time, id, action) {
    let { payload } = action
    let stopCb = dispatch(time, action)
    if (!_.isFunction(stopCb)) return
    stopCbs[id] = stopCb
  }

  function endAction(time, id) {
    let stopCb = stopCbs[id]
    if (!stopCb) return
    stopCbs[id] = undefined
    stopCb(time)
  }

  function dispatch(time, action) {
    let callback = action.payload.callback
    return callback && callback(_.merge(action, { meta: { deadline: time } }))
  }

  function flushHangingNotes() {
    let stopTime = audioContext.currentTime
    _.forEach((stopCb) => {
      if (stopCb) { stopCb(stopTime) }
    }, stopCbs)
    stopCbs = {}
  }

  //////////////////////////////////////////////////////////////////////////////

  function prepare(score) {
    let promises = Object.keys(score.dependencies || {}).map((k) => {
      return depsCache[k] || (depsCache[k] = score.dependencies[k]())
    })
    return Promise.all(promises)
  }

  async function play(score) {
    let loopLength = lengthOf(score)
    let events = eventsFrom(score)
    let tempo = score.tempo || 120
    await prepare(score)
    flushHangingNotes()
    sequencer.play(events, { tempo, loopLength })
  }

  function stop() {
    sequencer.stop()
    flushHangingNotes()
  }

  return { play, stop, prepare }
}

export default Player
