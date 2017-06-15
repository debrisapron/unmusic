let _ = require('lodash/fp')

let Sequencer = (um) => {
  let part
  let partLength

  let toneEventsFrom = (sequence) => {
    return _.sortBy(
      'time',
      sequence.events.map((ev) => ({ time: wholeNotesToSecs(ev[0]), fn: ev[1] }))
    )
  }

  let triggerEvent = (time, { fn }) => fn(time)

  let isStarted = () => um.Tone.Transport.state === 'started'

  let wholeNotesToSecs = (wholeNotes) => {
    // We avoid using 1n because Tone translates 1n to 1m
    return um.Tone.Transport.toSeconds('2n') * 2 * wholeNotes
  }

  let mutatePart = (evs) => {
    part.removeAll()
    evs.forEach((ev) => part.add(ev))
  }

  let replacePart = (evs, length) => {
    let newPart = new um.Tone.Part(triggerEvent, evs)
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
    um.Tone.Transport.bpm.value = tempo
  }

  let start = () => {
    if (!isStarted()) { um.Tone.Transport.start() }
  }

  let stop = () => {
    if (isStarted()) {
      um.Tone.Transport.stop()
      part.stop()
    }
    return um.Tone.context.currentTime
  }

  return { setSequence, setTempo, start, stop }
}

module.exports = Sequencer

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST === 'SLOW') {
  let Tone = require('Tone')

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
      let sequencer = Sequencer({ Tone })
      sequencer.setTempo(240)
      sequencer.setSequence(sequence)
      startTime = Tone.context.currentTime
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
