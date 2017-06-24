let _ = require('lodash/fp')
let { getScore } = require('./scoring/helpers')

module.exports = [
  { name: 'seq', resource: require('./scoring/seq') },
  { name: 'mix', resource: require('./scoring/mix') },
  { name: 'wrapComposer', resource: wrapComposer },
  { name: 'loop', resource: require('./scoring/loop'), wrapper: 'wrapComposer' },
  { name: 'offset', resource: require('./scoring/offset'), wrapper: 'wrapComposer' },
  { name: 'tempo', resource: require('./scoring/tempo'), wrapper: 'wrapComposer' },
  { name: 'config', resource: require('./scoring/config'), wrapper: 'wrapComposer' },
]

////////////////////////////////////////////////////////////////////////////////

function wrapComposer(fn) {
  return fn.length === 1
    ? (thing) => fn(getScore(thing))
    : _.curry((options, thing) => fn(options, getScore(thing)))
}
