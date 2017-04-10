module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['browserify', 'tape'],
    files: ['index.js'],
    preprocessors: { 'index.js': ['browserify'] },
    browserify: {
      debug: true,
      transform: [
        'strictify',
        ['envify', { TEST: true, SLOW_TEST: true }]
      ]
    },
    reporters: ['spec']
  })
}
