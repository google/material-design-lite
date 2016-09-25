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

import MDLRadioFoundation from '../../../packages/mdl-radio/foundation';

test('exports cssClasses', t => {
  t.true('cssClasses' in MDLRadioFoundation);
  t.end();
});

test('exports strings', t => {
  t.true('strings' in MDLRadioFoundation);
  t.end();
});

test('defaultAdapter returns a complete adapter implementation', t => {
  const {defaultAdapter} = MDLRadioFoundation;
  const methods = Object.keys(defaultAdapter).filter(k => typeof defaultAdapter[k] === 'function');

  t.equal(methods.length, Object.keys(defaultAdapter).length, 'Every adapter key must be a function');
  t.deepEqual(methods, ['addClass', 'removeClass', 'getNativeControl']);
  methods.forEach(m => t.doesNotThrow(defaultAdapter[m]));

  t.end();
});

function setupTest() {
  const mockAdapter = td.object(MDLRadioFoundation.defaultAdapter);
  const foundation = new MDLRadioFoundation(mockAdapter);
  return {foundation, mockAdapter};
}

test('#isChecked returns the value of nativeControl.checked', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNativeControl()).thenReturn({checked: true});
  t.true(foundation.isChecked());
  t.end();
});

test('#isChecked returns false if getNativeControl() does not return anything', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNativeControl()).thenReturn(null);
  t.false(foundation.isChecked());
  t.end();
});

test('#setChecked sets the value of nativeControl.checked', t => {
  const {foundation, mockAdapter} = setupTest();
  const nativeControl = {checked: false};
  td.when(mockAdapter.getNativeControl()).thenReturn(nativeControl);
  foundation.setChecked(true);
  t.true(nativeControl.checked);
  t.end();
});

test('#setChecked exits gracefully if getNativeControl() does not return anything', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNativeControl()).thenReturn(null);
  t.doesNotThrow(() => foundation.setChecked(true));
  t.end();
});

test('#isDisabled returns the value of nativeControl.disabled', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNativeControl()).thenReturn({disabled: true});
  t.true(foundation.isDisabled());
  t.end();
});

test('#isDisabled returns false if getNativeControl() does not return anything', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNativeControl()).thenReturn(null);
  t.false(foundation.isDisabled());
  t.end();
});

test('#setDisabled sets the value of nativeControl.disabled', t => {
  const {foundation, mockAdapter} = setupTest();
  const nativeControl = {disabled: false};
  td.when(mockAdapter.getNativeControl()).thenReturn(nativeControl);
  foundation.setDisabled(true);
  t.true(nativeControl.disabled);
  t.end();
});

test('#setDisabled adds mdl-radio--disabled to the radio element when set to true', t => {
  const {foundation, mockAdapter} = setupTest();
  const nativeControl = {disabled: false};
  td.when(mockAdapter.getNativeControl()).thenReturn(nativeControl);
  foundation.setDisabled(true);
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(MDLRadioFoundation.cssClasses.DISABLED)));
  t.end();
});

test('#setDisabled removes mdl-radio--disabled from the radio element when set to false', t => {
  const {foundation, mockAdapter} = setupTest();
  const nativeControl = {disabled: true};
  td.when(mockAdapter.getNativeControl()).thenReturn(nativeControl);
  foundation.setDisabled(false);
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(MDLRadioFoundation.cssClasses.DISABLED)));
  t.end();
});

test('#setDisabled exits gracefully if getNativeControl() does not return anything', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNativeControl()).thenReturn(null);
  t.doesNotThrow(() => foundation.setDisabled(true));
  t.end();
});
