import _ from 'lodash/fp'
import Sequencer from 'um-sequencer'

export default function Player(audioContext) {
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
        startTime = wraparound(startTime, length)
        let startEvent = {
          time: startTime,
          callback: (t) => startAction(t, id, action),
          ord: 1
        }
        if (!payload.dur) return [startEvent]
        let endTime = startTime + payload.dur
        endTime = wraparound(endTime, length)
        let stopEvent = {
          time: endTime,
          callback: (t) => endAction(t, id),
          ord: 0
        }
        return [startEvent, stopEvent]
      })
    return _.sortBy(['time', 'ord'], _.flatten(nestedDisorderedEvents))
  }

  function wraparound(time, length) {
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

  // TODO Move the handler composition stuff into eventsFrom.
  function dispatch(time, action) {
    let handlers = action.payload && action.payload.handlers
    if (!(handlers && handlers.length)) { return }
    let callbacks = handlers.map((handler) => handler.handle || handler)
    action = _.set('meta.time', time, action)

    // Do all the things.
    let completedAction = callbacks.reduce((action, callback) => {
      return callback(action, { audioContext })
    }, action)

    // Connect action's WAA output node (if returned).
    let outputNode = completedAction.meta.outputNode
    if (outputNode) {
      outputNode.connect(audioContext.destination)
    }

    // Create stop callback which calls all action's stop callbacks (if returned).
    let actionStopCbs = completedAction.meta.stopCbs
    if (actionStopCbs && actionStopCbs.length) {
      return (stopTime) => actionStopCbs.forEach((cb) => cb(stopTime))
    }
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
    let handlers = _.uniq(_.flatten(
      score.actions.map((action) => {
        return (action.payload && action.payload.handlers) || []
      })
    ))
    let promises = _.compact(
      handlers.map(({ prepare }) => {
        return prepare && prepare({ audioContext })
      })
    )
    return Promise.all(promises)
  }

  async function play(score, { loop = true } = {}) {
    let loopLength = loop && lengthOf(score)
    let events = eventsFrom(score)
    let tempo = score.tempo || 120
    await prepare(score)
    flushHangingNotes()
    sequencer.play(events, { tempo, loopLength })
  }

  function playOnce(score) {
    play(score, { loop: false })
  }

  function stop() {
    sequencer.stop()
    flushHangingNotes()
  }

  return { play, playOnce, stop, prepare }
}
