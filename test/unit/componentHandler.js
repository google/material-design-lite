/**
 * Copyright 2015 Google Inc. All Rights Reserved.
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

describe('componentHandler', function() {

  it('should be globally available', function() {
    expect(componentHandler).to.be.a('object');
  });

  it('should upgrade a single component to an element by provided jsClass', function() {
    var el = document.createElement('button');
    componentHandler.upgradeElement(el, 'MaterialButton');
    expect($(el)).to.have.data('upgraded', ',MaterialButton');
  });

  it('should upgrade a multi-component element by calling upgradeElement multiple times', function() {
    var el = document.createElement('button');
    componentHandler.upgradeElement(el, 'MaterialButton');
    componentHandler.upgradeElement(el, 'MaterialRipple');
    expect($(el)).to.have.data('upgraded', ',MaterialButton,MaterialRipple');
  });

  it('should upgrade a single component to an element by using its CSS classes', function() {
    var el = document.createElement('button');
    el.className = 'mdl-button mdl-js-button';
    componentHandler.upgradeElement(el);
    expect($(el)).to.have.data('upgraded', ',MaterialButton');
  });
});
