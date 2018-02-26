import MockSequencer from '../__mocks__/um-sequencer.js'

describe('play', () => {

  test('can play a simple score', async () => {
    let starts = []
    let stops = []
    let dur = 1/4
    let callback = (action) => {
      starts.push([action.meta.deadline, action])
      return (time) => stops.push([time, action])
    }
    let score = { actions: [
      { type: 'NOTE', payload: { time: 0,   nn: 0, dur, callback } },
      { type: 'NOTE', payload: { time: 1/4, nn: 1, dur, callback } },
      { type: 'NOTE', payload: { time: 1/2, nn: 2, dur, callback } },
      { type: 'NOTE', payload: { time: 3/4, nn: 3, dur, callback } }
    ], tempo: 130 }
    await um.play(score)
    let [events, { tempo, loopLength }] = MockSequencer.__args.playArgs
    expect(tempo).toEqual(130)
    expect(loopLength).toEqual(1)
    const times = events.map((ev) => ev.time)
    const expTimes = [0, 0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75]
    expect(times).toMatchObject(expTimes)
    // Simulate sequencer calling first 6 callbacks
    events.slice(0, 6).forEach((ev) => ev.callback(0))
    um.stop()
    const notes = starts.map((start) => start[1].payload.nn)
    const expNotes = [0, 1, 2]
    expect(notes).toMatchObject(expNotes)
    const stoppedNotes = stops.map((stop) => stop[1].payload.nn)
    expect(stoppedNotes).toMatchObject(expNotes)
  })
})
