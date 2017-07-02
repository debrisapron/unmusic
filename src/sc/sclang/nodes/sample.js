let _ = require('lodash/fp')
let path = require('path')

module.exports = renderSample

function renderSample({ params, config, context }) {
  context.bufferCache = context.bufferCache || {}
  context.nextId = context.nextId || 1
  let r = {}
  let filePath = path.join(config.cwd || '', config.audio.pathPrefix || '', params.file)
  let bufferId = context.bufferCache[filePath]
  if (!bufferId) {
    context.bufferCache[filePath] = bufferId = `buffer${context.nextId}`
    context.nextId++
    r.init = `d.put("${bufferId}", Buffer.read(s, "${filePath}"));`
  }
  r.expr =
`Pan2.ar(
    PlayBuf.ar(
        numChannels: 1,
        bufnum: d.at("${bufferId}")
    ),
    0
)`
  return r
}
