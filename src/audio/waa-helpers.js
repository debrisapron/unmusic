'use strict'

let _ = require('lodash')

let PARAM_ALIASES = {
  freq: 'frequency',
  rate: 'playbackRate'
}

let normalizeParamName = (name) => {
  return PARAM_ALIASES[name] || name
}

let normalizeParamNames = (params) => {
  return _.mapKeys(params, (_, key) => normalizeParamName(key))
}

let isAudioNode = (obj) => {
  return obj instanceof AudioNode
}

let isAudioParam = (obj) => {
  return obj instanceof AudioParam
}

let setNodeParams = (node, params) => {
  params = normalizeParamNames(params)
  _.forIn(params, (val, key) => {
    let attr = node[key]
    if (isAudioParam(attr)) {
      attr.value = val
    } else {
      node[key] = val
    }
  })
}

module.exports = { normalizeParamName, isAudioNode, isAudioParam, setNodeParams }
