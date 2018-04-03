import * as _ from 'lodash/fp'

export default function Tran(amount) {
  return (action) => {
    if (action.type !== 'NOTE') { return action }
    return _.set('payload.nn', action.payload.nn + amount, action)
  }
}
