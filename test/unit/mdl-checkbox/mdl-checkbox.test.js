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
import domEvents from 'dom-events';
import td from 'testdouble';

import MDLCheckbox from '../../../packages/mdl-checkbox';
import {strings} from '../../../packages/mdl-checkbox/constants';

function getFixture() {
  return bel`
    <div class="mdl-checkbox">
      <input type="checkbox"
             class="mdl-checkbox__native-control"
             id="my-checkbox"
             aria-labelledby="my-checkbox-label"/>
      <div class="mdl-checkbox__frame"></div>
      <div class="mdl-checkbox__background">
        <svg version="1.1"
             class="mdl-checkbox__checkmark"
             viewBox="0 0 24 24">
          <path class="mdl-checkbox__checkmark__path"
                fill="none"
                stroke="white"
                d="M4.1,12.7 9,17.6 20.3,6.3"/>
        </svg>
        <div class="md-checkbox__mixedmark"></div>
      </div>
    </div>
  `;
}

function setupTest() {
  const root = getFixture();
  const component = new MDLCheckbox(root);
  return {root, component};
}

test('buildDom returns a built checkbox element using the supplied id + label id', t => {
  const expected = getFixture();
  const actual = MDLCheckbox.buildDom({id: 'my-checkbox', labelId: 'my-checkbox-label'});
  // NOTE: bel chokes on xmlns. See https://github.com/shama/bel/issues/21
  const svg = actual.querySelector('svg');
  t.equal(svg.getAttribute('xmlns'), 'http://www.w3.org/2000/svg');
  svg.removeAttribute('xmlns');

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
  const dom = MDLCheckbox.buildDom();
  const id = dom.querySelector('.mdl-checkbox__native-control').id;
  const labelId = dom.querySelector('.mdl-checkbox__native-control').getAttribute('aria-labelledby');
  t.true(/^mdl\-checkbox-\d$/.test(id), 'id matches "mdl-checkbox-<number>"');
  t.equal(labelId, `mdl-checkbox-label-${id}`, 'labelId matches "mdl-checkbox-label-<id>"');
  t.end();
});

test('buildDom ensures generated ids are unique', t => {
  const dom1 = MDLCheckbox.buildDom();
  const dom2 = MDLCheckbox.buildDom();
  const id1 = dom1.querySelector('.mdl-checkbox__native-control').id;
  const id2 = dom2.querySelector('.mdl-checkbox__native-control').id;
  t.notEqual(id1, id2);
  t.end();
});

test('buildDom ensures labelId matches supplied id when only id given', t => {
  const dom = MDLCheckbox.buildDom({id: 'foo'});
  const labelId = dom.querySelector('.mdl-checkbox__native-control').getAttribute('aria-labelledby');
  t.equal(labelId, 'mdl-checkbox-label-foo', 'labelId matches "mdl-checkbox-label-<id>"');
  t.end();
});

test('attachTo initializes and returns a MDLCheckbox instance', t => {
  t.true(MDLCheckbox.attachTo(getFixture()) instanceof MDLCheckbox);
  t.end();
});

test('foundationAdapter#addClass adds a class to the root element', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.addClass('foo');
  t.true(root.classList.contains('foo'));
  t.end();
});

test('adapter#removeClass removes a class from the root element', t => {
  const {root, component} = setupTest();
  root.classList.add('foo');
  component.getDefaultFoundation().adapter_.removeClass('foo');
  t.false(root.classList.contains('foo'));
  t.end();
});

test('adapter#registerAnimationEndHandler adds an animation end event listener on the root element', t => {
  const {root, component} = setupTest();
  const handler = td.func('animationEndHandler');
  component.getDefaultFoundation().adapter_.registerAnimationEndHandler(handler);
  domEvents.emit(root, strings.ANIM_END_EVENT_NAME);

  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  t.end();
});

test('adapter#deregisterAnimationEndHandler removes an animation end event listener on the root el', t => {
  const {root, component} = setupTest();
  const handler = td.func('animationEndHandler');
  root.addEventListener(strings.ANIM_END_EVENT_NAME, handler);

  component.getDefaultFoundation().adapter_.deregisterAnimationEndHandler(handler);
  domEvents.emit(root, strings.ANIM_END_EVENT_NAME);

  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  t.end();
});

test('adapter#registerChangeHandler adds a change event listener to the native checkbox element', t => {
  const {root, component} = setupTest();
  const nativeCb = root.querySelector(strings.NATIVE_CONTROL_SELECTOR);
  const handler = td.func('changeHandler');

  component.getDefaultFoundation().adapter_.registerChangeHandler(handler);
  domEvents.emit(nativeCb, 'change');

  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  t.end();
});

test('adapter#deregisterChangeHandler adds a change event listener to the native checkbox element', t => {
  const {root, component} = setupTest();
  const nativeCb = root.querySelector(strings.NATIVE_CONTROL_SELECTOR);
  const handler = td.func('changeHandler');
  nativeCb.addEventListener('change', handler);

  component.getDefaultFoundation().adapter_.deregisterChangeHandler(handler);
  domEvents.emit(nativeCb, 'change');

  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  t.end();
});

test('adapter#getNativeControl returns the native checkbox element', t => {
  const {root, component} = setupTest();
  const nativeCb = root.querySelector(strings.NATIVE_CONTROL_SELECTOR);
  t.equal(component.getDefaultFoundation().adapter_.getNativeControl(), nativeCb);
  t.end();
});

test('adapter#forceLayout touches "offsetWidth" on the root in order to force layout', t => {
  const {root, component} = setupTest();
  const mockGetter = td.func('.offsetWidth');
  Object.defineProperty(root, 'offsetWidth', {
    get: mockGetter,
    set() {},
    enumerable: false,
    configurable: true
  });

  component.getDefaultFoundation().adapter_.forceLayout();
  t.doesNotThrow(() => td.verify(mockGetter()));
  t.end();
});

test('adapter#isAttachedToDOM returns true when root is attached to DOM', t => {
  const {root, component} = setupTest();
  document.body.appendChild(root);
  t.true(component.getDefaultFoundation().adapter_.isAttachedToDOM());
  document.body.removeChild(root);
  t.end();
});

test('adapter#isAttachedToDOM returns false when root is not attached to DOM', t => {
  const {component} = setupTest();
  t.false(component.getDefaultFoundation().adapter_.isAttachedToDOM());
  t.end();
});
