var path = require('path');
module.exports = {
  entry: path.join(process.cwd(), 'client-render.js'),
  output: {
    path: './public/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  }
}
