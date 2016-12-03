'use strict'
let _ = require('lodash/fp')
let h = require('./helpers')

let UmNode = _.curry((opts, audioContext) => {
  return (...args) => {
    let node = opts.Node(audioContext)

    node.set = (...args) => {
      if (!args.length) { return node }
      let paramObjs = args.map((arg) => {
        return _.isPlainObject(arg) ? arg : { [opts.primaryParam]: arg }
      })
      let params = _.mergeAll(paramObjs)
      h.setNodeParams(node, params)
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

module.exports = UmNode
