'use strict' 
let ADSR = require('adsr')
let NodeFactory = require('./NodeFactory')

let Adsr = NodeFactory({
  makeNode: (audioContext) => {
    let node = ADSR(audioContext)
    node.finish = node.stop
    return node
  }
})

module.exports = Adsr