/* globals module, __dirname, require */

const path = require('path');

module.exports = {
  entry: {
    'simple-react-form-inputs': './src/index'
  },
  output: {
    filename: 'simple-react-form-inputs.js',
    path: __dirname + '/dist',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'React',
    classnames: 'classnames'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
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
