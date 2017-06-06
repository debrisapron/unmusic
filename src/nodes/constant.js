let WaaNode = require('./support/WaaNode')

let constant = WaaNode({
  out: true,
  audioParams: ['offset'],
  defaultParam: 'offset',
  factory: (um) => um.ac.createConstantSource()
})

module.exports = constant
