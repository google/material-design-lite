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

var creator = require('./creator');

describe('MaterialRadio', function () {

  it('should be globally available', function () {
    expect(MaterialRadio).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var el = creator.radio(document);
    componentHandler.upgradeElement(el, 'MaterialRadio');
    expect($(el)).to.have.data('upgraded', ',MaterialRadio');
  });

  it('should be a widget', function() {
    var radio = creator.radio(document);
    componentHandler.upgradeElement(radio);
    expect(radio.MaterialRadio).to.be.a('object');
  });

  it('should have all public methods available in widget', function() {
    var radio = creator.radio(document);
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
    var radio = creator.radio(document);
    componentHandler.upgradeElement(radio);
    radio.querySelector('input').disabled = true;
    radio.MaterialRadio.checkDisabled();
    expect((function() {
      return radio.className;
    }())).to.equal('mdl-radio mdl-js-radio is-upgraded is-disabled');
  });

  it('should get checked class after checking toggle state', function() {
    var radio = creator.radio(document);
    componentHandler.upgradeElement(radio);
    radio.querySelector('input').checked = true;
    radio.MaterialRadio.checkToggleState();
    expect((function() {
      return radio.className;
    }())).to.equal('mdl-radio mdl-js-radio is-upgraded is-checked');
  });

  it('should update related radios on one changing', function() {
    var radios = [];
    radios.push(creator.radio(document, 'test', 'one'));
    radios.push(creator.radio(document, 'test', 'two'));
    radios.push(creator.radio(document, 'test', 'three'));
    radios.push(creator.radio(document, 'tester', 'A'));
    radios.push(creator.radio(document, 'tester', 'B'));
    radios.push(creator.radio(document, 'tester', 'C'));
    var container = document.createElement('div');
    radios.forEach(function(item) {
      container.appendChild(item);
      componentHandler.upgradeElement(item);
    });
    document.body.appendChild(container);

    // Prepare the change event for manual firing.
    // Used to trigger sibling checking as if UX triggered.
    var changeEvent = document.createEvent("HTMLEvents");
    changeEvent.initEvent("change", false, true);

    // Check that all inputs are in a clean state
    Array.prototype.splice.call(document.querySelectorAll('[type="radio"]')).forEach(function(item) {
      expect(item.className).to.equal('mdl-radio mdl-js-radio is-upgraded');
    });

    radios[0].MaterialRadio.check();
    radios[0].querySelector('input').dispatchEvent(changeEvent);
    expect(radios[0].className).to.equal('mdl-radio mdl-js-radio is-upgraded is-checked');

    radios[1].MaterialRadio.check();
    radios[1].querySelector('input').dispatchEvent(changeEvent);
    expect(radios[1].className).to.equal('mdl-radio mdl-js-radio is-upgraded is-checked');
    expect(radios[0].className).to.equal('mdl-radio mdl-js-radio is-upgraded');

    // Check the extra radio set to verify things with different names are not touched when changing.
    Array.prototype.splice.call(document.querySelectorAll('[type="radio"][name="tester"]')).forEach(function(item) {
      expect(item.className).to.equal('mdl-radio mdl-js-radio is-upgraded');
    });

  });

  it('should downgrade successfully', function() {
    var radio = createRadio();
    componentHandler.upgradeElement(radio);
    expect(radio.dataset.upgraded).to.equal(',MaterialRadio');
    componentHandler.downgradeElements(radio);
    expect(radio.dataset.upgraded).to.equal('');
  });

});
