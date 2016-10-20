let Soundfont = require('soundfont-player')
let um = require('../..')()

Soundfont.instrument(um.audioContext, 'drawbar_organ').then((player) => {
  player.connect(um.master)
  let onOrgan = um.setDest((time, ev) => {
    player.play(ev.nn, time)
    return (t) => {
      player.stop(t)
    }
  })
  let song = onOrgan(
    um.mix(
      um.seq('/16 C E G A G E'),
      um.seq('/16 G A G E C E')
      // um.seq('/12 C5 E5 G5 A5')
    )
  )
  um.play(song)
})
