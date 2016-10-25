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
import {verifyDefaultAdapter} from '../helpers/foundation';
import {setupFoundationTest} from '../helpers/setup';
import {createMockRaf} from '../helpers/raf';
import MDLSimpleMenuFoundation from '../../../packages/mdl-menu/simple/foundation';
import {cssClasses, strings, numbers} from '../../../packages/mdl-menu/simple/constants';

function setupTest(isCssVarsSupported = true) {
  const {foundation, mockAdapter} = setupFoundationTest(MDLSimpleMenuFoundation);
  const size = {width: 500, height: 200};
  const itemYParams = {top: 100, height: 20};
  td.when(mockAdapter.hasClass('mdl-simple-menu')).thenReturn(true);
  td.when(mockAdapter.hasClass('mdl-simple-menu--open')).thenReturn(false);
  td.when(mockAdapter.hasNecessaryDom()).thenReturn(true);
  td.when(mockAdapter.getNumberOfItems()).thenReturn(1);
  td.when(mockAdapter.getInnerDimensions()).thenReturn(size);
  td.when(mockAdapter.getYParamsForItemAtIndex(0)).thenReturn(itemYParams);

  return {foundation, mockAdapter};
}

function testFoundation(desc, runTests) {
  test(desc, t => {
    const {mockAdapter, foundation} = setupTest();
    const mockRaf = createMockRaf();
    // eslint-tape-plugin complains when we reference an unknown member on t,
    // so we disable that so we can supplement t.
    // eslint-disable-next-line tape/use-t-well
    t.data = {mockAdapter, foundation, mockRaf};

    // Override end so that animation frame functions are always restored.
    const {end} = t;
    t.end = function(...args) {
      mockRaf.restore();
      end.apply(t, args);
    };
    runTests(t, {mockAdapter, foundation, mockRaf});
  });
}

test('exports strings', t => {
  t.deepEqual(MDLSimpleMenuFoundation.strings, strings);
  t.end();
});

test('exports cssClasses', t => {
  t.deepEqual(MDLSimpleMenuFoundation.cssClasses, cssClasses);
  t.end();
});

test('exports numbers', t => {
  t.deepEqual(MDLSimpleMenuFoundation.numbers, numbers);
  t.end();
});

test('defaultAdapter returns a complete adapter implementation', t => {
  verifyDefaultAdapter(MDLSimpleMenuFoundation, [
    'addClass', 'removeClass', 'hasClass', 'hasNecessaryDom', 'getInnerDimensions', 'setScale',
    'setInnerScale', 'getNumberOfItems', 'getYParamsForItemAtIndex', 'setTransitionDelayForItemAtIndex'
  ], t);
  t.end();
});

test('#init throws error when the root class is not present', t => {
  const mockAdapter = td.object(MDLSimpleMenuFoundation.defaultAdapter);
  td.when(mockAdapter.hasClass('mdl-simple-menu')).thenReturn(false);

  const foundation = new MDLSimpleMenuFoundation(mockAdapter);
  t.throws(() => foundation.init());
  t.end();
});

test('#init throws error when the necessary DOM is not present', t => {
  const mockAdapter = td.object(MDLSimpleMenuFoundation.defaultAdapter);
  td.when(mockAdapter.hasClass('mdl-simple-menu')).thenReturn(true);
  td.when(mockAdapter.hasNecessaryDom()).thenReturn(false);

  const foundation = new MDLSimpleMenuFoundation(mockAdapter);
  t.throws(() => foundation.init());
  t.end();
});

testFoundation('#open adds the animation class to start an animation', t => {
  const {foundation, mockAdapter, mockRaf} = t.data;

  foundation.open();
  mockRaf.flush();
  mockRaf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('mdl-simple-menu--animating')));
  t.end();
});

testFoundation('#open adds the open class to the menu', t => {
  const {foundation, mockAdapter, mockRaf} = t.data;
  td.when(mockAdapter.hasClass('mdl-simple-menu--open-from-bottom-right')).thenReturn(true);

  foundation.open();
  mockRaf.flush();
  mockRaf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('mdl-simple-menu--open')));
  t.end();
});

testFoundation('#open removes the animation class at the end of the animation', t => {
  const {foundation, mockAdapter, mockRaf} = t.data;
  const {now} = window.performance;
  const mockNow = td.func('window.performance.now');
  window.performance.now = mockNow;

  td.when(mockNow()).thenReturn(0);
  td.when(mockAdapter.hasClass('mdl-simple-menu--open-from-top-right')).thenReturn(true);

  foundation.open();
  mockRaf.flush();
  mockRaf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('mdl-simple-menu--animating')), 'sanity check');

  td.when(mockNow()).thenReturn(500);
  mockRaf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass('mdl-simple-menu--animating')));

  window.performance.now = now;
  t.end();
});

testFoundation('#close adds the animation class to start an animation', t => {
  const {foundation, mockAdapter, mockRaf} = t.data;

  foundation.close();
  mockRaf.flush();
  mockRaf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('mdl-simple-menu--animating')));
  t.end();
});

testFoundation('#close removes the open class from the menu', t => {
  const {foundation, mockAdapter, mockRaf} = t.data;
  td.when(mockAdapter.hasClass('mdl-simple-menu--open')).thenReturn(true);
  td.when(mockAdapter.hasClass('mdl-simple-menu--open-from-bottom-left')).thenReturn(true);

  foundation.close();
  mockRaf.flush();
  mockRaf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass('mdl-simple-menu--open')));
  t.end();
});

testFoundation('#close removes the animation class at the end of the animation', t => {
  const {foundation, mockAdapter, mockRaf} = t.data;
  const {now} = window.performance;
  const mockNow = td.func('window.performance.now');
  window.performance.now = mockNow;

  td.when(mockNow()).thenReturn(0);
  td.when(mockAdapter.hasClass('mdl-simple-menu--open')).thenReturn(true);
  td.when(mockAdapter.hasClass('mdl-simple-menu--open-from-bottom-right')).thenReturn(true);

  foundation.close();
  mockRaf.flush();
  mockRaf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.addClass('mdl-simple-menu--animating')), 'sanity check');

  td.when(mockNow()).thenReturn(500);
  mockRaf.flush();
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass('mdl-simple-menu--animating')));

  window.performance.now = now;
  t.end();
});

test('#isOpen returns true when the menu is open', t => {
  const {foundation} = setupTest();

  foundation.open();
  t.true(foundation.isOpen());
  t.end();
});

test('#isOpen returns false when the menu is closed', t => {
  const {foundation} = setupTest();

  foundation.close();
  t.false(foundation.isOpen());
  t.end();
});

test('#isOpen returns true when the menu is initiated with the open class present', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.hasClass('mdl-simple-menu--open')).thenReturn(true);

  foundation.init();
  t.true(foundation.isOpen());
  t.end();
});

test('#isOpen returns false when the menu is initiated without the open class present', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.hasClass('mdl-simple-menu--open')).thenReturn(false);

  foundation.init();
  t.false(foundation.isOpen());
  t.end();
});
