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
import {compare} from 'dom-compare';

import {supportsCssVariables} from '../../../packages/mdl-ripple/util';
import {createMockRaf} from '../helpers/raf';
import MDLRadio, {MDLRadioFoundation} from '../../../packages/mdl-radio';

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

test('buildDom returns a built radio element using the supplied id, group id, and label id', t => {
  const expected = getFixture();
  const actual = MDLRadio.buildDom({
    id: 'my-radio',
    groupId: 'my-radio-group',
    labelId: 'my-radio-label'
  });

  const comparison = compare(expected, actual);
  const diffs = comparison.getDifferences();

  if (diffs.length) {
    const diffMsgs = diffs.map(({node, message}) => `\t* ${node} - ${message}`).join('\n');
    t.fail(`Improper DOM Object. Diff failed:\n${diffMsgs}\n`);
  } else {
    t.pass();
  }

  t.end();
});

test('buildDom attaches a generated id / label-id when none supplied', t => {
  const dom = MDLRadio.buildDom();
  const id = dom.querySelector(NATIVE_CONTROL_SELECTOR).id;
  const labelId = dom.querySelector(NATIVE_CONTROL_SELECTOR).getAttribute('aria-labelledby');
  t.true(/^mdl\-radio-\d$/.test(id), 'id matches "mdl-radio-<number>"');
  t.equal(labelId, `mdl-radio-label-${id}`, 'labelId matches "mdl-radio-label-<id>"');
  t.end();
});

test('buildDom ensures generated ids are unique', t => {
  const dom1 = MDLRadio.buildDom();
  const dom2 = MDLRadio.buildDom();
  const id1 = dom1.querySelector(NATIVE_CONTROL_SELECTOR).id;
  const id2 = dom2.querySelector(NATIVE_CONTROL_SELECTOR).id;
  t.notEqual(id1, id2);
  t.end();
});

test('buildDom ensures labelId matches supplied id when only id given', t => {
  const dom = MDLRadio.buildDom({id: 'foo'});
  const labelId = dom.querySelector(NATIVE_CONTROL_SELECTOR).getAttribute('aria-labelledby');
  t.equal(labelId, 'mdl-radio-label-foo', 'labelId matches "mdl-radio-label-<id>"');
  t.end();
});

test('buildDom does not add a "name" when none given', t => {
  const dom = MDLRadio.buildDom();
  t.false(dom.querySelector(NATIVE_CONTROL_SELECTOR).hasAttribute('name'));
  t.end();
});

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
