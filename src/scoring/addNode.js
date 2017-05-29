let _ = require('lodash/fp')
let h = require('./support/helpers')

let addNode = ({ type, params }, score) => {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload, type: actionType }) => {
    if (actionType === 'NOOP') { return }
    let vgraph = payload.vgraph = payload.vgraph || {}
    let nodeId = `node_${Object.keys(vgraph).length}`
    let metaParams = {}
    if (actionType === 'NOTE') metaParams.nn = payload.nn
    if (actionType === 'TRIG') metaParams.name = payload.name
    let thisParams = _.merge(metaParams, params)
    vgraph[nodeId] = { params: thisParams, type }
  })
  return score
}

module.exports = addNode

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('add node', () => {

    it('can add a node to the vgraph of every note in a score', () => {
      let score = { actions: [
        { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
        { type: 'TRIG', payload: { time: 1/4, name: 'foo', dur: 1/4 } },
        { type: 'NOOP', payload: { time: 3/4 } }
      ] }
      let expScore = { actions: [
        { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4, vgraph: {
          node_0: { type: 'bar', params: { foo: 1, nn: 69 } }
        } } },
        { type: 'TRIG', payload: { time: 1/4, name: 'foo', dur: 1/4, vgraph: {
          node_0: { type: 'bar', params: { foo: 1, name: 'foo' } }
        } } },
        { type: 'NOOP', payload: { time: 3/4 } }
      ] }
      expect(addNode({ type: 'bar', params: { foo: 1 } }, score)).to.deep.equal(expScore)
    })
  })
}
