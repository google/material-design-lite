/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    base: [path.resolve('./packages/mdl-base/index.js')],
    checkbox: [path.resolve('./packages/mdl-checkbox/index.js')],
    drawer: [path.resolve('./packages/mdl-drawer/index.js')],
    iconToggle: [path.resolve('./packages/mdl-icon-toggle/index.js')],
    radio: [path.resolve('./packages/mdl-radio/index.js')],
    ripple: [path.resolve('./packages/mdl-ripple/index.js')],
    snackbar: [path.resolve('./packages/mdl-snackbar/index.js')],
    textfield: [path.resolve('./packages/mdl-textfield/index.js')]
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
    }, {
      test: /\.json$/,
      loader: 'json-loader'
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
    'mdl-animation': path.resolve('./packages/mdl-animation/mdl-animation.scss'),
    'mdl-button': path.resolve('./packages/mdl-button/mdl-button.scss'),
    'mdl-card': path.resolve('./packages/mdl-card/mdl-card.scss'),
    'mdl-checkbox': path.resolve('./packages/mdl-checkbox/mdl-checkbox.scss'),
    'mdl-drawer': path.resolve('./packages/mdl-drawer/mdl-drawer.scss'),
    'mdl-elevation': path.resolve('./packages/mdl-elevation/mdl-elevation.scss'),
    'mdl-fab': path.resolve('./packages/mdl-fab/mdl-fab.scss'),
    'mdl-form-field': path.resolve('./packages/mdl-form-field/mdl-form-field.scss'),
    'mdl-icon-toggle': path.resolve('./packages/mdl-icon-toggle/mdl-icon-toggle.scss'),
    'mdl-list': path.resolve('./packages/mdl-list/mdl-list.scss'),
    'mdl-radio': path.resolve('./packages/mdl-radio/mdl-radio.scss'),
    'mdl-ripple': path.resolve('./packages/mdl-ripple/mdl-ripple.scss'),
    'mdl-snackbar': path.resolve('./packages/mdl-snackbar/mdl-snackbar.scss'),
    'mdl-textfield': path.resolve('./packages/mdl-textfield/mdl-textfield.scss'),
    'mdl-theme': path.resolve('./packages/mdl-theme/mdl-theme.scss'),
    'mdl-typography': path.resolve('./packages/mdl-typography/mdl-typography.scss')
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
