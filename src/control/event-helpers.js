'use strict'
let _ = require('lodash/fp')

let timeOf = _.propOr(0, 0)

let actionOf = _.prop(1)

let dataOf = _.propOr({}, 2)

let durOf = (ev) => dataOf(ev).dur || 0

let typeOf = (ev) => dataOf(ev).type

let destOf = (ev) => dataOf(ev).dest

let endOf = (ev) => timeOf(ev) + durOf(ev)

let isTrig = (ev) => actionOf(ev) === 'TRIG'

let withData = _.curry((patch, ev) => {
  return _.set('[2]', ev, _.merge(dataOf(ev), patch))
})

module.exports = { timeOf, actionOf, dataOf, destOf, endOf }
