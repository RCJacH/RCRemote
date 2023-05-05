/** @type {import('postcss-load-config').Config} */

const config = {
  plugins: [
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-initial'),
    require('postcss-nested'),
    require('postcss-simple-vars')
  ]
}

module.exports = config
