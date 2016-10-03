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

import {captureHandlers} from '../helpers/foundation';
import {createMockRaf} from '../helpers/raf';
import {setupFoundationTest} from '../helpers/setup';
import MDLTemporaryDrawerFoundation from '../../../packages/mdl-drawer/temporary/foundation';
import {cssClasses, strings, numbers} from '../../../packages/mdl-drawer/temporary/constants';

function setupTest() {
  const {foundation, mockAdapter} = setupFoundationTest(MDLTemporaryDrawerFoundation);
  td.when(mockAdapter.hasClass('mdl-temporary-drawer')).thenReturn(true);
  td.when(mockAdapter.hasNecessaryDom()).thenReturn(true);
  return {foundation, mockAdapter};
}

test('exports strings', t => {
  t.deepEqual(MDLTemporaryDrawerFoundation.strings, strings);
  t.end();
});

test('exports cssClasses', t => {
  t.deepEqual(MDLTemporaryDrawerFoundation.cssClasses, cssClasses);
  t.end();
});

test('exports numbers', t => {
  t.deepEqual(MDLTemporaryDrawerFoundation.numbers, numbers);
  t.end();
});

test('defaultAdapter returns a complete adapter implementation', t => {
  const {defaultAdapter} = MDLTemporaryDrawerFoundation;
  const methods = Object.keys(defaultAdapter).filter(k => typeof defaultAdapter[k] === 'function');

  t.equal(methods.length, Object.keys(defaultAdapter).length, 'Every adapter key must be a function');
  t.deepEqual(methods, [
    'addClass', 'removeClass', 'hasClass', 'hasNecessaryDom', 'registerInteractionHandler',
    'deregisterInteractionHandler', 'registerDrawerInteractionHandler', 'deregisterDrawerInteractionHandler',
    'registerTransitionEndHandler', 'deregisterTransitionEndHandler', 'setTranslateX',
    'updateCssVariable', 'getFocusableElements', 'saveElementTabState', 'restoreElementTabState',
    'makeElementUntabbable', 'isRtl', 'getDrawerWidth'
  ]);
  // Test default methods
  methods.forEach(m => t.doesNotThrow(defaultAdapter[m]));

  t.end();
});

test('#init throws error when the root class is not present', t => {
  const mockAdapter = td.object(MDLTemporaryDrawerFoundation.defaultAdapter);
  td.when(mockAdapter.hasClass('mdl-temporary-drawer')).thenReturn(false);

  const foundation = new MDLTemporaryDrawerFoundation(mockAdapter);
  t.throws(() => foundation.init());
  t.end();
});

test('#init throws error when the necessary DOM is not present', t => {
  const mockAdapter = td.object(MDLTemporaryDrawerFoundation.defaultAdapter);
  td.when(mockAdapter.hasClass('mdl-temporary-drawer')).thenReturn(true);
  td.when(mockAdapter.hasNecessaryDom()).thenReturn(false);

  const foundation = new MDLTemporaryDrawerFoundation(mockAdapter);
  t.throws(() => foundation.init());
  t.end();
});

test('#init calls component and drawer event registrations', t => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.init();
  t.doesNotThrow(() => td.verify(mockAdapter.registerInteractionHandler('click', isA(Function))));
  t.doesNotThrow(() => td.verify(mockAdapter.registerDrawerInteractionHandler('click', isA(Function))));
  t.doesNotThrow(() => td.verify(mockAdapter.registerDrawerInteractionHandler('touchstart', isA(Function))));
  t.doesNotThrow(() => td.verify(mockAdapter.registerInteractionHandler('touchmove', isA(Function))));
  t.doesNotThrow(() => td.verify(mockAdapter.registerInteractionHandler('touchend', isA(Function))));
  t.end();
});

test('#destroy calls component and drawer event deregistrations', t => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.init();
  foundation.destroy();
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterInteractionHandler('click', isA(Function))));
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterDrawerInteractionHandler('click', isA(Function))));
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterDrawerInteractionHandler('touchstart', isA(Function))));
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterInteractionHandler('touchmove', isA(Function))));
  t.doesNotThrow(() => td.verify(mockAdapter.deregisterInteractionHandler('touchend', isA(Function))));
  t.end();
});

test('#open adds the animation class to start an animation', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.open();
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('mdl-temporary-drawer--animating')));
  t.end();
});

test('#open adds the open class to show the open drawer', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.open();
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('mdl-temporary-drawer--open')));
  t.end();
});

test('#open makes elements tabbable again', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(false);
  td.when(mockAdapter.getFocusableElements()).thenReturn(['foo', 'bar']);

  foundation.init();
  foundation.open();
  t.doesNotThrow(() => td.verify(mockAdapter.restoreElementTabState('foo')));
  t.doesNotThrow(() => td.verify(mockAdapter.restoreElementTabState('bar')));
  t.end();
});

test('#close adds the animation class to start an animation', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.close();
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('mdl-temporary-drawer--animating')));
  t.end();
});

test('#close removes the open class to show the closed drawer', t => {
  const {foundation, mockAdapter} = setupTest();

  foundation.close();
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass('mdl-temporary-drawer--open')));
  t.end();
});

test('#close saves tab state and makes elements untabbable', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getFocusableElements()).thenReturn(['foo', 'bar']);

  foundation.init();
  foundation.close();
  t.doesNotThrow(() => td.verify(mockAdapter.saveElementTabState('foo')));
  t.doesNotThrow(() => td.verify(mockAdapter.makeElementUntabbable('foo')));
  t.doesNotThrow(() => td.verify(mockAdapter.saveElementTabState('bar')));
  t.doesNotThrow(() => td.verify(mockAdapter.makeElementUntabbable('bar')));
  t.end();
});

test('#close works when there are no elements to make untabbable', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getFocusableElements()).thenReturn(null);
  foundation.init();
  t.doesNotThrow(() => foundation.close());
  t.end();
});

test('#isOpen returns true when the drawer is open', t => {
  const {foundation} = setupTest();

  foundation.open();
  t.true(foundation.isOpen());
  t.end();
});

test('#isOpen returns false when the drawer is closed', t => {
  const {foundation} = setupTest();

  foundation.close();
  t.false(foundation.isOpen());
  t.end();
});

test('#isOpen returns true when the drawer is initiated with the open class present', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);

  foundation.init();
  t.true(foundation.isOpen());
  t.end();
});

test('#isOpen returns false when the drawer is initiated without the open class present', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(false);

  foundation.init();
  t.false(foundation.isOpen());
  t.end();
});

test('on touch start updates the drawer to the touch target coordinates', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  handlers.touchstart({
    touches: [{pageX: 50}]
  });
  raf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.setTranslateX(0)));
  t.doesNotThrow(() => td.verify(mockAdapter.updateCssVariable(1)));

  raf.restore();
  t.end();
});

test('on touch start does not update the drawer when drawer not open', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(false);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  handlers.touchstart({
    touches: [{pageX: 50}]
  });
  raf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.setTranslateX(0), {times: 0}));
  t.doesNotThrow(() => td.verify(mockAdapter.updateCssVariable(1), {times: 0}));

  raf.restore();
  t.end();
});

test('on touch start works for pointer events', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  handlers.touchstart({
    pointerType: 'touch',
    pageX: 50
  });
  raf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.setTranslateX(0)));
  t.doesNotThrow(() => td.verify(mockAdapter.updateCssVariable(1)));

  raf.restore();
  t.end();
});

test('on touch start does not update the drawer when pointertype != touch', t => {
  const {foundation, mockAdapter} = setupTest();
  const handlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  handlers.touchstart({
    pointerType: 'not touch',
    pageX: 50
  });
  raf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.setTranslateX(0), {times: 0}));
  t.doesNotThrow(() => td.verify(mockAdapter.updateCssVariable(1), {times: 0}));

  raf.restore();
  t.end();
});

test('on touch move updates currentX causing the drawer to update', t => {
  const {foundation, mockAdapter} = setupTest();
  const drawerHandlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const handlers = captureHandlers(mockAdapter, 'registerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  drawerHandlers.touchstart({
    touches: [{pageX: 500}]
  });
  raf.flush();

  handlers.touchmove({
    touches: [{pageX: 490}],
    preventDefault: () => {}
  });
  raf.flush();

  t.doesNotThrow(() => td.verify(mockAdapter.setTranslateX(-10)));
  t.doesNotThrow(() => td.verify(mockAdapter.updateCssVariable(0.98)));

  handlers.touchmove({
    touches: [{pageX: 495}],
    preventDefault: () => {}
  });
  raf.flush();

  t.doesNotThrow(() => td.verify(mockAdapter.setTranslateX(-5)));
  t.doesNotThrow(() => td.verify(mockAdapter.updateCssVariable(0.99)));
  raf.restore();
  t.end();
});

test('on touch move does not allow the drawer to move past its width', t => {
  const {foundation, mockAdapter} = setupTest();
  const drawerHandlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const handlers = captureHandlers(mockAdapter, 'registerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  drawerHandlers.touchstart({
    touches: [{pageX: 500}]
  });
  raf.flush();

  handlers.touchmove({
    touches: [{pageX: 510}],
    preventDefault: () => {}
  });
  raf.flush();

  t.doesNotThrow(() => td.verify(mockAdapter.setTranslateX(0)));
  t.doesNotThrow(() => td.verify(mockAdapter.updateCssVariable(1)));
  raf.restore();
  t.end();
});

test('on touch move works for pointer events', t => {
  const {foundation, mockAdapter} = setupTest();
  const drawerHandlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const handlers = captureHandlers(mockAdapter, 'registerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  drawerHandlers.touchstart({
    pointerType: 'touch',
    pageX: 500
  });
  raf.flush();

  handlers.touchmove({
    pointerType: 'touch',
    pageX: 490,
    preventDefault: () => {}
  });
  raf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.setTranslateX(-10)));
  t.doesNotThrow(() => td.verify(mockAdapter.updateCssVariable(0.98)));

  raf.restore();
  t.end();
});

test('on touch move does not update the drawer when pointertype != touch', t => {
  const {foundation, mockAdapter} = setupTest();
  const drawerHandlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const handlers = captureHandlers(mockAdapter, 'registerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  drawerHandlers.touchstart({
    pointerType: 'touch',
    pageX: 500
  });
  raf.flush();

  handlers.touchmove({
    pointerType: 'not touch',
    pageX: 490
  });
  raf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.setTranslateX(-10), {times: 0}));
  t.doesNotThrow(() => td.verify(mockAdapter.updateCssVariable(0.98), {times: 0}));

  raf.restore();
  t.end();
});

test('on touch end resets touch update styles', t => {
  const {foundation, mockAdapter} = setupTest();
  const drawerHandlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const handlers = captureHandlers(mockAdapter, 'registerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  drawerHandlers.touchstart({
    touches: [{pageX: 500}]
  });
  raf.flush();

  handlers.touchend({});
  t.doesNotThrow(() => td.verify(mockAdapter.setTranslateX(null)));
  t.doesNotThrow(() => td.verify(mockAdapter.updateCssVariable('')));
  raf.restore();
  t.end();
});

test('on touch end closes the drawer if moved more than 50%', t => {
  const {foundation, mockAdapter} = setupTest();
  const drawerHandlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const handlers = captureHandlers(mockAdapter, 'registerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  drawerHandlers.touchstart({
    touches: [{pageX: 500}]
  });
  raf.flush();

  handlers.touchmove({
    touches: [{pageX: 100}],
    preventDefault: () => {}
  });

  handlers.touchend({});
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass('mdl-temporary-drawer--open')));
  raf.restore();
  t.end();
});

test('on touch end keeps the drawer open if moved less than 50%', t => {
  const {foundation, mockAdapter} = setupTest();
  const drawerHandlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const handlers = captureHandlers(mockAdapter, 'registerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  drawerHandlers.touchstart({
    touches: [{pageX: 500}]
  });
  raf.flush();

  handlers.touchmove({
    touches: [{pageX: 300}],
    preventDefault: () => {}
  });

  handlers.touchend({});
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('mdl-temporary-drawer--open')));
  raf.restore();
  t.end();
});

test('on touch end works with pointer events', t => {
  const {foundation, mockAdapter} = setupTest();
  const drawerHandlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const handlers = captureHandlers(mockAdapter, 'registerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  drawerHandlers.touchstart({
    pointerType: 'touch',
    pageX: 500
  });
  raf.flush();

  handlers.touchmove({
    pointerType: 'touch',
    pageX: 300,
    preventDefault: () => {}
  });

  handlers.touchend({
    pointerType: 'touch'
  });
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('mdl-temporary-drawer--open')));
  raf.restore();
  t.end();
});

test('on touch does nothing for non touch pointer events', t => {
  const {foundation, mockAdapter} = setupTest();
  const drawerHandlers = captureHandlers(mockAdapter, 'registerDrawerInteractionHandler');
  const handlers = captureHandlers(mockAdapter, 'registerInteractionHandler');
  const raf = createMockRaf();
  td.when(mockAdapter.hasClass('mdl-temporary-drawer--open')).thenReturn(true);
  td.when(mockAdapter.getDrawerWidth()).thenReturn(500);
  foundation.init();

  drawerHandlers.touchstart({
    pointerType: 'touch',
    pageX: 500
  });
  raf.flush();

  handlers.touchmove({
    pointerType: 'touch',
    pageX: 300,
    preventDefault: () => {}
  });

  handlers.touchend({
    pointerType: 'not touch'
  });
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('mdl-temporary-drawer--open'), {times: 0}));
  raf.restore();
  t.end();
});
