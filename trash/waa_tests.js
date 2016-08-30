let test = require('tape'
let * as waa = require('../src/waa'
let * as util = require('util'

test.only('Prototyping', (assert) => {

  let i = 1

  let node = (name, xs) => {
    let wire = xs => {
      return ys => {
        if(!ys) return wire(xs)
        if(ys === 'dump') return {
          name,
          children: xs && xs.map(x => x('dump'))
        }
        return wire(ys.concat(xs))
      }
    }
    return wire(xs)
  }

  let display = (node) => {
    let children = node.children || []
    let l = children.length
    let childNames = l ?
      node.children.map(c => c.name).join(', ') :
      'nothing'
    let arity = l < 2 ? 'is' : 'are'
    return `
${childNames} ${arity} connected to ${node.name}${children.map(display)}`
  }

  let fn =
    node('A', [
      node('B', [node('D'), node('E')]),
      node('C', [node('F'), node('G')])
    ])
  console.log(display(fn('dump')))

  assert.end()
})
