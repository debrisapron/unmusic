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
    // return um.sc.play(score).then(() => {
    //   um.sc.stop()
    //   expect(server._evals[0]).to.equal(require('./sc/sclang/setupScript'))
    //   expect(unspace(server._evals[1])).to.equal(unspace(`
    //     u.set("/blah/foo.wav", { Buffer.read(s, "/blah/foo.wav") });
    //     u.set("/blah/foo.wav", { Buffer.read(s, "/blah/foo.wav") });
    //     u.set("/blah/foo.wav", { Buffer.read(s, "/blah/foo.wav") });
    //     u.set("/blah/foo.wav", { Buffer.read(s, "/blah/foo.wav") });
    //     u.set("/blah/foo.wav", { Buffer.read(s, "/blah/foo.wav") });
    //     u.play([
    //       [0, { Pan2.ar(PlayBuf.ar(numChannels: 1, bufnum: u.get("/blah/foo.wav"), rate: 1), 0); }],
    //       [1, { Pan2.ar(PlayBuf.ar(numChannels: 1, bufnum: u.get("/blah/foo.wav"), rate: 0.7491535384383408), 0); }],
    //       [1, { Pan2.ar(PlayBuf.ar(numChannels: 1, bufnum: u.get("/blah/foo.wav"), rate: 1.122462048309373), 0); }],
    //       [0.5, { Pan2.ar(PlayBuf.ar(numChannels: 1, bufnum: u.get("/blah/foo.wav"), rate: 0.5946035575013605), 0); }],
    //       [0.5, { Pan2.ar(PlayBuf.ar(numChannels: 1, bufnum: u.get("/blah/foo.wav"), rate: 0.6674199270850172), 0); }]
    //     ], 123);`))
    //   expect(server._evals[2]).to.equal('u.stop;')
    // })
  })
})

function unspace(s) {
  return s.replace(/[ \n\r]/g, '')
}
