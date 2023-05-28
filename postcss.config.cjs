/** @type {import('postcss-load-config').Config} */

const config = {
  plugins: {
    'postcss-import': {},
    'postcss-initial': {},
    'postcss-simple-vars': {},
    'postcss-nested': {},
    'postcss-preset-env': {},
    'autoprefixer': {},
  }
}

module.exports = config
