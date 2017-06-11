let _ = require('lodash/fp')
let Tone = require('tone')

let Sequencer = (ac) => {
  let part
  let partLength

  if (ac) Tone.context = ac

  let toneEventsFrom = (sequence) => {
    return _.sortBy(
      'time',
      sequence.events.map((ev) => ({ time: wholeNotesToSecs(ev[0]), fn: ev[1] }))
    )
  }

  let triggerEvent = (time, { fn }) => fn(time)

  let isStarted = () => Tone.Transport.state === 'started'

  let wholeNotesToSecs = (wholeNotes) => {
    // We avoid using 1n because Tone translates 1n to 1m
    return Tone.Transport.toSeconds('2n') * 2 * wholeNotes
  }

  let mutatePart = (evs) => {
    part.removeAll()
    evs.forEach((ev) => part.add(ev))
  }

  let replacePart = (evs, length) => {
    let newPart = new Tone.Part(triggerEvent, evs)
    newPart.loop = true
    newPart.loopEnd = wholeNotesToSecs(length)
    // TODO snap to nearest quarter note
    if (isStarted()) {
      part.stop()
      part.dispose()
    }
    newPart.start()
    part = newPart
    partLength = length
  }

  // Exports

  let setSequence = (sequence) => {
    let tevs = toneEventsFrom(sequence)
    if (partLength === sequence.length) {
      mutatePart(tevs)
    } else {
      replacePart(tevs, sequence.length)
    }
  }

  let setTempo = (tempo) => {
    Tone.Transport.bpm.value = tempo
  }

  let start = () => {
    if (!isStarted()) { Tone.Transport.start() }
  }

  let stop = () => {
    if (isStarted()) {
      Tone.Transport.stop()
      part.stop()
    }
    return ac.currentTime
  }

  return { setSequence, setTempo, start, stop }
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
      let sequence = { events: [
        [0,   cb],
        [3/4, cb],
        [1/4, cb],
        [1/2, cb]
      ], length: 1 }
      let sequencer = Sequencer(ac)
      sequencer.setTempo(240)
      sequencer.setSequence(sequence)
      startTime = ac.currentTime
      sequencer.start()
      setTimeout(finish, 1020)

      function finish() {
        sequencer.stop()
        expect(times.length).to.equal(5)
        expect(arrApproxEqual(times, [0, 1/4, 1/2, 3/4, 1])).to.be.true
        done()
      }
    })

    // it('can switch seamlessly between sequences of the same length', (done) => {
    //   let startTime
    //   let times = []
    //   let cb = (time) => times.push(time - startTime)
    //   let sequence1 = { events: [
    //     [0,   cb],
    //     [3/4, cb],
    //     [1/4, cb],
    //     [1/2, cb]
    //   ], length: 1 }
    //   let sequence2 = { events: [
    //     [1/8, cb],
    //     [3/8, cb]
    //   ], length: 1 }
    //   let sequencer = Sequencer(ac)
    //   sequencer.setTempo(240)
    //   sequencer.setSequence(sequence1)
    //   startTime = ac.currentTime
    //   sequencer.start()
    //   setTimeout(switchSeqs, 260)
    //   setTimeout(finish, 1300)
    //
    //   function switchSeqs() {
    //     sequencer.setSequence(sequence2)
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
