module.exports = (config) => {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['browserify', 'tape'],
    files: ['index.js'],
    preprocessors: { 'index.js': ['browserify'] },
    browserify: {
      debug: true,
      transform: [
        'strictify',
        ['envify', { TEST: true }]
      ]
    },
    reporters: ['spec']
  })
}
