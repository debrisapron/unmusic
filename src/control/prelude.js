'use strict'

let R = require('ramda')
let isPlainObject = require('lodash.isplainobject')

let isString = (x) => typeof x === 'string'

let isNumeric = R.complement(isNaN)

let compact = R.filter(R.identity)

let words = R.compose(compact, R.split(' '))

let eachChar = R.split('')

let concatAll = R.reduce(R.concat, [])

let mapWithIndex = R.curry((fn, arr) => arr.map(fn))

let strContains = R.curry(
  (needle, haystack) => haystack.indexOf(needle) > -1
)

// v slow but doesn't require messy regex escaping
let replaceAll = R.curry(
  (needle, haystack, str) => {
    let hit = strContains(needle)
    while(hit(str)) {
      str = R.replace(needle, haystack, str)
    }
    return str
  }
)

let ezMatch = R.curry((patt, str) => {
  let regex = new RegExp(patt)
  let retVal = []
  let g = regex.flags.includes('g')
  let getMatch = () => {
    let m = regex.exec(str)
    if(m) {
      retVal.push({
        fullMatch: m[0],
        index: m.index,
        capturingGroups: m.slice(1)
      })
    }
    return m
  }
  while(getMatch() && g) {}
  return retVal
})

let customFns = {
  isPlainObject,
  isString,
  isNumeric,
  compact,
  words,
  eachChar,
  concatAll,
  mapWithIndex,
  strContains,
  replaceAll,
  ezMatch
}

module.exports = R.merge(R, customFns)
