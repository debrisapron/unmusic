let _ = require('lodash/fp')

let Player = (sequencer, controller) => {
  let stopCbs = {}

  let play = (score) => {
    let onceReady = controller.prepare(score)
    let events = sequencerEventsFrom(score)
    onceReady.then(() => {
      sequencer.setTempo(score.tempo || 120)
      sequencer.setEvents(events)
      sequencer.play()
    }).catch((err) => {
      throw err
    })
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

  let startAction = (time, id, action) => {
    let { payload } = action
    let stopCb = controller.handle(time, action)
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

if (process.env.TEST) {

  describe('player', () => {

    it('can play a simple score', () => {
      let events
      let tempo
      let starts = []
      let stops = []
      let dur = 1/4
      let mockSeq = {
        setEvents: (_events) => events = _events,
        setTempo: (_tempo) => tempo = _tempo,
        play: () => 0,
        stop: () => 999
      }
      let controller = {
        handle: (time, action) => {
          starts.push([time, action])
          return (time) => stops.push([time, action])
        }
      }
      let score = { actions: [
        { type: 'NOTE', payload: { time: 0,   nn: 0, dur } },
        { type: 'NOTE', payload: { time: 1/4, nn: 1, dur } },
        { type: 'NOTE', payload: { time: 1/2, nn: 2, dur } },
        { type: 'NOTE', payload: { time: 3/4, nn: 3, dur } }
      ], tempo: 130 }
      let player = Player(mockSeq, controller)
      player.play(score)
      expect(tempo).to.equal(130)
      const times = events.map((ev) => ev[0])
      const expTimes = [0, 0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75, 1]
      expect(times).to.deep.equal(expTimes)
      // Simulate sequencer calling first 6 callbacks
      events.slice(0, 6).forEach((ev) => ev[1](0))
      player.stop()
      const notes = starts.map((start) => start[1].payload.nn)
      const expNotes = [0, 1, 2]
      expect(notes).to.deep.equal(expNotes)
      const stoppedNotes = stops.map((stop) => stop[1].payload.nn)
      expect(stoppedNotes).to.deep.equal(expNotes)
    })
  })
}
