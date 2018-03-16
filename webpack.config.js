let path = require('path')

module.exports = {
  // No need for entry since it defaults to src/index.js nowadays!

  // Following needed until electron has native support for object spread.
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(partch)\/).*/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'unmusic.js',
    library: 'Unmusic',
    libraryExport: 'default',
    libraryTarget: 'umd'
  }
}
