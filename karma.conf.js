let webpack = require('webpack')
let karmaWebpack = require('karma-webpack')
let karmaTape = require('karma-tape')
let karmaSpecReporter = require('karma-spec-reporter')
let karmaChromeLauncher = require('karma-chrome-launcher')
let karmaSourcemapLoader = require('karma-sourcemap-loader')

module.exports = (config) => {
  config.set({
    browsers: ['ChromeCanaryHeadless'],
    frameworks: ['tape'],
    plugins: [karmaWebpack, karmaTape, karmaSpecReporter, karmaChromeLauncher, karmaSourcemapLoader],
    files: ['index.js'],
    preprocessors: { 'index.js': ['webpack', 'sourcemap'] },
    webpack: {
      // TODO strictify
      devtool: 'inline-source-map',
      plugins: [new webpack.EnvironmentPlugin({ TEST: true })]
    },
    reporters: ['spec']
  })
}
