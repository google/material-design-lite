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

import test from 'tape';
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
  t.equal(dom.tagName.toLowerCase(), 'div');
  t.equal(dom.innerHTML, '');
  t.end();
});

test('provides a static attachTo() method that returns a basic instance with the specified root', t => {
  const root = document.createElement('div');
  const b = MDLComponent.attachTo(root);
  t.true(b instanceof MDLComponent);
  t.end();
});

test('takes a root node constructor param and assigns it to the "root_" property', t => {
  const root = document.createElement('div');
  const f = new FakeComponent(root);
  t.equal(f.root, root);
  t.end();
});

test('takes an optional foundation constructor param and assigns it to the "foundation_" property', t => {
  const root = document.createElement('div');
  const foundation = {init: () => {}};
  const f = new FakeComponent(root, foundation);
  t.equal(f.foundation, foundation);
  t.end();
});

test('assigns the result of "getDefaultFoundation()" to "foundation_" by default', t => {
  const root = document.createElement('div');
  const f = new FakeComponent(root);
  t.true(f.foundation.isDefaultFoundation);
  t.end();
});

test("calls the foundation's init() method within the constructor", t => {
  const root = document.createElement('div');
  const foundation = td.object({init: () => {}});
  // Testing side effects of constructor
  // eslint-disable-next-line no-new
  new FakeComponent(root, foundation);
  t.doesNotThrow(() => td.verify(foundation.init()));
  t.end();
});

test('throws an error if getDefaultFoundation() is not overridden', t => {
  const root = document.createElement('div');
  t.throws(() => new MDLComponent(root));
  t.end();
});

test('calls initialSyncWithDOM() when initialized', t => {
  const root = document.createElement('div');
  const f = new FakeComponent(root);
  t.true(f.synced);
  t.end();
});

test('provides a default initialSyncWithDOM() no-op if none provided by subclass', t => {
  t.doesNotThrow(MDLComponent.prototype.initialSyncWithDOM.bind({}));
  t.end();
});

test("provides a default destroy() method which calls the foundation's destroy() method", t => {
  const root = document.createElement('div');
  const foundation = td.object({init: () => {}, destroy: () => {}});
  const f = new FakeComponent(root, foundation);
  f.destroy();
  t.doesNotThrow(() => td.verify(foundation.destroy()));
  t.end();
});
