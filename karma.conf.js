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

const path = require('path');
const webpackConfig = require('./webpack.config')[0];

const USING_TRAVISCI = Boolean(process.env.TRAVIS);
const USING_SL = Boolean(process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY);

const SL_LAUNCHERS = {
  'sl-chrome-stable': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest',
    platform: 'OS X 10.11'
  },
  'sl-chrome-beta': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'beta'
  },
  'sl-chrome-previous': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest-1',
    platform: 'OS X 10.11'
  },
  'sl-firefox-stable': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest',
    platform: 'Windows 10'
  },
  'sl-firefox-previous': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest-1',
    platform: 'Windows 10'
  },
  'sl-ie': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '11',
    platform: 'Windows 8.1'
  },
  'sl-android-stable': {
    base: 'SauceLabs',
    browserName: 'android',
    version: '5.0'
  }
  // NOTE(traviskaufman): Temporarily disabling these browsers as they are consistently flaky using
  // Sauce Labs and almost always yield false negatives.
  // 'sl-edge': {
  //   base: 'SauceLabs',
  //   browserName: 'microsoftedge',
  //   version: 'latest',
  //   platform: 'Windows 10'
  // },
  // 'sl-safari-stable': {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   version: '9',
  //   platform: 'OS X 10.11'
  // },
  // 'sl-safari-previous': {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   version: '8',
  //   platform: 'OS X 10.10'
  // },
  // 'sl-ios-safari-latest': {
  //   base: 'SauceLabs',
  //   browserName: 'iphone',
  //   platform: 'OS X 10.10',
  //   version: '9.1'
  // },
  // 'sl-ios-safari-previous': {
  //   base: 'SauceLabs',
  //   browserName: 'iphone',
  //   version: '8.4'
  // }
};

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
    browsers: USING_SL ? Object.keys(SL_LAUNCHERS) : ['Chrome'],
    browserDisconnectTimeout: 20000,
    browserNoActivityTimeout: 240000,
    captureTimeout: 120000,
    concurrency: USING_SL ? 4 : Infinity,
    customLaunchers: SL_LAUNCHERS,

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

  // See https://github.com/karma-runner/karma-sauce-launcher/issues/73
  if (USING_TRAVISCI) {
    config.set({
      sauceLabs: {
        testName: 'Material Design Lite Unit Tests - CI',
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
        startConnect: false
      },
      // Attempt to de-flake Sauce Labs tests on TravisCI.
      transports: ['polling'],
      browserDisconnectTolerance: 3
    });
  }
};
