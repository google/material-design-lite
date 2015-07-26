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
    var label = document.createElement('label'),
    input = document.createElement('input'),
    labelText = document.createElement('span');
    label.for = 'testCheckbox';
    label.className = 'mdl-checkbox mdl-js-checkbox';
    input.type = 'checkbox';
    input.id = 'testCheckbox';
    input.className = 'mdl-checkbox__input';
    label.appendChild(input);
    labelText.className = 'mdl-checkbox__label';
    labelText.text = 'Test Checkbox';
    label.appendChild(labelText);
    return label;
  };

  it('should be globally available', function () {
    expect(MaterialCheckbox).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var el = createCheckbox();
    componentHandler.upgradeElement(el, 'MaterialCheckbox');
    expect($(el)).to.have.data('upgraded', ',MaterialCheckbox');
  });

  it('should get disabled class after being checked', function() {
    var checkbox = createCheckbox();
    componentHandler.upgradeElement(checkbox);
    checkbox.querySelector('input').disabled = true;
    checkbox.MaterialCheckbox.checkDisabled();
    expect((function() {
      return checkbox.className;
    }())).to.equal('mdl-checkbox mdl-js-checkbox is-upgraded is-disabled');
  });

  it('should get checked class after checking toggle state', function() {
    var checkbox = createCheckbox();
    componentHandler.upgradeElement(checkbox);
    checkbox.querySelector('input').checked = true;
    checkbox.MaterialCheckbox.checkToggleState();
    expect((function() {
      return checkbox.className;
    }())).to.equal('mdl-checkbox mdl-js-checkbox is-upgraded is-checked');
  });

});
