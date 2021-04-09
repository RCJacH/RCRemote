module.exports = cfg => {

  const
    dev = cfg.env === 'development',
    scss = cfg.file.extname === '.scss',
    sss = cfg.file.extname === '.sss';

  return {
    map: dev ? { inline: false } : false,
    parser: scss ? 'postcss-scss' : sss ? 'sugarss' : false,
    plugins: [
      require('postcss-import')({
        from: "src/css/index.css",
        filter: url => url.split('.').pop() !== 'scss',
      }),
      require('postcss-mixins')({"mixinsDir": ["src/css/tools"]}),
      require('postcss-functions')({"glob": "src/css/functions"}),
      require('precss')(),
      require('postcss-preset-env')(),
      dev ? null : require('cssnano')({preset: 'default'})
    ]
  };
};
