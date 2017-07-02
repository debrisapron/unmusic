let _ = require('lodash/fp')
let addNode = require('./addNode')
let nodes = require('./sclang/nodes')
let player = require('./sclang/player')

module.exports = Sc

function Sc(um) {
  let play = _.curry(player.play)(um.__config)
  return Object.keys(nodes)
    .map((name) => {
      return { name: `sc.${name}`, resource: addNodeOfType(name), wrapper: 'wrapComposer' }
    })
    .concat([
      { name: 'sc.play', resource: play },
      { name: 'sc.stop', resource: player.stop },
    ])
}

////////////////////////////////////////////////////////////////////////////////

function addNodeOfType(type) {
  return (params, score) => addNode({ type, params }, score)
}
