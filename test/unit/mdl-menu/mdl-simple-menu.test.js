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

function getFixture() {
  return bel`
    <div class="mdl-simple-menu">
      <ul class="mdl-simple-menu__items mdl-list" role="menu">
        <li class="mdl-list-item" role="menuitem">Item</a>
        <li role="separator"></li>
        <li class="mdl-list-item" role="menuitem">Another Item</a>
      </nav>
    </div>
  `;
}

function setupTest() {
  const root = getFixture();
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

test('constructor throws if no role on menu items', t => {
  t.throws(() => new MDLSimpleMenu(bel`
    <div class="mdl-simple-menu"><ul class="mdl-simple-menu__items"></ul></div>
  `));
  t.end();
});

test('constructor throws if role on menu is invalid (not menu or listbox)', t => {
  t.throws(() => new MDLSimpleMenu(bel`
    <div class="mdl-simple-menu"><ul class="mdl-simple-menu__items" role="dialog"></ul></div>
  `));
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
