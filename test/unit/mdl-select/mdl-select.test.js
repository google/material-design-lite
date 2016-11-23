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

import {MDLSelect} from '../../../packages/mdl-select';

class FakeMenu {
  constructor() {
    this.items = [
      bel`<div id="item-1">Item 1</div>`,
      bel`<div id="item-2">Item 2</div>`,
      bel`<div id="item-3">Item 3</div>`
    ];
    this.listen = td.func('menu.listen');
    this.unlisten = td.func('menu.unlisten');
    this.show = td.func('menu.show');
    this.hide = td.func('menu.hide');
    this.open = false;
  }
}

function getFixture() {
  return bel`
    <div class="mdl-select" role="listbox" tabindex="0">
      <span class="mdl-select__selected-text">Pick a food group</span>
      <div class="mdl-select__menu mdl-simple-menu">
        <ul class="mdl-simple-menu__items">
          <li class="mdl-list-item" role="option" tabindex="0">An option</li>
        </ul>
      </div>
    </div>
  `;
}

test('attachTo returns a component instance', t => {
  t.true(MDLSelect.attachTo(getFixture()) instanceof MDLSelect);
  t.end();
});

function setupTest() {
  const menu = new FakeMenu();
  const fixture = getFixture();
  const menuEl = fixture.querySelector('.mdl-select__menu');
  const component = new MDLSelect(fixture, /* foundation */ undefined, () => menu);
  return {menu, menuEl, fixture, component};
}

test('options returns the menu items', t => {
  const {menu, component} = setupTest();
  t.equal(component.options, menu.items);
  t.end();
});

test('selectOptions returns a NodeList containing the node with "aria-selected" as an attr', t => {
  const {component, fixture} = setupTest();
  const option = fixture.querySelector('[role="option"]');
  t.equal(component.selectedOptions.length, 0, 'No selected options when none selected');
  option.setAttribute('aria-selected', 'true');
  t.equal(component.selectedOptions.length, 1, 'One selected option when element has aria-selected');
  t.equal(component.selectedOptions[0], option, 'Option within selected options is the selected option');
  t.end();
});

test('#get/setSelectedIndex', t => {
  const {component} = setupTest();
  t.equal(component.selectedIndex, -1);
  component.selectedIndex = 1;
  t.equal(component.selectedIndex, 1);
  t.end();
});

test('#get/setDisabled', t => {
  const {component} = setupTest();
  t.equal(component.disabled, false);
  component.disabled = true;
  t.true(component.disabled);
  t.end();
});

test('#item returns the menu item at the specified index', t => {
  const {menu, component} = setupTest();
  t.equal(component.item(1), menu.items[1]);
  t.end();
});

test('#item returns null if index out of bounds', t => {
  const {component} = setupTest();
  t.equal(component.item(100), null);
  t.end();
});

test('#nameditem returns the item whose id matches the given key', t => {
  const {menu, component} = setupTest();
  t.equal(component.nameditem('item-1'), menu.items[0]);
  t.end();
});

test('#nameditem returns the item whose "name" key matches the given key', t => {
  const {menu, component} = setupTest();
  const item = menu.items[0];
  const name = item.id;
  item.id = '';
  item.removeAttribute('id');
  item.setAttribute('name', name);
  t.equal(component.nameditem(name), menu.items[0]);
  t.end();
});

test('#nameditem returns null when no id or name matches the given key', t => {
  const {component} = setupTest();
  t.equal(component.nameditem('nonexistant'), null);
  t.end();
});

test('#initialSyncWithDOM sets the selected index if a menu item contains an aria-selected attribute', t => {
  const menu = new FakeMenu();
  const fixture = getFixture();
  // Insert menu item into fixture to pretend like the fake menu items are part of the component under test.
  menu.items[1].setAttribute('aria-selected', 'true');
  fixture.appendChild(menu.items[1]);

  const component = new MDLSelect(fixture, /* foundation */ undefined, () => menu);
  t.equal(component.selectedIndex, 1);
  t.end();
});

test('#initialSyncWithDOM disables the menu if aria-disabled="true" is found on the element', t => {
  const fixture = getFixture();
  fixture.setAttribute('aria-disabled', 'true');
  const component = new MDLSelect(fixture);
  t.true(component.disabled);
  t.end();
});

test('adapter#addClass adds a class to the root element', t => {
  const {component, fixture} = setupTest();
  component.getDefaultFoundation().adapter_.addClass('foo');
  t.true(fixture.classList.contains('foo'));
  t.end();
});

test('adapter#removeClass removes a class from the root element', t => {
  const {component, fixture} = setupTest();
  fixture.classList.add('foo');
  component.getDefaultFoundation().adapter_.removeClass('foo');
  t.false(fixture.classList.contains('foo'));
  t.end();
});

test('adapter#setAttr sets an attribute with a given value on the root element', t => {
  const {component, fixture} = setupTest();
  component.getDefaultFoundation().adapter_.setAttr('aria-disabled', 'true');
  t.equal(fixture.getAttribute('aria-disabled'), 'true');
  t.end();
});

test('adapter#rmAttr removes an attribute from the root element', t => {
  const {component, fixture} = setupTest();
  fixture.setAttribute('aria-disabled', 'true');
  component.getDefaultFoundation().adapter_.rmAttr('aria-disabled');
  t.false(fixture.hasAttribute('aria-disabled'));
  t.end();
});

test('adapter#computeBoundingRect returns the result of getBoundingClientRect() on the root element', t => {
  const {component, fixture} = setupTest();
  t.deepEqual(
    component.getDefaultFoundation().adapter_.computeBoundingRect(),
    fixture.getBoundingClientRect()
  );
  t.end();
});

test('adapter#registerInteractionHandler adds an event listener to the root element', t => {
  const {component, fixture} = setupTest();
  const listener = td.func('eventlistener');
  component.getDefaultFoundation().adapter_.registerInteractionHandler('click', listener);
  domEvents.emit(fixture, 'click');
  t.doesNotThrow(() => td.verify(listener(td.matchers.anything())));
  t.end();
});

test('adapter#deregisterInteractionHandler removes an event listener from the root element', t => {
  const {component, fixture} = setupTest();
  const listener = td.func('eventlistener');
  fixture.addEventListener('click', listener);
  component.getDefaultFoundation().adapter_.deregisterInteractionHandler('click', listener);
  domEvents.emit(fixture, 'click');
  t.doesNotThrow(() => td.verify(listener(td.matchers.anything()), {times: 0}));
  t.end();
});

test('adapter#focus focuses on the root element', t => {
  const {component, fixture} = setupTest();
  const handler = td.func('fixture focus handler');
  fixture.addEventListener('focus', handler);
  document.body.appendChild(fixture);

  component.getDefaultFoundation().adapter_.focus();
  t.equal(document.activeElement, fixture);

  document.body.removeChild(fixture);
  t.end();
});

test('adapter#makeTabbable sets the root element\'s tabindex to 0', t => {
  const {component, fixture} = setupTest();
  fixture.tabIndex = -1;
  component.getDefaultFoundation().adapter_.makeTabbable();
  t.equal(fixture.tabIndex, 0);
  t.end();
});

test('adapter#makeUntabbable sets the root element\'s tabindex to -1', t => {
  const {component, fixture} = setupTest();
  fixture.tabIndex = 0;
  component.getDefaultFoundation().adapter_.makeUntabbable();
  t.equal(fixture.tabIndex, -1);
  t.end();
});

test('adapter#getComputedStyleValue gets the computed style value of the prop from the root element', t => {
  const {component, fixture} = setupTest();
  document.body.appendChild(fixture);
  fixture.style.width = '500px';
  t.equal(
    component.getDefaultFoundation().adapter_.getComputedStyleValue('width'),
    getComputedStyle(fixture).getPropertyValue('width')
  );
  document.body.removeChild(fixture);
  t.end();
});

test('adapter#setStyle sets the given style propertyName to the given value', t => {
  const {component, fixture} = setupTest();
  component.getDefaultFoundation().adapter_.setStyle('font-size', '13px');
  t.equal(fixture.style.getPropertyValue('font-size'), '13px');
  t.end();
});

test('adapter#create2dRenderingContext returns a CanvasRenderingContext2d instance', t => {
  const {component} = setupTest();
  const fakeCtx = {};
  const fakeCanvas = {
    getContext: td.func('canvas.getContext')
  };
  const origCreateElement = document.createElement;
  document.createElement = td.func('document.createElement');

  td.when(fakeCanvas.getContext('2d')).thenReturn(fakeCtx);
  td.when(document.createElement('canvas')).thenReturn(fakeCanvas);

  const ctx = component.getDefaultFoundation().adapter_.create2dRenderingContext();
  t.equal(ctx, fakeCtx);

  document.createElement = origCreateElement;
  t.end();
});

test('adapter#setMenuElStyle sets a style property on the menu element', t => {
  const {component, menuEl} = setupTest();
  component.getDefaultFoundation().adapter_.setMenuElStyle('font-size', '10px');
  t.equal(menuEl.style.fontSize, '10px');
  t.end();
});

test('adapter#setMenuElAttr sets an attribute on the menu element', t => {
  const {component, menuEl} = setupTest();
  component.getDefaultFoundation().adapter_.setMenuElAttr('aria-hidden', 'true');
  t.equal(menuEl.getAttribute('aria-hidden'), 'true');
  t.end();
});

test('adapter#rmMenuElAttr removes an attribute from the menu element', t => {
  const {component, menuEl} = setupTest();
  menuEl.setAttribute('aria-hidden', 'true');
  component.getDefaultFoundation().adapter_.rmMenuElAttr('aria-hidden');
  t.false(menuEl.hasAttribute('aria-hidden'));
  t.end();
});

test('adapter#getMenuElOffsetHeight returns the menu element\'s offsetHeight', t => {
  const {component, menuEl} = setupTest();
  t.equal(component.getDefaultFoundation().adapter_.getMenuElOffsetHeight(), menuEl.offsetHeight);
  t.end();
});

test('adapter#openMenu shows the menu with the given focusIndex', t => {
  const {component, menu} = setupTest();
  component.getDefaultFoundation().adapter_.openMenu(1);
  t.doesNotThrow(() => td.verify(menu.show({focusIndex: 1})));
  t.end();
});

test('adapter#isMenuOpen returns whether or not the menu is open', t => {
  const {component, menu} = setupTest();
  const {adapter_: adapter} = component.getDefaultFoundation();
  menu.open = true;
  t.true(adapter.isMenuOpen());
  menu.open = false;
  t.false(adapter.isMenuOpen());
  t.end();
});

test('adapter#setSelectedTextContent sets the textContent of the selected text el', t => {
  const {component, fixture} = setupTest();
  component.getDefaultFoundation().adapter_.setSelectedTextContent('content');
  t.equal(fixture.querySelector('.mdl-select__selected-text').textContent, 'content');
  t.end();
});

test('adapter#getNumberOfOptions returns the length of the component\'s options property', t => {
  const {component} = setupTest();
  t.equal(component.getDefaultFoundation().adapter_.getNumberOfOptions(), component.options.length);
  t.end();
});

test('adapter#getTextForOptionAtIndex gets the text content for the option at the given index', t => {
  const {component} = setupTest();
  t.equal(
    component.getDefaultFoundation().adapter_.getTextForOptionAtIndex(1),
    component.options[1].textContent
  );
  t.end();
});

test('adapter#setAttrForOptionAtIndex sets an attribute to the given value for the option at the ' +
     'given index', t => {
  const {component} = setupTest();
  component.getDefaultFoundation().adapter_.setAttrForOptionAtIndex(1, 'aria-disabled', 'true');
  t.equal(component.options[1].getAttribute('aria-disabled'), 'true');
  t.end();
});

test('adapter#rmAttrForOptionAtIndex removes the given attribute for the option at the given index', t => {
  const {component} = setupTest();
  component.options[1].setAttribute('aria-disabled', 'true');
  component.getDefaultFoundation().adapter_.rmAttrForOptionAtIndex(1, 'aria-disabled');
  t.false(component.options[1].hasAttribute('aria-disabled'));
  t.end();
});

test('adapter#getOffsetTopForOptionAtIndex returns the offsetTop for the option at the given index', t => {
  const {component, menu} = setupTest();
  t.equal(
    component.getDefaultFoundation().adapter_.getOffsetTopForOptionAtIndex(1),
    menu.items[1].offsetTop
  );
  t.end();
});

test('adapter#registerMenuInteractionHandler listens for an interaction handler on the menu', t => {
  const {component, menu} = setupTest();
  const handler = () => {};
  component.getDefaultFoundation().adapter_.registerMenuInteractionHandler('evt', handler);
  t.doesNotThrow(() => td.verify(menu.listen('evt', handler)));
  t.end();
});

test('adapter#deregisterMenuInteractionHandler unlistens for an interaction handler on the menu', t => {
  const {component, menu} = setupTest();
  const handler = () => {};
  component.getDefaultFoundation().adapter_.deregisterMenuInteractionHandler('evt', handler);
  t.doesNotThrow(() => td.verify(menu.unlisten('evt', handler)));
  t.end();
});

test('adapter#notifyChange emits an "MDLSelect:change" custom event from the root element', t => {
  const {component, fixture} = setupTest();
  const handler = td.func('MDLSelect:change handler');
  fixture.addEventListener('MDLSelect:change', handler);
  component.getDefaultFoundation().adapter_.notifyChange();
  t.end();
});

test('adapter#getWindowInnerHeight returns window.innerHeight', t => {
  const {component} = setupTest();
  t.equal(component.getDefaultFoundation().adapter_.getWindowInnerHeight(), window.innerHeight);
  t.end();
});
