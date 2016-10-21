let Soundfont = require('soundfont-player')
let um = require('../..')()

Soundfont.instrument(um.audioContext, 'drawbar_organ').then((player) => {
  player.connect(um.master)
  let onOrgan = um.setDest((time, ev) => {
    let node = player.play(ev.nn, time, { duration: 0.125 })
    return (t) => {
      player.stop(t, [node])
    }
  })
  let song = um.mix(
    onOrgan(
      um.mix(
        um.seq('/16 C E G A G E'),
        um.seq('/16 G A G E C E')
        // um.seq('/12 C5 E5 G5 A5')
      )
    )
  )
  um.play(song)
})

// let twelveTet = (nn) => {
//   return nn && Math.pow(2, ((nn - 69) / 12)) * 440
// }
//
// let out = um.audioContext.createGain()
// out.gain.value = 0.1
// out.connect(um.master)
//
// let onOrgan = um.setDest((time, ev) => {
//   let osc = um.audioContext.createOscillator()
//   osc.frequency.value = twelveTet(ev.nn)
//   osc.connect(out)
//   osc.start(time)
//   return (t) => {
//     osc.stop(t)
//   }
// })
// let song = onOrgan(
//   um.mix(
//     um.seq('/16 C4 E4 G4 A4 G4 E4'),
//     um.seq('/16 G4 A4 G4 E4 C4 E4')
//     // um.seq('/12 C5 E5 G5 A5')
//   )
// )
// um.play(song)
