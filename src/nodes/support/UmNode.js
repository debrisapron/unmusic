'use strict'
let _ = require('lodash/fp')
let h = require('./helpers')

let UmNode = _.curry((opts, audioContext) => {

  let paramsFromArgs = (args) => {
    let paramObjs = args.map((arg) => {
      return _.isPlainObject(arg) ? arg : { [opts.primaryParam]: arg }
    })
    return _.mergeAll(paramObjs) || {}
  }

  return (...args) => {
    let node = opts.Node(audioContext, paramsFromArgs(args))

    node.set = (...args) => {
      if (!args.length) { return node }
      h.setNodeParams(node, paramsFromArgs(args))
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
