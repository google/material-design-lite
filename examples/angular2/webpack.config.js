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

/* eslint-disable */
var webpack = require('webpack');
var path = require('path');


// Webpack Config
var webpackConfig = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor':    './src/vendor.ts',
    'app':       './src/app.ts',
  },

  output: {
    path: './dist',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'], minChunks: Infinity }),
  ],

  module: {
    loaders: [
      // .ts files for TypeScript
      { test: /\.ts$/, loader: 'babel-loader!awesome-typescript-loader' },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve('../../packages')
        ]
      },
      {
        test: /\.scss$/,
        loader: 'css-loader!postcss-loader!sass-loader',
        include: [
          path.resolve('../../packages')
        ]
      }
    ]
  },

  sassLoader: {
    includePaths: [path.resolve('../../packages')]
  },

  resolve: {
    alias: {
      'mdl-checkbox': path.resolve('../../packages/mdl-checkbox/index.js'),
      'mdl-checkbox-styles': path.resolve('../../packages/mdl-checkbox/mdl-checkbox.scss'),
      'mdl-form-field-styles': path.resolve('../../packages/mdl-form-field/mdl-form-field.scss')
    }
  }
};


// Our Webpack Defaults
var defaultConfig = {
  devtool: 'cheap-module-source-map',
  cache: true,
  debug: true,
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js'],
    alias: {

    },
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },

  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  },
}

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
