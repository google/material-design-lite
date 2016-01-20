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

/*
* Create a basic container to test nested ugprading.
* container
*   - button
*     - buttonTwo
*   - buttonThree
*/
function createNestedElementsForComponentHandlerTest() {
  var button = document.createElement('button');
  button.className = 'mdl-js-button';
  var buttonTwo = document.createElement('button');
  buttonTwo.className = 'mdl-js-button';
  var buttonThree = document.createElement('button');
  buttonThree.className = 'mdl-js-button';
  var container = document.createElement('div');
  container.appendChild(button);
  button.appendChild(buttonTwo);
  container.appendChild(buttonThree);
  return container;
}

function createCheckbox(){
  var label = document.createElement('label');
  label.className = 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect';
  label.htmlFor = 'checkbox1';

  var input = document.createElement('input');
  input.setAttribute('type','checkbox');
  input.className = 'mdl-checkbox__input';
  input.id = 'checkbox1';
  label.appendChild(input);

  var span = document.createElement('span');
  span.className = 'mdl-checkbox__label';
  span.innerHTML = 'checkbox';
  label.appendChild(span);

  return label;
}

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

  it('should upgrade a single component to an element', function() {
    var el = document.createElement('button');
    el.setAttribute('data-upgraded', ',MaterialButtonPostfix');
    el.className = 'mdl-js-button';
    componentHandler.upgradeElement(el);
    expect($(el)).to.have.data('upgraded', ',MaterialButtonPostfix,MaterialButton');
  });

  it('should upgrade child elements created by parent upgrade', function () {
    var checkbox = createCheckbox();

    componentHandler.upgradeElements(checkbox);

    var child = checkbox.lastChild;
    expect($(child)).to.have.data('upgraded', ',MaterialRipple');
  });

  it('should upgrade all elements and their children within an HTMLCollection', function() {
    var container = createNestedElementsForComponentHandlerTest();
    var buttons = document.querySelectorAll('.mdl-js-button');
    componentHandler.upgradeElements(container.children);
    for (var i; i < buttons.length; i++) {
      expect($(buttons[i])).to.have.data('upgraded', ',MaterialButton');
    }
  });

  it('should upgrade all elements and their children within a NodeList', function() {
    var container = createNestedElementsForComponentHandlerTest();
    var buttons = document.querySelectorAll('.mdl-js-button');
    componentHandler.upgradeElements(document.querySelectorAll('.mdl-js-button'));
    for (var i; i < buttons.length; i++) {
      expect($(buttons[i])).to.have.data('upgraded', ',MaterialButton');
    }
  });

  it('should upgrade all elements and their children within an HTMLElement', function() {
    var container = createNestedElementsForComponentHandlerTest();
    var buttons = document.querySelectorAll('.mdl-js-button');
    componentHandler.upgradeElements(container);
    for (var i; i < buttons.length; i++) {
      expect($(buttons[i])).to.have.data('upgraded', ',MaterialButton');
    }
  });

  it('should downgrade multiple components at once', function() {
    var button = document.createElement('button');
    button.className = 'mdl-button mdl-js-button mdl-js-ripple-effect';
    componentHandler.upgradeElement(button);
    expect(button.dataset.upgraded).to.equal(',MaterialButton,MaterialRipple');
    componentHandler.downgradeElements(button);
    expect(button.dataset.upgraded).to.equal('');
  });
});
