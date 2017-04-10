let um = require('unmusic')()

let bass = um.synths.simth({ params })
let drums = um.synths.sampler({ params })
let phaser = um.fx.phaser({ params })

let chordIn = um.route(
  um.midiIn('Launchpad', { type: 'note' }),
  um.ctfx.chordifier({ params })
)

// This is wrong - should use um.patch
// um.route & um.patch are just different sugar for similar function
// Should both be in top-level router
let pattSeq = (...args) => {
  let score = um.seq(...args)
  let patternizer = um.ctfx.patternizer()
  um.route(chordIn, patternizer.chord)
  um.route(score, patternizer.pattern)
  return patternizer
}

let drumSlice = um.slice(
  um.route(
    um.grid({
      kick:  'x---|x---|x---|x---  x---|x---|x---|x-x-  x---|x---|x---|x---  x---|x---|x---|x-x-',
      snare: '----|x---|----|x---  ----|x---|----|x---  ----|x---|----|x--x  ----|x---|---x|-x--'
    }),
    drums, phaser, um.master
  )
)

// MUSIX: This...
um.route(
  um.grid({
    kick:  'x---|x---|x---|x---  x---|x---|x---|x-x-  x---|x---|x---|x---  x---|x---|x---|x-x-',
    snare: '----|x---|----|x---  ----|x---|----|x---  ----|x---|----|x--x  ----|x---|---x|-x--'
  }),
  drums, phaser, um.master
)
// ...is equivalent to this...
um.master(
  phaser(
    drums(
      um.grid({
        kick:  'x---|x---|x---|x---  x---|x---|x---|x-x-  x---|x---|x---|x---  x---|x---|x---|x-x-',
        snare: '----|x---|----|x---  ----|x---|----|x---  ----|x---|----|x--x  ----|x---|---x|-x--'
      })
    )
  )
)

let verse = um.mix(
  um.route(
    um.mix(
      'k k k k',
      '_ s _ s'
    ),
    drums, phaser, um.master
  ), // or just
  drumSlice(um.bar(0)),
  um.route(
    pattSeq('/8 0 4 0 4'),
    bass, um.master
  )
)

let Arpeg = UmNode({
  note: (node, action) => { ... },
  tick: (node, action) => { ... },
  noteThru: false,
  tickThru: true // By default
})

route(
  mix(
    'k k k k k k k k',
    seq('_ s _ s _ s _', route('s', $delay$({ time: 0.1 }))
  ),
  drumBox$({ kit: '808' }),
  $merge$,
  $distort$({ gain: 2 })
)
