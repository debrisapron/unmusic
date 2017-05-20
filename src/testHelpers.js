let _ = require('lodash/fp')
let deepDiff = require('deep-diff')

let deepMatches = (actual, expected) => {
  return deepDiff.diff(actual, expected).every((change) => change.kind === 'D')
}

let log = (data) => console.log(toLogString(data))

let toLogString = (data) => {
  if (_.isString(data)) return `String: ${ data }`
  if (_.isNumber(data)) return `Number: ${ data }`
  return '\n' + JSON.stringify(data, null, 2)
}

module.exports = { deepMatches, log }
