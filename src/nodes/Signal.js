let UmNode = require('./support/UmNode')
let Constant = require('./Constant')

let globalConstantNode

let provideConstantNode = (audioContext) => {
  if (globalConstantNode) { return globalConstantNode }
  globalConstantNode = Constant(audioContext)
  globalConstantNode.start(0)
  return globalConstantNode
}

let Signal = UmNode({
  makeNode: (audioContext) => {
    let signalGain = audioContext.createGain()
    provideConstantNode(audioContext).connect(signalGain)
    return signalGain
  },
  primaryParam: 'gain'
})

module.exports = Signal
