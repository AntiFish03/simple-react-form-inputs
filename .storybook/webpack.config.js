/* globals module, require, __dirname */
// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to 'React Create App'. This only has babel loader to load JavaScript.

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleSheetExtract = new ExtractTextPlugin('[name].css');

module.exports = {
  plugins: [
    StyleSheetExtract
  ],
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { loose: true, modules: false }],
              'react'
            ]
          }
        },
        exclude: /node_modules/,
        test: /.jsx?$/
      },
      {
        test: /\.less|\.css$/,
        use: StyleSheetExtract.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ],
        test: /\.(eot|svg|ttf|woff|woff2)/
      }
    ]
  },
  resolve: {
    modules: [__dirname, 'node_modules']
  }
};
