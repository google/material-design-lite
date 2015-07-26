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

  function createToggle() {
    var label = document.createElement('label');
    var input = document.createElement('input');
    var icon = document.createElement('i');
    label.className = 'mdl-icon-toggle mdl-js-icon-toggle';
    label.for = 'testIconToggle';
    input.id = label.for;
    input.type = 'checkbox';
    input.className = 'mdl-icon-toggle__input';
    label.appendChild(input);
    icon.className = 'mdl-icon-toggle__label material-icons';
    icon.text = 'format_bold';
    label.appendChild(icon);
    return label;
  };

  it('should be globally available', function () {
    expect(MaterialIconToggle).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var el = createToggle();
    componentHandler.upgradeElement(el, 'MaterialIconToggle');
    expect($(el)).to.have.data('upgraded', ',MaterialIconToggle');
  });

});
