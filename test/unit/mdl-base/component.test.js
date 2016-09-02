/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import test from 'ava';
import td from 'testdouble';
import MDLComponent from '../../../packages/mdl-base';

class FakeComponent extends MDLComponent {
  get root() {
    return this.root_;
  }

  get foundation() {
    return this.foundation_;
  }

  getDefaultFoundation() {
    return td.object({
      isDefaultFoundation: true,
      init: () => {}
    });
  }

  initialSyncWithDOM() {
    this.synced = true;
  }
}

test('provides a static buildDom() method that returns an empty div by default', t => {
  const dom = MDLComponent.buildDom();
  t.is(dom.tagName.toLowerCase(), 'div');
  t.is(dom.innerHTML, '');
});

test('provides a static attachTo() method that returns a basic instance with the specified root', t => {
  const root = document.createElement('div');
  const b = MDLComponent.attachTo(root);
  t.true(b instanceof MDLComponent);
});

test('takes a root node constructor param and assigns it to the "root_" property', t => {
  const root = document.createElement('div');
  const f = new FakeComponent(root);
  t.is(f.root, root);
});

test('takes an optional foundation constructor param and assigns it to the "foundation_" property', t => {
  const root = document.createElement('div');
  const foundation = {init: () => {}};
  const f = new FakeComponent(root, foundation);
  t.is(f.foundation, foundation);
});

test('assigns the result of "getDefaultFoundation()" to "foundation_" by default', t => {
  const root = document.createElement('div');
  const f = new FakeComponent(root);
  t.true(f.foundation.isDefaultFoundation);
});

test("calls the foundation's init() method within the constructor", () => {
  const root = document.createElement('div');
  const foundation = td.object({init: () => {}});
  // Testing side effects of constructor
  // eslint-disable-next-line no-new
  new FakeComponent(root, foundation);
  td.verify(foundation.init());
});

test('throws an error if getDefaultFoundation() is not overridden', t => {
  const root = document.createElement('div');
  t.throws(() => new MDLComponent(root));
});

test('calls initialSyncWithDOM() when initialized', t => {
  const root = document.createElement('div');
  const f = new FakeComponent(root);
  t.true(f.synced);
});

test('provides a default initialSyncWithDOM() no-op if none provided by subclass', t => {
  MDLComponent.prototype.initialSyncWithDOM();
  t.pass();
});

test("provides a default destroy() method which calls the foundation's destroy() method", () => {
  const root = document.createElement('div');
  const foundation = td.object({init: () => {}, destroy: () => {}});
  const f = new FakeComponent(root, foundation);
  f.destroy();
  td.verify(foundation.destroy());
});
