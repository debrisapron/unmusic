let _ = require('lodash/fp')

let PARAM_ALIASES = {
  freq: 'frequency',
  rate: 'playbackRate'
}

let normalizeParamName = (name) => {
  return PARAM_ALIASES[name] || name
}

let normalizeParamNames = (params) => {
  return _.mapKeys((key) => normalizeParamName(key), params)
}

let isAudioNode = (obj) => {
  return obj instanceof AudioNode
}

let isAudioParam = (obj) => {
  return obj instanceof AudioParam
}

let setNodeParams = (node, argObjs) => {
  let primaryParam = (node.__um || {}).primaryParam
  let params = normalizeParamNames(paramsFromArgObjects(primaryParam, argObjs))
  let childNodes = node.nodes || {}
  Object.keys(params).forEach((key) => {
    let val = params[key]
    if (key in childNodes) setNodeParams(childNodes[key], val)
    if (key in node) setNodeParam(node, key, val)
  })
}

let setNodeParam = (node, key, val) => {
  let attr = node[key]
  if (isAudioParam(attr)) {
    attr.value = val
  } else {
    node[key] = val
  }
}

let paramsFromArgObjects = (primaryParam, argObjs) => {
  let paramObjs = argObjs.map((a) => {
    return _.isPlainObject(a)
      ? a
      : (primaryParam && { [primaryParam]: a })
  })
  return _.mergeAll(paramObjs) || {}
}

module.exports = { normalizeParamName, isAudioNode, isAudioParam, setNodeParams, paramsFromArgObjects }
