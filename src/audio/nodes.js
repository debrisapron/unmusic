'use strict'

let _ = require('lodash')
let ADSR = require('adsr')
let wh = require('./waa-helpers')
let constant = require('./constant-node')

let globalConstantNode

let provideConstantNode = (audioContext) => {
  if (globalConstantNode) { return globalConstantNode }
  globalConstantNode = constant(audioContext)
  globalConstantNode.start(0)
  return globalConstantNode
}

let makeNodeFactory = _.curry((opts, audioContext) => {
  return (...args) => {
    let node = opts.makeNode(audioContext)

    node.set = (...args) => {
      if (!args.length) { return node }
      let paramObjs = args.map((arg) => {
        return _.isPlainObject(arg) ? arg : { [opts.primaryParam]: arg }
      })
      let params = _.merge({}, ...paramObjs)
      wh.setNodeParams(node, params)
    }

    if (opts.defaultParams) {
      node.set(opts.defaultParams)
    }
    if (args.length) {
      node.set(...args)
    }

    return node
  }
})

// **** NATIVE NODES ****

let biquad = makeNodeFactory({
  makeNode: (audioContext) => audioContext.createBiquadFilter(),
  primaryParam: 'frequency',
  defaultParams: { freq: 0 }
})
let buffSrc = makeNodeFactory({
  makeNode: (audioContext) => audioContext.createBufferSource(),
  primaryParam: 'buffer'
})
let gain = makeNodeFactory({
  makeNode: (audioContext) => audioContext.createGain(),
  primaryParam: 'gain'
})

let makeOscFactory = (type = 'sine') => {
  return makeNodeFactory({
    makeNode: (audioContext) => audioContext.createOscillator(),
    primaryParam: 'frequency',
    defaultParams: { type, freq: 0 }
  })
}
let osc = makeOscFactory()
let sin = makeOscFactory('sine')
let sqr = makeOscFactory('square')
let saw = makeOscFactory('sawtooth')
let tri = makeOscFactory('triangle')

// **** CUSTOM NODES ****

let signal = makeNodeFactory({
  makeNode: (audioContext) => {
    let signalGain = audioContext.createGain()
    provideConstantNode(audioContext).connect(signalGain)
    return signalGain
  },
  primaryParam: 'gain'
})

// **** THIRD-PARTY NODES ****

let adsr = makeNodeFactory({
  makeNode: (audioContext) => {
    let node = ADSR(audioContext)
    node.finish = node.stop
    return node
  }
})

module.exports = { adsr, biquad, buffSrc, gain, osc, signal }
