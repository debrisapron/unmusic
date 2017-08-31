let _ = require('lodash/fp')

module.exports = { renderPlay }

// function getDeps(nodes, umConfig, score) {
//   let config = _.merge(umConfig, score.config)
//
//   let deps = score.actions
//     .filter(({ type, payload }) => type !== 'NOOP' && _.get('sc.vgraph', payload))
//     .map(({ payload }) => {
//       let vgraph = payload.sc.vgraph
//       let { type, params } = _.values(vgraph)[0]
//       let node = nodes[type]
//       return node.deps && node.deps({ params, config })
//     })
//
//   return _.compact(_.flatten(deps))
// }

function renderPlay(nodes, umConfig, score, context) {
  let config = _.merge(umConfig, score.config)
  let tempo = score.tempo || 120
  let events = eventList(score)
  let scEvents = events
    .map(([t, payload]) => {
      t = t * 4 // Whole notes -> beats
      let vgraph = _.get('sc.vgraph', payload)
      if (!vgraph) return `    [${t}]`
      let { type, params } = _.values(vgraph)[0]
      let node = nodes[type]
      let expr = node.expr({ params, config, context })
      return `    [${t}, { ${expr}; }]`
    })
    .join(',\n')
  return `p([\n${scEvents}\n], ${tempo});`
}

////////////////////////////////////////////////////////////////////////////////

function eventList(score) {
  let lastAction = _.last(score.actions)
  let length = lastAction.payload.time + (lastAction.payload.dur || 0)
  let r = []
  let lastIndex = score.actions.length - 1
  score.actions
    .filter(({ type }) => type !== 'NOOP')
    .forEach(({ type, payload }, i) => {
      let thisTime = payload.time
      if (i === 0 && thisTime) {
        r.push([thisTime])
      }
      let nextTime = i === lastIndex ? length : (score.actions[i + 1].payload.time)
      let timeToNext = nextTime - thisTime
      r.push([timeToNext, payload])
    })
  return r
}

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('sclang renderer', () => {

    let SCORE = {
      actions: [
        { type: 'NOTE', payload: { time: 1/4, nn: 71, dur: 1/4, sc: { vgraph: {
          node_1: { type: 'foo', params: { bar: 1, nn: 71 } }
        } } } },
        { type: 'NOTE', payload: { time: 1/2, nn: 60, dur: 1/8, sc: { vgraph: {
          node_1: { type: 'foo', params: { bar: 1, nn: 60 } }
        } } } }
      ],
      tempo: 123,
      config: { quux: 2 }
    }

    let NODES = {
      foo: {
        init: (opts) => JSON.stringify(opts),
        expr: (opts) => JSON.stringify(opts)
      }
    }

    // it('can render init script for a simple score', () => {
    //   let script = renderInit(NODES, { quux: 1 }, SCORE)
    //   expect(unspace(script)).to.equal(unspace(`
    //     {"params":{"bar":1,"nn":71},"config":{"quux":2}}
    //     {"params":{"bar":1,"nn":60},"config":{"quux":2}}`
    //   ))
    // })

    it('can render play script for a simple score', () => {
      let script = renderPlay(NODES, { quux: 1 }, SCORE)
      expect(unspace(script)).to.equal(unspace(`
        p([
          [1],
          [1, { {"params":{"bar":1,"nn":71},"config":{"quux":2}}; }],
          [0.5, { {"params":{"bar":1,"nn":60},"config":{"quux":2}}; }]
        ], 123);`
      ))
    })
  })

  function unspace(s) {
    return s.replace(/[ \n\r]/g, '')
  }
}
