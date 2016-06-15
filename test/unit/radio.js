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
    label.className = 'mdl-radio';
    input.type = 'radio';
    input.className = 'mdl-radio__input';
    label.appendChild(input);
    labelText.className = 'mdl-radio__label';
    labelText.text = 'Test Radio';
    label.appendChild(labelText);
    return label;
  }

  it('should be globally available', function() {
    expect(MaterialRadio).to.be.a('function');
  });

  it('should upgrade successfully', function() {
    var el = createRadio();
    var radio = new MaterialRadio(el);
    expect(radio).to.be.an.instanceof(MaterialRadio);
    expect(el.classList.contains('mdl-radio--is-upgraded')).to.be.true;
  });

  it('should build a valid DOM with no parameters', function() {
    var radio = new MaterialRadio();
    expect(radio).to.be.an.instanceof(MaterialRadio);
    expect(radio.root).to.be.an.instanceof(Element);
  });

  it('should get checked class after being checked', function() {
    var el = createRadio();
    var radio = new MaterialRadio(el);
    radio.checked = true;
    expect(el.classList.contains('is-checked')).to.be.true;
  });

  it('should return true in .checked after being checked', function() {
    var el = createRadio();
    var radio = new MaterialRadio(el);
    radio.checked = true;
    expect(radio.checked).to.be.true;
  });

  it('should get disabled class after being disabled', function() {
    var el = createRadio();
    var radio = new MaterialRadio(el);
    radio.disabled = true;
    expect(el.classList.contains('is-disabled')).to.be.true;
  });

  it('should return true in .disabled after being disabled', function() {
    var el = createRadio();
    var radio = new MaterialRadio(el);
    radio.disabled = true;
    expect(radio.disabled).to.be.true;
  });

  it('should return the label', function() {
    var el = createRadio();
    var radio = new MaterialRadio(el);
    expect(radio.label).to.satisfy(function(val) {
      return val == el.querySelector('.mdl-radio__label');
    });
  });

  it('should return null if there is no label', function() {
    var el = document.createElement('label');
    var input = document.createElement('input');
    el.className = 'mdl-radio';
    input.type = 'radio';
    input.className = 'mdl-radio__input';
    el.appendChild(input);

    var radio = new MaterialRadio(el);
    expect(radio.label).to.be.null;
  });
});
