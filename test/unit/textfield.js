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

describe('MaterialTextfield', function () {

  function createSingleLineTextfield() {
    var container = document.createElement('div');
    var input = document.createElement('input');
    var label = document.createElement('label');
    var errorMessage = document.createElement('span');
    container.className = 'mdl-textfield mdl-js-textfield';
    input.className = 'mdl-textfield__input';
    input.pattern = '[0-9]';
    input.id = 'testInput';
    label.for = input.id;
    label.className = 'mdl-textfield__label';
    label.text = 'Number';
    errorMessage.className = 'mdl-textfield__error';
    errorMessage.text = 'Positive number only.';
    container.appendChild(input);
    container.appendChild(label);
    container.appendChild(errorMessage);
    return container;
  };

  it('should be globally available', function () {
    expect(MaterialTextfield).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var el = createSingleLineTextfield();
    componentHandler.upgradeElement(el, 'MaterialTextfield');
    expect($(el)).to.have.data('upgraded', ',MaterialTextfield');
  });

  it('should be a widget', function () {
    var el = createSingleLineTextfield();
    componentHandler.upgradeElement(el, 'MaterialTextfield');
    expect(el.MaterialTextfield).to.be.a('object');
  });

  it('should have public methods available via widget', function () {
    var el = createSingleLineTextfield();
    componentHandler.upgradeElement(el, 'MaterialTextfield');
    var methods = [
      'checkDisabled',
      'checkValidity',
      'checkDirty',
      'checkFocus',
      'disable',
      'enable',
      'change'
    ];
    methods.forEach(function(item) {
      expect(el.MaterialTextfield[item]).to.be.a('function');
    });
  });

  it('should be invalid after upgrade if invalid previously', function () {
    var el = createSingleLineTextfield();
    el.classList.add('is-invalid');
    componentHandler.upgradeElement(el);
    expect(el.classList.contains('is-invalid')).to.equal(true);
  });
});
