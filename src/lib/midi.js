let WebMidi = require('webmidi')

WebMidi.enable((err) => {
  if (err) throw err
  console.log(WebMidi.inputs)
  console.log(WebMidi.outputs)
})

const getOutputId = (name) =>
  name ? WebMidi.getOutputByName(name).id : WebMidi.outputs[0].id

module.exports = { getOutputId }
