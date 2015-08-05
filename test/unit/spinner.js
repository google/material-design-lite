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

describe('MaterialSpinner', function () {

  it('should be globally available', function () {
    expect(MaterialSpinner).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    expect($(el)).to.have.data('upgraded', ',MaterialSpinner');
  });

  it('should be a widget', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    expect(el.MaterialSpinner).to.be.a('object');
  });

  it('should have public methods available', function() {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    var methods = [
      'start',
      'stop',
    ];
    methods.forEach(function(item) {
      expect(el.MaterialSpinner[item]).to.be.a('function');
    });
  });

  it('should start successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    el.MaterialSpinner.start();
    expect($(el)).to.have.class('is-active');
  });

  it('should stop successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    el.MaterialSpinner.start();
    el.MaterialSpinner.stop();
    expect($(el)).to.not.have.class('is-active');
  });

  it('should create layers successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    var html = el.innerHTML;
    expect(html).to.contain('mdl-spinner__layer');
    expect(html).to.contain('mdl-spinner__layer-1');
    expect(html).to.contain('mdl-spinner__layer-2');
    expect(html).to.contain('mdl-spinner__layer-3');
    expect(html).to.contain('mdl-spinner__layer-4');
    expect(html).to.contain('mdl-spinner__circle');
  });

});
