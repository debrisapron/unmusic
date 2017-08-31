// let server = require('./server')
//
// function prepareDeps(deps, context) {
//   let buffers = (context.buffers = context.buffers || {})
//   let promises = deps.map((fileName) => {
//     if (buffers[fileName]) { return Promise.resolve() }
//     return (buffers[fileName] = readBuffer(fileName).then((bufferInfo) => {
//       buffers[fileName] = bufferInfo
//     }))
//   })
//   return Promise.all(promises)
// }
//
// function readBuffer(fileName) {
//   return new Promise((resolve) => {
//     let listener = (data) => {
//       let bufferInfo = JSON.parse(data)
//       if (bufferInfo.fileName !== fileName) { return }
//       server.removeListener('stdout', listener)
//       resolve(bufferInfo)
//     }
//     server.on('stdout', listener)
//     server.evalSclang(`
//       Buffer.read(s, "${f}", action: { |buff|
//         format("{ \"fileName\": \"${fileName}\", \"bufnum\": % }", buff.bufnum).postln;
//       });
//     `)
//   })
// }
