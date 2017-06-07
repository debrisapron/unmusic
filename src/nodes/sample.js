let h = require('./support/helpers')
let WaaNode = require('./support/WaaNode')
let constant = require('./constant')

function stretch(um, node, stretchParams) {
  // TODO Stretch in mode: 'rate' and mode: 'granular' should have followTempo option
  let buffDur = node.buffer.duration
  let wholeNoteDur = 240 / um.tempo()
  let desiredDur = stretchParams.to * wholeNoteDur
  let playbackRate = buffDur / desiredDur
  let constNode = constant.factory(um, { offset: playbackRate })
  constNode.connect(node.playbackRate)
  node.__playbackRateNode = constNode
}

// Exports

let sample = WaaNode({
  out: true,
  audioParams: ['playbackRate', 'detune'],
  rateIn: 'playbackRate',
  defaultParam: 'file',
  factory: (um, params) => {
    let node = um.ac.createBufferSource()
    if (params.file) node.buffer = h.getLoadedFile(params.file)
    if (params.url) node.buffer = h.getLoadedUrl(params.url)
    if (node.buffer && params.stretch) stretch(um, node, params.stretch)
    return node
  },
  prepare: (um, params) => {
    if (params.file) return h.loadFile(um, params.file)
    if (params.url) return h.loadUrl(um, params.url)
    throw new Error('sample node must have file or url param specified.')
  },
  start: (node, time) => {
    node.start(time)
    if (node.__playbackRateNode) node.__playbackRateNode.start(time)
  },
  stop: (node, time) => {
    node.stop(time)
    if (node.__playbackRateNode) node.__playbackRateNode.stop(time)
  }
})

module.exports = sample

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('sample node', () => {

    it('can stretch a sample to a given note length by altering the rate', () => {
      constant = { factory: (__, params) => ({ params, connect: () => {} }) }
      let mockUm = { tempo: () => 120 }
      let mockNode = { buffer: { duration: 1 } }
      stretch(mockUm, mockNode, { to: 2 })
      expect(mockNode.__playbackRateNode.params.offset).to.equal(0.25)
    })
  })
}
