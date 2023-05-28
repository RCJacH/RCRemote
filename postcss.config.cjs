/** @type {import('postcss-load-config').Config} */

module.exports = (ctx) => ({
  plugins: [
    require('postcss-import'),
    require('postcss-initial'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-preset-env'),
    require('autoprefixer'),
  ]
})
