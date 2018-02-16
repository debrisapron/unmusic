let puppeteer = require('puppeteer')
let webpackConfig = require('./webpack.config.js')

process.env.CHROME_BIN = puppeteer.executablePath()
delete webpackConfig.entry

module.exports = function(config) {
  config.set({
    files: ['test/*.js'],
    frameworks: ['mocha'],
    browsers: ['ChromeHeadless'],
    preprocessors: {
      'test/*.js': ['webpack']
    },
    webpack: webpackConfig,
    reporters: ['mocha'],
    mochaReporter: {
      showDiff: true
    }
  })
}
