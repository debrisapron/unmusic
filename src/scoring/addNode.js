let _ = require('lodash/fp')
let h = require('./support/helpers')

let addNode = ({ type, params }, score) => {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload, type: actionType }) => {
    if (actionType !== 'NOTE') { return }
    let vgraph = payload.vgraph = payload.vgraph || {}
    let nodeId = `node_${Object.keys(vgraph).length}`
    let thisParams = _.merge({ nn: payload.nn }, params)
    vgraph[nodeId] = { params: thisParams, type }
  })
  return score
}

module.exports = addNode

////////////////////////////////////////////////////////////////////////////////

if (!process.env.TEST) return
// let h = require('../testHelpers')

test('can add a node to the vgraph of every note in a score', (assert) => {
  let score = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
    { type: 'NOTE', payload: { time: 1/4, nn: 70, dur: 1/4 } },
    { type: 'NOOP', payload: { time: 3/4 } }
  ] }
  let expScore = { actions: [
    { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4, vgraph: {
      node_0: { type: 'bar', params: { foo: 1, nn: 69 } }
    } } },
    { type: 'NOTE', payload: { time: 1/4, nn: 70, dur: 1/4, vgraph: {
      node_0: { type: 'bar', params: { foo: 1, nn: 70 } }
    } } },
    { type: 'NOOP', payload: { time: 3/4 } }
  ] }
  assert.deepEqual(
    addNode({ type: 'bar', params: { foo: 1 } }, score),
    expScore
  )
  assert.end()
})
