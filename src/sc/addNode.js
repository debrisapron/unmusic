let _ = require('lodash/fp')

// let nextNodeId = (score) => {
//   return _.max(
//     score.actions
//       .filter(({ payload }) => payload && payload.vgraph)
//       .map(({ payload: { vgraph } }) => _.max(Object.keys(vgraph).map((k) => parseInt(k))))
//   ) + 1
// }

let addNode = ({ type, params }, score) => {
  score = _.cloneDeep(score)
  // TODO Make nodeIds deterministic
  let nodeId = `node_${_.uniqueId()}`
  if (_.isString(params) || _.isNumber(params)) {
    params = { defaultValue: params }
  }
  score.actions.forEach(({ payload, type: actionType }) => {
    if (actionType === 'NOOP') { return }
    payload.sc = payload.sc || {}
    let vgraph = payload.sc.vgraph || (payload.sc.vgraph = {})
    // TODO Merge in relevant params from payload e.g. vel. (Also at, cc, pb)?
    // TODO Set frequency & rate here instead of in renderer.
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
        { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4, sc: { vgraph: {
          node_1: { type: 'bar', params: { foo: 1, nn: 69 } }
        } } } },
        { type: 'TRIG', payload: { time: 1/4, name: 'foo', dur: 1/4, sc: { vgraph: {
          node_1: { type: 'bar', params: { foo: 1, name: 'foo' } }
        } } } },
        { type: 'NOOP', payload: { time: 3/4 } }
      ] }
      let uid = _.uniqueId
      _.uniqueId = () => 1
      expect(addNode({ type: 'bar', params: { foo: 1 } }, score)).to.deep.equal(expScore)
      _.uniqueId = uid
    })
  })
}
