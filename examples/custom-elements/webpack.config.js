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

module.exports = [{
  name: 'js-all',
  entry: path.resolve('./index.js'),
  output: {
    path: OUT_PATH,
    filename: 'all.js',
    libraryTarget: 'umd',
    library: 'mdl'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  }
}, {
  name: 'css',
  entry: {
    'checkbox-styles': path.resolve('./index.scss')
  },
  output: {
    path: OUT_PATH,
    // In development, these are emitted as js files to facilitate hot module replacement. In
    // all other cases, ExtractTextPlugin is used to generate the final css, so this is given a
    // dummy ".css-entry" extension.
    filename: '[name].css-entry'
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!postcss!sass')
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'node_modules')]
  },
  postcss: function() {
    return [
      require('autoprefixer')
    ];
  }
}, {
  name: 'html',
  entry: {
    'index': path.resolve('./index.html')
  },
  output: {
    path: OUT_PATH,
    // In development, these are emitted as js files to facilitate hot module replacement. In
    // all other cases, ExtractTextPlugin is used to generate the final css, so this is given a
    // dummy ".css-entry" extension.
    filename: '[name].html-entry'
  },
  plugins: [
    new ExtractTextPlugin('[name].html')
  ],
  module: {
    loaders: [{
      test: /\.html$/,
      loader: ExtractTextPlugin.extract('html')
    }]
  }
}];
