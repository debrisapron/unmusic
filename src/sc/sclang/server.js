let sc = require('supercolliderjs')

let sclang
let ready

module.exports = { boot, eval }

function boot() {
  return sc.lang.boot()
    .then((_sclang) => sclang = _sclang)
    .then(() => sclang.interpret('s.boot;'))
    .then(() => new Promise((resolve) => setTimeout(resolve, 1000)))
    .then(() => ready = true)
}

function eval(code) {
  if (!ready) {
    throw new Error('SuperCollider server is not ready!')
  }
  return sclang.interpret(code)
}
