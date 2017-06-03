let um = window.__um || (window.__um = require('..')())

um.config.cwd = __dirname

um.play(um.multi(
  { type: 'sample', zones: {
    k: { file: 'distKick.wav' },
    c: { file: 'clap808.wav' }
  } }, um.mix('k k k k', '_ c c c')
))
