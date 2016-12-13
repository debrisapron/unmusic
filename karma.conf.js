module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['browserify', 'tape'],
    files: ['index.js'],
    preprocessors: { 'index.js': ['browserify'] },
    browserify: {
      debug: true,
      transform: [['envify', { TEST: true }]]
    },
    reporters: ['spec']
  })
}
