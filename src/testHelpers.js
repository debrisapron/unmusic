let diff = require('deep-diff').diff

let deepMatches = (actual, expected) => {
  return diff(actual, expected).every((change) => change.kind === 'D')
}

module.exports = { deepMatches }
