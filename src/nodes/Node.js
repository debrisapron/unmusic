// let _ = require('lodash/fp')
// let h = require('./helpers')
//
// let Node = (...args) => {
//
//   let mergedParamsFromArgs = (argObjs) => {
//     let paramObjs = argObjs.map((a) => {
//       return _.isPlainObject(a)
//         ? _.omit('um', a)
//         : (opts.primaryParam && { [opts.primaryParam]: a })
//     })
//     return _.mergeAll(paramObjs) || {}
//   }
//
//   let set = (...args) => {
//     if (!args.length) { return node }
//     h.setNodeParams(node, mergedParamsFromArgs(args))
//     return node
//   }
//
//   // TODO Attach this method to all AudioParams
//   // TODO Dedupe actions
//   let trigger = (action) => {
//     switch (action.type) {
//       case 'NOTE_ON':
//       case 'NOTE_OFF':
//         if (opts.note) opts.note(action)
//         if (opts.noteThru) opts.emit(action)
//         return
//       case 'TICK':
//         if (opts.tick) opts.tick(action)
//         if (opts.tickThru) opts.emit(action)
//         return
//     }
//   }
//
//   let emit = (action) => {
//     setTimeout(() => {
//       dests.forEach((dest) => dest.um.trigger(action))
//     })
//   }
//
//   let connect = (dest) => {
//     if (node.connect) node.connect(dest)
//     if (!dests.includes(dest) && _.get('um.trigger', dest)) dests.push(dest)
//     return dest
//   }
//
//   let opts = _.merge(
//     { set, connect, trigger, emit, noteThru: true, tickThru: true },
//     _.mergeAll(_.map('um', args))
//   )
//   let node = create(mergedParamsFromArgs(args))
//   let dests = []
//
//   set(...args)
//
//   node.um = opts
//
//   return node
// }
//
// module.exports = Node
