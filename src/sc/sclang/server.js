let sc = require('supercolliderjs')

let booted
let sclang
let ready
let debug

module.exports = { boot, evalSclang, on, removeListener }

function boot() {
  if (booted) {
    throw new Error('SCLang server has already been booted.')
  }
  booted = true
  return sc.lang.boot({ debug })
    .then((_sclang) => {
      sclang = _sclang
      on('stderr', (err) => console.error(`SCERR: ${err}`))
      on('stdout', (data) => {
        console.log(data.split('\n').map((ln) => `SCOUT: ${ln}`).join('\n'))
      })
      return sclang.interpret('s.boot;')
    })
    .then(() => new Promise((resolve) => setTimeout(resolve, 1000)))
    .then(() => ready = true)
    .catch((err) => {
      throw err
    })
}

function evalSclang(code) {
  if (!ready) {
    throw new Error('SuperCollider server is not ready!')
  }
  return sclang.interpret(code)
}

function on(...args) {
  return sclang.on(...args)
}

function removeListener(...args) {
  return sclang.removeListener(...args)
}

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {
  // debug = true
  let evals = []
  module.exports = {
    boot,
    _evals: evals,
    evalSclang: (code) => {
      evals.push(code)
      return evalSclang(code)
    }
  }
}
