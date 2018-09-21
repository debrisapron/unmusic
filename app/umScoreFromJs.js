'use strict'
let _ = require('lodash/fp')
let requireFromString = require('require-from-string')
let um = require('unmusic-core')

um.orch = _.curry((orch, score) => ({ ...score, orch }))

let umScoreFromJs = (js) => {
  let moduleJs = `
    module.exports = (um) => {
      let { ${Object.keys(um).join(', ')} } = um;
      ${js}
    }
  `
  let scoreFn = requireFromString(moduleJs)
  return scoreFn(um)
}

module.exports = umScoreFromJs
