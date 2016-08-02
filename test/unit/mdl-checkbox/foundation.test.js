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
import lolex from 'lolex';
import td from 'testdouble';
import MDLCheckboxFoundation from '../../../packages/mdl-checkbox/foundation';
import {cssClasses, strings, numbers} from '../../../packages/mdl-checkbox/constants';

const DESC_UNDEFINED = {
  get: undefined,
  set: undefined,
  enumerable: false,
  configurable: true
};

function setupTest() {
  const nativeControl = bel`<input type="checkbox">`;
  const mockAdapter = td.object(MDLCheckboxFoundation.defaultAdapter);
  td.when(mockAdapter.getNativeControl()).thenReturn(nativeControl);

  const foundation = new MDLCheckboxFoundation(mockAdapter);
  return {foundation, mockAdapter, nativeControl};
}

// Shims Object.getOwnPropertyDescriptor for the checkbox's WebIDL attributes. Used to test
// the behavior of overridding WebIDL properties in different browser environments. For example,
// in Safari WebIDL attributes don't return get/set in descriptors.
function withMockCheckboxDescriptorReturning(descriptor, runTests) {
  const originalDesc = Object.getOwnPropertyDescriptor(Object, 'getOwnPropertyDescriptor');
  const mockGetOwnPropertyDescriptor = td.func('.getOwnPropertyDescriptor');
  const oneOf = (...validArgs) => td.matchers.argThat(x => validArgs.indexOf(x) >= 0);

  td.when(mockGetOwnPropertyDescriptor(HTMLInputElement.prototype, oneOf('checked', 'indeterminate')))
    .thenReturn(descriptor);

  Object.defineProperty(Object, 'getOwnPropertyDescriptor', Object.assign({}, originalDesc, {
    value: mockGetOwnPropertyDescriptor
  }));
  runTests(mockGetOwnPropertyDescriptor);
  Object.defineProperty(Object, 'getOwnPropertyDescriptor', originalDesc);
}

// Sets up tests which execute change events through the change handler which the foundation
// registers. Returns an object containing the following properties:
// - foundation - The MDLCheckboxFoundation instance
// - mockAdapter - The adapter given to the foundation. The adapter is pre-configured to capture
//   the changeHandler registered as well as respond with different mock objects for native controls
//   based on the state given to the change() function.
// - change - A function that's passed an object containing two "checked" and "boolean" properties,
//   representing the state of the native control after it was changed. E.g.
//   `change({checked: true, indeterminate: false})` simulates a change event as the result of a checkbox
//   being checked.
function setupChangeHandlerTest() {
  let changeHandler;
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;
  td.when(mockAdapter.registerChangeHandler(isA(Function))).thenDo(function(handler) {
    changeHandler = handler;
  });
  td.when(mockAdapter.isAttachedToDOM()).thenReturn(true);

  foundation.init();

  const change = newState => {
    td.when(mockAdapter.getNativeControl()).thenReturn(newState);
    changeHandler();
  };

  return {foundation, mockAdapter, change};
}

function testChangeHandler(desc, changes, expectedClass, verificationOpts) {
  changes = Array.isArray(changes) ? changes : [changes];
  test(`changeHandler: ${desc}`, t => {
    const {mockAdapter, change} = setupChangeHandlerTest();
    changes.forEach(change);
    t.doesNotThrow(() => {
      td.verify(mockAdapter.addClass(expectedClass), verificationOpts);
    });

    t.end();
  });
}

test('exports strings', t => {
  t.deepEqual(MDLCheckboxFoundation.strings, strings);
  t.end();
});

test('exports cssClasses', t => {
  t.deepEqual(MDLCheckboxFoundation.cssClasses, cssClasses);
  t.end();
});

test('exports numbers', t => {
  t.deepEqual(MDLCheckboxFoundation.numbers, numbers);
  t.end();
});

test('defaultAdapter returns a complete adapter implementation', t => {
  const {defaultAdapter} = MDLCheckboxFoundation;
  const methods = Object.keys(defaultAdapter).filter(k => typeof defaultAdapter[k] === 'function');

  t.equal(methods.length, Object.keys(defaultAdapter).length, 'Every adapter key must be a function');
  t.deepEqual(methods, [
    'addClass', 'removeClass', 'registerAnimationEndHandler', 'deregisterAnimationEndHandler',
    'registerChangeHandler', 'deregisterChangeHandler', 'getNativeControl', 'forceLayout',
    'isAttachedToDOM'
  ]);
  // Test default methods
  methods.forEach(m => t.doesNotThrow(defaultAdapter[m]));

  t.end();
});

test('#init calls adapter.registerChangeHandler() with a change handler function', t => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.init();
  t.doesNotThrow(() => td.verify(mockAdapter.registerChangeHandler(isA(Function))));
  t.end();
});

test('#init handles case where getNativeControl() does not return anything', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNativeControl()).thenReturn(undefined);
  t.doesNotThrow(() => foundation.init());
  t.end();
});

test('#init handles case when WebIDL attrs cannot be overridden (Safari)', t => {
  const {foundation, nativeControl} = setupTest();
  withMockCheckboxDescriptorReturning(DESC_UNDEFINED, () => {
    t.doesNotThrow(() => {
      foundation.init();
      nativeControl.checked = !nativeControl.checked;
    });
  });
  t.end();
});

test('#init handles case when property descriptors are not returned at all (Android Browser)', t => {
  const {foundation} = setupTest();
  withMockCheckboxDescriptorReturning(undefined, () => {
    t.doesNotThrow(() => foundation.init());
  });
  t.end();
});

test('#destroy calls adapter.deregisterChangeHandler() with a registerChangeHandler function', t => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  let changeHandler;
  td.when(mockAdapter.registerChangeHandler(isA(Function))).thenDo(function(handler) {
    changeHandler = handler;
  });
  foundation.init();

  foundation.destroy();
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterChangeHandler(changeHandler)));

  t.end();
});

test('#destroy handles case where getNativeControl() does not return anything', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.init();

  td.when(mockAdapter.getNativeControl()).thenReturn(undefined);
  t.doesNotThrow(() => foundation.destroy());

  t.end();
});

test('#destroy handles case when WebIDL attrs cannot be overridden (Safari)', t => {
  const {foundation} = setupTest();
  withMockCheckboxDescriptorReturning(DESC_UNDEFINED, () => {
    t.doesNotThrow(() => foundation.init(), 'init sanity check');
    t.doesNotThrow(() => foundation.destroy());
  });
  t.end();
});

testChangeHandler('unchecked -> checked animation class', {
  checked: true,
  indeterminate: false
}, cssClasses.ANIM_UNCHECKED_CHECKED);

testChangeHandler('unchecked -> indeterminate animation class', {
  checked: false,
  indeterminate: true
}, cssClasses.ANIM_UNCHECKED_INDETERMINATE);

testChangeHandler('checked -> unchecked animation class', [
  {
    checked: true,
    indeterminate: false
  },
  {
    checked: false,
    indeterminate: false
  }
], cssClasses.ANIM_CHECKED_UNCHECKED);

testChangeHandler('checked -> indeterminate animation class', [
  {
    checked: true,
    indeterminate: false
  },
  {
    checked: true,
    indeterminate: true
  }
], cssClasses.ANIM_CHECKED_INDETERMINATE);

testChangeHandler('indeterminate -> checked animation class', [
  {
    checked: false,
    indeterminate: true
  },
  {
    checked: true,
    indeterminate: false
  }
], cssClasses.ANIM_INDETERMINATE_CHECKED);

testChangeHandler('indeterminate -> unchecked animation class', [
  {
    checked: true,
    indeterminate: true
  },
  {
    checked: false,
    indeterminate: false
  }
], cssClasses.ANIM_INDETERMINATE_UNCHECKED);

testChangeHandler('no transition classes applied when no state change', [
  {
    checked: true,
    indeterminate: false
  },
  {
    checked: true,
    indeterminate: false
  }
], cssClasses.ANIM_UNCHECKED_CHECKED, {times: 1});

test('animation end handler one-off removes animation class after short delay', t => {
  const clock = lolex.install();
  const {mockAdapter, change} = setupChangeHandlerTest();
  const {isA} = td.matchers;

  let animEndHandler;
  td.when(mockAdapter.registerAnimationEndHandler(isA(Function))).thenDo(function(handler) {
    animEndHandler = handler;
  });

  change({checked: true, indeterminate: false});
  t.true(animEndHandler instanceof Function, 'animationend handler registeration sanity test');

  animEndHandler();
  const {ANIM_UNCHECKED_CHECKED} = cssClasses;
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(ANIM_UNCHECKED_CHECKED), {times: 0}));

  clock.tick(numbers.ANIM_END_LATCH_MS);
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(ANIM_UNCHECKED_CHECKED)));
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterAnimationEndHandler(animEndHandler)));

  clock.uninstall();
  t.end();
});

test('change handler debounces changes within the animation end delay period', t => {
  const clock = lolex.install();
  const {mockAdapter, change} = setupChangeHandlerTest();
  const {isA} = td.matchers;

  let animEndHandler;
  td.when(mockAdapter.registerAnimationEndHandler(isA(Function))).thenDo(function(handler) {
    animEndHandler = handler;
  });

  change({checked: true, indeterminate: false});
  t.true(animEndHandler instanceof Function, 'animationend handler registeration sanity test');
  // Queue up initial timer
  animEndHandler();

  const {ANIM_UNCHECKED_CHECKED, ANIM_CHECKED_INDETERMINATE} = cssClasses;

  change({checked: true, indeterminate: true});
  // Without ticking the clock, check that the prior class has been removed.
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(ANIM_UNCHECKED_CHECKED)));
  // The animation end handler should not yet have been removed.
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterAnimationEndHandler(animEndHandler), {times: 0}));

  // Call animEndHandler again, and tick the clock. The original timer should have been cleared, and the
  // current timer should remove the correct, latest animation class, along with deregistering the handler.
  animEndHandler();
  clock.tick(numbers.ANIM_END_LATCH_MS);
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(ANIM_CHECKED_INDETERMINATE), {times: 1}));
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterAnimationEndHandler(animEndHandler), {times: 1}));

  clock.uninstall();
  t.end();
});

test('change handler triggers layout for changes within the same frame to correctly restart anims', t => {
  const {mockAdapter, change} = setupChangeHandlerTest();

  change({checked: true, indeterminate: false});
  t.doesNotThrow(() => td.verify(mockAdapter.forceLayout(), {times: 0}));

  change({checked: true, indeterminate: true});
  t.doesNotThrow(() => td.verify(mockAdapter.forceLayout()));

  t.end();
});

test('change handler does not add animation classes when isAttachedToDOM() is falsy', t => {
  const {mockAdapter, change} = setupChangeHandlerTest();
  td.when(mockAdapter.isAttachedToDOM()).thenReturn(false);

  change({checked: true, indeterminate: false});
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(td.matchers.anything()), {times: 0}));

  t.end();
});

test('change handler does not add animation classes for bogus changes (init -> unchecked)', t => {
  const {mockAdapter, change} = setupChangeHandlerTest();

  change({checked: false, indeterminate: false});
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(td.matchers.anything()), {times: 0}));
  t.end();
});

test('change handler gracefully exits when getNativeControl() returns nothing', t => {
  const {change} = setupChangeHandlerTest();
  t.doesNotThrow(() => change(undefined));
  t.end();
});

test('"checked" property change hook works correctly', t => {
  const {foundation, mockAdapter, nativeControl} = setupTest();
  const clock = lolex.install();
  td.when(mockAdapter.isAttachedToDOM()).thenReturn(true);

  withMockCheckboxDescriptorReturning({
    get: () => {},
    set: () => {},
    enumerable: false,
    configurable: true
  }, () => {
    foundation.init();
    td.when(mockAdapter.getNativeControl()).thenReturn({
      checked: true,
      indeterminate: false
    });
    nativeControl.checked = !nativeControl.checked;
    t.doesNotThrow(() => {
      td.verify(mockAdapter.addClass(cssClasses.ANIM_UNCHECKED_CHECKED));
    });
  });

  clock.uninstall();
  t.end();
});

test('"indeterminate" property change hook works correctly', t => {
  const {foundation, mockAdapter, nativeControl} = setupTest();
  const clock = lolex.install();
  td.when(mockAdapter.isAttachedToDOM()).thenReturn(true);

  withMockCheckboxDescriptorReturning({
    get: () => {},
    set: () => {},
    enumerable: false,
    configurable: true
  }, () => {
    foundation.init();
    td.when(mockAdapter.getNativeControl()).thenReturn({
      checked: false,
      indeterminate: true
    });
    nativeControl.indeterminate = !nativeControl.indeterminate;
    t.doesNotThrow(() => {
      td.verify(mockAdapter.addClass(cssClasses.ANIM_UNCHECKED_INDETERMINATE));
    });
  });

  clock.uninstall();
  t.end();
});
