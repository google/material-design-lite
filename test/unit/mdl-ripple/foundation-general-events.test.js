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

import {testFoundation, captureHandlers} from './helpers';
import {cssClasses, strings} from '../../../packages/mdl-ripple/constants';

testFoundation('re-lays out the component on resize event', t => {
  const {foundation, adapter, mockRaf} = t.context;
  td.when(adapter.computeBoundingRect()).thenReturn({
    width: 100,
    height: 200
  }, {
    width: 50,
    height: 100
  });
  let resizeHandler = null;
  td.when(adapter.registerResizeHandler(td.matchers.isA(Function))).thenDo(handler => {
    resizeHandler = handler;
  });
  foundation.init();
  mockRaf.flush();

  const isResizeHandlerFunction = typeof resizeHandler === 'function';
  t.true(isResizeHandlerFunction, 'sanity check for resize handler');
  if (!isResizeHandlerFunction) {
    // Short-circuit test so further ones don't fail.
    return;
  }

  td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_WIDTH, '100px'));
  td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_HEIGHT, '200px'));

  resizeHandler();
  mockRaf.flush();

  td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_WIDTH, '50px'));
  td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_HEIGHT, '100px'));
});

testFoundation('debounces layout within the same frame on resize', t => {
  const {foundation, adapter, mockRaf} = t.context;
  td.when(adapter.computeBoundingRect()).thenReturn({
    width: 100,
    height: 200
  }, {
    width: 50,
    height: 100
  });
  let resizeHandler = null;
  td.when(adapter.registerResizeHandler(td.matchers.isA(Function))).thenDo(handler => {
    resizeHandler = handler;
  });
  foundation.init();
  mockRaf.flush();
  const isResizeHandlerFunction = typeof resizeHandler === 'function';
  t.true(isResizeHandlerFunction, 'sanity check for resize handler');
  if (!isResizeHandlerFunction) {
    // Short-circuit test so further ones don't fail.
    return;
  }

  resizeHandler();
  resizeHandler();
  resizeHandler();
  mockRaf.flush();
  td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_WIDTH, td.matchers.isA(String)), {
    times: 2
  });
});

testFoundation('activates the background on focus', t => {
  const {foundation, adapter, mockRaf} = t.context;
  const handlers = captureHandlers(adapter);
  foundation.init();
  mockRaf.flush();

  handlers.focus();
  mockRaf.flush();
  td.verify(adapter.addClass(cssClasses.BG_ACTIVE));
});

testFoundation('deactivates the background on blur', t => {
  const {foundation, adapter, mockRaf} = t.context;
  const handlers = captureHandlers(adapter);
  foundation.init();
  mockRaf.flush();

  handlers.blur();
  mockRaf.flush();
  td.verify(adapter.removeClass(cssClasses.BG_ACTIVE));
});
