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

import test from 'tape';
import bel from 'bel';

import {supportsCssVariables} from '../../../packages/mdl-ripple/util';
import {createMockRaf} from '../helpers/raf';
import {MDLRadio, MDLRadioFoundation} from '../../../packages/mdl-radio';

const {NATIVE_CONTROL_SELECTOR} = MDLRadioFoundation.strings;

function getFixture() {
  return bel`
    <div class="mdl-radio">
      <input type="radio" id="my-radio" name="my-radio-group"
             class="mdl-radio__native-control" aria-labelledby="my-radio-label">
      <div class="mdl-radio__background">
        <div class="mdl-radio__outer-circle"></div>
        <div class="mdl-radio__inner-circle"></div>
      </div>
    </div>
  `;
}

function setupTest() {
  const root = getFixture();
  const component = new MDLRadio(root);
  return {root, component};
}

if (supportsCssVariables(window)) {
  test('#constructor initializes the root element with a ripple', t => {
    const raf = createMockRaf();
    const {root} = setupTest();
    raf.flush();
    t.true(root.classList.contains('mdl-ripple-upgraded'));
    raf.restore();
    t.end();
  });

  test('#destroy removes the ripple', t => {
    const raf = createMockRaf();
    const {root, component} = setupTest();
    raf.flush();
    component.destroy();
    raf.flush();
    t.false(root.classList.contains('mdl-ripple-upgraded'));
    t.end();
  });
}

test('get/set checked updates the checked value of the native radio element', t => {
  const {root, component} = setupTest();
  const radio = root.querySelector(NATIVE_CONTROL_SELECTOR);
  component.checked = true;
  t.true(radio.checked);
  t.equal(component.checked, radio.checked);
  t.end();
});

test('get/set disabled updates the disabled value of the native radio element', t => {
  const {root, component} = setupTest();
  const radio = root.querySelector(NATIVE_CONTROL_SELECTOR);
  component.disabled = true;
  t.true(radio.disabled);
  t.equal(component.disabled, radio.disabled);
  t.end();
});

test('#adapter.getNativeControl() returns the native radio element', t => {
  const {root, component} = setupTest();
  t.equal(
    component.getDefaultFoundation().adapter_.getNativeControl(), root.querySelector(NATIVE_CONTROL_SELECTOR)
  );
  t.end();
});
