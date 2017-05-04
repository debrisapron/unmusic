let _ = require('lodash')
let { getScore } = require('./scoring/support/helpers')
let mix = require('./scoring/mix')
let seq = require('./scoring/seq')
let loop = require('./scoring/loop')
let arrange = require('./scoring/arrange')
let addNode = require('./scoring/addNode')
let Controller = require('./Controller')
let Sequencer = require('./Sequencer')
let Player = require('./Player')
let coreNodes = require('./nodes/coreNodes')

let getDefaultAudioContext = () => {
  return window.__umAudioContext ||
    (window.__umAudioContext = new AudioContext())
}

let Unmusic = (audioContext = getDefaultAudioContext()) => {
  let um = {}
  let nodeDefs = {}
  let controller = Controller(nodeDefs, audioContext)
  let sequencer = Sequencer(audioContext)
  let player = Player(sequencer, controller.handle)

  let use = (key, value) => {
    um[key] = value
  }

  let useComposer = (key, fn) => {
    let wrappedFn = fn.length === 1
      ? (thing) => fn(getScore(thing))
      : _.curry((options, thing) => fn(options, getScore(thing)))
    um[key] = wrappedFn
  }

  let useNode = (type, nodeDef) =>{
    nodeDefs[type] = nodeDef
    um.useComposer(
      type,
      (params, score) => addNode({ type, params }, score)
    )
  }

  use('use', use)

  use('audioContext', audioContext)
  use('ac', audioContext)
  use('out', audioContext.destination)

  use('play', player.play)
  use('stop', player.stop)

  use('mix', mix)
  use('seq', seq)

  useComposer('loop', loop)
  useComposer('arrange', arrange)

  useNode('adsr', coreNodes.adsr)
  useNode('biquad', coreNodes.biquad)
  useNode('osc', coreNodes.osc)

  return um
}

module.exports = Unmusic
