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
    label.className = 'mdl-switch';
    input.type = 'checkbox';
    input.className = 'mdl-switch__input';
    label.appendChild(input);
    labelText.className = 'mdl-switch__label';
    labelText.text = 'Test Switch';
    label.appendChild(labelText);
    return label;
  }

  it('should be globally available', function() {
    expect(MaterialSwitch).to.be.a('function');
  });

  it('should upgrade successfully', function() {
    var el = createSwitch();
    var sw = new MaterialSwitch(el);
    expect(sw).to.be.an.instanceof(MaterialSwitch);
    expect(el.classList.contains('mdl-switch--is-upgraded')).to.be.true;
  });

  it('should build a valid DOM with no parameters', function() {
    var sw = new MaterialSwitch();
    expect(sw).to.be.an.instanceof(MaterialSwitch);
    expect(sw.root).to.be.an.instanceof(Element);
  });

  it('should get checked class after being checked', function() {
    var el = createSwitch();
    var sw = new MaterialSwitch(el);
    sw.checked = true;
    expect(el.classList.contains('is-checked')).to.be.true;
  });

  it('should return true in .checked after being checked', function() {
    var el = createSwitch();
    var sw = new MaterialSwitch(el);
    sw.checked = true;
    expect(sw.checked).to.be.true;
  });

  it('should get disabled class after being disabled', function() {
    var el = createSwitch();
    var sw = new MaterialSwitch(el);
    sw.disabled = true;
    expect(el.classList.contains('is-disabled')).to.be.true;
  });

  it('should return true in .disabled after being disabled', function() {
    var el = createSwitch();
    var sw = new MaterialSwitch(el);
    sw.disabled = true;
    expect(sw.disabled).to.be.true;
  });
  
  it('should return the label', function() {
    var el = createSwitch();
    var sw = new MaterialSwitch(el);
    expect(sw.label).to.satisfy(function(val) {
      return val == el.querySelector('.mdl-switch__label');
    });
  });

  it('should return null if there is no label', function() {
    var el = document.createElement('label');
    var input = document.createElement('input');
    el.className = 'mdl-switch';
    input.type = 'checkbox';
    input.className = 'mdl-switch__input';
    el.appendChild(input);

    var sw = new MaterialSwitch(el);
    expect(sw.label).to.be.null;
  });
});
