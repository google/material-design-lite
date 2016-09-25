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
  const {foundation, adapter, mockRaf} = t.data;
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
    return t.end();
  }

  t.doesNotThrow(
    () => td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_WIDTH, '100px')),
    'initial layout sanity check'
  );
  t.doesNotThrow(
    () => td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_HEIGHT, '200px')),
    'initial layout sanity check'
  );

  resizeHandler();
  mockRaf.flush();

  t.doesNotThrow(() => td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_WIDTH, '50px')));
  t.doesNotThrow(() => td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_HEIGHT, '100px')));
  t.end();
});

testFoundation('debounces layout within the same frame on resize', t => {
  const {foundation, adapter, mockRaf} = t.data;
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
    return t.end();
  }

  resizeHandler();
  resizeHandler();
  resizeHandler();
  mockRaf.flush();
  t.doesNotThrow(
    () => td.verify(adapter.updateCssVariable(strings.VAR_SURFACE_WIDTH, td.matchers.isA(String)), {
      times: 2
    })
  );
  t.end();
});

testFoundation('activates the background on focus', t => {
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  foundation.init();
  mockRaf.flush();

  handlers.focus();
  mockRaf.flush();
  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.BG_ACTIVE)));
  t.end();
});

testFoundation('deactivates the background on blur', t => {
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  foundation.init();
  mockRaf.flush();

  handlers.blur();
  mockRaf.flush();
  t.doesNotThrow(() => td.verify(adapter.removeClass(cssClasses.BG_ACTIVE)));
  t.end();
});
