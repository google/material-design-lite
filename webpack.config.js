'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const OUT_PATH = path.resolve('./build');
// Used with webpack-dev-server
const PUBLIC_PATH = '/assets/';
const IS_DEV = process.env.MDL_ENV === 'development';
const IS_PROD = process.env.MDL_ENV === 'production';

module.exports = [{
  name: 'js-components',
  entry: {
    autoInit: [path.resolve('./packages/mdl-auto-init/index.js')],
    BaseComponent: [path.resolve('./packages/mdl-base-component/index.js')],
    Checkbox: [path.resolve('./packages/mdl-checkbox/index.js')],
    Ripple: [path.resolve('./packages/mdl-ripple/index.js')]
  },
  output: {
    path: OUT_PATH,
    publicPath: PUBLIC_PATH,
    filename: 'mdl.[name].' + (IS_PROD ? 'min.' : '') + 'js',
    libraryTarget: 'umd',
    library: ['mdl', '[name]']
  },
  devtool: IS_DEV ? 'source-map' : null,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}, {
  name: 'js-all',
  entry: path.resolve('./packages/material-design-lite/index.js'),
  output: {
    path: OUT_PATH,
    publicPath: PUBLIC_PATH,
    filename: 'material-design-lite.' + (IS_PROD ? 'min.' : '') + 'js',
    libraryTarget: 'umd',
    library: 'mdl'
  },
  devtool: IS_DEV ? 'source-map' : null,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}, {
  name: 'css',
  entry: {
    'material-design-lite': path.resolve(
        './packages/material-design-lite/material-design-lite.scss'),
    'material-design-lite-theme': path.resolve(
        './packages/material-design-lite/material-design-lite-theme.scss'),
    'mdl-animation': path.resolve('./packages/mdl-animation/mdl-animation.scss'),
    'mdl-checkbox': path.resolve('./packages/mdl-checkbox/mdl-checkbox.scss'),
    'mdl-checkbox-theme': path.resolve('./packages/mdl-checkbox/mdl-checkbox-theme.scss'),
    'mdl-ripple': path.resolve('./packages/mdl-ripple/mdl-ripple.scss'),
  },
  output: {
    path: OUT_PATH,
    publicPath: PUBLIC_PATH,
    // In development, these are emitted as js files to facilitate hot module replacement. In
    // all other cases, ExtractTextPlugin is used to generate the final css, so this is given a
    // dummy ".css-entry" extension.
    filename: '[name].' + (IS_PROD ? 'min.' : '') + 'css' + (IS_DEV ? '.js' : '-entry')
  },
  devtool: IS_DEV ? 'source-map' : null,
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: IS_DEV ?
          'style!css?sourceMap!postcss!sass?sourceMap' :
          ExtractTextPlugin.extract('css!postcss!sass')
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].' + (IS_PROD ? 'min.' : '') + 'css')
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'packages')]
  },
  postcss: function() {
    return [
      require('autoprefixer')
    ];
  }
}];
