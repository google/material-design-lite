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

describe('MaterialRadio', function () {

  function createRadio() {
    var label = document.createElement('label');
    var input = document.createElement('input');
    var labelText = document.createElement('span');
    label.for = 'testRadio';
    input.id = label.for;
    label.className = 'mdl-radio mdl-js-radio';
    input.className = 'mdl-radio__button';
    input.type = 'radio';
    input.name = 'flash';
    input.value = 'on';
    label.appendChild(input);
    labelText.className = 'mdl-radio__label';
    labelText.text = 'Always on';
    label.appendChild(labelText);
    return label;
  };

  it('should be globally available', function () {
    expect(MaterialRadio).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var el = createRadio();
    componentHandler.upgradeElement(el, 'MaterialRadio');
    expect($(el)).to.have.data('upgraded', ',MaterialRadio');
  });

  it('should be a widget', function() {
    var radio = createRadio();
    componentHandler.upgradeElement(radio);
    expect(radio.MaterialRadio).to.be.a('object');
  });

  it('should have all public methods available in widget', function() {
    var radio = createRadio();
    componentHandler.upgradeElement(radio);
    var methods = [
      'disable',
      'enable',
      'uncheck',
      'check',
      'checkDisabled',
      'checkToggleState'
    ];
    methods.forEach(function(item) {
      expect(radio.MaterialRadio[item]).to.be.a('function');
    });
  });

  it('should get disabled class after being checked', function() {
    var radio = createRadio();
    componentHandler.upgradeElement(radio);
    radio.querySelector('input').disabled = true;
    radio.MaterialRadio.checkDisabled();
    expect((function() {
      return radio.className;
    }())).to.equal('mdl-radio mdl-js-radio is-upgraded is-disabled');
  });

  it('should get checked class after checking toggle state', function() {
    var radio = createRadio();
    componentHandler.upgradeElement(radio);
    radio.querySelector('input').checked = true;
    radio.MaterialRadio.checkToggleState();
    expect((function() {
      return radio.className;
    }())).to.equal('mdl-radio mdl-js-radio is-upgraded is-checked');
  });

});
