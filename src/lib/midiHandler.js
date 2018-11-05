'use strict'

let midiHandler = (umAction) => {
  let { type, payload } = umAction
  if (type !== 'NOTE') return

  let { dur, cha, nn, time, vel } = payload
  vel = vel || 100
  cha = cha || 1
  return [
    `i "midi" ${time} 0.01 144 ${cha} ${nn} ${vel}`,
    `i "midi" ${time + dur} 0.01 144 ${cha} ${nn} 0`
  ]
}

module.exports = midiHandler
