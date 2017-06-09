let WaaNode = require('./support/WaaNode')

let _theOne

let One = (ac) => {
  let buffer = ac.createBuffer(1, 128, ac.sampleRate)
  let arr = buffer.getChannelData(0)
  arr.forEach((_, i) => arr[i] = 1)
  let oneNode = ac.createBufferSource()
  oneNode.buffer = buffer
  oneNode.channelCount = 1
  oneNode.channelCountMode = 'explicit'
  oneNode.loop = true
  oneNode.start()
  return oneNode
}

let provideOne = (ac) => _theOne || (_theOne = One(ac))

let constant = WaaNode({
  out: true,
  audioParams: ['offset'],
  defaultParam: 'offset',
  factory: (um) => {
    // um.ac.createConstantSource()
    provideOne(um.ac)
    let node = um.ac.createGain()
    node.offset = node.gain
    node.start = () => provideOne().connect(node)
    node.stop = () => provideOne().disconnect(node)
    return node
  }
})

module.exports = constant
