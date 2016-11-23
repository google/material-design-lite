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
import domEvents from 'dom-events';
import td from 'testdouble';

import {MDLSimpleMenu} from '../../../packages/mdl-menu/simple';
import {strings} from '../../../packages/mdl-menu/simple/constants';
import {getTransformPropertyName} from '../../../packages/mdl-menu/util';

function getFixture(open) {
  return bel`
    <div class="mdl-simple-menu ${open ? 'mdl-simple-menu--open' : ''}" tabindex="-1">
      <ul class="mdl-simple-menu__items mdl-list" role="menu">
        <li class="mdl-list-item" role="menuitem" tabindex="0">Item</a>
        <li role="separator"></li>
        <li class="mdl-list-item" role="menuitem" tabindex="0">Another Item</a>
      </nav>
    </div>
  `;
}

function setupTest(open = false) {
  const root = getFixture(open);
  const component = new MDLSimpleMenu(root);
  return {root, component};
}

test('attachTo initializes and returns a MDLSimpleMenu instance', t => {
  t.true(MDLSimpleMenu.attachTo(getFixture()) instanceof MDLSimpleMenu);
  t.end();
});

test('get/set open', t => {
  const {component} = setupTest();
  component.open = true;
  t.true(component.open);

  component.open = false;
  t.false(component.open);
  t.end();
});

test('items returns all menu items', t => {
  const {root, component} = setupTest();
  const items = [].slice.call(root.querySelectorAll('[role="menuitem"]'));
  t.deepEqual(component.items, items);
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

test('adapter#hasNecessaryDom returns false if the DOM does not include the items container', t => {
  const {root, component} = setupTest();
  const items = root.querySelector(strings.ITEMS_SELECTOR);
  root.removeChild(items);
  t.false(component.getDefaultFoundation().adapter_.hasNecessaryDom());
  t.end();
});

test('adapter#getInnerDimensions returns the dimensions of the items container', t => {
  const {root, component} = setupTest();
  const items = root.querySelector(strings.ITEMS_SELECTOR);
  t.equal(component.getDefaultFoundation().adapter_.getInnerDimensions().width, items.offsetWidth);
  t.equal(component.getDefaultFoundation().adapter_.getInnerDimensions().height, items.offsetHeight);
  t.end();
});

test('adapter#setScale sets the correct transform on the menu element', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.setScale(0.42, 0.84);
  t.equal(root.style.getPropertyValue(getTransformPropertyName(window)), 'scale(0.42, 0.84)');
  t.end();
});

test('adapter#setInnerScale sets the correct transform on the items container', t => {
  const {root, component} = setupTest();
  const items = root.querySelector(strings.ITEMS_SELECTOR);
  component.getDefaultFoundation().adapter_.setInnerScale(0.42, 0.84);
  t.equal(items.style.getPropertyValue(getTransformPropertyName(window)), 'scale(0.42, 0.84)');
  t.end();
});

test('adapter#getNumberOfItems returns the number of item elements within the items container', t => {
  const {root, component} = setupTest();
  const numberOfItems = root.querySelectorAll('[role="menuitem"]').length;
  t.equal(component.getDefaultFoundation().adapter_.getNumberOfItems(), numberOfItems);
  t.end();
});

test('adapter#registerInteractionHandler proxies to addEventListener', t => {
  const {root, component} = setupTest();
  const handler = td.func('interactionHandler');
  component.getDefaultFoundation().adapter_.registerInteractionHandler('foo', handler);
  domEvents.emit(root, 'foo');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  t.end();
});

test('adapter#deregisterInteractionHandler proxies to removeEventListener', t => {
  const {root, component} = setupTest();
  const handler = td.func('interactionHandler');
  root.addEventListener('foo', handler);
  component.getDefaultFoundation().adapter_.deregisterInteractionHandler('foo', handler);
  domEvents.emit(root, 'foo');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  t.end();
});

test('adapter#registerDocumentClickHandler proxies to addEventListener', t => {
  const {root, component} = setupTest();
  const handler = td.func('interactionHandler');
  document.body.appendChild(root);
  component.getDefaultFoundation().adapter_.registerDocumentClickHandler(handler);
  domEvents.emit(document, 'click');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  document.body.removeChild(root);
  t.end();
});

test('adapter#deregisterDocumentClickHandler proxies to removeEventListener', t => {
  const {root, component} = setupTest();
  const handler = td.func('interactionHandler');
  document.body.appendChild(root);
  root.addEventListener('click', handler);
  component.getDefaultFoundation().adapter_.deregisterInteractionHandler(handler);
  domEvents.emit(document, 'click');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  document.body.removeChild(root);
  t.end();
});

test('adapter#getYParamsForItemAtIndex returns the height and top of the item at the provided index', t => {
  const {root, component} = setupTest();
  const items = root.querySelector(strings.ITEMS_SELECTOR);
  Object.assign(items.children[0].style, {
    position: 'absolute',
    top: '50px',
    height: '100px'
  });
  document.body.appendChild(root);
  t.deepEqual(
    component.getDefaultFoundation().adapter_.getYParamsForItemAtIndex(0),
    {top: 50, height: 100}
  );
  document.body.removeChild(root);
  t.end();
});

test('adapter#setTransitionDelayForItemAtIndex sets the correct transition-delay for the element ' +
     'at the provided index', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.setTransitionDelayForItemAtIndex(0, '0.42s');
  t.equal(root.querySelector(strings.ITEMS_SELECTOR).children[0].style.transitionDelay, '0.42s');
  t.end();
});

test('adapter#getIndexForEventTarget returns the item index of the event target', t => {
  const {root, component} = setupTest();
  const target = root.querySelectorAll('[role="menuitem"]')[1];
  t.equal(component.getDefaultFoundation().adapter_.getIndexForEventTarget(target), 1);
  t.equal(component.getDefaultFoundation().adapter_.getIndexForEventTarget({}), -1, 'missing index = -1');
  t.end();
});

test('adapter#notifySelected fires an "MDLSimpleMenu:selected" custom event with the item and index', t => {
  const {root, component} = setupTest();
  const item = root.querySelectorAll('[role="menuitem"]')[0];
  const handler = td.func('notifySelected handler');
  let evtData = null;
  td.when(handler(td.matchers.isA(Object))).thenDo(evt => {
    evtData = evt.detail;
  });
  root.addEventListener('MDLSimpleMenu:selected', handler);
  component.getDefaultFoundation().adapter_.notifySelected({index: 0});
  t.true(evtData !== null);
  t.deepEqual(evtData, {
    item,
    index: 0
  });
  t.end();
});

test('adapter#notifyCancel fires an "MDLSimpleMenu:cancel" custom event', t => {
  const {root, component} = setupTest();
  const handler = td.func('notifyCancel handler');
  root.addEventListener('MDLSimpleMenu:cancel', handler);
  component.getDefaultFoundation().adapter_.notifyCancel();
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  t.end();
});

test('adapter#restoreFocus restores the focus saved by adapter#saveFocus', t => {
  const {root, component} = setupTest(true);
  const button = bel`<button>Foo</button>`;
  document.body.appendChild(button);
  document.body.appendChild(root);
  button.focus();
  component.getDefaultFoundation().adapter_.saveFocus();
  root.focus();
  component.getDefaultFoundation().adapter_.restoreFocus();
  t.equal(document.activeElement, button);
  document.body.removeChild(button);
  document.body.removeChild(root);
  t.end();
});

test('adapter#isFocused returns whether the menu is focused', t => {
  const {root, component} = setupTest(true);
  document.body.appendChild(root);
  root.focus();
  t.true(component.getDefaultFoundation().adapter_.isFocused());
  document.body.removeChild(root);
  t.end();
});

test('adapter#focus focuses the menu', t => {
  const {root, component} = setupTest(true);
  document.body.appendChild(root);
  component.getDefaultFoundation().adapter_.focus();
  t.equal(document.activeElement, root);
  document.body.removeChild(root);
  t.end();
});

test('adapter#getFocusedItemIndex returns the item index of the focused menu element', t => {
  const {root, component} = setupTest(true);
  const item = root.querySelectorAll('[role="menuitem"]')[1];
  document.body.appendChild(root);
  item.focus();
  t.equal(component.getDefaultFoundation().adapter_.getFocusedItemIndex(), 1);
  root.focus();
  t.equal(component.getDefaultFoundation().adapter_.getFocusedItemIndex(), -1, 'missing index = -1');
  document.body.removeChild(root);
  t.end();
});

test('adapter#focusItemAtIndex focuses the right menu element', t => {
  const {root, component} = setupTest(true);
  const item1 = root.querySelectorAll('[role="menuitem"]')[1];
  const item2 = root.querySelectorAll('[role="menuitem"]')[0];
  document.body.appendChild(root);
  component.getDefaultFoundation().adapter_.focusItemAtIndex(1);
  t.equal(document.activeElement, item1);
  component.getDefaultFoundation().adapter_.focusItemAtIndex(0);
  t.equal(document.activeElement, item2);
  document.body.removeChild(root);
  t.end();
});

test('adapter#hasAnchor returns true if it has an anchor', t => {
  const anchor = bel`<div class="mdl-menu-anchor"></div>`;
  const {root, component} = setupTest(true);
  anchor.appendChild(root);
  t.true(component.getDefaultFoundation().adapter_.hasAnchor());
  t.end();
});

test('adapter#hasAnchor returns false if it does not have an anchor', t => {
  const notAnAnchor = bel`<div></div>`;
  const {root, component} = setupTest(true);
  notAnAnchor.appendChild(root);
  t.false(component.getDefaultFoundation().adapter_.hasAnchor());
  t.end();
});

test('adapter#getAnchorDimensions returns the dimensions of the anchor container', t => {
  const anchor = bel`<div class="mdl-menu-anchor" style="height: 21px; width: 42px;"></div>`;
  const {root, component} = setupTest(true);
  anchor.appendChild(root);
  document.body.appendChild(anchor);
  t.equal(component.getDefaultFoundation().adapter_.getAnchorDimensions().height, 21);
  t.equal(component.getDefaultFoundation().adapter_.getAnchorDimensions().width, 42);
  document.body.removeChild(anchor);
  t.end();
});

test('adapter#getWindowDimensions returns the dimensions of the window', t => {
  const {root, component} = setupTest(true);
  document.body.appendChild(root);
  t.equal(component.getDefaultFoundation().adapter_.getWindowDimensions().height, window.innerHeight);
  t.equal(component.getDefaultFoundation().adapter_.getWindowDimensions().width, window.innerWidth);
  document.body.removeChild(root);
  t.end();
});

test('adapter#isRtl returns true for RTL documents', t => {
  const anchor = bel`<div dir="rtl" class="mdl-menu-anchor"></div>`;
  const {root, component} = setupTest(true);
  anchor.appendChild(root);
  document.body.appendChild(anchor);
  t.true(component.getDefaultFoundation().adapter_.isRtl());
  document.body.removeChild(anchor);
  t.end();
});

test('adapter#isRtl returns false for explicit LTR documents', t => {
  const anchor = bel`<div dir="ltr" class="mdl-menu-anchor"></div>`;
  const {root, component} = setupTest(true);
  anchor.appendChild(root);
  document.body.appendChild(anchor);
  t.false(component.getDefaultFoundation().adapter_.isRtl());
  document.body.removeChild(anchor);
  t.end();
});

test('adapter#isRtl returns false for implicit LTR documents', t => {
  const anchor = bel`<div class="mdl-menu-anchor"></div>`;
  const {root, component} = setupTest(true);
  anchor.appendChild(root);
  document.body.appendChild(anchor);
  t.false(component.getDefaultFoundation().adapter_.isRtl());
  document.body.removeChild(anchor);
  t.end();
});

test('adapter#setTransformOrigin sets the correct transform origin on the menu element', t => {
  const {root, component} = setupTest();
  // Write expected value and read canonical value from browser.
  root.style.webkitTransformOrigin = root.style.transformOrigin = 'left top 10px';
  const expected = root.style.getPropertyValue(`${getTransformPropertyName(window)}-origin`);
  // Reset value.
  root.style.webkitTransformOrigin = root.style.transformOrigin = '';

  component.getDefaultFoundation().adapter_.setTransformOrigin('left top 10px');
  t.equal(root.style.getPropertyValue(`${getTransformPropertyName(window)}-origin`), expected);
  t.end();
});

test('adapter#setPosition sets the correct position on the menu element', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.setPosition({top: '10px', left: '11px'});
  t.equal(root.style.top, '10px');
  t.equal(root.style.left, '11px');
  t.end();
});
