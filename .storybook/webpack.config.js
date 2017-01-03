/* globals module, require, __dirname */
// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleSheetExtract = new ExtractTextPlugin('[name].css');
const path = require('path');

module.exports = {
  plugins: [
    StyleSheetExtract
  ],
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: StyleSheetExtract.extract('style','css!less'),
        exclude:  /node_modules/
      },
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
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      }
    ],
  },
  resolve: {
    root: [
      path.join(__dirname, '..', 'node_modules')
    ]
  }
};
