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

import MDLRipple from '../../../packages/mdl-ripple';
import {cssClasses} from '../../../packages/mdl-ripple/constants';
import * as util from '../../../packages/mdl-ripple/util';

test('attachTo initializes and returns a ripple', t => {
  const root = bel`<div></div>`;
  const component = MDLRipple.attachTo(root);
  t.true(component instanceof MDLRipple);
  t.end();
});

test('attachTo makes ripple unbounded when given as an option', t => {
  const root = bel`<div></div>`;
  const component = MDLRipple.attachTo(root, {isUnbounded: true});
  t.true(component.unbounded);
  t.end();
});

test('attachTo does not override unbounded data attr when omitted', t => {
  const root = bel`<div data-mdl-ripple-is-unbounded></div>`;
  const component = MDLRipple.attachTo(root);
  t.true(component.unbounded);
  t.end();
});

test('attachTo overrides unbounded data attr when explicitly specified', t => {
  const root = bel`<div data-mdl-ripple-is-unbounded></div>`;
  const component = MDLRipple.attachTo(root, {isUnbounded: false});
  t.false(component.unbounded);
  t.end();
});

function setupTest() {
  const root = bel`<div></div>`;
  const component = new MDLRipple(root);
  return {root, component};
}

test(`set unbounded() adds ${cssClasses.UNBOUNDED} when truthy`, t => {
  const {root, component} = setupTest();
  component.unbounded = true;
  t.true(root.classList.contains(cssClasses.UNBOUNDED));
  t.end();
});

test(`set unbounded() removes ${cssClasses.UNBOUNDED} when falsy`, t => {
  const {root, component} = setupTest();
  root.classList.add(cssClasses.UNBOUNDED);
  component.unbounded = false;
  t.false(root.classList.contains(cssClasses.UNBOUNDED));
  t.end();
});

test('adapter#browserSupportsCssVars delegates to util', t => {
  const {component} = setupTest();
  t.equal(
    component.getDefaultFoundation().adapter_.browserSupportsCssVars(window),
    util.supportsCssVariables(window)
  );
  t.end();
});

test('adapter#isUnbounded delegates to unbounded getter', t => {
  const {component} = setupTest();
  component.unbounded = true;
  t.true(component.getDefaultFoundation().adapter_.isUnbounded());
  t.end();
});

test('adapter#isSurfaceActive calls the correct :matches API method on the root element', t => {
  const {root, component} = setupTest();
  const MATCHES = util.getMatchesProperty(HTMLElement.prototype);
  const matches = td.func('root.<matches>');
  td.when(matches(':active')).thenReturn(true);
  root[MATCHES] = matches;
  t.true(component.getDefaultFoundation().adapter_.isSurfaceActive());
  t.end();
});

test('adapter#addClass adds a class to the root', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.addClass('foo');
  t.true(root.classList.contains('foo'));
  t.end();
});

test('adapter#removeClass removes a class from the root', t => {
  const {root, component} = setupTest();
  root.classList.add('foo');
  component.getDefaultFoundation().adapter_.removeClass('foo');
  t.false(root.classList.contains('foo'));
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

test('adapter#registerResizeHandler uses the handler as a window resize listener', t => {
  const {component} = setupTest();
  const handler = td.func('resizeHandler');
  component.getDefaultFoundation().adapter_.registerResizeHandler(handler);
  domEvents.emit(window, 'resize');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  window.removeEventListener('resize', handler);
  t.end();
});

test('adapter#registerResizeHandler unlistens the handler for window resize', t => {
  const {component} = setupTest();
  const handler = td.func('resizeHandler');
  window.addEventListener('resize', handler);
  component.getDefaultFoundation().adapter_.deregisterResizeHandler(handler);
  domEvents.emit(window, 'resize');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  // Just to be safe
  window.removeEventListener('resize', handler);
  t.end();
});

if (util.supportsCssVariables(window)) {
  test('adapter#updateCssVariable calls setProperty on root style with varName and value', t => {
    const {root, component} = setupTest();
    component.getDefaultFoundation().adapter_.updateCssVariable('--foo', 'red');
    t.equal(root.style.getPropertyValue('--foo'), 'red');
    t.end();
  });
}

test('adapter#computeBoundingRect calls getBoundingClientRect() on root', t => {
  const {root, component} = setupTest();
  document.body.appendChild(root);
  t.deepEqual(component.getDefaultFoundation().adapter_.computeBoundingRect(), root.getBoundingClientRect());
  document.body.removeChild(root);
  t.end();
});

test('adapter#getWindowPageOffset returns page{X,Y}Offset as {x,y} respectively', t => {
  const {component} = setupTest();
  t.deepEqual(component.getDefaultFoundation().adapter_.getWindowPageOffset(), {
    x: window.pageXOffset,
    y: window.pageYOffset
  });
  t.end();
});
