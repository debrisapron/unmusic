import _ from 'lodash'

export default function Instrument(P, createVoice) {
  let node
  let connectionSources = new Set()

  function prepare({ audioContext }) {
    node = P.Synth(createVoice)
  }

  function handle(action) {
    // TODO Reinstate once P.Synth implements instruments with inputs.
    // if (node.input) {
    //   let prevNode = action.meta.outputNode
    //   if (prevNode && !connectionSources.has(prevNode)) {
    //     connectionSources.add(prevNode)
    //     prevNode.connect(node.input || node)
    //   }
    // }
    let voice = node.play({
      time: action.meta.time,
      nn: action.payload.nn
    })
    return _.merge(action, { meta: {
      outputNode: node,
      stopCbs: voice.stop && [(t) => voice.stop(t)]
    } })
  }

  return { prepare, handle }
}
