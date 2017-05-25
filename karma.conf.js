let webpack = require('webpack')

module.exports = (config) => {
  config.set({
    browsers: ['ChromeCanaryHeadless'],
    frameworks: ['mocha', 'chai'],
    files: ['src/umlang/*.js'],
    preprocessors: { 'src/umlang/*.js': ['webpack', 'sourcemap'] },
    webpack: {
      // TODO strictify
      devtool: 'inline-source-map',
      plugins: [new webpack.EnvironmentPlugin({ TEST: true })]
    },
    reporters: ['mocha'],
    mochaReporter: {
      showDiff: true
    },
  })
}
