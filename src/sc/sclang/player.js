let nodes = require('./nodes')
let server = require('./server')
let render = require('./render')
let setupScript = require('./setupScript')

let ready
let playing

module.exports = { play, stop }

function play(umConfig, score) {
  return setup()
    .then(() => {
      let script = render(nodes, umConfig, score)
      server.evalSclang(script)
      playing = true
    })
    .catch((err) => {
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
