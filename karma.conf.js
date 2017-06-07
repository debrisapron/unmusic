// let webpack = require('webpack')

module.exports = (config) => {
  config.set({
    browsers: ['Electron'],
    frameworks: ['mocha', 'chai'],
    files: ['index.js'],
    preprocessors: { 'index.js': ['electron'] },
    // preprocessors: { 'index.js': ['webpack', 'sourcemap'] },
    // webpack: {
    //   devtool: 'inline-source-map',
    //   plugins: [new webpack.EnvironmentPlugin({ TEST: true })],
    //   node: {
    //     fs: 'empty'
    //   }
    // },
    reporters: ['mocha'],
    mochaReporter: {
      showDiff: true
    },
    client: {
      useIframe: false,
      loadScriptsViaRequire: true
    }
  })
}
