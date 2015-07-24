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

describe('MaterialSwitch', function () {

  function createSwitch() {
    var label = document.createElement('label');
    var input = document.createElement('input');
    var labelText = document.createElement('span');
    label.for = 'testSwitch';
    input.id = label.for;
    label.className = 'mdl-switch mdl-js-switch';
    input.type = 'checkbox';
    input.className = 'mdl-switch__input';
    label.appendChild(input);
    labelText.text = 'Sound off/on';
    labelText.className = 'mdl-switch__label';
    label.appendChild(labelText);
    return label;
  };

  it('should be globally available', function () {
    expect(MaterialSwitch).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var el = createSwitch();
    componentHandler.upgradeElement(el, 'MaterialSwitch');
    expect($(el)).to.have.data('upgraded', ',MaterialSwitch');
  });

  it('should get disabled class after being checked', function() {
    var switchElement = createSwitch();
    componentHandler.upgradeElement(switchElement);
    switchElement.querySelector('input').disabled = true;
    switchElement.MaterialSwitch.checkDisabled();
    expect((function() {
      return switchElement.className;
    }())).to.equal('mdl-switch mdl-js-switch is-upgraded is-disabled');
  });

  it('should get checked class after checking toggle state', function() {
    var switchElement = createSwitch();
    componentHandler.upgradeElement(switchElement);
    switchElement.querySelector('input').checked = true;
    switchElement.MaterialSwitch.checkToggleState();
    expect((function() {
      return switchElement.className;
    }())).to.equal('mdl-switch mdl-js-switch is-upgraded is-checked');
  });

});
