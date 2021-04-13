const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'RCRemote.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RCRemote',
      filename: 'RCRemote.html',
      template: 'src/pug/index.pug',
    }),

  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['simple-pug-loader']
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
