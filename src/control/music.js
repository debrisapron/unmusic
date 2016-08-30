'use strict'

let teoria = require('teoria')

let noteNumber = (noteName) => teoria.note(noteName).midi()

let isNoteName = (str) => {
  try {
    noteNumber(str)
    return true
  }
  catch(_) {
    return false
  }
}

module.exports = { noteNumber, isNoteName }
