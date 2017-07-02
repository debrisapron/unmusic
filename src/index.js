let _ = require('lodash/fp')
let _$ = require('lodash')
let core = require('./core')
let sc = require('./sc')

module.exports = Unmusic

function Unmusic(config) {
  config = _.merge({ cwd: '/', audio: {} }, config)

  // um itself is the seq function from core
  let um = core.find((plugin) => plugin.name === 'seq').resource

  use([
    { name: 'use', resource: use },
    { name: '__config', resource: config }
  ])
  use(core)
  use(sc)

  return um

////////////////////////////////////////////////////////////////////////////////

  function use(plugins) {
    plugins = _.castArray(plugins)
    plugins.forEach((plugin) => {
      if (_.isFunction(plugin)) {
        use(plugin(um))
        return
      }
      let { name, resource, wrapper } = plugin
      if (wrapper) resource = _.get(wrapper, um)(resource)
      _$.set(um, name, resource)
    })
  }
}

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {
  let server = require('./sc/sclang/server')

  describe('unmusic', () => {

    it('can play a simple score', () => {
      let um = Unmusic({ cwd: '/blah' })
      let score = um(
        um.mix(um('A B', '/8 C D'), 'E'),
        um.sc.sample({ file: 'foo.wav' }),
        um.tempo(123)
      )
      let expScore = {
        actions: [
          { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
          { type: 'NOTE', payload: { time: 0,   nn: 64, dur: 1/4 } },
          { type: 'NOTE', payload: { time: 1/4, nn: 71, dur: 1/4 } },
          { type: 'NOTE', payload: { time: 1/2, nn: 60, dur: 1/8 } },
          { type: 'NOTE', payload: { time: 5/8, nn: 62, dur: 1/8 } }
        ],
        tempo: 123
      }
      expect(score).to.containSubset(expScore)
      return um.sc.play(score).then(() => {
        um.sc.stop()
        expect(server.evalSclang.history).to.deep.equal([
          's.boot;',

          require('./sc/sclang/setupScript'),

`TempoClock.default.tempo_(2.05);

d.put("buffer1", Buffer.read(s, "/blah/foo.wav"));

p.value([
    [0, { PlayBuf.ar(2, d.at("buffer1")); }],
    [0.25, { PlayBuf.ar(2, d.at("buffer1")); }],
    [0.25, { PlayBuf.ar(2, d.at("buffer1")); }],
    [0.125, { PlayBuf.ar(2, d.at("buffer1")); }],
    [0.125, { PlayBuf.ar(2, d.at("buffer1")); }]
]);`,

          'CmdPeriod.run;'
        ])
      })
    })
  })
}
