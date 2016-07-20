const path = require('path');
const webpackConfig = require('./webpack.config')[0];

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['tap'],
    files: [
      'test/unit/index.js'
    ],
    preprocessors: {
      'test/unit/index.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    concurrency: Infinity,

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {type: 'json', subdir: '.', file: 'coverage.json'},
        {type: 'html'}
      ]
    },

    webpack: Object.assign({}, webpackConfig, {
      devtool: 'inline-source-map',
      node: {
        fs: 'empty'
      },
      module: Object.assign({}, webpackConfig.module, {
        // Cover source files when not debugging tests. Otherwise, omit coverage instrumenting to get
        // uncluttered source maps.
        loaders: webpackConfig.module.loaders.concat([config.singleRun ? {
          test: /\.js$/,
          include: path.resolve('./packages'),
          loader: 'isparta'
        } : undefined]).filter(Boolean)
      })
    }),

    webpackMiddleware: {
      noInfo: true
    }
  });
};
