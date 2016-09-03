var webpack = require('webpack')
var config = require('./webpack.base.conf')

// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.
config.output.filename = 'vue-mdl.js'
config.output.library = 'VueMdl'
config.output.libraryTarget = 'umd'
config.output.umdNamedDefine = true
config.entry = './src/vue-mdl'

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = true

config.devtool = SOURCE_MAP ? 'source-map' : false

config.plugins = (config.plugins || []).concat([
  // http://vuejs.github.io/vue-loader/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"dev"'
    }
  }),
])

module.exports = config
