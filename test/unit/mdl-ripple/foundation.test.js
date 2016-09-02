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

import test from 'ava';
import td from 'testdouble';

import MDLRippleFoundation from '../../../packages/mdl-ripple/foundation';
import {cssClasses, strings, numbers} from '../../../packages/mdl-ripple/constants';

import {testFoundation} from './helpers';

test('cssClasses returns constants.cssClasses', t => {
  t.deepEqual(MDLRippleFoundation.cssClasses, cssClasses);
});

test('strings returns constants.strings', t => {
  t.deepEqual(MDLRippleFoundation.strings, strings);
});

test('numbers returns constants.numbers', t => {
  t.deepEqual(MDLRippleFoundation.numbers, numbers);
});

test('defaultAdapter returns a complete adapter implementation', t => {
  const {defaultAdapter} = MDLRippleFoundation;
  const methods = Object.keys(defaultAdapter).filter(k => typeof defaultAdapter[k] === 'function');

  t.is(methods.length, Object.keys(defaultAdapter).length, 'Every adapter key must be a function');
  t.deepEqual(methods, [
    'browserSupportsCssVars', 'isUnbounded', 'isSurfaceActive', 'addClass', 'removeClass',
    'registerInteractionHandler', 'deregisterInteractionHandler', 'registerResizeHandler',
    'deregisterResizeHandler', 'updateCssVariable', 'computeBoundingRect', 'getWindowPageOffset'
  ]);
  // Test default methods
  methods.forEach(m => defaultAdapter[m]());
  t.pass();
});

testFoundation(`#init calls adapter.addClass("${cssClasses.ROOT}")`, t => {
  const {adapter, foundation, mockRaf} = t.context;
  foundation.init();
  mockRaf.flush();

  td.verify(adapter.addClass(cssClasses.ROOT));
});

testFoundation('#init adds unbounded class when adapter indicates unbounded', t => {
  const {adapter, foundation, mockRaf} = t.context;
  td.when(adapter.isUnbounded()).thenReturn(true);
  foundation.init();
  mockRaf.flush();

  td.verify(adapter.addClass(cssClasses.UNBOUNDED));
});

testFoundation('#init does not add unbounded class when adapter does not indicate unbounded (default)', t => {
  const {adapter, foundation, mockRaf} = t.context;
  foundation.init();
  mockRaf.flush();

  td.verify(adapter.addClass(cssClasses.UNBOUNDED), {times: 0});
});

testFoundation('#init gracefully exits when css variables are not supported', false, t => {
  const {foundation, adapter, mockRaf} = t.context;
  foundation.init();
  mockRaf.flush();

  td.verify(adapter.addClass(cssClasses.ROOT), {times: 0});
});

testFoundation(`#init sets ${strings.VAR_SURFACE_WIDTH} css variable to the clientRect's width`, t => {
  const {foundation, adapter, mockRaf} = t.context;
  td.when(adapter.computeBoundingRect()).thenReturn({width: 200, height: 100});
  foundation.init();
  mockRaf.flush();

  td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_WIDTH, '200px'));
});

testFoundation(`#init sets ${strings.VAR_SURFACE_HEIGHT} css variable to the clientRect's height`, t => {
  const {foundation, adapter, mockRaf} = t.context;
  td.when(adapter.computeBoundingRect()).thenReturn({width: 200, height: 100});
  foundation.init();
  mockRaf.flush();

  td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_HEIGHT, '100px'));
});

testFoundation(`#init sets ${strings.VAR_FG_SIZE} to the circumscribing circle's diameter`, t => {
  const {foundation, adapter, mockRaf} = t.context;
  td.when(adapter.computeBoundingRect()).thenReturn({width: 200, height: 100});
  foundation.init();
  mockRaf.flush();

  const expectedDiameter = Math.sqrt(2) * 200;
  td.verify(adapter.updateCssVariable(strings.VAR_FG_SIZE, `${expectedDiameter}px`));
});

testFoundation(`#init sets ${strings.VAR_FG_UNBOUNDED_TRANSFORM_DURATION} based on the max radius`, t => {
  const {foundation, adapter, mockRaf} = t.context;
  td.when(adapter.computeBoundingRect()).thenReturn({width: 200, height: 100});
  foundation.init();
  mockRaf.flush();

  const expectedDiameter = Math.sqrt(2) * 200;
  const expectedRadius = expectedDiameter / 2;
  const expectedDuration = 1000 * Math.sqrt(expectedRadius / 1024);
  const {VAR_FG_UNBOUNDED_TRANSFORM_DURATION: expectedCssVar} = strings;
  td.verify(adapter.updateCssVariable(expectedCssVar, `${expectedDuration}ms`));
});

testFoundation(`#init centers via ${strings.VAR_LEFT} and ${strings.VAR_TOP} when unbounded`, t => {
  const {foundation, adapter, mockRaf} = t.context;
  td.when(adapter.computeBoundingRect()).thenReturn({width: 100, height: 200});
  td.when(adapter.isUnbounded()).thenReturn(true);
  foundation.init();
  mockRaf.flush();

  const expectedDiameter = Math.sqrt(2) * 200;
  const offset = (expectedDiameter / 2);
  td.verify(adapter.updateCssVariable(strings.VAR_LEFT, `${-offset + 50}px`));
  td.verify(adapter.updateCssVariable(strings.VAR_TOP, `${-offset + 100}px`));
});

testFoundation('#init registers events for all types of common interactions', t => {
  const {foundation, adapter} = t.context;
  const expectedEvents = [
    'mousedown', 'mouseup',
    'touchstart', 'touchend',
    'pointerdown', 'pointerup',
    'keydown', 'keyup',
    'focus', 'blur'
  ];
  foundation.init();

  expectedEvents.forEach(evt => {
    td.verify(adapter.registerInteractionHandler(evt, td.matchers.isA(Function)));
  });
});

testFoundation('#init registers an event for when a resize occurs', t => {
  const {foundation, adapter} = t.context;
  foundation.init();

  td.verify(adapter.registerResizeHandler(td.matchers.isA(Function)));
});

testFoundation('#destroy unregisters all bound interaction handlers', t => {
  const {foundation, adapter} = t.context;
  const handlers = {};

  td.when(
    adapter.registerInteractionHandler(td.matchers.isA(String), td.matchers.isA(Function))
  ).thenDo((type, handler) => {
    handlers[type] = handler;
  });
  foundation.init();
  foundation.destroy();

  Object.keys(handlers).forEach(type => {
    td.verify(adapter.deregisterInteractionHandler(type, handlers[type]));
  });
});

testFoundation('#destroy unregisters the resize handler', t => {
  const {foundation, adapter} = t.context;
  let resizeHandler;
  td.when(adapter.registerResizeHandler(td.matchers.isA(Function))).thenDo(handler => {
    resizeHandler = handler;
  });
  foundation.init();
  foundation.destroy();

  td.verify(adapter.deregisterResizeHandler(resizeHandler));
});

testFoundation(`#destroy removes ${cssClasses.ROOT}`, t => {
  const {foundation, adapter, mockRaf} = t.context;
  foundation.destroy();
  mockRaf.flush();
  td.verify(adapter.removeClass(cssClasses.ROOT));
});

testFoundation(`#destroy removes ${cssClasses.UNBOUNDED}`, t => {
  const {foundation, adapter, mockRaf} = t.context;
  foundation.destroy();
  mockRaf.flush();
  td.verify(adapter.removeClass(cssClasses.UNBOUNDED));
});

testFoundation('#destroy removes all CSS variables', t => {
  const cssVars = Object.keys(strings).filter(s => s.indexOf('VAR_') === 0).map(s => strings[s]);
  const {foundation, adapter, mockRaf} = t.context;
  foundation.destroy();
  mockRaf.flush();
  cssVars.forEach(cssVar => {
    td.verify(adapter.updateCssVariable(cssVar, null));
  });
});

testFoundation(`#layout sets ${strings.VAR_SURFACE_WIDTH} css variable to the clientRect's width`, t => {
  const {foundation, adapter, mockRaf} = t.context;
  td.when(adapter.computeBoundingRect()).thenReturn({width: 200, height: 100});
  foundation.layout();
  mockRaf.flush();

  td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_WIDTH, '200px'));
});

testFoundation(`#layout sets ${strings.VAR_SURFACE_HEIGHT} css variable to the clientRect's height`, t => {
  const {foundation, adapter, mockRaf} = t.context;
  td.when(adapter.computeBoundingRect()).thenReturn({width: 200, height: 100});
  foundation.layout();
  mockRaf.flush();

  td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_HEIGHT, '100px'));
});

testFoundation(`#layout sets ${strings.VAR_FG_SIZE} to the circumscribing circle's diameter`, t => {
  const {foundation, adapter, mockRaf} = t.context;
  td.when(adapter.computeBoundingRect()).thenReturn({width: 200, height: 100});
  foundation.layout();
  mockRaf.flush();

  const expectedDiameter = Math.sqrt(2) * 200;
  td.verify(adapter.updateCssVariable(strings.VAR_FG_SIZE, `${expectedDiameter}px`));
});

testFoundation(`#layout sets ${strings.VAR_FG_UNBOUNDED_TRANSFORM_DURATION} based on the max radius`, t => {
  const {foundation, adapter, mockRaf} = t.context;
  td.when(adapter.computeBoundingRect()).thenReturn({width: 200, height: 100});
  foundation.layout();
  mockRaf.flush();

  const expectedDiameter = Math.sqrt(2) * 200;
  const expectedRadius = expectedDiameter / 2;
  const expectedDuration = 1000 * Math.sqrt(expectedRadius / 1024);
  const {VAR_FG_UNBOUNDED_TRANSFORM_DURATION: expectedCssVar} = strings;
  td.verify(adapter.updateCssVariable(expectedCssVar, `${expectedDuration}ms`));
});

testFoundation(`#layout centers via ${strings.VAR_LEFT} and ${strings.VAR_TOP} when unbounded`, t => {
  const {foundation, adapter, mockRaf} = t.context;
  td.when(adapter.computeBoundingRect()).thenReturn({width: 100, height: 200});
  td.when(adapter.isUnbounded()).thenReturn(true);
  foundation.layout();
  mockRaf.flush();

  const expectedDiameter = Math.sqrt(2) * 200;
  const offset = (expectedDiameter / 2);
  td.verify(adapter.updateCssVariable(strings.VAR_LEFT, `${-offset + 50}px`));
  td.verify(adapter.updateCssVariable(strings.VAR_TOP, `${-offset + 100}px`));
});

testFoundation('#layout debounces calls within the same frame', t => {
  const {foundation, mockRaf} = t.context;
  foundation.layout();
  foundation.layout();
  foundation.layout();
  t.is(mockRaf.pendingFrames.length, 1);
});

testFoundation('#layout resets debounce latch when layout frame is run', t => {
  const {foundation, mockRaf} = t.context;
  foundation.layout();
  mockRaf.flush();
  foundation.layout();
  t.is(mockRaf.pendingFrames.length, 1);
});
