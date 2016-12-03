module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['browserify', 'tape'],
    files: [
      '../test/compositionTests.js',
      '../test/nativeNodeTests.js',
      '../test/routeTests.js'
    ],
    preprocessors: {
      '../test/*Tests.js': ['browserify']
    },
    browserify: {
      debug: true
    },
    reporters: ['spec'],
    singleRun: false
  })
}
