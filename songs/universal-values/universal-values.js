let um = require('unmusic')
let tr606 = um.synths.twoHundredDrumMachines({ kit: 'Roland Tr-606' })

let beat = um.route(
  um.seq('k k k k'),
  tr606
)

um.play(beat)
