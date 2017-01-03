/* globals module, __dirname */

module.exports = {
  entry: {
    'simple-react-form-inputs': './src/index'
  },
  output: {
    filename: 'simple-react-form-inputs.js',
    path: __dirname + '/dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
