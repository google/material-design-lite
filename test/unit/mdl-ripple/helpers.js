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
import {createMockRaf} from '../helpers/raf';
import {captureHandlers as baseCaptureHandlers} from '../helpers/foundation';
import MDLRippleFoundation from '../../../packages/mdl-ripple/foundation';

export function setupTest(isCssVarsSupported = true) {
  const {foundation, mockAdapter} = setupFoundationTest(MDLRippleFoundation);
  td.when(mockAdapter.browserSupportsCssVars()).thenReturn(isCssVarsSupported);
  td.when(mockAdapter.computeBoundingRect()).thenReturn({width: 0, height: 0, left: 0, top: 0});
  td.when(mockAdapter.getWindowPageOffset()).thenReturn({x: 0, y: 0});
  return {foundation, adapter: mockAdapter};
}

export function testFoundation(desc, isCssVarsSupported, runTests) {
  if (arguments.length === 2) {
    runTests = isCssVarsSupported;
    isCssVarsSupported = true;
  }

  test(desc, t => {
    const {adapter, foundation} = setupTest(isCssVarsSupported);
    const mockRaf = createMockRaf();
    // eslint-tape-plugin complains when we reference an unknown member on t,
    // so we disable that so we can supplement t.
    // eslint-disable-next-line tape/use-t-well
    t.data = {adapter, foundation, mockRaf};

    // Override end so that animation frame functions are always restored.
    const {end} = t;
    t.end = function(...args) {
      mockRaf.restore();
      end.apply(t, args);
    };
    runTests(t, {adapter, foundation, mockRaf});
  });
}

export function captureHandlers(adapter) {
  return baseCaptureHandlers(adapter, 'registerInteractionHandler');
}
