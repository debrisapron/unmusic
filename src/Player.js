let _ = require('lodash/fp')

let Player = (sequencer, controller) => {
  let stopCbs = {}

  let play = (score) => {
    let onceReady = controller.prepare(score)
    let events = sequencerEventsFrom(score)
    return onceReady.then(() => {
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
    if (_.last(events).time < length) events.push({ time: length })
    return events.map((ev) => [ev.time, ev.fn])
  }

  let wrap = (time, length) => {
    time = time % length
    if(time >= 0) return time
    return time + length
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
      let startedActions = []
      let stoppedActions = []
      let dur = 1/4
      let mockSeq = {
        setEvents: (_events) => events = _events,
        setTempo: (_tempo) => tempo = _tempo,
        play: () => 0,
        stop: () => 999
      }
      let controller = {
        prepare: () => Promise.resolve(),
        handle: (time, action) => {
          startedActions.push(action)
          return (t) => stoppedActions.push(action)
        }
      }
      let score = { actions: [
        { type: 'TRIG', payload: { time: 0,   name: 'foo', dur } },
        { type: 'NOTE', payload: { time: 1/4, nn: 1, dur } },
        { type: 'NOTE', payload: { time: 1/2, nn: 2, dur } },
        { type: 'NOTE', payload: { time: 3/4, nn: 3, dur } }
      ], tempo: 130 }
      let player = Player(mockSeq, controller)

      return player.play(score).then(() => {
        expect(tempo).to.equal(130)
        const times = events.map((ev) => ev[0])
        const expTimes = [0, 0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75, 1]
        expect(times).to.deep.equal(expTimes)
        // Simulate sequencer calling first 6 callbacks
        events.slice(0, 6).forEach((ev) => ev[1](0))
        player.stop()
        const notes = startedActions.map((a) => a.payload.nn)
        const expNotes = [undefined, 1, 2]
        expect(notes).to.deep.equal(expNotes)
        expect(startedActions[0].payload.name).to.equal('foo')
        const stoppedNotes = stoppedActions.map((a) => a.payload.nn)
        expect(stoppedNotes).to.deep.equal(expNotes)
      })
    })
  })

  it('can play a score with offsets', () => {
    let events
    let mockSeq = {
      setEvents: (_events) => events = _events,
      setTempo: (_tempo) => tempo = _tempo,
      play: () => 0
    }
    let controller = {
      prepare: () => Promise.resolve()
    }
    let score = { actions: [
      { type: 'NOTE', payload: { time: 0,   nn: 1, dur: 1/4, offset: -1/32 } },
      { type: 'NOTE', payload: { time: 1/2, nn: 1, dur: 1/4, offset:  1/32 } },
      { type: 'NOOP', payload: { time: 1 } },
    ] }
    let player = Player(mockSeq, controller)

    return player.play(score).then(() => {
      const times = events.map((ev) => ev[0])
      const expTimes = [7/32, 17/32, 25/32, 31/32, 1]
      expect(times).to.deep.equal(expTimes)
    })
  })
}
