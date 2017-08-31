let nodes = require('./nodes')
let server = require('./server')
let renderer = require('./renderer')
let setupScript = require('./setupScript')

let context = {}
let ready
let playing

module.exports = { play, stop }

function play(umConfig, score) {
  playing = true
  return setup()
    // .then(() => {
    //   let deps = renderer.getDeps(nodes, umConfig, score)
    //   return prepareDeps(deps, context)
    // })
    .then((x) => {
      let playScript = renderer.renderPlay(nodes, umConfig, score, context)
      return server.evalSclang(playScript)
    })
    .catch((err) => {
      playing = false
      throw err
    })
}

function stop() {
  if (!playing) return
  server.evalSclang('CmdPeriod.run;')
  playing = false
}

////////////////////////////////////////////////////////////////////////////////

function setup() {
  ready = ready || server.boot().then(() => server.evalSclang(setupScript))
  return ready
}
