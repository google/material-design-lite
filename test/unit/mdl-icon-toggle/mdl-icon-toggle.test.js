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

import bel from 'bel';
import domEvents from 'dom-events';
import td from 'testdouble';
import test from 'tape';

import {supportsCssVariables} from '../../../packages/mdl-ripple/util';
import {createMockRaf} from '../helpers/raf';
import {verifyBuildDom} from '../helpers/component';
import MDLIconToggle, {MDLIconToggleFoundation} from '../../../packages/mdl-icon-toggle';

test('buildDom creates an icon button element', t => {
  verifyBuildDom(MDLIconToggle, t, bel`
    <i class="mdl-icon-toggle material-icons" role="button"
       aria-pressed="false" tabindex="0" data-toggle-on="{}" data-toggle-off="{}"></i>
  `);
  t.end();
});

test('buildDom adds the iconCssClass to the icon button element', t => {
  const iconCssClass = 'fa';
  verifyBuildDom(MDLIconToggle, t, bel`
    <i class="mdl-icon-toggle fa" role="button" aria-pressed="false"
       tabindex="0" data-toggle-on="{}" data-toggle-off="{}"></i>
  `, {iconCssClass});
  t.end();
});

test('buildDom serializes toggleOnData and toggleOffData into their respective attributes', t => {
  verifyBuildDom(MDLIconToggle, t, bel`
    <i class="mdl-icon-toggle material-icons" role="button" aria-pressed="false"
       tabindex="0" data-toggle-on='{"content":"favorite"}'
       data-toggle-off='{"content":"favorite_border"}'></i>
  `, {
    toggleOnData: {content: 'favorite'},
    toggleOffData: {content: 'favorite_border'}
  });
  t.end();
});

test('buildDom attaches icon classes to an inner icon element and appends that el when specified', t => {
  verifyBuildDom(MDLIconToggle, t, bel`
    <span class="mdl-icon-toggle" role="button" aria-pressed="false" tabindex="0"
          data-toggle-off="{}" data-toggle-on="{}" data-icon-inner-selector=".my-icon-set">
      <i class="my-icon-set" aria-hidden="true"></i>
    </span>
  `, {
    iconCssClass: 'my-icon-set',
    useInnerIconElement: true
  });
  t.end();
});

function setupTest() {
  const root = document.createElement('i');
  const component = new MDLIconToggle(root);
  return {root, component};
}

test('attachTo initializes and returns a MDLIconToggle instance', t => {
  t.true(MDLIconToggle.attachTo(document.createElement('i')) instanceof MDLIconToggle);
  t.end();
});

if (supportsCssVariables(window)) {
  test('#constructor initializes the ripple on the root element', t => {
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
    raf.restore();
    t.end();
  });
}

test('set/get on', t => {
  const {root, component} = setupTest();
  component.on = true;
  t.true(component.on);
  t.equal(root.getAttribute('aria-pressed'), 'true');

  component.on = false;
  t.false(component.on);
  t.equal(root.getAttribute('aria-pressed'), 'false');
  t.end();
});

test('set/get disabled', t => {
  const {root, component} = setupTest();
  component.disabled = true;
  t.true(component.disabled);
  t.equal(root.getAttribute('aria-disabled'), 'true');
  t.true(root.classList.contains(MDLIconToggleFoundation.cssClasses.DISABLED));

  component.disabled = false;
  t.false(component.disabled);
  t.false(root.hasAttribute('aria-disabled'));
  t.false(root.classList.contains(MDLIconToggleFoundation.cssClasses.DISABLED));
  t.end();
});

test('#refreshToggleData proxies to foundation.refreshToggleData()', t => {
  const root = document.createElement('i');
  const foundation = td.object(MDLIconToggleFoundation);
  const component = new MDLIconToggle(root, foundation);
  component.refreshToggleData();
  t.doesNotThrow(() => td.verify(foundation.refreshToggleData()));
  t.end();
});

test('intially set to on if root has aria-pressed=true', t => {
  const root = bel`<i class="mdl-icon-toggle" aria-pressed="true"></i>`;
  const component = new MDLIconToggle(root);
  t.true(component.on);
  t.end();
});

test('intially set to disabled if root has aria-disabled=true', t => {
  const root = bel`<i class="mdl-icon-toggle" aria-disabled="true"></i>`;
  const component = new MDLIconToggle(root);
  t.true(component.disabled);
  t.end();
});

test('#adapter.addClass adds a class to the root element', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.addClass('foo');
  t.true(root.classList.contains('foo'));
  t.end();
});

test('#adapter.addClass adds a class to the inner icon element when used', t => {
  const root = MDLIconToggle.buildDom({useInnerIconElement: true});
  const component = new MDLIconToggle(root);
  component.getDefaultFoundation().adapter_.addClass('foo');
  t.true(root.querySelector('.material-icons').classList.contains('foo'));
  t.end();
});

test('#adapter.removeClass removes a class from the root element', t => {
  const {root, component} = setupTest();
  root.classList.add('foo');
  component.getDefaultFoundation().adapter_.removeClass('foo');
  t.false(root.classList.contains('foo'));
  t.end();
});

test('#adapter.removeClass adds a class to the inner icon element when used', t => {
  const root = MDLIconToggle.buildDom({useInnerIconElement: true});
  root.querySelector('.material-icons').classList.add('foo');
  const component = new MDLIconToggle(root);
  component.getDefaultFoundation().adapter_.removeClass('foo');
  t.false(root.querySelector('.material-icons').classList.contains('foo'));
  t.end();
});

test('#adapter.registerInteractionHandler adds an event listener for (type, handler)', t => {
  const {root, component} = setupTest();
  document.body.appendChild(root);
  const handler = td.func('clickHandler');
  component.getDefaultFoundation().adapter_.registerInteractionHandler('click', handler);
  domEvents.emit(root, 'click');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  document.body.removeChild(root);
  t.end();
});

test('#adapter.deregisterInteractionHandler removes an event listener for (type, hander)', t => {
  const {root, component} = setupTest();
  document.body.appendChild(root);
  const handler = td.func('clickHandler');

  root.addEventListener('click', handler);
  component.getDefaultFoundation().adapter_.deregisterInteractionHandler('click', handler);
  domEvents.emit(root, 'click');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  document.body.removeChild(root);
  t.end();
});

test('#adapter.setText sets the text content of the root element', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.setText('foo');
  t.equal(root.textContent, 'foo');
  t.end();
});

test('#adapter.setText sets the text content of the inner icon element when used', t => {
  const root = MDLIconToggle.buildDom({useInnerIconElement: true});
  const component = new MDLIconToggle(root);
  component.getDefaultFoundation().adapter_.setText('foo');
  t.equal(root.querySelector('.material-icons').textContent, 'foo');
  t.end();
});

test('#adapter.getTabIndex returns the tabIndex of the element', t => {
  const {root, component} = setupTest();
  root.tabIndex = 4;
  t.equal(component.getDefaultFoundation().adapter_.getTabIndex(), 4);
  t.end();
});

test('#adapter.setTabIndex sets the tabIndex of the element', t => {
  const {root, component} = setupTest();
  root.tabIndex = 4;
  component.getDefaultFoundation().adapter_.setTabIndex(2);
  t.equal(root.tabIndex, 2);
  t.end();
});

test('#adapter.getAttr retrieves an attribute from the root element', t => {
  const {root, component} = setupTest();
  root.setAttribute('aria-label', 'hello');
  t.equal(component.getDefaultFoundation().adapter_.getAttr('aria-label'), 'hello');
  t.end();
});

test('#adapter.setAttr sets an attribute on the root element', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.setAttr('aria-label', 'hello');
  t.equal(root.getAttribute('aria-label'), 'hello');
  t.end();
});

test('#adapter.rmAttr removes an attribute from the root element', t => {
  const {root, component} = setupTest();
  root.setAttribute('aria-label', 'hello');
  component.getDefaultFoundation().adapter_.rmAttr('aria-label');
  t.false(root.hasAttribute('aria-label'));
  t.end();
});

test('#adapter.notifyChange broadcasts a "MDLIconToggle:change" custom event', t => {
  const {root, component} = setupTest();
  const handler = td.func('custom event handler');
  root.addEventListener('MDLIconToggle:change', handler);
  component.getDefaultFoundation().adapter_.notifyChange({});
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  t.end();
});
