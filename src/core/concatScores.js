import * as actionHelpers from './actionHelpers'

function concatScores(scores) {
  let actionLists = scores.map(actionHelpers.get)
  return actionHelpers.wrap(
    actionHelpers.clean(
      actionHelpers.concat(actionLists)
    )
  )
}

export default concatScores
