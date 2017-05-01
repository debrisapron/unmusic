let _ = require('lodash/fp')
let parse = require('./parse')

// let mapScoreActions = _.curry((cb, score) => {
//   return _.set('actions', score.actions.map(cb), score)
// })

let scoreTransformer = ({ transformScore = id, mergeScores = concatScores } = {}) => {
  let inner = (...args) => {
    let scores = args.filter((x) => x && (_.isString(x) || x.actions))
    if (!scores.length) {
      return (...innerArgs) => inner(...(args.concat(innerArgs)))
    }
    let score = mergeScores(scores)
    let opts = _.mergeAll(args.filter(_.isPlainObject))
    let postProcess = _.pipe(args.filter(_.isFunction))
    return postProcess(transformScore(score, opts))
  }
  return inner
}

let id = (x) => x

let concatScores = (scores) => {
  let actionLists = scores.map(getActions)
  return wrapActions(cleanActions(concatActions(actionLists)))
}

let concatActions = (actionLists) => {
  return actionLists.reduce((acc, curr) => {
    return acc.concat(nudge(lengthOf(acc), curr))
  })
}

let nudge = (amount, actions) => {
  return actions.map((action) => _.set('payload.time', action.payload.time + amount, action))
}

let endOf = (action) => action.payload.time + (action.payload.dur || 0)

let lengthOf = (actions) => endOf(_.last(actions))

// Remove any redundant NOOP actions
let cleanActions = (actions) => {
  let lastIndex = actions.length - 1
  return actions.filter((action, i) => {
    // Include all non-NOOP actions
    if (action.type !== 'NOOP') { return true }
    // Reject NOOP actions unless they are at the end
    if (i !== lastIndex) { return false }
    // Reject redundant NOOP actions (i.e. onset during another NOOP action)
    let prevAction = actions[i - 1]
    return action.payload.time > endOf(prevAction)
  })
}

let getActions = (thing) => {
  return (Array.isArray(thing) && thing) || thing.actions || parse(thing)
}

let getScore = (thing) => {
  return thing.actions ? thing : wrapActions(getActions(thing))
}

let wrapActions = (actions) => {
  return { actions }
}

module.exports = { lengthOf, scoreTransformer, concatScores, concatActions, cleanActions, getActions, getScore, wrapActions }
