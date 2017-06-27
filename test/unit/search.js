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

describe('MaterialSearch', function () {

  function createSearch() {
    var container = document.createElement('div');
    var input = document.createElement('input');
    var dropdown = document.createElement('ul');
    var leftIcon = document.createElement('label');
    var rightIcon = document.createElement('label');
    container.className = 'mdl-search mdl-js-search';
    input.className = 'mdl-search__input';
    dropdown.className = 'mdl-search__dropdown';
    leftIcon.className = 'mdl-search__left-icon';
    leftIcon.innerHTML = '<i class="material-icons">search</i>';
    rightIcon.className = 'mdl-search__right-icon';
    rightIcon.innerHTML = '<i class="material-icons">mic</i>';
    container.appendChild(leftIcon);
    container.appendChild(rightIcon);
    container.appendChild(input);
    container.appendChild(dropdown);
    return container;
  };

  function createSearchWithSuggestions() {
    var container = createSearch();
    var dropdown = container.querySelector('.mdl-search__dropdown');
    var item = document.createElement('li');
    item.className = 'mdl-search__item';
    item.innerHTML = 'Item 1';
    dropdown.appendChild(item);
    return container;
  }

  it('should be globally available', function () {
    expect(MaterialSearch).to.be.a('function');
  });

  it('should upgrade successfully', function () {
    var el = createSearch();
    componentHandler.upgradeElement(el, 'MaterialSearch');
    expect($(el)).to.have.data('upgraded', ',MaterialSearch');
  });

  it('should be a widget', function () {
    var el = createSearch();
    componentHandler.upgradeElement(el, 'MaterialSearch');
    expect(el.MaterialSearch).to.be.a('object');
  });

  it('should have public methods available via widget', function () {
    var el = createSearch();
    componentHandler.upgradeElement(el, 'MaterialSearch');
    var methods = [
      'checkDisabled',
      'checkDirty',
      'checkFocus',
      'disable',
      'enable',
      'change',
      'focus',
      'blur',
      'show',
      'hide',
      'toggle',
      'redraw',
      'createItem',
      'createItems',
      'setSuggestions'
    ];
    methods.forEach(function(item) {
      expect(el.MaterialSearch[item]).to.be.a('function');
    });
  });

  describe ('visibility API', function () {
    var el;
    var dropdown;

    before(function() {
      el = createSearchWithSuggestions();
      dropdown = el.querySelector('.mdl-search__dropdown');
      componentHandler.upgradeElement(el, 'MaterialSearch');
    });

    it('should show the dropdown on show()', function () {
      expect($(dropdown.parentElement)).to.not.have.class('is-visible');
      el.MaterialSearch.show();
      expect($(dropdown.parentElement)).to.have.class('is-visible');
    });

    it('should hide the dropdown on hide()', function () {
      expect($(dropdown.parentElement)).to.have.class('is-visible');
      el.MaterialSearch.hide();
      expect($(dropdown.parentElement)).to.not.have.class('is-visible');
    });

    it('should show the dropdown on toggle() when invisible', function () {
      expect($(dropdown.parentElement)).to.not.have.class('is-visible');
      el.MaterialSearch.toggle();
      expect($(dropdown.parentElement)).to.have.class('is-visible');
    });

    it('should hide the dropdown on toggle() when visible', function () {
      expect($(dropdown.parentElement)).to.have.class('is-visible');
      el.MaterialSearch.toggle();
      expect($(dropdown.parentElement)).to.not.have.class('is-visible');
    });

  });

  describe ('responsive icons', function () {
    var el;
    var input;

    before(function() {
      el = createSearch();
      input = el.querySelector('.mdl-search__input');
      componentHandler.upgradeElement(el, 'MaterialSearch');
    });

    it('should change the left icon to "back" when the input is focused', function () {
      var leftIcon = el.querySelector('.mdl-search__left-icon:not(.is-hidden)');
      expect(leftIcon.firstElementChild.innerHTML).to.equal('search');

      // Force the focus (HTMLEvent focus doesn't work here).
      el.MaterialSearch.focus(true);
      leftIcon = el.querySelector('.mdl-search__left-icon:not(.is-hidden)');
      expect(leftIcon.firstElementChild.innerHTML).to.equal('arrow_back');
    });

    it('should change the right icon to "clear" when the input is dirty', function () {
      var rightIcon = el.querySelector('.mdl-search__right-icon:not(.is-hidden)');
      expect(rightIcon.firstElementChild.innerHTML).to.equal('mic');

      el.MaterialSearch.change('test');
      rightIcon = el.querySelector('.mdl-search__right-icon:not(.is-hidden)');
      expect(rightIcon.firstElementChild.innerHTML).to.equal('clear');
    });

    it('should keep the left icon as "back" with dirty input and no focus', function () {
      var leftIcon = el.querySelector('.mdl-search__left-icon:not(.is-hidden)');
      expect(leftIcon.firstElementChild.innerHTML).to.equal('arrow_back');

      // Force the blur (HTMLEvent blur doesn't work here).
      el.MaterialSearch.blur();
      leftIcon = el.querySelector('.mdl-search__left-icon:not(.is-hidden)');
      expect(leftIcon.firstElementChild.innerHTML).to.equal('arrow_back');
    });

    it('should return the left and right icons to original when the input is empty', function () {
      var rightIcon = el.querySelector('.mdl-search__right-icon:not(.is-hidden)');
      expect(rightIcon.firstElementChild.innerHTML).to.equal('clear');

      el.MaterialSearch.change('');
      rightIcon = el.querySelector('.mdl-search__right-icon:not(.is-hidden)');
      expect(rightIcon.firstElementChild.innerHTML).to.equal('mic');
    });

  });

});
