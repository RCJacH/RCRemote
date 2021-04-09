// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'RCRemote.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    publicPath: '/assets/',
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
  },
  plugins: [
    // Add your plugins here
    // Learn more obout plugins from https://webpack.js.org/configuration/plugins/
    new HtmlWebpackPlugin({
      title: 'RCRemote',
      filename: 'RCRemote.html',
      template: 'src/pug/index.pug',
    }),
    new MiniCssExtractPlugin({
      filename: 'RCRemote.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['simple-pug-loader']
      },
      {
        test: /\\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
