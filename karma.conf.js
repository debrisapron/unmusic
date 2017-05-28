let webpack = require('webpack')

module.exports = (config) => {
  config.set({
    browsers: ['ChromeCanaryHeadless'],
    frameworks: ['mocha', 'chai'],
    files: ['index.js'],
    preprocessors: { 'index.js': ['webpack', 'sourcemap'] },
    webpack: {
      // TODO strictify
      devtool: 'inline-source-map',
      plugins: [new webpack.EnvironmentPlugin({ TEST: true })],
      node: {
        fs: 'empty',
        path: 'empty'
      }
    },
    reporters: ['mocha'],
    mochaReporter: {
      showDiff: true
    }
  })
}
