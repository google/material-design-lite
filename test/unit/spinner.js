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

  function createSpinner() {
    var spinner = document.createElement('div');
    spinner.className = 'mdl-spinner';
    for (var i = 0; i < 4; i++) {
      var layer = document.createElement('div');
      layer.className = 'mdl-spinner__layer';
      var left = document.createElement('div');
      left.className = 'mdl-spinner__clip';
      var right = document.createElement('div');
      right.className = 'mdl-spinner__clip';
      layer.appendChild(left);
      layer.appendChild(right);
      spinner.appendChild(layer);
    }
    return spinner;
  }

  it('should be globally available', function () {
    expect(MaterialSpinner).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var el = createSpinner();
    var spinner = new MaterialSpinner(el);
    expect(spinner).to.be.an.instanceof(MaterialSpinner);
    expect(el.classList.contains('mdl-spinner--is-upgraded')).to.be.true;
  });

  it('should build a valid DOM with no parameters', function() {
    var spinner = new MaterialSpinner();
    expect(spinner).to.be.an.instanceof(MaterialSpinner);
    expect(spinner.root).to.be.an.instanceof(Element);
  });

  it('should have public properties available', function() {
    var el = createSpinner();
    var spinner = new MaterialSpinner(el);
    expect(spinner.active).to.not.be.undefined;
  });

  it('should start successfully', function () {
    var el = createSpinner();
    var spinner = new MaterialSpinner(el);
    spinner.active = true;
    expect(el.classList.contains('is-active')).to.be.true;
  });

  it('should stop successfully', function () {
    var el = createSpinner();
    var spinner = new MaterialSpinner(el);
    spinner.active = true;
    spinner.active = false;
    expect(el.classList.contains('is-active')).to.be.false;
  });
});
