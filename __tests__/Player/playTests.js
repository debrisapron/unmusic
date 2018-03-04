import _ from 'lodash/fp'
import MockSequencer from '../../__mocks__/um-sequencer.js'

describe('play', () => {

  test('can play a simple score', async () => {
    let startedActions = []
    let stoppedActions = []
    let dur = 1/4
    let handlers = [(action) => {
      startedActions.push(action)
      return { meta: { stopCbs: [(time) => stoppedActions.push(action)] } }
    }]
    let score = { actions: [
      { type: 'NOTE', payload: { time: 0,   nn: 0, dur, handlers } },
      { type: 'NOTE', payload: { time: 1/4, nn: 1, dur, handlers } },
      { type: 'NOTE', payload: { time: 1/2, nn: 2, dur, handlers } },
      { type: 'NOTE', payload: { time: 3/4, nn: 3, dur, handlers } }
    ], tempo: 130 }
    await um.play(score)
    let [events, { tempo, loopLength }] = MockSequencer.__args.playArgs
    expect(tempo).toEqual(130)
    expect(loopLength).toEqual(1)
    let times = events.map((ev) => ev.time)
    let expTimes = [0, 0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75]
    expect(times).toMatchObject(expTimes)
    // Simulate sequencer calling first 6 callbacks
    events.slice(0, 6).forEach((ev) => ev.callback(0))
    um.stop()
    let notes = startedActions.map((action) => action.payload.nn)
    let expNotes = [0, 1, 2]
    expect(notes).toMatchObject(expNotes)
    let stoppedNotes = stoppedActions.map((action) => action.payload.nn)
    expect(stoppedNotes).toMatchObject(expNotes)
  })

  test('can compose multiple action handlers', async () => {
    let returnedAction
    let getResult = (action) => returnedAction = action
    let plusOne = (action) => _.set('payload.nn', action.payload.nn + 1, action)
    let timesTen = (action) => _.set('payload.nn', action.payload.nn * 10, action)
    let handlers = [plusOne, timesTen, getResult]
    let score = { actions: [
      { type: 'NOTE', payload: { time: 0, nn: 1, handlers } }
    ] }
    await um.play(score)
    let callback = MockSequencer.__args.playArgs[0][0].callback
    callback(0)
    expect(returnedAction.payload.nn).toEqual(20)
  })

  // TODO Test handlers with prepare.
})
