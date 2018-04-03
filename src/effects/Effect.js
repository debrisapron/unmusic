import _ from 'lodash'
import Partch from 'partch'

let P

export default function Effect(createNode) {
  let node
  let connectionSources = new Set()

  function prepare({ audioContext }) {
    P = P || Partch(audioContext)
    node = createNode(P)
  }

  function handle(action) {
    let prevNode = action.meta.outputNode
    if (!connectionSources.has(prevNode)) {
      connectionSources.add(prevNode)
      prevNode.connect(node.input || node)
    }
    return _.merge(action, { meta: {
      outputNode: node
    } })
  }

  return { prepare, handle }
}
