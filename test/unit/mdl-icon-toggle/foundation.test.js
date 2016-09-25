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
import td from 'testdouble';

import {setupFoundationTest} from '../helpers/setup';
import {verifyDefaultAdapter, captureHandlers as baseCaptureHandlers} from '../helpers/foundation';
import MDLIconToggleFoundation from '../../../packages/mdl-icon-toggle/foundation';

const {strings, cssClasses} = MDLIconToggleFoundation;

test('exports strings', t => {
  t.true('strings' in MDLIconToggleFoundation);
  t.end();
});

test('exports cssClasses', t => {
  t.true('cssClasses' in MDLIconToggleFoundation);
  t.end();
});

test('defaultAdapter returns a complete adapter implementation', t => {
  verifyDefaultAdapter(MDLIconToggleFoundation, [
    'addClass', 'removeClass', 'registerInteractionHandler', 'deregisterInteractionHandler',
    'setText', 'getTabIndex', 'setTabIndex', 'getAttr', 'setAttr', 'rmAttr', 'notifyChange'
  ], t);
  t.end();
});

const setupTest = () => setupFoundationTest(MDLIconToggleFoundation);

test('#constructor sets on to false', t => {
  const {foundation} = setupTest();
  t.false(foundation.isOn());
  t.end();
});

test('#toggle flips on', t => {
  const {foundation} = setupTest();
  foundation.init();

  foundation.toggle();
  t.true(foundation.isOn());
  foundation.toggle();
  t.false(foundation.isOn());
  t.end();
});

test('#toggle accepts boolean argument denoting toggle state', t => {
  const {foundation} = setupTest();
  foundation.init();

  foundation.toggle(false);
  t.false(foundation.isOn());
  foundation.toggle(true);
  t.true(foundation.isOn());
  t.end();
});

test('#toggle sets "aria-pressed" to true when toggled on', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.init();

  foundation.toggle(true);
  t.doesNotThrow(() => td.verify(mockAdapter.setAttr(strings.ARIA_PRESSED, 'true')));
  t.end();
});

test('#toggle removes cssClass in "data-toggle-off" if specified when toggled on', t => {
  const {foundation, mockAdapter} = setupTest();
  const cssClass = 'toggle-off-css-class';
  td.when(mockAdapter.getAttr(strings.DATA_TOGGLE_OFF)).thenReturn(JSON.stringify({cssClass}));
  foundation.init();

  foundation.toggle(true);
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(cssClass)));
  t.end();
});

test('#toggle adds cssClass in "data-toggle-on" if specified when toggled on', t => {
  const {foundation, mockAdapter} = setupTest();
  const cssClass = 'toggle-on-css-class';
  td.when(mockAdapter.getAttr(strings.DATA_TOGGLE_ON)).thenReturn(JSON.stringify({cssClass}));
  foundation.init();

  foundation.toggle(true);
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(cssClass)));
  t.end();
});

test('#toggle sets text to content in "data-toggle-on" if specified when toggled on', t => {
  const {foundation, mockAdapter} = setupTest();
  const content = 'toggle on content';
  td.when(mockAdapter.getAttr(strings.DATA_TOGGLE_ON)).thenReturn(JSON.stringify({content}));
  foundation.init();

  foundation.toggle(true);
  t.doesNotThrow(() => td.verify(mockAdapter.setText(content)));
  t.end();
});

test('#toggle sets aria-label to label in "data-toggle-on" if specified when toggled on', t => {
  const {foundation, mockAdapter} = setupTest();
  const label = 'toggle on label';
  td.when(mockAdapter.getAttr(strings.DATA_TOGGLE_ON)).thenReturn(JSON.stringify({label}));
  foundation.init();

  foundation.toggle(true);
  t.doesNotThrow(() => td.verify(mockAdapter.setAttr(strings.ARIA_LABEL, label)));
  t.end();
});

test('#toggle sets "aria-pressed" to false when toggled off', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.init();

  foundation.toggle(false);
  t.doesNotThrow(() => td.verify(mockAdapter.setAttr(strings.ARIA_PRESSED, 'false')));
  t.end();
});

test('#toggle removes cssClass in "data-toggle-on" if specified when toggled off', t => {
  const {foundation, mockAdapter} = setupTest();
  const cssClass = 'toggle-on-css-class';
  td.when(mockAdapter.getAttr(strings.DATA_TOGGLE_ON)).thenReturn(JSON.stringify({cssClass}));
  foundation.init();

  foundation.toggle(false);
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(cssClass)));
  t.end();
});

test('#toggle adds cssClass in "data-toggle-off" if specified when toggled off', t => {
  const {foundation, mockAdapter} = setupTest();
  const cssClass = 'toggle-off-css-class';
  td.when(mockAdapter.getAttr(strings.DATA_TOGGLE_OFF)).thenReturn(JSON.stringify({cssClass}));
  foundation.init();

  foundation.toggle(false);
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(cssClass)));
  t.end();
});

test('#toggle sets text to content in "data-toggle-off" if specified when toggled off', t => {
  const {foundation, mockAdapter} = setupTest();
  const content = 'toggle off content';
  td.when(mockAdapter.getAttr(strings.DATA_TOGGLE_OFF)).thenReturn(JSON.stringify({content}));
  foundation.init();

  foundation.toggle(false);
  t.doesNotThrow(() => td.verify(mockAdapter.setText(content)));
  t.end();
});

test('#toggle sets aria-label to label in "data-toggle-off" if specified when toggled off', t => {
  const {foundation, mockAdapter} = setupTest();
  const label = 'toggle off label';
  td.when(mockAdapter.getAttr(strings.DATA_TOGGLE_OFF)).thenReturn(JSON.stringify({label}));
  foundation.init();

  foundation.toggle(false);
  t.doesNotThrow(() => td.verify(mockAdapter.setAttr(strings.ARIA_LABEL, label)));
  t.end();
});

test('#setDisabled updates the disabled state', t => {
  const {foundation} = setupTest();
  foundation.setDisabled(true);
  t.true(foundation.isDisabled());
  foundation.setDisabled(false);
  t.false(foundation.isDisabled());
  t.end();
});

test('#setDisabled sets the tabindex to -1 when disabled', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(true);
  t.doesNotThrow(() => td.verify(mockAdapter.setTabIndex(-1)));
  t.end();
});

test('#setDisabled sets "aria-disabled" to true when disabled', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(true);
  t.doesNotThrow(() => td.verify(mockAdapter.setAttr(strings.ARIA_DISABLED, 'true')));
  t.end();
});

test('#setDisabled adds "mdl-icon-toggle--disabled" class when disabled', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(true);
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(cssClasses.DISABLED)));
  t.end();
});

test('#setDisabled restores the previously set tab index when enabled', t => {
  const {foundation, mockAdapter} = setupTest();
  const tabIndex = 5;
  td.when(mockAdapter.getTabIndex()).thenReturn(tabIndex);
  foundation.setDisabled(true);

  foundation.setDisabled(false);
  t.doesNotThrow(() => td.verify(mockAdapter.setTabIndex(tabIndex)));
  t.end();
});

test('#setDisabled removes "aria-disabled" when enabled', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(false);
  t.doesNotThrow(() => td.verify(mockAdapter.rmAttr(strings.ARIA_DISABLED)));
  t.end();
});

test('#setDisabled removes "mdl-icon-toggle--disabled" class when enabled', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(false);
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(cssClasses.DISABLED)));
  t.end();
});

test('#refreshToggleData syncs the foundation state with data-toggle-on, data-toggle-off', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getAttr(strings.DATA_TOGGLE_ON)).thenReturn(JSON.stringify({
    cssClass: 'first-class-on'
  }));
  td.when(mockAdapter.getAttr(strings.DATA_TOGGLE_OFF)).thenReturn(JSON.stringify({
    cssClass: 'first-class-off'
  }));
  foundation.init();

  foundation.toggle(true);
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('first-class-on')), 'data-toggle-on sanity check');
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass('first-class-off')), 'data-toggle-off sanity check');

  td.when(mockAdapter.getAttr(strings.DATA_TOGGLE_ON)).thenReturn(JSON.stringify({
    cssClass: 'second-class-on'
  }));
  td.when(mockAdapter.getAttr(strings.DATA_TOGGLE_OFF)).thenReturn(JSON.stringify({
    cssClass: 'second-class-off'
  }));
  foundation.refreshToggleData();

  foundation.toggle(true);
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('second-class-on')));
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass('second-class-off')));
  t.end();
});

test('#destroy deregisters all interaction handlers', t => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;
  foundation.destroy();
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterInteractionHandler('click', isA(Function))));
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterInteractionHandler('keydown', isA(Function))));
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterInteractionHandler('keyup', isA(Function))));
  t.end();
});

const captureHandlers = adapter => baseCaptureHandlers(adapter, 'registerInteractionHandler');

test('updates toggle state on click', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter);
  foundation.init();

  handlers.click();
  t.true(foundation.isOn());
  t.doesNotThrow(() => td.verify(mockAdapter.setAttr(strings.ARIA_PRESSED, 'true')));

  handlers.click();
  t.false(foundation.isOn());
  t.doesNotThrow(() => td.verify(mockAdapter.setAttr(strings.ARIA_PRESSED, 'false')));
  t.end();
});

test('broadcasts change notification on click', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter);
  foundation.init();

  handlers.click();
  t.doesNotThrow(() => td.verify(mockAdapter.notifyChange({isOn: true})));
  handlers.click();
  t.doesNotThrow(() => td.verify(mockAdapter.notifyChange({isOn: false})));
  t.end();
});

test('prevents default action on spacebar keydown', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter);
  const evt = {preventDefault: td.func('evt.preventDefault'), key: 'Space'};
  foundation.init();

  handlers.keydown(evt);
  t.doesNotThrow(() => td.verify(evt.preventDefault()));
  t.end();
});

test('prevents default action on spacebar keydown using keyCode', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter);
  const evt = {preventDefault: td.func('evt.preventDefault'), keyCode: 32};
  foundation.init();

  handlers.keydown(evt);
  t.doesNotThrow(() => td.verify(evt.preventDefault()));
  t.end();
});

test('flips isKeyboardActivated() to true on spacebar keydown', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter);
  const evt = {preventDefault: td.func('evt.preventDefault'), key: 'Space'};
  foundation.init();

  handlers.keydown(evt);
  t.true(foundation.isKeyboardActivated());
  t.end();
});

test('flips isKeyboardActivated() to true on spacebar keydown using keyCode', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter);
  const evt = {preventDefault: td.func('evt.preventDefault'), keyCode: 32};
  foundation.init();

  handlers.keydown(evt);
  t.true(foundation.isKeyboardActivated());
  t.end();
});

test('triggers toggle on spacebar keyup', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter);
  foundation.init();

  handlers.keyup({key: 'Space'});
  t.true(foundation.isOn());
  t.doesNotThrow(() => td.verify(mockAdapter.setAttr(strings.ARIA_PRESSED, 'true')));
  t.doesNotThrow(() => td.verify(mockAdapter.notifyChange({isOn: true})));

  t.end();
});

test('triggers toggle on spacebar keyup using keyCode', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter);
  foundation.init();

  handlers.keyup({keyCode: 32});
  t.true(foundation.isOn());
  t.doesNotThrow(() => td.verify(mockAdapter.setAttr(strings.ARIA_PRESSED, 'true')));
  t.doesNotThrow(() => td.verify(mockAdapter.notifyChange({isOn: true})));

  t.end();
});

test('flips isKeyboardActivated() back to false on spacebar keydown', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter);
  const evt = {preventDefault: td.func('evt.preventDefault'), key: 'Space'};
  foundation.init();

  handlers.keydown(evt);
  t.true(foundation.isKeyboardActivated(), 'isKeyboardActivated sanity check');

  handlers.keyup(evt);
  t.false(foundation.isKeyboardActivated());
  t.end();
});

test('flips isKeyboardActivated() back to false on spacebar keydown using keyCode', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter);
  const evt = {preventDefault: td.func('evt.preventDefault'), keyCode: 32};
  foundation.init();

  handlers.keydown(evt);
  t.true(foundation.isKeyboardActivated(), 'isKeyboardActivated sanity check');

  handlers.keyup(evt);
  t.false(foundation.isKeyboardActivated());
  t.end();
});
