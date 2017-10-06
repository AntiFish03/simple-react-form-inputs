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
    react: 'react',
    classnames: 'classnames',
    lodash: 'lodash'
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        test: /.jsx?$/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
