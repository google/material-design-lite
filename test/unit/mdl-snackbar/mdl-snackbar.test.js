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
import td from 'testdouble';
import domEvents from 'dom-events';

import MDLSnackbar, {MDLSnackbarFoundation} from '../../../packages/mdl-snackbar';

const {strings} = MDLSnackbarFoundation;

function getFixture() {
  return bel`
    <div class="mdl-snackbar" aria-live="assertive" aria-atomic="true" aria-hidden="true">
      <div class="mdl-snackbar__text"></div>
      <div class="mdl-snackbar__action-wrapper">
        <button type="button" class="mdl-button mdl-snackbar__action-button"></button>
      </div>
    </div>
  `;
}

function setupTest() {
  const root = getFixture();
  const component = new MDLSnackbar(root);
  return {root, component};
}

test('attachTo initializes and returns a MDLSnackbar instance', t => {
  t.true(MDLSnackbar.attachTo(getFixture()) instanceof MDLSnackbar);
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

test('foundationAdapter#setAriaHidden adds aria-hidden="true" to the root element', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.setAriaHidden();
  t.true(root.getAttribute('aria-hidden'));
  t.end();
});

test('foundationAdapter#unsetAriaHidden removes "aria-hidden" from the root element', t => {
  const {root, component} = setupTest();
  root.setAttribute('aria-hidden', true);
  component.getDefaultFoundation().adapter_.unsetAriaHidden();
  t.false(root.getAttribute('aria-hidden'));
  t.end();
});

test('foundationAdapter#setMessageText sets the text content of the text element', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.setMessageText('Message Deleted');
  t.equal(root.querySelector(strings.TEXT_SELECTOR).textContent, 'Message Deleted');
  t.end();
});

test('foundationAdapter#setActionText sets the text content of the action button element', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.setActionText('Undo');
  t.equal(root.querySelector(strings.ACTION_BUTTON_SELECTOR).textContent, 'Undo');
  t.end();
});

test('foundationAdapter#setActionAriaHidden adds aria-hidden="true" to the action button element', t => {
  const {root, component} = setupTest();
  component.getDefaultFoundation().adapter_.setActionAriaHidden();
  t.true(root.querySelector(strings.ACTION_BUTTON_SELECTOR).getAttribute('aria-hidden'));
  t.end();
});

test('foundationAdapter#unsetActionAriaHidden removes "aria-hidden" from the action button element', t => {
  const {root, component} = setupTest();
  const actionButton = root.querySelector(strings.ACTION_BUTTON_SELECTOR);
  actionButton.setAttribute('aria-hidden', true);
  component.getDefaultFoundation().adapter_.unsetActionAriaHidden();
  t.false(actionButton.getAttribute('aria-hidden'));
  t.end();
});

test('foundationAdapter#registerActionClickHandler adds the handler to be called when action is clicked', t => {
  const {root, component} = setupTest();
  const handler = td.func('clickHandler');

  component.getDefaultFoundation().adapter_.registerActionClickHandler(handler);

  root.querySelector(strings.ACTION_BUTTON_SELECTOR).click();
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  t.end();
});

test('foundationAdapter#deregisterActionClickHandler removes the handler to be called when action is clicked', t => {
  const {root, component} = setupTest();
  const handler = td.func('clickHandler');
  const actionButton = root.querySelector(strings.ACTION_BUTTON_SELECTOR);

  actionButton.addEventListener('click', handler);

  component.getDefaultFoundation().adapter_.deregisterActionClickHandler(handler);

  actionButton.click();

  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  t.end();
});

test('foundationAdapter#registerTransitionEndHandler adds an event listener to the root', t => {
  const {root, component} = setupTest();
  const handler = td.func('transitionEndHandler');

  component.getDefaultFoundation().adapter_.registerTransitionEndHandler(handler);

  domEvents.emit(root, 'transitionend');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything())));
  t.end();
});

test('foundationAdapter#deregisterTransitionEndHandler adds an event listener to the root', t => {
  const {root, component} = setupTest();
  const handler = td.func('transitionEndHandler');

  root.addEventListener('transitionend', handler);
  component.getDefaultFoundation().adapter_.deregisterTransitionEndHandler(handler);

  domEvents.emit(root, 'transitionend');
  t.doesNotThrow(() => td.verify(handler(td.matchers.anything()), {times: 0}));
  t.end();
});
