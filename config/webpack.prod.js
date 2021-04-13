const path = require('path');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'RCRemote.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
    ]
  }
});
