let h = require('./support/helpers')

let Constant = (audioContext) => {
  let buffer = audioContext.createBuffer(1, 128, audioContext.sampleRate)
  let arr = buffer.getChannelData(0)
  arr.forEach((_, i) => arr[i] = 1)
  let constantNode = audioContext.createBufferSource()
  h.setNodeParams(constantNode, {
    buffer,
    channelCount: 1,
    channelCountMode: 'explicit',
    loop: true
  })
  return constantNode
}

module.exports = Constant