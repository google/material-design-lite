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

import test from 'ava'; // eslint-disable-line ava/no-ignored-test-files
import td from 'testdouble';
import MDLRippleFoundation from '../../../packages/mdl-ripple/foundation';

export function setupTest(isCssVarsSupported = true) {
  const adapter = td.object(MDLRippleFoundation.defaultAdapter);
  td.when(adapter.browserSupportsCssVars()).thenReturn(isCssVarsSupported);
  td.when(adapter.computeBoundingRect()).thenReturn({width: 0, height: 0, left: 0, top: 0});
  td.when(adapter.getWindowPageOffset()).thenReturn({x: 0, y: 0});
  const foundation = new MDLRippleFoundation(adapter);
  return {foundation, adapter};
}

export function createMockRaf() {
  const origRaf = window.requestAnimationFrame;
  const origCancel = window.cancelAnimationFrame;
  const mockRaf = {
    lastFrameId: 0,
    pendingFrames: [],
    flush() {
      while (this.pendingFrames.length > 0) {
        const {fn} = this.pendingFrames.shift();
        fn();
      }
    },
    restore() {
      this.lastFrameId = 0;
      this.pendingFrames = [];
      global.requestAnimationFrame = origRaf;
      global.cancelAnimationFrame = origCancel;
    },
    requestAnimationFrame(fn) {
      const frameId = ++this.lastFrameId;
      this.pendingFrames.push({id: frameId, fn});
      return frameId;
    },
    cancelAnimationFrame(id) {
      for (let i = 0, frame; (frame = this.pendingFrames[i]); i++) {
        if (frame.id === id) {
          this.pendingFrames.splice(i, 1);
          return;
        }
      }
    }
  };

  global.requestAnimationFrame = fn => mockRaf.requestAnimationFrame(fn);
  global.cancelAnimationFrame = id => mockRaf.cancelAnimationFrame(id);

  return mockRaf;
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
    Object.assign(t.context, {adapter, foundation, mockRaf});
    runTests(t, {adapter, foundation, mockRaf});
    mockRaf.restore();
  });
}

export function captureHandlers(adapter) {
  const {isA} = td.matchers;
  const handlers = {};
  td.when(adapter.registerInteractionHandler(isA(String), isA(Function))).thenDo((type, handler) => {
    handlers[type] = (evtInfo = {}) => handler(Object.assign({type}, evtInfo));
  });
  return handlers;
}
