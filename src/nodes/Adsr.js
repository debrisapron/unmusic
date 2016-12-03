'use strict' 
let ADSR = require('adsr')
let UmNode = require('./support/UmNode')

let Adsr = UmNode({
  makeNode: (audioContext) => {
    let node = ADSR(audioContext)
    node.finish = node.stop
    return node
  }
})

module.exports = Adsr