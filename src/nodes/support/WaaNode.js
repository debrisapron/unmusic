let _ = require('lodash/fp')

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

let WaaNode = (nodeDef) => {
  let newFactory = (ac, params) => {
    let node = nodeDef.factory(ac, params)
    configureWaaNode(nodeDef.audioParams, params, node)
    return node
  }
  return _.set('factory', newFactory, nodeDef)
}

module.exports = WaaNode
