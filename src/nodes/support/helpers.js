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
  Object.keys(params).forEach((key) => {
    if (!(key in node)) return
    let val = params[key]
    let attr = node[key]
    if (isAudioParam(attr)) {
      attr.value = val
    } else {
      node[key] = val
    }
  })
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
