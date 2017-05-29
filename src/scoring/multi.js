let _ = require('lodash/fp')
let h = require('./support/helpers')

let getNoteParams = (zones, nn) => {
  let notes = Object.keys(zones).filter((z) => !isNaN(z)).map((n) => parseInt(n))
  let nearestNote = _.sortBy((n) => Math.abs(n - nn), notes)[0]
  return zones[`${nearestNote}`]
}

let getTrigParams = (zones, name) => {
  return zones[name]
}

// Exports

let multi = ({ type, zones }, score) => {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload, type: actionType }) => {
    if (actionType === 'NOOP') { return }
    let vgraph = payload.vgraph = payload.vgraph || {}
    let nodeId = `node_${Object.keys(vgraph).length}`
    let params = {}
    if (actionType === 'NOTE') {
      params = _.merge({ nn: payload.nn }, getNoteParams(zones, payload.nn))
    }
    if (actionType === 'TRIG') {
      params = _.merge({ name: payload.name }, getTrigParams(zones, payload.name))
    }
    vgraph[nodeId] = { params, type }
  })
  return score
}

module.exports = multi

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('multi', () => {

    it('can add a multi-zone node to the vgraph of every note in a score', () => {
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
          node_0: { type: 'bar', params: { baz: 2, name: 'foo' } }
        } } },
        { type: 'NOOP', payload: { time: 3/4 } }
      ] }
      let zones = {
        70: { foo: 1 },
        71: { foo: 2 },
        foo: { baz: 2 }
      }
      expect(multi({ zones, type: 'bar' }, score)).to.deep.equal(expScore)
    })
  })
}
