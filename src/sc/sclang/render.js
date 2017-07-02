let _ = require('lodash/fp')

module.exports = render

function render(nodes, umConfig, score) {
  let length = lengthOfScore()
  let context = {}
  let config = _.merge(umConfig, score.config)

  return []
    .concat(tempo())
    .concat(sequence())
    .join('\n')

  function lengthOfScore() {
    let lastAction = _.last(score.actions)
    return lastAction.payload.time + (lastAction.payload.dur || 0)
  }

  function tempo() {
    if (!score.tempo) return []
    let bps = score.tempo / 60
    return `TempoClock.default.tempo_(${bps});`
  }

  function sequence() {
    let inits = []
    let events = []

    eventList().forEach(([t, payload]) => pushEvent(t, payload))

    // Remove comma from last event
    if (events.length) events.push(events.pop().slice(0, -1))

    return ['']
      .concat(inits)
      .concat('')
      .concat('p.value([')
      .concat(events)
      .concat(']);')

    function eventList() {
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

    function pushEvent(t, payload) {
      t = t * 4 // Whole notes -> beats
      let vgraph = _.get('sc.vgraph', payload)
      if (!vgraph) {
        events.push(`    [${t}],`)
        return
      }
      let { type, params } = _.values(vgraph)[0]
      let renderFn = nodes[type]
      let { init, expr } = renderFn({ params, config, context })
      if (init) inits.push(init)
      events.push(`    [${t}, { ${expr}; }],`)
    }
  }
}

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('render sclang', () => {

    it('can render a simple score to a sclang script', () => {
      let score = {
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
      let nodes = {
        foo: (opts) => {
          let s = JSON.stringify(opts)
          opts.context.foo = 'CTX'
          return { init: s, expr: s }
        }
      }
      let script = render(nodes, { quux: 1 }, score)
      expect(script).to.equal(
`TempoClock.default.tempo_(2.05);

{"params":{"bar":1,"nn":71},"config":{"quux":2},"context":{}}
{"params":{"bar":1,"nn":60},"config":{"quux":2},"context":{"foo":"CTX"}}

p.value([
    [0.25],
    [0.25, { {"params":{"bar":1,"nn":71},"config":{"quux":2},"context":{}}; }],
    [0.125, { {"params":{"bar":1,"nn":60},"config":{"quux":2},"context":{"foo":"CTX"}}; }]
]);`)
    })
  })
}
