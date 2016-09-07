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

module.exports = {
  '@tags': ['ripple'],

  'MDL Ripple': browser => {
    browser.url(`${browser.launchUrl}/mdl-ripple/test.html`)
      .waitForElementVisible('body', 1000)
      .pause(2000)
      // Test basic interaction
      .assert.cssClassPresent('#basic', 'mdl-ripple-upgraded')
      .assert.cssClassNotPresent('#basic', 'mdl-ripple-upgraded--unbounded')

      .assert.cssClassPresent('#bounded-overridden', 'mdl-ripple-upgraded')
      .assert.cssClassPresent('#bounded-overridden', 'mdl-ripple-upgraded--unbounded')

      .assert.cssClassPresent('#unbounded', 'mdl-ripple-upgraded')
      .assert.cssClassPresent('#unbounded', 'mdl-ripple-upgraded--unbounded')

      .assert.cssClassPresent('#unbounded-overridden', 'mdl-ripple-upgraded')
      .assert.cssClassNotPresent('#unbounded-overridden', 'mdl-ripple-upgraded--unbounded')

      // Smoke-check custom vars
      .assert.attributeContains('#basic', 'style', '--mdl-ripple-fg-size')
      .assert.attributeContains('#unbounded', 'style', '--mdl-ripple-fg-size')

      .end();
  }
};
