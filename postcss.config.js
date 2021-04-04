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
        from: "assets/css/index.css",
        filter: url => url.split('.').pop() !== 'scss',
      }),
      require('postcss-mixins')({"mixinsDir": ["assets/css/tools"]}),
      require('postcss-functions')({"glob": "assets/css/functions"}),
      require('precss')(),
      require('postcss-preset-env')(),
      dev ? null : require('cssnano')({preset: 'default'})
    ]
  };
};
