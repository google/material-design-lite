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

describe('componentHandler', function() {

  it('should be globally available', function() {
    expect(componentHandler).to.be.a('object');
  });

  it('should reveal public methods', function() {
    expect(componentHandler.upgradeDom).to.be.a('function');
    expect(componentHandler.upgradeElement).to.be.a('function');
    expect(componentHandler.upgradeAllRegistered).to.be.a('function');
    expect(componentHandler.registerUpgradedCallback).to.be.a('function');
    expect(componentHandler.register).to.be.a('function');
    expect(componentHandler.downgradeElements).to.be.a('function');
  });

  it('should throw an error if a duplicate classAsString is provided for registration', function() {
    expect(function() {
      componentHandler.register({
        constructor: MaterialButton,
        classAsString: 'MaterialButton',
        cssClass: 'test-js-button'
      });
    }).to.throw('The provided className has already been registered');
  });

  it('should throw an error if a duplicate cssClass is provided for registration', function() {
    expect(function() {
      componentHandler.register({
        constructor: MaterialButton,
        classAsString: 'TestButton',
        cssClass: 'mdl-js-button'
      });
    }).to.throw('The provided cssClass has already been registered');
  });

  it('should throw an error if the object provided has the component config property', function() {
    var testComponent = function() {};
    testComponent.prototype.mdlComponentConfigInternal_ = {};
    expect(function() {
      componentHandler.register({
        constructor: testComponent,
        classAsString: 'testComponent',
        cssClass: 'test-js-component'
      });
    }).to.throw('MDL component classes must not have mdlComponentConfigInternal_ defined as a property.');
  });

  it('should upgrade a single component to an element by provided jsClass', function() {
    var el = document.createElement('button');
    componentHandler.upgradeElement(el, 'MaterialButton');
    expect($(el)).to.have.data('upgraded', ',MaterialButton');
  });

  it('should upgrade a multi-component element by calling upgradeElement multiple times', function() {
    var el = document.createElement('button');
    componentHandler.upgradeElement(el, 'MaterialButton');
    componentHandler.upgradeElement(el, 'MaterialRipple');
    expect($(el)).to.have.data('upgraded', ',MaterialButton,MaterialRipple');
  });

  it('should upgrade a single component to an element by using its CSS classes', function() {
    var el = document.createElement('button');
    el.className = 'mdl-js-button mdl-js-ripple-effect';
    componentHandler.upgradeElement(el);
    expect($(el)).to.have.data('upgraded', ',MaterialButton,MaterialRipple');
  });

  it('should upgrade the entire DOM available', function() {
    var button = document.createElement('button');
    button.classList.add('mdl-js-button');
    var buttonTwo = document.createElement('div');
    buttonTwo.className = 'mdl-js-button mdl-js-ripple-effect';
    document.body.appendChild(button);
    document.body.appendChild(buttonTwo);
    componentHandler.upgradeDom();
    expect($(button)).to.have.data('upgraded', ',MaterialButton');
    expect($(buttonTwo)).to.have.data('upgraded', ',MaterialButton,MaterialRipple');
    document.body.removeChild(button);
    document.body.removeChild(buttonTwo);
  });

});
