let sc = require('supercolliderjs')

// sc.server.boot({ debug: true, host: '127.0.0.1' }).then((server) => {
  sc.lang.boot({ debug: true }).then((sclang) => {

sclang.interpret('s.boot;').then(() => {
  setTimeout(() => {
    sclang.interpret('{ [SinOsc.ar(440, 0, 0.2), SinOsc.ar(442, 0, 0.2)] }.play;')
      .then((result) => {
        // result is a native javascript array
        console.log(result)
      }, (error) => {
        // syntax or runtime errors
        // are returned as javascript objects
        console.error(error)
      });
  }, 1000)
})



  }, (error) => {
    console.error(error)
    // sclang failed to startup:
    // - executable may be missing
    // - class library may have failed with compile errors
  })
// })
