let addNode = require('./addNode')
let nodes = require('./sclang/nodes')
let player = require('./sclang/player')

let sc = Object.keys(nodes)
  .map((name) => {
    name = `sc.${name}`
    return { name, resource: addNodeOfType(name), wrapper: 'wrapComposer' }
  })
  .concat([
    { name: 'sc.play', resource: player.play },
    { name: 'sc.stop', resource: player.stop },
  ])

module.exports = sc

////////////////////////////////////////////////////////////////////////////////

function addNodeOfType(type) {
  return (params, score) => addNode({ type, params }, score)
}
