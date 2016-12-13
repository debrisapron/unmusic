let sinon = require("sinon")

let BuggedAudioContext = () => {
  let ac = new window.AudioContext()
  let sandbox = sinon.sandbox.create()

  let wrapNativeNodeFn = (name) => {
    let createFnName = `create${ name }`
    let createFn = ac[createFnName]

    sandbox.stub(ac, createFnName, (...args) => {
      var newNode = createFn.apply(ac, args)
      if(newNode.connect) sandbox.spy(newNode, 'connect')
      if(newNode.start) sandbox.spy(newNode, 'start')
      if(newNode.stop) sandbox.spy(newNode, 'stop')
      ac.nodes.push(newNode)
      return newNode
    })
  }

  let init = () => {
    ac.nodes = []
    sandbox.restore()

    wrapNativeNodeFn('Gain')
    wrapNativeNodeFn('Delay')
    wrapNativeNodeFn('BiquadFilter')
    wrapNativeNodeFn('Oscillator')
  }

  ac.init = init
  return ac
}

module.exports = BuggedAudioContext
