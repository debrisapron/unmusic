'use strict'
let _ = require('lodash')
let wh = require('../waa-helpers')

let NodeFactory = _.curry((opts, audioContext) => {
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

module.exports = NodeFactory
