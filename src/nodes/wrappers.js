let _ = require('lodash/fp')

let PARAM_ALIASES = {
  freq: 'frequency',
  rate: 'playbackRate'
}

let normalizeParamName = (name) => {
  return PARAM_ALIASES[name] || name
}

let wrapNode = (opts, node) => {
  // TODO Denormalize input names eg can use inputs.freq or inputs.frequency
  let inputs = opts.inputs && _.zipObject(opts.inputs, opts.inputs.map((x) => {
    return x === 'main' ? node : node[x]
  }))
  let outputs = opts.outputs && _.zipObject(opts.outputs, opts.outputs.map((x) => {
    return x === 'main' ? node : node[x]
  }))

  let set = (params) => {
    _.forEach((val, key) => {
      key = normalizeParamName(key)
      if (opts.audioParams.includes(key)) {
        node[key].value = val
      } else {
        node[key] = val
      }
    }, params)
  }

  return { inputs, outputs, set }
}

let wrapSourceNode = (opts, node) => {
  let wrapped = wrapNode(opts, node)
  let started = false

  let start = (...args) => {
    if (started) return
    started = true
    node.start(...args)
  }
  let stop = (...args) => node.stop(...args)
  let finish = stop

  return _.merge(wrapped, { start, stop, finish })
}

module.exports = { wrapNode, wrapSourceNode }
