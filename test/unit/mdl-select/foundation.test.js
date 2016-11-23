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
import {captureHandlers, verifyDefaultAdapter} from '../helpers/foundation';

import MDLSelectFoundation from '../../../packages/mdl-select/foundation';

test('exports cssClasses', t => {
  t.true('cssClasses' in MDLSelectFoundation);
  t.end();
});

test('default adapter returns a complete adapter implementation', t => {
  verifyDefaultAdapter(MDLSelectFoundation, [
    'addClass', 'removeClass', 'setAttr', 'rmAttr', 'computeBoundingRect',
    'registerInteractionHandler', 'deregisterInteractionHandler', 'focus', 'makeTabbable',
    'makeUntabbable', 'getComputedStyleValue', 'setStyle', 'create2dRenderingContext',
    'setMenuElStyle', 'setMenuElAttr', 'rmMenuElAttr', 'getMenuElOffsetHeight', 'openMenu',
    'isMenuOpen', 'setSelectedTextContent', 'getNumberOfOptions', 'getTextForOptionAtIndex',
    'setAttrForOptionAtIndex', 'rmAttrForOptionAtIndex', 'getOffsetTopForOptionAtIndex',
    'registerMenuInteractionHandler', 'deregisterMenuInteractionHandler', 'notifyChange',
    'getWindowInnerHeight'
  ], t);
  t.end();
});

function setupTest() {
  return setupFoundationTest(MDLSelectFoundation);
}

test('#getSelectedIndex returns -1 if never set', t => {
  const {foundation} = setupTest();
  t.equal(foundation.getSelectedIndex(), -1);
  t.end();
});

test('#setSelectedIndex updates the selected index', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNumberOfOptions()).thenReturn(2);
  td.when(mockAdapter.getTextForOptionAtIndex(1)).thenReturn('');
  foundation.setSelectedIndex(1);
  t.equal(foundation.getSelectedIndex(), 1);
  t.end();
});

test('#setSelectedIndex sets the trimmed text content of the selected item as selected text content', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNumberOfOptions()).thenReturn(2);
  td.when(mockAdapter.getTextForOptionAtIndex(1)).thenReturn('   \nselected text ');
  foundation.setSelectedIndex(1);
  t.doesNotThrow(() => td.verify(mockAdapter.setSelectedTextContent('selected text')));
  t.end();
});

test('#setSelectedIndex sets aria-selected to "true" on the selected item', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNumberOfOptions()).thenReturn(2);
  td.when(mockAdapter.getTextForOptionAtIndex(1)).thenReturn('');
  foundation.setSelectedIndex(1);
  t.doesNotThrow(() => td.verify(mockAdapter.setAttrForOptionAtIndex(1, 'aria-selected', 'true')));
  t.end();
});

test('#setSelectedIndex removes aria-selected from the previously selected item, if any', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNumberOfOptions()).thenReturn(2);
  td.when(mockAdapter.getTextForOptionAtIndex(0)).thenReturn('');
  td.when(mockAdapter.getTextForOptionAtIndex(1)).thenReturn('');
  foundation.setSelectedIndex(0);
  foundation.setSelectedIndex(1);
  t.doesNotThrow(() => td.verify(mockAdapter.rmAttrForOptionAtIndex(0, 'aria-selected')));
  t.end();
});

test('#setSelectedIndex clears the select if given index is < 0', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNumberOfOptions()).thenReturn(2);
  foundation.setSelectedIndex(-15);
  t.doesNotThrow(() => td.verify(mockAdapter.setSelectedTextContent('')));
  t.equal(foundation.getSelectedIndex(), -1);
  t.end();
});

test('#setSelectedIndex clears the select if given index is >= the number of options', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.getNumberOfOptions()).thenReturn(2);
  foundation.setSelectedIndex(2);
  t.doesNotThrow(() => td.verify(mockAdapter.setSelectedTextContent('')));
  t.equal(foundation.getSelectedIndex(), -1);
  t.end();
});

test('#isDisabled returns false by default', t => {
  const {foundation} = setupTest();
  t.false(foundation.isDisabled());
  t.end();
});

test('#setDisabled sets disabled to true when true', t => {
  const {foundation} = setupTest();
  foundation.setDisabled(true);
  t.true(foundation.isDisabled());
  t.end();
});

test('#setDisabled adds the disabled class when true', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(true);
  t.doesNotThrow(() => td.verify(mockAdapter.addClass(MDLSelectFoundation.cssClasses.DISABLED)));
  t.end();
});

test('#setDisabled adds aria-disabled="true" when true', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(true);
  t.doesNotThrow(() => td.verify(mockAdapter.setAttr('aria-disabled', 'true')));
  t.end();
});

test('#setDisabled makes the select unfocusable when true', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(true);
  t.doesNotThrow(() => td.verify(mockAdapter.makeUntabbable()));
  t.end();
});

test('#setDisabled sets disabled to false when false', t => {
  const {foundation} = setupTest();
  foundation.setDisabled(false);
  t.false(foundation.isDisabled());
  t.end();
});

test('#setDisabled removes the disabled class when false', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(false);
  t.doesNotThrow(() => td.verify(mockAdapter.removeClass(MDLSelectFoundation.cssClasses.DISABLED)));
  t.end();
});

test('#setDisabled removes the aria-disabled attr when false', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(false);
  t.doesNotThrow(() => td.verify(mockAdapter.rmAttr('aria-disabled')));
  t.end();
});

test('#setDisabled makes the select focusable when false', t => {
  const {foundation, mockAdapter} = setupTest();
  foundation.setDisabled(false);
  t.doesNotThrow(() => td.verify(mockAdapter.makeTabbable()));
  t.end();
});

test('#resize resizes the element to the longest-length option', t => {
  const {foundation, mockAdapter} = setupTest();
  const ctx = td.object({
    font: 'default font',
    measureText: () => {}
  });
  td.when(mockAdapter.create2dRenderingContext()).thenReturn(ctx);
  td.when(mockAdapter.getComputedStyleValue('font')).thenReturn('16px Roboto');
  td.when(mockAdapter.getComputedStyleValue('letter-spacing')).thenReturn('2.5px');

  // Add space on last option to test trimming
  const opts = ['longer', 'longest', '     short     '];
  const widths = [100, 200, 50];
  td.when(mockAdapter.getNumberOfOptions()).thenReturn(opts.length);
  opts.forEach((txt, i) => {
    td.when(mockAdapter.getTextForOptionAtIndex(i)).thenReturn(txt);
    td.when(ctx.measureText(txt.trim())).thenReturn({width: widths[i]});
  });

  foundation.init();
  foundation.resize();
  t.equal(ctx.font, '16px Roboto');
  // ceil(letter-spacing * 'longest'.length + longest measured width)
  const expectedWidth = Math.ceil((2.5 * 7) + Math.max(...widths));
  t.doesNotThrow(() => td.verify(mockAdapter.setStyle('width', `${expectedWidth}px`)));
  t.end();
});

test('#resize falls back to font-{family,size} if shorthand is not supported', t => {
  const {foundation, mockAdapter} = setupTest();
  const ctx = td.object({
    font: 'default font',
    measureText: () => {}
  });
  td.when(mockAdapter.create2dRenderingContext()).thenReturn(ctx);
  td.when(mockAdapter.getComputedStyleValue('font')).thenReturn(null);
  td.when(mockAdapter.getComputedStyleValue('font-size')).thenReturn('16px');
  td.when(mockAdapter.getComputedStyleValue('font-family')).thenReturn('Roboto,sans-serif');
  td.when(mockAdapter.getComputedStyleValue('letter-spacing')).thenReturn('2.5px');

  // Add space on last option to test trimming
  const opts = ['longer', 'longest', '     short     '];
  const widths = [100, 200, 50];
  td.when(mockAdapter.getNumberOfOptions()).thenReturn(opts.length);
  opts.forEach((txt, i) => {
    td.when(mockAdapter.getTextForOptionAtIndex(i)).thenReturn(txt);
    td.when(ctx.measureText(txt.trim())).thenReturn({width: widths[i]});
  });

  foundation.init();
  foundation.resize();
  t.equal(ctx.font, '16px Roboto');
  // ceil(letter-spacing * 'longest'.length + longest measured width)
  const expectedWidth = Math.ceil((2.5 * 7) + Math.max(...widths));
  t.doesNotThrow(() => td.verify(mockAdapter.setStyle('width', `${expectedWidth}px`)));
  t.end();
});

test('#destroy deregisters all events registered within init()', t => {
  const {foundation, mockAdapter} = setupTest();
  td.when(mockAdapter.create2dRenderingContext()).thenReturn({});
  td.when(mockAdapter.getComputedStyleValue('font')).thenReturn('16px Times');
  const handlers = captureHandlers(mockAdapter, 'registerInteractionHandler');
  const menuHandlers = captureHandlers(mockAdapter, 'registerMenuInteractionHandler');
  foundation.init();
  foundation.destroy();
  Object.keys(handlers).forEach(type => {
    t.doesNotThrow(
      () => td.verify(mockAdapter.deregisterInteractionHandler(type, td.matchers.isA(Function))),
      `Deregisters ${type} interaction handler`
    );
  });
  Object.keys(menuHandlers).forEach(type => {
    t.doesNotThrow(
      () => td.verify(mockAdapter.deregisterMenuInteractionHandler(type, td.matchers.isA(Function))),
      `Deregisters ${type} menu interaction handler`
    );
  });
  t.end();
});
