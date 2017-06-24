let path = require('path')

module.exports = render

function render({ params, config, context }) {
  context.bufferCache = context.bufferCache || {}
  let r = {}
  let filePath = path.join(config.cwd || '', config.audio.pathPrefix || '', params.file)
  let bufferId = context.bufferCache[filePath]
  if (!bufferId) {
    context.bufferCache[filePath] = bufferId = `buffer${_.uniqueId}`
    r.init = `var ${bufferId} = Buffer.read(s, "${filePath}");`
  }
  r.expr = `PlayBuf.ar(2, ${bufferId})`
  return r
}
