import _ from 'lodash/fp'
import Tone from 'Tone'

function Sequencer() {
  let part
  let partLength

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
    return Tone.context.currentTime
  }

  return { setSequence, setTempo, start, stop }
}

export default Sequencer
