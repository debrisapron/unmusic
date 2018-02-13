import _ from 'lodash/fp'
import concatScores from './scoring/concatScores'
import getScore from './scoring/getScore'
import mixScores from './scoring/mixScores'
import Player from './playback/player'
import Sequencer from './playback/sequencer'

function wrapScoringFunction(fn) {
  return fn.length === 1
    ? (thing) => fn(getScore(thing))
    : _.curry((options, thing) => fn(options, getScore(thing)))
}

function getDefaultAudioContext() {
  if (typeof window === 'undefined') { return }
  return window.__umAudioContext ||
    (window.__umAudioContext = new AudioContext())
}

// Scoring functions

function config(opts, score) {
  return _.set('config', _.merge(score.config || {}, opts), score)
}

function loop(score) {
  return _.set('loop', true, score)
}

function mix(...args) {
  return mixScores(args)
}

function offset(amount, score) {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload, type }) => {
    if (type === 'NOOP') { return }
    payload.offset = amount
  })
  return score
}

function part(callback, score) {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload, type }) => {
    if (type === 'NOOP') { return }
    payload.callback = callback
  })
  return score
}

function seq(...args) {
  let [fns, scores] = _.partition(_.isFunction, args)
  return _.pipe(fns)(concatScores(scores))
}

function tempo(bpm, score) {
  return _.set('tempo', bpm, score)
}

////////////////////////////////////////////////////////////////////////////////

function Unmusic(audioContext = getDefaultAudioContext()) {
  let sequencer = Sequencer(audioContext)
  let player = Player(sequencer)

  // um itself is the seq function
  let um = seq
  um.audioContext = audioContext
  um.config = wrapScoringFunction(config)
  um.loop = wrapScoringFunction(loop)
  um.mix = mix
  um.offset = wrapScoringFunction(offset)
  um.part = wrapScoringFunction(part)
  um.play = player.play
  um.seq = seq
  um.stop = player.stop
  um.tempo = wrapScoringFunction(tempo)

  return um
}

export default Unmusic
