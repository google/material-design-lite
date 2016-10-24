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
import lolex from 'lolex';

import {testFoundation, captureHandlers} from './helpers';
import {cssClasses, strings, numbers} from '../../../packages/mdl-ripple/constants';

testFoundation('runs deactivation UX on touchend after touchstart', t => {
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  foundation.init();
  mockRaf.flush();

  handlers.touchstart();
  mockRaf.flush();
  handlers.touchend({changedTouches: [{pageX: 0, pageY: 0}]});
  mockRaf.flush();

  t.doesNotThrow(() => td.verify(adapter.removeClass(cssClasses.BG_ACTIVE)));
  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.BG_BOUNDED_ACTIVE_FILL)));
  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.FG_BOUNDED_ACTIVE_FILL)));

  // Test removal of classes on end event
  handlers[strings.TRANSITION_END_EVENT]();
  mockRaf.flush();
  t.doesNotThrow(() => td.verify(adapter.removeClass(cssClasses.BG_BOUNDED_ACTIVE_FILL), {times: 2}));
  handlers[strings.ANIMATION_END_EVENT]();
  mockRaf.flush();
  t.doesNotThrow(() => td.verify(adapter.removeClass(cssClasses.FG_BOUNDED_ACTIVE_FILL), {times: 2}));
  t.end();
});

testFoundation('runs deactivation UX on pointerup after pointerdown', t => {
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  foundation.init();
  mockRaf.flush();

  handlers.pointerdown();
  mockRaf.flush();
  handlers.pointerup({pageX: 0, pageY: 0});
  mockRaf.flush();

  t.doesNotThrow(() => td.verify(adapter.removeClass(cssClasses.BG_ACTIVE)));
  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.BG_BOUNDED_ACTIVE_FILL)));
  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.FG_BOUNDED_ACTIVE_FILL)));
  t.end();
});

testFoundation('runs deactivation UX on mouseup after mousedown', t => {
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  foundation.init();
  mockRaf.flush();

  handlers.mousedown();
  mockRaf.flush();
  handlers.mouseup({pageX: 0, pageY: 0});
  mockRaf.flush();

  t.doesNotThrow(() => td.verify(adapter.removeClass(cssClasses.BG_ACTIVE)));
  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.BG_BOUNDED_ACTIVE_FILL)));
  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.FG_BOUNDED_ACTIVE_FILL)));
  t.end();
});

testFoundation('only re-activates when there are no additional pointer events to be processed', t => {
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  foundation.init();
  mockRaf.flush();

  // Simulate Android 6 / Chrome latest event flow.
  handlers.pointerdown();
  mockRaf.flush();
  handlers.touchstart();
  mockRaf.flush();

  handlers.pointerup({pageX: 0, pageY: 0});
  mockRaf.flush();

  // At this point, the deactivation UX should have run, since the initial activation was triggered by
  // a pointerdown event.
  t.doesNotThrow(() => td.verify(adapter.removeClass(cssClasses.BG_ACTIVE), {times: 1}));
  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.BG_BOUNDED_ACTIVE_FILL), {times: 1}));
  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.FG_BOUNDED_ACTIVE_FILL), {times: 1}));

  handlers.touchend({changedTouches: [{pageX: 0, pageY: 0}]});
  mockRaf.flush();

  // Verify that deactivation UX has not been run redundantly
  t.doesNotThrow(() => td.verify(adapter.removeClass(cssClasses.BG_ACTIVE), {times: 1}));
  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.BG_BOUNDED_ACTIVE_FILL), {times: 1}));
  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.FG_BOUNDED_ACTIVE_FILL), {times: 1}));

  handlers.mousedown();
  mockRaf.flush();

  // Verify that activation only happened once, at pointerdown
  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.BG_ACTIVE), {times: 1}));

  handlers.mouseup({pageX: 0, pageY: 0});
  mockRaf.flush();

  // Finally, verify that since mouseup happened, we can re-activate the ripple.
  handlers.mousedown();
  mockRaf.flush();

  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.BG_ACTIVE), {times: 2}));

  t.end();
});

testFoundation('sets FG position to the coords within surface on pointer deactivation', t => {
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  td.when(adapter.computeBoundingRect()).thenReturn({width: 100, height: 100, left: 50, top: 50});
  foundation.init();
  mockRaf.flush();

  handlers.mousedown();
  mockRaf.flush();
  handlers.mouseup({pageX: 100, pageY: 75});
  mockRaf.flush();

  t.doesNotThrow(() => td.verify(adapter.updateCssVariable(strings.VAR_LEFT, '50px')));
  t.doesNotThrow(() => td.verify(adapter.updateCssVariable(strings.VAR_TOP, '25px')));
  t.end();
});

testFoundation('takes scroll offset into account when computing position', t => {
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  td.when(adapter.computeBoundingRect()).thenReturn({width: 100, height: 100, left: 25, top: 25});
  td.when(adapter.getWindowPageOffset()).thenReturn({x: 25, y: 25});
  foundation.init();
  mockRaf.flush();

  handlers.mousedown();
  mockRaf.flush();
  handlers.mouseup({pageX: 100, pageY: 75});
  mockRaf.flush();

  t.doesNotThrow(() => td.verify(adapter.updateCssVariable(strings.VAR_LEFT, '50px')));
  t.doesNotThrow(() => td.verify(adapter.updateCssVariable(strings.VAR_TOP, '25px')));
  t.end();
});

testFoundation('sets unbounded FG position to center on non-pointer deactivation', t => {
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  td.when(adapter.computeBoundingRect()).thenReturn({width: 100, height: 100, left: 50, top: 50});
  td.when(adapter.isSurfaceActive()).thenReturn(true, false);
  foundation.init();
  mockRaf.flush();

  handlers.keydown();
  mockRaf.flush();
  handlers.keyup();
  mockRaf.flush();

  t.doesNotThrow(() => td.verify(adapter.updateCssVariable(strings.VAR_LEFT, '50px')));
  t.doesNotThrow(() => td.verify(adapter.updateCssVariable(strings.VAR_TOP, '50px')));
  t.end();
});

testFoundation('triggers unbounded deactivation based on time it took to activate', t => {
  const clock = lolex.install();
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  td.when(adapter.isUnbounded()).thenReturn(true);
  td.when(adapter.computeBoundingRect()).thenReturn({width: 100, height: 100, left: 0, top: 0});
  foundation.init();
  mockRaf.flush();

  handlers.mousedown({pageX: 0, pageY: 0});
  mockRaf.flush();

  const baseElapsedTime = 20;

  clock.tick(baseElapsedTime + numbers.FG_TRANSFORM_DELAY_MS);

  handlers.mouseup();
  mockRaf.flush();

  const maxRadius = Math.sqrt(2) * 50;
  const xfDuration = 1000 * Math.sqrt(maxRadius / 1024);

  const scaleVal = baseElapsedTime / xfDuration;
  t.doesNotThrow(() => td.verify(adapter.updateCssVariable(strings.VAR_FG_APPROX_XF, `scale(${scaleVal})`)));
  t.doesNotThrow(
    () => td.verify(
      adapter.updateCssVariable(
        strings.VAR_FG_UNBOUNDED_TRANSFORM_DURATION, `${numbers.UNBOUNDED_TRANSFORM_DURATION_MS}ms`
      )
    )
  );
  const opacity = ((baseElapsedTime + numbers.FG_TRANSFORM_DELAY_MS) / numbers.ACTIVE_OPACITY_DURATION_MS);
  const opacityDuration = 1000 * opacity / numbers.OPACITY_DURATION_DIVISOR;
  t.doesNotThrow(
    () => td.verify(
      adapter.updateCssVariable(strings.VAR_FG_UNBOUNDED_OPACITY_DURATION, `${opacityDuration}ms`)
    )
  );
  clock.uninstall();
  t.end();
});

testFoundation('clamps opacity duration to minimum value for unbounded deactivation', t => {
  const clock = lolex.install();
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  td.when(adapter.isUnbounded()).thenReturn(true);
  foundation.init();
  mockRaf.flush();

  handlers.mousedown({pageX: 0, pageY: 0});
  mockRaf.flush();
  clock.tick(10);
  handlers.mouseup();
  mockRaf.flush();

  t.doesNotThrow(
    () => td.verify(adapter.updateCssVariable(strings.VAR_FG_UNBOUNDED_OPACITY_DURATION, '200ms'))
  );
  clock.uninstall();
  t.end();
});

testFoundation('clamps opacity duration to max value for unbounded deactivation', t => {
  const clock = lolex.install();
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  td.when(adapter.isUnbounded()).thenReturn(true);
  foundation.init();
  mockRaf.flush();

  handlers.mousedown({pageX: 0, pageY: 0});
  mockRaf.flush();
  clock.tick(1000);
  handlers.mouseup();
  mockRaf.flush();

  const about333ms = td.matchers.argThat(duration => {
    const ms = parseFloat(duration);
    return ms.toFixed(2) === '333.33';
  });
  t.doesNotThrow(
    () => td.verify(adapter.updateCssVariable(strings.VAR_FG_UNBOUNDED_OPACITY_DURATION, about333ms))
  );
  clock.uninstall();
  t.end();
});

testFoundation('toggles unbounded activation classes', t => {
  const clock = lolex.install();
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  td.when(adapter.isUnbounded()).thenReturn(true);
  foundation.init();
  mockRaf.flush();

  handlers.mousedown({pageX: 0, pageY: 0});
  mockRaf.flush();
  clock.tick(100);
  handlers.mouseup();
  mockRaf.flush();

  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.FG_UNBOUNDED_DEACTIVATION)));
  t.doesNotThrow(() => td.verify(adapter.removeClass(cssClasses.FG_UNBOUNDED_ACTIVATION)));
  clock.tick(/* past opacity duration */300);
  t.doesNotThrow(() => td.verify(adapter.removeClass(cssClasses.FG_UNBOUNDED_DEACTIVATION)));
  clock.uninstall();
  t.end();
});

testFoundation('cancels unbounded deactivation class removal on deactivation', t => {
  const clock = lolex.install();
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  td.when(adapter.isUnbounded()).thenReturn(true);
  foundation.init();
  mockRaf.flush();

  handlers.mousedown({pageX: 0, pageY: 0});
  mockRaf.flush();
  clock.tick(100);
  handlers.mouseup();
  mockRaf.flush();

  handlers.mousedown();
  mockRaf.flush();
  clock.tick(/* past opacity duration */300);
  // Verify this is only called twice on both initial activations, but not as part of a deactivation timeout.
  t.doesNotThrow(() => td.verify(adapter.removeClass(cssClasses.FG_UNBOUNDED_DEACTIVATION), {times: 2}));
  clock.uninstall();
  t.end();
});

testFoundation('ensures pointer event deactivation occurs even if activation rAF not run', t => {
  const clock = lolex.install();
  const {foundation, adapter, mockRaf} = t.data;
  const handlers = captureHandlers(adapter);
  td.when(adapter.isUnbounded()).thenReturn(true);
  foundation.init();
  mockRaf.flush();

  handlers.mousedown({pageX: 0, pageY: 0});
  mockRaf.pendingFrames.shift();
  clock.tick(100);
  handlers.mouseup();
  mockRaf.flush();

  t.doesNotThrow(() => td.verify(adapter.addClass(cssClasses.FG_UNBOUNDED_DEACTIVATION)));
  clock.uninstall();
  t.end();
});
