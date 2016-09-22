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

import td from 'testdouble';

// Sanity tests to ensure the following:
// - Default adapters contain functions
// - All expected adapter functions are accounted for
// - Invoking any of the default methods does not throw an error.
// Every foundation test suite include this verification.
export function verifyDefaultAdapter(FoundationClass, expectedMethods, t) {
  const {defaultAdapter} = FoundationClass;
  const methods = Object.keys(defaultAdapter).filter(k => typeof defaultAdapter[k] === 'function');

  t.equal(methods.length, Object.keys(defaultAdapter).length, 'Every adapter key must be a function');
  t.deepEqual(methods, expectedMethods);
  // Test default methods
  methods.forEach(m => t.doesNotThrow(defaultAdapter[m]));
}

// Returns an object that intercepts calls to an adapter method used to register event handlers, and adds
// it to that object where the key is the event name and the value is the function being used. This is the
// preferred way of testing interaction handlers when testing:
//
// ```javascript
// test('#init adds a click listener which adds a "foo" class', t => {
//   const {foundation, mockAdapter} = setupTest();
//   const handlers = captureHandlers(mockAdapter, 'registerInteractionHandler');
//   foundation.init();
//   handlers.click(/* you can pass event info in here */ {type: 'click'});
//   t.doesNotThrow(() => td.verify(mockAdapter.addClass('foo')));
//   t.end();
// });
// ```
//
// Note that `handlerCaptureMethod` _must_ have a signature of `(string, EventListener) => any` in order to
// be effective.
export function captureHandlers(adapter, handlerCaptureMethod) {
  const {isA} = td.matchers;
  const handlers = {};
  td.when(adapter[handlerCaptureMethod](isA(String), isA(Function))).thenDo((type, handler) => {
    handlers[type] = (evtInfo = {}) => handler(Object.assign({type}, evtInfo));
  });
  return handlers;
}
