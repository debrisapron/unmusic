module.exports = {
  out: true,
  audioParams: ['offset'],
  defaultParam: 'offset',
  factory: (um) => {
    // um.ac.createConstantSource() // Soon come.
    provideOne(um.ac)
    let node = um.ac.createGain()
    node.offset = node.gain
    node.start = () => provideOne().connect(node)
    node.stop = () => provideOne().disconnect(node)
    return node
  }
}

////////////////////////////////////////////////////////////////////////////////

let _theOne

function provideOne(ac) {
  return _theOne || (_theOne = One(ac))
}

function One(ac) {
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
