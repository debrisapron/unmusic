let _ = require('lodash/fp')
let h = require('./support/helpers')

let addNode = ({ type, params }, score) => {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload }) => {
    let vgraph = payload.vgraph = payload.vgraph || {}
    let nodeId = _.uniqueId('node_')
    params = _.merge({ nn: payload.nn }, params)
    vgraph[nodeId] = { type, params }
  })
  return score
}

module.exports = addNode
