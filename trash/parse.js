let {
  concat, concatAll, compose, drop, ezMatch, isNumeric, isString, map,
  merge, mergeAll, partition, replaceAll, split, strContains, words
} = require('../lib'
let { isNote, midiNote } = require('../wrappers/teoria'

let parse = (seq) => {
  if(!isString(seq)) return seq
  return compose(
    concatAll,
    map(parseSingle),
    split(';')
  )(seq)
}
export default parse

let parseSingle = (seq) => {
  let [name, patt, params] = tokenize(seq)
  let data = merge(parseName(name), params)
  if(patt) return patternize(data, patt)
  return [
    merge(data, { delta: 0 }),
    { delta: data.dur || 1/16, type: 'end' }
  ]
}

let tokenize = (str) => {
  let tokens = words(str)
  let [paramStrs, [name, patt]] =
    partition(parseParam, tokens)
  let params = mergeAll(map(parseParam, paramStrs))
  return [name, patt, params]
}

let parseName = (name) => {
  if(name === '_') return makeRest()
  if(isNumeric(name)) return makeNote(parseInt(name))
  if(isNote(name)) return makeNote(midiNote(name))
  return { name, type: 'custom' }
}

let makeRest = () => ({ type: 'rest' })

let makeNote = (nn) => ({ nn, type: 'note' })

let parseParam = (str) => {
  if(!strContains('=', str)) return null
  let [name, val] = split('=', str)
  if(name === 'd') name = 'dur'
  if(name === 'v') name = 'vel'
  if(name === 'c') name = 'ch'
  val = parseParamVal(val)
  return { [name]: val }
}

let parseParamVal = (val) => {
  // This is messy
  if(strContains('/', val)) {
    let [a, b] = map((i) => parseInt(i || 1), split('/', val))
    return a / b
  }
  if(isNumeric(val)) {
    return parseFloat(val)
  }
  return val
}

let patternize = (data, patt, offset = 0) => {
  patt = replaceAll('|', '', patt)
  let match = ezMatch(/[^\-]_*/, patt)[0]
  if(!match) return [{ delta: (patt.length + offset) / 16, type: 'end' }]
  let len = match.fullMatch.length
  let i = match.index
  let thisData = len > 1 ? merge({ dur: len * 1/16 }, data) : data
  return concat(
    [merge(thisData, { delta: (i + offset) / 16 })],
    patternize(data, drop(i + len, patt), len)
  )
}
