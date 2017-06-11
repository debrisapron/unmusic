let _ = require('lodash/fp')
let WaaClock = require('waaclock')

const INITIAL_LATENCY = 0.01

let Sequencer = (ac) => {
  let clock = new WaaClock(ac, { toleranceEarly: 0.01 })
  let events = []
  let playing = false
  let tempo = 120
  let nextIndex
  let nextTick

  let dispatch = (index, deadline) => {
    let cb = events[index].cb
    if (cb) cb(deadline)
    nextIndex = index + 1
    if(nextIndex === events.length) nextIndex = 0
    let nextDeadline = deadline + secsFrom(events[nextIndex].delta)
    scheduleNext(nextDeadline)
  }

  let scheduleNext = (deadline) => {
    nextTick = clock.callbackAtTime(
      () => dispatch(nextIndex, deadline),
      deadline
    )
  }

  let secsFrom = (notes) => notes * notesPerSec()
  let notesFrom = (secs) => secs / notesPerSec()
  let notesPerSec = () => 240 / tempo

  // Exports

  let setEvents = (eventsByTime) => {
    let oldEvents = events

    events = _.sortBy('[0]', eventsByTime).map(([time, cb], i, arr) => {
      let delta = i === 0 ? time : (time - arr[i - 1][0])
      return { time, delta, cb }
    })

    if (!playing) return
    stop()
    play()
    return

    // TODO Seamless seq switching
    // let newLength = _.last(events).time
    // let oldLength = _.last(oldEvents).time
    // if (newLength !== oldLength) {
    //   // TODO If seqs are different lengths, snap to nearest note
    //   stop()
    //   play()
    //   return
    // }
    //
    // // This is horrible. Must be an easier way.
    // let now = ac.currentTime
    // let secsToNextDeadline = nextTick.deadline - now
    // nextTick.clear()
    // let pos = oldEvents[nextIndex].time - notesFrom(secsToNextDeadline)
    // if (pos < 0) pos = pos + newLength // Not sure this is needed
    // nextIndex = events.findIndex((ev) => ev.time > pos)
    // let nextDeadline = now + secsFrom(events[nextIndex].time - pos)
    // scheduleNext(nextDeadline)
  }

  let setTempo = (bpm) => tempo = bpm

  let play = () => {
    if (playing || !events.length) return
    playing = true
    let firstTime = secsFrom(events[0].time)
    let now = ac.currentTime
    let firstDeadline = now + firstTime + INITIAL_LATENCY
    clock.start()
    nextIndex = 0
    scheduleNext(firstDeadline)
    return now + INITIAL_LATENCY
  }

  let stop = () => {
    if (!playing) return
    playing = false
    clock.stop()
    return ac.currentTime
  }

  let isPlaying = () => playing

  return { setEvents, setTempo, play, stop, isPlaying }
}

module.exports = Sequencer

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST === 'SLOW') {
  let ac = window.__umAudioContext || (window.__umAudioContext = new window.AudioContext())

  // lodash fp round doesn't support precision :/
  let round = require('lodash').round
  let approxEqual = (a, b) => round(a, 5) === round(b, 5)
  let arrApproxEqual = (a, b) => _.zip(a, b).every(([a, b]) => approxEqual(a, b))

  describe('sequencer', () => {

    it('can play simple sequence', (done) => {
      let startTime
      let times = []
      let cb = (time) => times.push(time - startTime)
      let sequence = [
        [0,   cb],
        [3/4, cb],
        [1/4, cb],
        [1/2, cb],
        [1]
      ]
      let sequencer = Sequencer(ac)
      sequencer.setTempo(240)
      sequencer.setEvents(sequence)
      startTime = ac.currentTime + 0.01
      sequencer.play()
      setTimeout(finish, 1020)

      function finish() {
        sequencer.stop()
        expect(times.length).to.equal(5)
        expect(arrApproxEqual(times, [0, 1/4, 1/2, 3/4, 1])).to.be.true
        done()
      }
    })

    // TODO
    // it('can switch seamlessly between sequences of the same length', (done) => {
    //   let startTime
    //   let times = []
    //   let cb = (time) => times.push(time - startTime)
    //   let sequence1 = [
    //     [0,   cb],
    //     [3/4, cb],
    //     [1/4, cb],
    //     [1/2, cb],
    //     [1]
    //   ]
    //   let sequence2 = [
    //     [1/8, cb],
    //     [3/8, cb],
    //     [1]
    //   ]
    //   let sequencer = Sequencer(ac)
    //   sequencer.setTempo(240)
    //   sequencer.setEvents(sequence1)
    //   startTime = ac.currentTime + 0.01
    //   sequencer.play()
    //   setTimeout(switchSeqs, 260)
    //   setTimeout(finish, 1150)
    //
    //   function switchSeqs() {
    //     sequencer.setEvents(sequence2)
    //   }
    //
    //   function finish() {
    //     sequencer.stop()
    //     expect(times.length).to.equal(4)
    //     expect(arrApproxEqual(times, [0, 1/4, 3/8, 9/8])).to.be.true
    //     done()
    //   }
    // })
  })
}
