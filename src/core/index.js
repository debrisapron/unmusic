import * as _ from 'lodash/fp'
import concatScores from './concatScores'
import getScore from './getScore'
import mixScores from './mixScores'

export function wrapScoringFunction(fn) {
  return fn.length === 1
    ? (thing) => fn(getScore(thing))
    : _.curry((options, thing) => fn(options, getScore(thing)))
}

export let config = wrapScoringFunction(function (opts, score) {
  return _.set('config', _.merge(score.config || {}, opts), score)
})

export function flow(...args) {
  if (_.isFunction(args[0])) { return _.pipe(args) }
  let [thing, ...fns] = args
  return _.pipe(fns)(getScore(thing))
}

export let loop = wrapScoringFunction(function (score) {
  return _.set('loop', true, score)
})

export function mix(...args) {
  return mixScores(args)
}

export let offset = wrapScoringFunction(function (amount, score) {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload, type }) => {
    if (type === 'NOOP') { return }
    payload.offset = amount
  })
  return score
})

export let part = wrapScoringFunction(function (handler, score) {
  score = _.cloneDeep(score)
  let callback = _.isFunction(handler) ? handler : handler.start
  if (handler.prepare && handler.id) {
    score.dependencies = score.dependencies || {}
    score.dependencies[handler.id] = handler.prepare
  }
  score.actions.forEach(({ payload, type }) => {
    if (type === 'NOOP') { return }
    payload.callback = callback
  })
  return score
})

export function seq(...args) {
  let [fns, scores] = _.partition(_.isFunction, args)
  return _.pipe(fns)(concatScores(scores))
}

export let tempo = wrapScoringFunction(function (bpm, score) {
  return _.set('tempo', bpm, score)
})

export let tran = wrapScoringFunction(function (amount, score) {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload }) => {
    if (payload.nn == null) { return }
    payload.nn = payload.nn + amount
  })
  return score
})
