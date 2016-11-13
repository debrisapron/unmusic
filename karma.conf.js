module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['browserify', 'tape'],
    files: ['./test/*Tests.js'],
    preprocessors: {
      './test/*Tests.js': ['browserify']
    },
    browserify: {
      debug: true
    },
    reporters: ['spec'],
    singleRun: true
  })
}
