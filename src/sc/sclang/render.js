let _ = require('lodash')
let nodes = require('./nodes')

module.exports = render

function render(score, umConfig) {
  let lines = []
  let length = lengthOfScore()
  let context = {}
  let config = _.merge(umConfig, score.config)

  renderTempo()
  renderNodes()
  renderSequencer()
  renderPlay()

  return lines.join('\n')

  function lengthOfScore() {
    let lastAction = _.last(score.actions)
    return lastAction.payload.time + (lastAction.payload.dur || 0)
  }

  function renderTempo() {
    if (score.tempo) {
      let bps = score.tempo / 60
      lines.push(`TempoClock.default.tempo_(${bps});`)
    }
  }

  function renderNodes() {
    let inits = []
    let events = []

    eventList().forEach(([t, payload]) => renderEvent(t, payload))

    lines = lines.concat(inits)
    lines = lines.concat(['var events = [', )

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
          let nextTime = i === lastIndex ? length : score.actions[i + 1].payload.time
          let timeToNext = nextTime - thisTime
          r.push([timeToNext, payload])
        })
      return r
    }

    function renderEvent(t, payload) {
      let vgraph = _.get('sc.vgraph', payload)
      if (!vgraph) return
      events.push(`[${t}, { ${renderNode(_.values(vgraph)[0])}; }]`)
    }

    function renderNode({ type, params }) {
      let renderFn = nodes[type]
      let { init, expr } = renderFn({ params, config, context })
      if (init) inits.push(init)
      return expr
    }
  }
}
