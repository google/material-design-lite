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

import {verifyDefaultAdapter} from '../helpers/foundation';
import {setupFoundationTest} from '../helpers/setup';
import MDLTextfieldFoundation from '../../../packages/mdl-textfield/foundation';

const {cssClasses} = MDLTextfieldFoundation;

test('exports strings', t => {
  t.true('strings' in MDLTextfieldFoundation);
  t.end();
});

test('exports cssClasses', t => {
  t.true('cssClasses' in MDLTextfieldFoundation);
  t.end();
});

test('defaultAdapter returns a complete adapter implementation', t => {
  verifyDefaultAdapter(MDLTextfieldFoundation, [
    'addClass', 'removeClass', 'addClassToLabel', 'removeClassFromLabel',
    'addClassToHelptext', 'removeClassFromHelptext', 'helptextHasClass',
    'registerInputFocusHandler', 'deregisterInputFocusHandler',
    'registerInputBlurHandler', 'deregisterInputBlurHandler',
    'setHelptextAttr', 'removeHelptextAttr', 'getNativeInput'
  ], t);
  t.end();
});

const setupTest = () => setupFoundationTest(MDLTextfieldFoundation);

test('#constructor sets disabled to false', t => {
  const {foundation} = setupTest();
  t.false(foundation.isDisabled());
  t.end();
});

test('#setDisabled flips disabled when a native input is given', t => {
  const {foundation, mockAdapter} = setupTest();
  const nativeInput = {disabled: false};
  td.when(mockAdapter.getNativeInput()).thenReturn(nativeInput);
  foundation.setDisabled(true);
  t.true(foundation.isDisabled());
  t.end();
});

test('#setDisabled has no effect when no native input is provided', t => {
  const {foundation} = setupTest();
  foundation.setDisabled(true);
  t.false(foundation.isDisabled());
  t.end();
});

test('#setDisabled set the disabled property on the native input when there is one', t => {
  const {foundation, mockAdapter} = setupTest();
  const nativeInput = {disabled: false};
  td.when(mockAdapter.getNativeInput()).thenReturn(nativeInput);
  foundation.setDisabled(true);
  t.true(nativeInput.disabled);
  t.end();
});

test('#setDisabled handles no native input being returned gracefully', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNativeInput()).thenReturn(null);
  t.doesNotThrow(() => foundation.setDisabled(true));
  t.end();
});

test('#setDisabled adds mdl-textfield--disabled when set to true', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(true);
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(cssClasses.DISABLED)));
  t.end();
});

test('#setDisabled removes mdl-textfield--disabled when set to false', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(false);
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(cssClasses.DISABLED)));
  t.end();
});

test('#init adds mdl-textfield--upgraded class', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.init();
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(cssClasses.UPGRADED)));
  t.end();
});

test('#destroy removes mdl-textfield--upgraded class', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.destroy();
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(cssClasses.UPGRADED)));
  t.end();
});

test('#destroy deregisters focus handler', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.destroy();
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterInputFocusHandler(td.matchers.isA(Function))));
  t.end();
});

test('#destroy deregisters blur handler', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.destroy();
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterInputBlurHandler(td.matchers.isA(Function))));
  t.end();
});

test('on focus adds mdl-textfield--focused class', t => {
  const {foundation, mockAdapter} = setupTest();
  let focus;
  td.when(mockAdapter.registerInputFocusHandler(td.matchers.isA(Function))).thenDo(handler => {
    focus = handler;
  });
  foundation.init();
  focus();
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(cssClasses.FOCUSED)));
  t.end();
});

test('on focus adds mdl-textfield__label--float-above class', t => {
  const {foundation, mockAdapter} = setupTest();
  let focus;
  td.when(mockAdapter.registerInputFocusHandler(td.matchers.isA(Function))).thenDo(handler => {
    focus = handler;
  });
  foundation.init();
  focus();
  t.doesNotThrow(() => td.verify(mockAdapter.addClassToLabel(cssClasses.LABEL_FLOAT_ABOVE)));
  t.end();
});

test('on focus removes aria-hidden from helptext', t => {
  const {foundation, mockAdapter} = setupTest();
  let focus;
  td.when(mockAdapter.registerInputFocusHandler(td.matchers.isA(Function))).thenDo(handler => {
    focus = handler;
  });
  foundation.init();
  focus();
  t.doesNotThrow(() => td.verify(mockAdapter.removeHelptextAttr('aria-hidden')));
  t.end();
});

const setupBlurTest = () => {
  const {foundation, mockAdapter} = setupTest();
  let blur;
  td.when(mockAdapter.registerInputBlurHandler(td.matchers.isA(Function))).thenDo(handler => {
    console.log('got handler', handler);
    blur = handler;
  });
  const nativeInput = {
    value: '',
    checkValidity: () => true
  };
  td.when(mockAdapter.getNativeInput()).thenReturn(nativeInput);
  foundation.init();

  return {foundation, mockAdapter, blur, nativeInput};
};

test('on blur removes mdl-textfield--focused class', t => {
  const {mockAdapter, blur} = setupBlurTest();
  blur();
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(cssClasses.FOCUSED)));
  t.end();
});

test('on blur removes mdl-textfield__label--float-above when no input value present', t => {
  const {mockAdapter, blur} = setupBlurTest();
  blur();
  t.doesNotThrow(() => td.verify(mockAdapter.removeClassFromLabel(cssClasses.LABEL_FLOAT_ABOVE)));
  t.end();
});

test('on blur does not remove mdl-textfield__label--float-above if input has a value', t => {
  const {mockAdapter, blur, nativeInput} = setupBlurTest();
  nativeInput.value = 'non-empty value';
  blur();
  t.doesNotThrow(() => td.verify(mockAdapter.removeClassFromLabel(cssClasses.LABEL_FLOAT_ABOVE), {times: 0}));
  t.end();
});

test('on blur removes mdl-textfield--invalid if input.checkValidity() returns true', t => {
  const {mockAdapter, blur} = setupBlurTest();
  blur();
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(cssClasses.INVALID)));
  t.end();
});

test('on blur adds mdl-textfied--invalid if input.checkValidity() returns false', t => {
  const {mockAdapter, blur, nativeInput} = setupBlurTest();
  nativeInput.checkValidity = () => false;
  blur();
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(cssClasses.INVALID)));
  t.end();
});

test('on blur adds role="alert" to helptext if input is invalid and helptext is being used ' +
     'as a validation message', t => {
  const {mockAdapter, blur, nativeInput} = setupBlurTest();
  nativeInput.checkValidity = () => false;
  td.when(mockAdapter.helptextHasClass(cssClasses.HELPTEXT_VALIDATION_MSG)).thenReturn(true);
  blur();
  t.doesNotThrow(() => td.verify(mockAdapter.setHelptextAttr('role', 'alert')));
  t.end();
});

test('on blur remove role="alert" if input is valid', t => {
  const {mockAdapter, blur} = setupBlurTest();
  blur();
  t.doesNotThrow(() => td.verify(mockAdapter.removeHelptextAttr('role')));
  t.end();
});

test('on blur sets aria-hidden="true" on help text by default', t => {
  const {mockAdapter, blur} = setupBlurTest();
  blur();
  t.doesNotThrow(() => td.verify(mockAdapter.setHelptextAttr('aria-hidden', 'true')));
  t.end();
});

test('on blur does not set aria-hidden on help text when it is persistent', t => {
  const {mockAdapter, blur} = setupBlurTest();
  td.when(mockAdapter.helptextHasClass(cssClasses.HELPTEXT_PERSISTENT)).thenReturn(true);
  blur();
  t.doesNotThrow(() => td.verify(mockAdapter.setHelptextAttr('aria-hidden', 'true'), {times: 0}));
  t.end();
});

test('on blur does not set aria-hidden if input is invalid and help text is validation message', t => {
  const {mockAdapter, blur, nativeInput} = setupBlurTest();
  td.when(mockAdapter.helptextHasClass(cssClasses.HELPTEXT_VALIDATION_MSG)).thenReturn(true);
  nativeInput.checkValidity = () => false;
  blur();
  t.doesNotThrow(() => td.verify(mockAdapter.setHelptextAttr('aria-hidden', 'true'), {times: 0}));
  t.end();
});

test('on blur sets aria-hidden=true if input is valid and help text is validation message', t => {
  const {mockAdapter, blur} = setupBlurTest();
  td.when(mockAdapter.helptextHasClass(cssClasses.HELPTEXT_VALIDATION_MSG)).thenReturn(true);
  blur();
  t.doesNotThrow(() => td.verify(mockAdapter.setHelptextAttr('aria-hidden', 'true')));
  t.end();
});

test('on blur handles getNativeInput() not returning anything gracefully', t => {
  const {mockAdapter, blur} = setupBlurTest();
  td.when(mockAdapter.getNativeInput()).thenReturn(null);
  t.doesNotThrow(blur);
  t.end();
});
