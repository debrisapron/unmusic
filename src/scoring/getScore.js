import * as actionHelpers from './actionHelpers'

function getScore(thing) {
  return thing.actions
    ? thing
    : actionHelpers.wrap(actionHelpers.get(thing))
}

export default getScore
