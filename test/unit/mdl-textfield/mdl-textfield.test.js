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

import MDLTextfield, {MDLTextfieldFoundation} from '../../../packages/mdl-textfield';

const {cssClasses} = MDLTextfieldFoundation;

const getFixture = () => bel`
  <div class="mdl-textfield">
    <input type="text" class="mdl-textfield__input" id="my-textfield">
    <label class="mdl-textfield__label" for="my-textfield">My Label</label>
  </div>
`;

test('attachTo returns an MDLTextfield instance', t => {
  t.true(MDLTextfield.attachTo(getFixture()) instanceof MDLTextfield);
  t.end();
});

const getHelptext = () => bel`<p id="helptext">help text</p>`;

test('#constructor assigns helptextElement to the id specified in the input aria-controls if present', t => {
  const root = getFixture();
  root.querySelector('.mdl-textfield__input').setAttribute('aria-controls', 'helptext');
  const helptext = getHelptext();
  document.body.appendChild(helptext);
  const component = new MDLTextfield(root);
  t.equal(component.helptextElement, helptext);
  document.body.removeChild(helptext);
  t.end();
});

function setupTest() {
  const root = getFixture();
  const component = new MDLTextfield(root);
  return {root, component};
}

test('get/set disabled updates the input element', t => {
  const {root, component} = setupTest();
  const input = root.querySelector('.mdl-textfield__input');
  component.disabled = true;
  t.true(input.disabled);
  component.disabled = false;
  t.false(input.disabled);
  t.end();
});

test('get/set disabled updates the component styles', t => {
  const {root, component} = setupTest();
  component.disabled = true;
  t.true(root.classList.contains(cssClasses.DISABLED));
  component.disabled = false;
  t.false(root.classList.contains(cssClasses.DISABLED));
  t.end();
});

test('#adapter.addClass adds a class to the root element', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.addClass('foo');
  t.true(root.classList.contains('foo'));
  t.end();
});

test('#adapter.removeClass removes a class from the root element', t => {
  const {root, component} = setupTest();
  root.classList.add('foo');
  component.getDefaultFoundation().adapter_.removeClass('foo');
  t.false(root.classList.contains('foo'));
  t.end();
});

test('#adapter.addClassToLabel adds a class to the label element', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.addClassToLabel('foo');
  t.true(root.querySelector('.mdl-textfield__label').classList.contains('foo'));
  t.end();
});

test('#adapter.removeClassFromLabel removes a class from the label element', t => {
  const {root, component} = setupTest();
  const label = root.querySelector('.mdl-textfield__label');
  label.classList.add('foo');
  component.getDefaultFoundation().adapter_.removeClassFromLabel('foo');
  t.false(label.classList.contains('foo'));
  t.end();
});

test('#adapter.registerInputFocusHandler adds a "focus" event handler on the input element', t => {
  const {root, component} = setupTest();
  const handler = td.func('focusHandler');
  component.getDefaultFoundation().adapter_.registerInputFocusHandler(handler);
  domEvents.emit(root.querySelector('.mdl-textfield__input'), 'focus');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  t.end();
});

test('#adapter.deregisterInputFocusHandler removes a "focus" event handler from the input element', t => {
  const {root, component} = setupTest();
  const input = root.querySelector('.mdl-textfield__input');
  const handler = td.func('focusHandler');
  input.addEventListener('focus', handler);
  component.getDefaultFoundation().adapter_.deregisterInputFocusHandler(handler);
  domEvents.emit(input, 'focus');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  t.end();
});

test('#adapter.registerInputBlurHandler adds a "blur" event handler on the input element', t => {
  const {root, component} = setupTest();
  const handler = td.func('blurHandler');
  component.getDefaultFoundation().adapter_.registerInputBlurHandler(handler);
  domEvents.emit(root.querySelector('.mdl-textfield__input'), 'blur');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  t.end();
});

test('#adapter.deregisterInputBlurHandler removes a "blur" event handler from the input element', t => {
  const {root, component} = setupTest();
  const input = root.querySelector('.mdl-textfield__input');
  const handler = td.func('blurHandler');
  input.addEventListener('blur', handler);
  component.getDefaultFoundation().adapter_.deregisterInputBlurHandler(handler);
  domEvents.emit(input, 'blur');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  t.end();
});

test('#adapter.getNativeInput returns the component input element', t => {
  const {root, component} = setupTest();
  t.equal(
    component.getDefaultFoundation().adapter_.getNativeInput(),
    root.querySelector('.mdl-textfield__input')
  );
  t.end();
});

test('#adapter.addClassToHelptext does nothing if no help text element present', t => {
  const {component} = setupTest();
  t.doesNotThrow(() => component.getDefaultFoundation().adapter_.addClassToHelptext('foo'));
  t.end();
});

test('#adapter.addClassToHelptext adds a class to the helptext element when present', t => {
  const {component} = setupTest();
  component.helptextElement = getHelptext();
  component.getDefaultFoundation().adapter_.addClassToHelptext('foo');
  t.true(component.helptextElement.classList.contains('foo'));
  t.end();
});

test('#adapter.removeClassFromHelptext does nothing if no help text element present', t => {
  const {component} = setupTest();
  t.doesNotThrow(() => component.getDefaultFoundation().adapter_.addClassToHelptext('foo'));
  t.end();
});

test('#adapter.removeClassFromHelptext removes a class from the helptext element when present', t => {
  const {component} = setupTest();
  const helptext = getHelptext();
  component.helptextElement = helptext;
  helptext.classList.add('foo');
  component.getDefaultFoundation().adapter_.removeClassFromHelptext('foo');
  t.false(helptext.classList.contains('foo'));
  t.end();
});

test('#adapter.helptextHasClass does nothing if no help text element present', t => {
  const {component} = setupTest();
  t.doesNotThrow(() => component.getDefaultFoundation().adapter_.helptextHasClass('foo'));
  t.end();
});

test('#adapter.helptextHasClass returns whether or not the help text contains a certain class', t => {
  const {component} = setupTest();
  const helptext = getHelptext();
  component.helptextElement = helptext;
  helptext.classList.add('foo');
  t.true(component.getDefaultFoundation().adapter_.helptextHasClass('foo'));
  helptext.classList.remove('foo');
  t.false(component.getDefaultFoundation().adapter_.helptextHasClass('foo'));
  t.end();
});

test('#adapter.setHelptextAttr does nothing if no help text element present', t => {
  const {component} = setupTest();
  t.doesNotThrow(() => component.getDefaultFoundation().adapter_.helptextHasClass('foo'));
  t.end();
});

test('#adapter.setHelptextAttr sets an attribute to a certain value on the help text element', t => {
  const {component} = setupTest();
  const helptext = getHelptext();
  component.helptextElement = helptext;
  component.getDefaultFoundation().adapter_.setHelptextAttr('aria-label', 'foo');
  t.equal(helptext.getAttribute('aria-label'), 'foo');
  t.end();
});

test('#adapter.removeHelptextAttr does nothing if no help text element present', t => {
  const {component} = setupTest();
  t.doesNotThrow(() => component.getDefaultFoundation().adapter_.removeHelptextAttr('aria-label'));
  t.end();
});

test('#adapter.removeHelptextAttr removes an attribute on the help text element', t => {
  const {component} = setupTest();
  const helptext = getHelptext();
  helptext.setAttribute('aria-label', 'foo');
  component.helptextElement = helptext;
  component.getDefaultFoundation().adapter_.removeHelptextAttr('aria-label');
  t.false(helptext.hasAttribute('aria-label'));
  t.end();
});
