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
  '@tags': ['checkbox'],

  'MDL Checkbox': browser => {
    const ANIM_WAIT_TIME = 800;
    browser.url(`${browser.launchUrl}/mdl-checkbox/test.html`)
      .waitForElementVisible('body', 1000)
      .pause(2000)
      // Test unchecked->checked animation
      .click('#js-checkbox')
      .assert.cssClassPresent('#js-checkbox', 'mdl-checkbox--anim-unchecked-checked')
      .pause(ANIM_WAIT_TIME)
      .assert.cssClassNotPresent('#js-checkbox', 'mdl-checkbox--anim-unchecked-checked')

      // Test checked->unchecked animation
      .click('#js-checkbox')
      .assert.cssClassPresent('#js-checkbox', 'mdl-checkbox--anim-checked-unchecked')
      .pause(ANIM_WAIT_TIME)
      .assert.cssClassNotPresent('#js-checkbox', 'mdl-checkbox--anim-checked-unchecked')

      // Test unchecked->indeterminate animation
      .click('#make-indeterminate')
      .assert.cssClassPresent('#js-checkbox', 'mdl-checkbox--anim-unchecked-indeterminate')
      .pause(ANIM_WAIT_TIME)
      .assert.cssClassNotPresent('#js-checkbox', 'mdl-checkbox--anim-unchecked-indeterminate')

      // Test indeterminate->checked animation
      .click('#js-checkbox')
      .assert.cssClassPresent('#js-checkbox', 'mdl-checkbox--anim-indeterminate-checked')
      .pause(ANIM_WAIT_TIME)
      .assert.cssClassNotPresent('#js-checkbox', 'mdl-checkbox--anim-indeterminate-checked')

      // Test checked->indeterminate animation
      .click('#make-indeterminate')
      .assert.cssClassPresent('#js-checkbox', 'mdl-checkbox--anim-checked-indeterminate')
      .pause(ANIM_WAIT_TIME)
      .assert.cssClassNotPresent('#js-checkbox', 'mdl-checkbox--anim-checked-indeterminate')

      // Test indeterminate->unchecked animation
      .click('#js-checkbox')
      .assert.cssClassPresent('#js-checkbox', 'mdl-checkbox--anim-indeterminate-unchecked')
      .pause(ANIM_WAIT_TIME)
      .assert.cssClassNotPresent('#js-checkbox', 'mdl-checkbox--anim-indeterminate-unchecked')

      .end();
  }
};
