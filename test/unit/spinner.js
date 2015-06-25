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


describe('spinner tests', function () {

  it('Should have MaterialSpinner globally available', function () {
    expect(MaterialSpinner).to.be.a('function');
  });

  it('Should be upgraded to a MaterialSpinner successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    expect($(el)).to.have.data('upgraded', ',MaterialSpinner');
  });

  it('Should start a MaterialSpinner successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    el.MaterialSpinner.start();
    expect($(el)).to.have.class('is-active');
  });

  it('Should stop a MaterialSpinner successfully', function () {
    var el = document.createElement('div');
    componentHandler.upgradeElement(el, 'MaterialSpinner');
    el.MaterialSpinner.start();
    el.MaterialSpinner.stop();
    expect($(el)).to.not.have.class('is-active');
  });

  it('Creates MaterialSpinner layers successfully', function () {
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
