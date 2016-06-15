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

describe('MaterialCheckbox', function () {

  function createCheckbox() {
    var label = document.createElement('label');
    var input = document.createElement('input');
    var labelText = document.createElement('span');
    label.className = 'mdl-checkbox';
    input.type = 'checkbox';
    input.className = 'mdl-checkbox__input';
    label.appendChild(input);
    labelText.className = 'mdl-checkbox__label';
    labelText.text = 'Test Checkbox';
    label.appendChild(labelText);
    return label;
  }

  it('should be globally available', function() {
    expect(MaterialCheckbox).to.be.a('function');
  });

  it('should upgrade successfully', function() {
    var el = createCheckbox();
    var checkbox = new MaterialCheckbox(el);
    expect(checkbox).to.be.an.instanceof(MaterialCheckbox);
    expect(el.classList.contains('mdl-checkbox--is-upgraded')).to.be.true;
  });

  it('should build a valid DOM with no parameters', function() {
    var checkbox = new MaterialCheckbox();
    expect(checkbox).to.be.an.instanceof(MaterialCheckbox);
    expect(checkbox.root).to.be.an.instanceof(Element);
  });

  it('should get checked class after being checked', function() {
    var el = createCheckbox();
    var checkbox = new MaterialCheckbox(el);
    checkbox.checked = true;
    expect(el.classList.contains('is-checked')).to.be.true;
  });

  it('should return true in .checked after being checked', function() {
    var el = createCheckbox();
    var checkbox = new MaterialCheckbox(el);
    checkbox.checked = true;
    expect(checkbox.checked).to.be.true;
  });

  it('should get disabled class after being disabled', function() {
    var el = createCheckbox();
    var checkbox = new MaterialCheckbox(el);
    checkbox.disabled = true;
    expect(el.classList.contains('is-disabled')).to.be.true;
  });

  it('should return true in .disabled after being disabled', function() {
    var el = createCheckbox();
    var checkbox = new MaterialCheckbox(el);
    checkbox.disabled = true;
    expect(checkbox.disabled).to.be.true;
  });

  it('should return the label', function() {
    var el = createCheckbox();
    var checkbox = new MaterialCheckbox(el);
    expect(checkbox.label).to.satisfy(function(val) {
      return val == el.querySelector('.mdl-checkbox__label');
    });
  });

  it('should return null if there is no label', function() {
    var el = document.createElement('label');
    var input = document.createElement('input');
    el.className = 'mdl-checkbox';
    input.type = 'checkbox';
    input.className = 'mdl-checkbox__input';
    el.appendChild(input);

    var checkbox = new MaterialCheckbox(el);
    expect(checkbox.label).to.be.null;
  });
});
