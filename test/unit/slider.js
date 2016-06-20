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

describe('MaterialSlider', function () {

  function createSlider() {
    var root = document.createElement('div');
    var input = document.createElement('input');
    var background = document.createElement('div');
    var upper = document.createElement('div');
    var lower = document.createElement('div');
    root.classList.add('mdl-slider');
    background.classList.add('mdl-slider__background');
    lower.classList.add('mdl-slider__background-lower');
    background.appendChild(lower);
    upper.classList.add('mdl-slider__background-upper');
    background.appendChild(upper);
    root.appendChild(background);
    input.type = 'range';
    input.min = 0;
    input.max = 100;
    input.classList.add('mdl-slider__input');
    root.appendChild(input);

    return root;
  }

  it('should be globally available', function() {
    expect(MaterialSlider).to.be.a('function');
  });

  it('should upgrade successfully', function() {
    var el = createSlider();
    var slider = new MaterialSlider(el);
    expect(slider).to.be.an.instanceof(MaterialSlider);
    expect(el.classList.contains('mdl-slider--is-upgraded')).to.be.true;
  });

  it('should build a valid DOM with no parameters', function() {
    var slider = new MaterialSlider();
    expect(slider).to.be.an.instanceof(MaterialSlider);
    expect(slider.root).to.be.an.instanceof(Element);
  });

  it('should get disabled class after being disabled', function() {
    var el = createSlider();
    var slider = new MaterialSlider(el);
    slider.disabled = true;
    expect(el.classList.contains('is-disabled')).to.be.true;
  });

  it('should return true in .disabled after being disabled', function() {
    var el = createSlider();
    var slider = new MaterialSlider(el);
    slider.disabled = true;
    expect(slider.disabled).to.be.true;
  });

  it('should set the value with .value', function() {
    var el = createSlider();
    var slider = new MaterialSlider(el);
    slider.value = 42;
    expect(el.querySelector('.mdl-slider__input').value).to.equal('42');
  });

  it('should return value in .value', function() {
    var el = createSlider();
    var slider = new MaterialSlider(el);
    el.querySelector('.mdl-slider__input').value = 42;
    expect(slider.value).to.equal('42');
  });
});
