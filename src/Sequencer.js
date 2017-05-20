let _ = require('lodash/fp')
let WaaClock = require('waaclock')

const TEMPO = 120
const INITIAL_LATENCY = 0.01

let Sequencer = (audioContext) => {
  let clock = new WAAClock(audioContext, { toleranceEarly: 0.01 })
  let events = []
  let playing = false

  let setEvents = (eventsByTime) => {
    events = _.sortBy('[0]', eventsByTime).map(([time, cb], i, arr) => {
      let delta = i === 0 ? time : (time - arr[i - 1][0])
      return { time, delta, cb }
    })
  }

  let play = () => {
    if (playing || !events.length) return
    playing = true
    let firstTime = secsFrom(events[0].time)
    let now = audioContext.currentTime
    let firstDispatchTime = now + firstTime + INITIAL_LATENCY
    clock.start()
    clock.callbackAtTime(() => dispatch(0, firstDispatchTime), firstDispatchTime)
    return now + INITIAL_LATENCY
  }

  let stop = () => {
    if (!playing) return
    playing = false
    clock.stop()
    return audioContext.currentTime
  }

  let dispatch = (index, deadline) => {
    let cb = events[index].cb
    if (cb) cb(deadline)
    let nextIndex = index + 1
    if(nextIndex === events.length) nextIndex = 0
    let nextDeadline = deadline + secsFrom(events[nextIndex].delta)
    clock.callbackAtTime(() => dispatch(nextIndex, nextDeadline), nextDeadline)
  }

  let secsFrom = (notes) => notes * (240 / TEMPO)

  return { setEvents, play, stop }
}

module.exports = Sequencer

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST === 'SLOW') {
  let ac = window.__umAudioContext || new window.AudioContext()
  
  // lodash fp round doesn't support precision :/
  let round = require('lodash').round
  let approxEqual = (a, b) => round(a, 5) === round(b, 5)
  let arrApproxEqual = (a, b) => _.zip(a, b).every(([a, b]) => approxEqual(a, b))
  
  test('sequencer can play simple sequence', (assert) => {
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
    sequencer.setEvents(sequence)
    startTime = ac.currentTime + 0.01
    sequencer.play()
    setTimeout(finish, 2100)
  
    function finish() {
      sequencer.stop()
      assert.equal(times.length, 5, 'callback should have been called five times')
      let timesOk = arrApproxEqual(times, [0, 0.5, 1, 1.5, 2])
      assert.ok(timesOk, 'callback should have been callled at the expected times')
      assert.end()
    }
  })
  
  // test('sequencer can switch seamlessly between sequences of the same length', (assert) => {
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
  //   sequencer.setEvents(sequence1)
  //   startTime = sequencer.play()
  //   setTimeout(switchSeqs, 550)
  //   setTimeout(finish, 2100)
    
  //   function switchSeqs() {
  //     sequencer.setEvents(sequence2)
  //   }
  
  //   function finish() {
  //     sequencer.stop()
  //     assert.equal(times.length, 4, 'callback should have been called four times')
  //     let timesOk = arrApproxEqual(times, [0, 0.5, 0.75, 2])
  //     assert.ok(timesOk, 'callback should have been callled at the expected times')
  //     assert.end()
  //   }
  // })
}