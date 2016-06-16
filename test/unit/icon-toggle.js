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

describe('MaterialIconToggle', function () {

  function createIconToggle() {
    var label = document.createElement('label');
    var input = document.createElement('input');
    var icon = document.createElement('i');
    label.className = 'mdl-icon-toggle';
    input.type = 'checkbox';
    input.className = 'mdl-icon-toggle__input';
    label.appendChild(input);
    icon.className = 'mdl-icon-toggle__label material-icons';
    icon.text = 'format_bold';
    label.appendChild(icon);
    return label;
  }

  it('should be globally available', function() {
    expect(MaterialIconToggle).to.be.a('function');
  });

  it('should upgrade successfully', function() {
    var el = createIconToggle();
    var toggle = new MaterialIconToggle(el);
    expect(toggle).to.be.an.instanceof(MaterialIconToggle);
    expect(el.classList.contains('mdl-icon-toggle--is-upgraded')).to.be.true;
  });

  it('should build a valid DOM with no parameters', function() {
    var toggle = new MaterialIconToggle();
    expect(toggle).to.be.an.instanceof(MaterialIconToggle);
    expect(toggle.root).to.be.an.instanceof(Element);
  });

  it('should get checked class after being checked', function() {
    var el = createIconToggle();
    var toggle = new MaterialIconToggle(el);
    toggle.checked = true;
    expect(el.classList.contains('is-checked')).to.be.true;
  });

  it('should return true in .checked after being checked', function() {
    var el = createIconToggle();
    var toggle = new MaterialIconToggle(el);
    toggle.checked = true;
    expect(toggle.checked).to.be.true;
  });

  it('should get disabled class after being disabled', function() {
    var el = createIconToggle();
    var toggle = new MaterialIconToggle(el);
    toggle.disabled = true;
    expect(el.classList.contains('is-disabled')).to.be.true;
  });

  it('should return true in .disabled after being disabled', function() {
    var el = createIconToggle();
    var toggle = new MaterialIconToggle(el);
    toggle.disabled = true;
    expect(toggle.disabled).to.be.true;
  });

  it('should return the label', function() {
    var el = createIconToggle();
    var toggle = new MaterialIconToggle(el);
    expect(toggle.label).to.satisfy(function(val) {
      return val == el.querySelector('.mdl-icon-toggle__label');
    });
  });
});
