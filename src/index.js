let _ = require('lodash/fp')
let _$ = require('lodash')
let core = require('./core')
let sc = require('./sc')

module.exports = Unmusic

function Unmusic(config) {
  config = _.merge(config, { cwd: '/' })

  // um itself is the seq function from core
  let um = core.find((plugin) => plugin.name === 'seq').resource

  let use = (plugins) => {
    plugins = _.castArray(plugins)
    plugins.forEach(({ name, resource, wrapper }) => {
      if (wrapper) resource = _.get(wrapper, um)(resource)
      _$.set(um, name, resource)
    })
  }

  use([
    { name: 'use', resource: use },
    { name: '__config', resource: config }
  ])
  use(core)
  use(sc)

  return um
}

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('unmusic', () => {

    it('can create a simple score', () => {
      let um = Unmusic()
      let score = um(
        um.mix(um('A B', '/8 C D'), 'E'),
        um.sc.sample('foo.wav'),
        um.tempo(150)
      )
      let expScore = {
        actions: [
          { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
          { type: 'NOTE', payload: { time: 0,   nn: 64, dur: 1/4 } },
          { type: 'NOTE', payload: { time: 1/4, nn: 71, dur: 1/4 } },
          { type: 'NOTE', payload: { time: 1/2, nn: 60, dur: 1/8 } },
          { type: 'NOTE', payload: { time: 5/8, nn: 62, dur: 1/8 } }
        ],
        tempo: 150
      }
      expect(score).to.containSubset(expScore)
    })
  })
}
