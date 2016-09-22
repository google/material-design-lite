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

// Creates an object which stubs out window.{requestAnimationFrame,cancelAnimationFrame}, and returns an object
// that gives control over to when animation frames are executed. It works a lot like lolex, but for rAF.
//
// ```js
// const raf = createMockRaf(); // window.{rAF,cAF} are not stubbed out.
// const id1 = requestAnimationFrame(() => {
//   console.log('first frame')
//   requestAnimationFrame(() => console.log('first frame inner'));
// });
// const id2 = requestAnimationFrame(() => console.log('second frame'));
// cancelAnimationFrame(id1);
// raf.flush(); // logs "first frame"
// raf.flush(); // logs "first frame inner"
// raf.restore(); // window.{rAF,cAF} set back to normal.
// ```
export function createMockRaf() {
  const origRaf = window.requestAnimationFrame;
  const origCancel = window.cancelAnimationFrame;
  const mockRaf = {
    lastFrameId: 0,
    pendingFrames: [],
    flush() {
      const framesToRun = this.pendingFrames.slice();
      while (framesToRun.length) {
        const {id, fn} = framesToRun.shift();
        fn();
        // Short-cut to remove the frame from the actual pendingFrames array.
        cancelAnimationFrame(id);
      }
    },
    restore() {
      this.lastFrameId = 0;
      this.pendingFrames = [];
      window.requestAnimationFrame = origRaf;
      window.cancelAnimationFrame = origCancel;
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

  window.requestAnimationFrame = fn => mockRaf.requestAnimationFrame(fn);
  window.cancelAnimationFrame = id => mockRaf.cancelAnimationFrame(id);

  return mockRaf;
}
