import Player from '../src/playback/Player'

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
    let callback = (time, action) => {
      starts.push([time, action])
      return (time) => stops.push([time, action])
    }
    let score = { actions: [
      { type: 'NOTE', payload: { time: 0,   nn: 0, dur, callback } },
      { type: 'NOTE', payload: { time: 1/4, nn: 1, dur, callback } },
      { type: 'NOTE', payload: { time: 1/2, nn: 2, dur, callback } },
      { type: 'NOTE', payload: { time: 3/4, nn: 3, dur, callback } }
    ], tempo: 130 }
    let player = Player(mockSeq)
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
