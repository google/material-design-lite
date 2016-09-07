/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path');
const deepmerge = require('deepmerge');
const globSync = require('glob').sync;

const SELENIUM_DIR = path.join(__dirname, 'node_modules', 'selenium-standalone', '.selenium');
const REQUIRED_ENV_VARS = [
  'MDL_FUNTEST_PORT'
];

REQUIRED_ENV_VARS.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(
      `Missing required environment variable ${envVar}. ` +
      `Needed environment variables: ${REQUIRED_ENV_VARS.join(', ')}`
    );
  }
});

module.exports = createConfig();

/* eslint-disable camelcase, quote-props */
function createConfig() {
  const USING_SAUCELABS = Boolean(process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY);
  let config = {
    src_folders: 'test/functional',
    test_settings: {
      default: {
        launch_url: `http://localhost:${process.env.MDL_FUNTEST_PORT}`,
        filter: 'test/functional/**/*.test.js',
        globals: {
          waitForConditionTimeout: 60000
        }
      }
    }
  };

  if (USING_SAUCELABS) {
    config = deepmerge(config, {
      test_settings: {
        default: {
          selenium_port: 80,
          selenium_host: 'ondemand.saucelabs.com',
          silent: true,
          username: process.env.SAUCE_USERNAME,
          access_key: process.env.SAUCE_ACCESS_KEY,
          desiredCapabilities: {
            javascriptEnabled: true,
            acceptSslCerts: true
          }
        },
        'sl-chrome-stable': {
          desiredCapabilities: {
            browserName: 'chrome',
            version: 'latest',
            platform: 'OS X 10.11'
          }
        },
        'sl-chrome-beta': {
          browserName: 'chrome',
          version: 'beta'
        },
        'sl-chrome-previous': {
          browserName: 'chrome',
          version: 'latest-1',
          platform: 'OS X 10.11'
        },
        'sl-firefox-stable': {
          browserName: 'firefox',
          version: 'latest',
          platform: 'Windows 10'
        },
        'sl-firefox-previous': {
          browserName: 'firefox',
          version: 'latest-1',
          platform: 'Windows 10'
        },
        'sl-ie': {
          browserName: 'internet explorer',
          version: '11',
          platform: 'Windows 8.1'
        },
        'sl-android-stable': {
          browserName: 'android',
          version: '5.0'
        }
      }
    });
  } else {
    config = deepmerge(config, {
      selenium: {
        start_process: true,
        server_path: assertSeleniumJar(),
        cli_args: {
          'webdriver.chrome.driver': assertChromeDriver(),
          // NOTE(traviskaufman): Running FF with GeckoDriver is flaky,
          // but we're keeping this here for when it becomes not flaky :)
          'webdriver.gecko.driver': assertGeckoDriver()
        }
      },
      test_settings: {
        default: {
          desiredCapabilities: {
            browserName: 'chrome',
            javascriptEnabled: true
          }
        }
      }
    });
  }
  return config;
}

function assertSeleniumJar() {
  const jarFile = globSync(`${SELENIUM_DIR}/selenium-server/*.jar`, {dot: true}).shift();
  if (!jarFile) {
    throw new Error(
      'Could not find selenium server jar! ' +
      'Ensure you\'ve run "$(npm bin)/selenium-standalone install" before running nightwatch'
    );
  }
  return jarFile;
}

function assertChromeDriver() {
  const driver = globSync(`${SELENIUM_DIR}/chromedriver/*chromedriver`, {dot: true}).shift();
  if (!driver) {
    throw new Error('Could not find chromedriver!');
  }
  return driver;
}

function assertGeckoDriver() {
  const driver = globSync(`${SELENIUM_DIR}/geckodriver/*geckodriver`, {dot: true}).shift();
  if (!driver) {
    throw new Error('Could not find geckodriver!');
  }
  return driver;
}
