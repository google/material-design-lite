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
import bel from 'bel';

import * as utils from '../../../packages/mdl-drawer/util';

test('remapEvent returns the provided event name for non-mapped events', t => {
  t.equal(utils.remapEvent('change'), 'change');
  t.end();
});

test('remapEvent returns the provided event name for mapped events, if browser supports touch events', t => {
  const mockWindow = {
    document: {
      ontouchstart: function() {}
    }
  };
  t.equal(utils.remapEvent('touchstart', mockWindow), 'touchstart');
  t.equal(utils.remapEvent('touchmove', mockWindow), 'touchmove');
  t.equal(utils.remapEvent('touchend', mockWindow), 'touchend');
  t.end();
});

test('remapEvent returns the mapped event name for mapped events, if browser does not support touch events', t => {
  const mockWindow = {
    document: {}
  };
  t.equal(utils.remapEvent('touchstart', mockWindow), 'pointerdown');
  t.equal(utils.remapEvent('touchmove', mockWindow), 'pointermove');
  t.equal(utils.remapEvent('touchend', mockWindow), 'pointerup');
  t.end();
});

test('getTransformPropertyName returns "transform" for browsers that support it', t => {
  const mockWindow = {
    document: {
      createElement: function() {
        return {style: {transform: null}};
      }
    }
  };
  t.equal(utils.getTransformPropertyName(mockWindow), 'transform');
  t.end();
});

test('getTransformPropertyName returns "-webkit-transform" for browsers that do not support "transform"', t => {
  const mockWindow = {
    document: {
      createElement: function() {
        return {style: {'-webkit-transform': null}};
      }
    }
  };
  t.equal(utils.getTransformPropertyName(mockWindow), '-webkit-transform');
  t.end();
});

test('supportsCssCustomProperties returns true for browsers that support them', t => {
  const supports = td.function('supports');
  td.when(supports('(--color: red)')).thenReturn(true);
  const mockWindow = {
    CSS: {supports: supports}
  };
  t.true(utils.supportsCssCustomProperties(mockWindow));
  t.end();
});

test('supportsCssCustomProperties returns dalse for browsers that do not support them', t => {
  const supports = td.function('supports');
  td.when(supports('(--color: red)')).thenReturn(false);
  const mockWindow = {
    CSS: {supports: supports}
  };
  t.false(utils.supportsCssCustomProperties(mockWindow));
  t.end();
});

test('saveElementTabState saves the tab index of an element', t => {
  const el = bel`<div id="foo" tabindex="42"></div>`;
  utils.saveElementTabState(el);
  t.equal(el.getAttribute('data-mdl-tabindex'), '42');
  t.equal(el.getAttribute('data-mdl-tabindex-handled'), 'true');
  t.end();
});

test('saveElementTabState marks an element as handled, as long as it is tabbable', t => {
  const el = bel`<a id="foo" href="foo"></a>`;
  utils.saveElementTabState(el);
  t.equal(el.getAttribute('data-mdl-tabindex'), null);
  t.equal(el.getAttribute('data-mdl-tabindex-handled'), 'true');
  t.end();
});

test('restoreElementTabState restores the tab index of an element that was saved earlier', t => {
  const el = bel`<a id="foo" href="foo" data-mdl-tabindex="42" data-mdl-tabindex-handled="true"></a>`;
  utils.restoreElementTabState(el);
  t.equal(el.getAttribute('tabindex'), '42');
  t.equal(el.getAttribute('data-mdl-tabindex'), null);
  t.equal(el.getAttribute('data-mdl-tabindex-handled'), null);
  t.end();
});

test('restoreElementTabState removes the temporary tabindex of an implicitly tabbable element', t => {
  const el = bel`<a id="foo" href="foo" data-mdl-tabindex-handled="true"></a>`;
  utils.restoreElementTabState(el);
  t.equal(el.getAttribute('tabindex'), null);
  t.equal(el.getAttribute('data-mdl-tabindex'), null);
  t.equal(el.getAttribute('data-mdl-tabindex-handled'), null);
  t.end();
});
