let path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'unmusic.js',
    library: 'um',
    libraryTarget: "umd"
  }
}
