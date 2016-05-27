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
    label.for = 'testCheckbox';
    label.className = 'mdl-checkbox';
    input.type = 'checkbox';
    input.id = 'testCheckbox';
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

  it('should auto-upgrade marked components', function() {
    var page = document.createElement('div');
    var elAuto = createCheckbox();
    elAuto.classList.add('mdl-js-checkbox');
    page.appendChild(elAuto);
    var elNonAuto = createCheckbox();
    page.appendChild(elNonAuto);
    MaterialCheckbox.initComponents(page);
    expect(elAuto.classList.contains('mdl-checkbox--is-upgraded')).to.be.true;
    expect(elNonAuto.classList.contains('mdl-checkbox--is-upgraded')).to.be.false;
  })

  it('should expose its instance when auto-upgraded', function() {
    var page = document.createElement('div');
    var el = createCheckbox();
    el.classList.add('mdl-js-checkbox');
    page.appendChild(el);
    MaterialCheckbox.initComponents(page);
    expect(el.MaterialCheckbox).to.not.be.null;
    expect(el.MaterialCheckbox.checked).to.not.be.null;
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
});
