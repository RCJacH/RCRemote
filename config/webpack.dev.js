const path = require('path');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.common.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../public'),
  },
  devtool: 'eval-source-map',
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, '../public'),
    watchContentBase: true,
    compress: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ],
      },
    ]
  }
});
