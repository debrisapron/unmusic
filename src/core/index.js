import * as _ from 'lodash/fp'
import concatScores from './concatScores'
import getScore from './getScore'
import mixScores from './mixScores'

export function wrapScoringFunction(fn) {
  return fn.length === 1
    ? (thing) => fn(getScore(thing))
    : _.curry((options, thing) => fn(options, getScore(thing)))
}

export let config = wrapScoringFunction((opts, score) => {
  return _.set('config', _.merge(score.config || {}, opts), score)
})

export function flow(...args) {
  if (_.isFunction(args[0])) { return _.pipe(args) }
  let [thing, ...fns] = args
  return _.pipe(fns)(getScore(thing))
}

export let loop = wrapScoringFunction((score) => {
  return _.set('loop', true, score)
})

export function mix(...args) {
  return mixScores(args)
}

export let offset = wrapScoringFunction((amount, score) => {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload, type }) => {
    if (type === 'NOOP') { return }
    payload.offset = amount
  })
  return score
})

export let arrange = wrapScoringFunction((handler, score) => {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload, type }) => {
    if (type === 'NOOP') { return }
    payload.handlers = payload.handlers || []
    payload.handlers.push(handler)
  })
  return score
})

export function seq(...args) {
  let [fns, scores] = _.partition(_.isFunction, args)
  return _.pipe(fns)(concatScores(scores))
}

export let tempo = wrapScoringFunction((bpm, score) => {
  return _.set('tempo', bpm, score)
})

export let tran = wrapScoringFunction((amount, score) => {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload }) => {
    if (payload.nn == null) { return }
    payload.nn = payload.nn + amount
  })
  return score
})
