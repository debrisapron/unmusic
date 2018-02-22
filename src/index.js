import _ from 'lodash/fp'
import Tone from 'Tone'
import concatScores from './scoring/concatScores'
import getScore from './scoring/getScore'
import mixScores from './scoring/mixScores'
import Player from './playback/Player'
import Sequencer from './playback/Sequencer'
import * as midi from './midi'
import Soundfont from './instruments/Soundfont'

function wrapScoringFunction(fn) {
  return fn.length === 1
    ? (thing) => fn(getScore(thing))
    : _.curry((options, thing) => fn(options, getScore(thing)))
}

function getDefaultAudioContext() {
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

function part(handler, score) {
  score = _.cloneDeep(score)
  let callback = _.isFunction(handler) ? handler : handler.start
  if (handler.prepare && handler.id) {
    score.dependencies = score.dependencies || {}
    score.dependencies[handler.id] = handler.prepare
  }
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

function tran(amount, score) {
  score = _.cloneDeep(score)
  score.actions.forEach(({ payload }) => {
    if (payload.nn == null) { return }
    payload.nn = payload.nn + amount
  })
  return score
}

////////////////////////////////////////////////////////////////////////////////

function Unmusic(audioContext = getDefaultAudioContext()) {
  Tone.context = audioContext
  let sequencer = Sequencer()
  let player = Player(sequencer)

  // um itself is the seq function
  let um = seq
  um.audioContext = audioContext
  um.config = wrapScoringFunction(config)
  um.instr = {}
  um.instr.sf = Soundfont(audioContext)
  um.loop = wrapScoringFunction(loop)
  um.midi = midi
  um.mix = mix
  um.offset = wrapScoringFunction(offset)
  um.part = wrapScoringFunction(part)
  um.play = player.play
  um.seq = seq
  um.stop = player.stop
  um.tempo = wrapScoringFunction(tempo)
  um.Tone = Tone
  um.tran = wrapScoringFunction(tran)

  return um
}

export default Unmusic
