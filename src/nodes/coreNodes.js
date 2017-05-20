let _ = require('lodash/fp')
let Envelope = require('envelope-generator')

let configureWaaNode = (audioParams, params, node) => {
  Object.keys(params).forEach((key) => {
    let val = params[key]
    if (audioParams.includes(key)) {
      node[key].value = val
    } else {
      node[key] = val
    }
  })
}

let waaNode = (nodeDef) => {
  let newFactory = (ac, params) => {
    let node = nodeDef.factory(ac)
    configureWaaNode(nodeDef.audioParams, params, node)
    return node
  }
  return _.set('factory', newFactory, nodeDef)
}

let adsr = {
  out: true,
  factory: (ac, params) => new Envelope(ac, params),
  finish: (node, time, andStop = true) => {
    node.release(time)
    let fTime = node.getReleaseCompleteTime()
    if (andStop) node.stop(fTime)
    return fTime
  }
}

let biquad = waaNode({
  in: true,
  out: true,
  audioParams: ['frequency', 'detune', 'Q', 'gain'],
  factory: (ac) => ac.createBiquadFilter()
})

let gain = waaNode({
  in: true,
  out: true,
  audioParams: ['gain'],
  factory: (ac) => ac.createGain()
})

let osc = waaNode({
  out: true,
  audioParams: ['frequency', 'detune'],
  factory: (ac) => ac.createOscillator()
})

module.exports = { adsr, biquad, gain, osc }
