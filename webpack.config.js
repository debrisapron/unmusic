let path = require('path')

module.exports = {
  entry: {
    core: './src',
    midi: './src/midi',
    soundfont: './src/soundfont'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: ['Unmusic', '[name]'],
    libraryTarget: 'umd'
  }
}
