const TARGET = process.env.npm_lifecycle_event;

const PATH = {
  'prod': './config/webpack.prod.js',
  'dev': './config/webpack.dev.js',
}

const MSG = 'Using configuration file --> ';

module.exports = () => {
  switch (TARGET) {
    case 'build:dev':
    case 'watch':
    case 'serve':
    default:
      console.info(MSG + PATH.dev);
      return require(PATH.dev);
    case 'build':
      console.info(MSG + PATH.prod);
      return require(PATH.prod);
  }
}
