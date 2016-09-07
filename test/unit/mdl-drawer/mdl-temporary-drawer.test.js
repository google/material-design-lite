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

import MDLTemporaryDrawer from '../../../packages/mdl-drawer/temporary';
import {strings} from '../../../packages/mdl-drawer/temporary/constants';
import {getTransformPropertyName, supportsCssCustomProperties} from '../../../packages/mdl-drawer/util';

function getFixture() {
  return bel`
    <aside class="mdl-temporary-drawer">
      <nav class="mdl-temporary-drawer__drawer">
      </nav>
    </aside>
  `;
}

function setupTest() {
  const root = getFixture();
  const component = new MDLTemporaryDrawer(root);
  return {root, component};
}

test('buildDom returns a built DOM structure', t => {
  const expected = getFixture();
  const actual = MDLTemporaryDrawer.buildDom();

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

test('attachTo initializes and returns a MDLTemporaryDrawer instance', t => {
  t.true(MDLTemporaryDrawer.attachTo(getFixture()) instanceof MDLTemporaryDrawer);
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

test('adapter#hasClass returns true if the root element has specified class', t => {
  const {root, component} = setupTest();
  root.classList.add('foo');
  t.true(component.getDefaultFoundation().adapter_.hasClass('foo'));
  t.end();
});

test('adapter#hasClass returns false if the root element does not have specified class', t => {
  const {component} = setupTest();
  t.false(component.getDefaultFoundation().adapter_.hasClass('foo'));
  t.end();
});

test('adapter#hasNecessaryDom returns true if the DOM includes a drawer', t => {
  const {component} = setupTest();
  t.true(component.getDefaultFoundation().adapter_.hasNecessaryDom());
  t.end();
});

test('adapter#hasNecessaryDom returns false if the DOM does not include a drawer', t => {
  const {root, component} = setupTest();
  const drawer = root.querySelector(strings.DRAWER_SELECTOR);
  root.removeChild(drawer);
  t.false(component.getDefaultFoundation().adapter_.hasNecessaryDom());
  t.end();
});

test('adapter#registerInteractionHandler adds an event listener to the root element', t => {
  const {root, component} = setupTest();
  const handler = td.func('eventHandler');

  component.getDefaultFoundation().adapter_.registerInteractionHandler('click', handler);
  domEvents.emit(root, 'click');

  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  t.end();
});

test('adapter#deregisterInteractionHandler removes an event listener from the root element', t => {
  const {root, component} = setupTest();
  const handler = td.func('eventHandler');
  root.addEventListener('click', handler);

  component.getDefaultFoundation().adapter_.deregisterInteractionHandler('click', handler);
  domEvents.emit(root, 'click');

  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  t.end();
});

test('adapter#registerDrawerInteractionHandler adds an event listener to the root element', t => {
  const {root, component} = setupTest();
  const drawer = root.querySelector(strings.DRAWER_SELECTOR);
  const handler = td.func('eventHandler');

  component.getDefaultFoundation().adapter_.registerDrawerInteractionHandler('click', handler);
  domEvents.emit(drawer, 'click');

  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  t.end();
});

test('adapter#deregisterDrawerInteractionHandler removes an event listener from the root element', t => {
  const {root, component} = setupTest();
  const drawer = root.querySelector(strings.DRAWER_SELECTOR);
  const handler = td.func('eventHandler');
  drawer.addEventListener('click', handler);

  component.getDefaultFoundation().adapter_.deregisterDrawerInteractionHandler('click', handler);
  domEvents.emit(drawer, 'click');

  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  t.end();
});

test('adapter#registerTransitionEndHandler adds a transition end event listener on the drawer element', t => {
  const {root, component} = setupTest();
  const drawer = root.querySelector(strings.DRAWER_SELECTOR);
  const handler = td.func('transitionEndHandler');
  component.getDefaultFoundation().adapter_.registerTransitionEndHandler(handler);
  domEvents.emit(drawer, 'transitionend');

  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  t.end();
});

test('adapter#deregisterTransitionEndHandler removes a transition end event listener on the drawer element', t => {
  const {root, component} = setupTest();
  const drawer = root.querySelector(strings.DRAWER_SELECTOR);
  const handler = td.func('transitionEndHandler');
  drawer.addEventListener('transitionend', handler);

  component.getDefaultFoundation().adapter_.deregisterTransitionEndHandler(handler);
  domEvents.emit(root, 'transitionend');

  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  t.end();
});

test('adapter#getDrawerWidth returns the width of the drawer element', t => {
  const {root, component} = setupTest();
  const drawer = root.querySelector(strings.DRAWER_SELECTOR);
  t.equal(component.getDefaultFoundation().adapter_.getDrawerWidth(), drawer.offsetWidth);
  t.end();
});

test('adapter#setTranslateX sets the correct transform on the drawer', t => {
  const {root, component} = setupTest();
  const drawer = root.querySelector(strings.DRAWER_SELECTOR);
  component.getDefaultFoundation().adapter_.setTranslateX(42);
  t.equal(drawer.style.getPropertyValue(getTransformPropertyName()), 'translateX(42px)');
  t.end();
});

test('adapter#updateCssVariable sets custom property on root', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.updateCssVariable('0');
  if (supportsCssCustomProperties()) {
    t.equal(root.style.getPropertyValue(strings.OPACITY_VAR_NAME), '0');
  }
  t.end();
});

test('adapter#getFocusableElements returns all the focusable elements in the drawer', t => {
  const root = bel`
    <aside class="mdl-temporary-drawer">
      <nav class="mdl-temporary-drawer__drawer">
        <div class="mdl-temporary-drawer__toolbar-spacer"></div>
        <button></button>
        <a href="foo"></a>
        <div></div>
        <div tabindex="0"></div>
      </nav>
    </aside>
  `;
  const component = new MDLTemporaryDrawer(root);
  t.equal(component.getDefaultFoundation().adapter_.getFocusableElements().length, 3);
  t.end();
});

test('adapter#makeElementUntabbable sets a tab index of -1 on the element', t => {
  const root = bel`
    <aside class="mdl-temporary-drawer mdl-temporary-drawer--open">
      <nav class="mdl-temporary-drawer__drawer">
        <a id="foo" href="foo"></a>
      </nav>
    </aside>
  `;
  const component = new MDLTemporaryDrawer(root);
  const el = root.querySelector('#foo');
  component.getDefaultFoundation().adapter_.makeElementUntabbable(el);
  t.equal(el.getAttribute('tabindex'), '-1');
  t.end();
});

test('adapter#isRtl returns true for RTL documents', t => {
  const root = bel`
    <aside dir="rtl" class="mdl-temporary-drawer">
      <nav class="mdl-temporary-drawer__drawer">
      </nav>
    </aside>
  `;
  document.body.appendChild(root);
  const component = new MDLTemporaryDrawer(root);
  t.true(component.getDefaultFoundation().adapter_.isRtl());
  t.end();
});

test('adapter#isRtl returns false for explicit LTR documents', t => {
  const root = bel`
    <aside dir="ltr" class="mdl-temporary-drawer">
      <nav class="mdl-temporary-drawer__drawer">
      </nav>
    </aside>
  `;
  document.body.appendChild(root);
  const component = new MDLTemporaryDrawer(root);
  t.false(component.getDefaultFoundation().adapter_.isRtl());
  t.end();
});

test('adapter#isRtl returns false for implicit LTR documents', t => {
  const root = bel`
    <aside class="mdl-temporary-drawer">
      <nav class="mdl-temporary-drawer__drawer">
      </nav>
    </aside>
  `;
  document.body.appendChild(root);
  const component = new MDLTemporaryDrawer(root);
  t.false(component.getDefaultFoundation().adapter_.isRtl());
  t.end();
});
