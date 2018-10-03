'use strict'
let _ = require('lodash/fp')
// let requireFromString = require('require-from-string')
let evalEslisp = require('eslisp')
let um = require('unmusic-core')

um.orch = _.curry((orch, score) => ({ ...score, orch }))

let uMacro = (...args) => {
  return this.list(
    this.atom('+'),
    this.string(args.join(' ')),
    this.string(' hello')
  )
}

let umScoreFromJs = (esl) => {
  let js = evalEslisp(esl)
  console.log(js)
  // let moduleJs = `
  //   module.exports = (um) => {
  //     let { ${Object.keys(um).join(', ')} } = um;
  //     ${js}
  //   }
  // `
  let code = `
    let { ${Object.keys(um).join(', ')} } = um;
    ${js}
  `
  // let scoreFn = requireFromString(moduleJs)
  // return scoreFn(um)
  return eval(code)
}

module.exports = umScoreFromJs
