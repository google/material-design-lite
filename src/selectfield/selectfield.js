/**
 * @license
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

/**
 * Class constructor for select dropdown MDL component.
 * Implements MDL component design pattern defined at:
 * https://github.com/jasonmayes/mdl-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialSelectfield(element) {
  'use strict';

  this.element_ = element;

  this.init();
}

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 * @private
 */
MaterialSelectfield.prototype.Constant_ = {
  // None for now.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialSelectfield.prototype.CssClasses_ = {
  SELECT: 'mdl-selectfield__select'
};

/**
 * Initialize element.
 */
MaterialSelectfield.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.select_ = this.element_.querySelector('.' + this.CssClasses_.SELECT);

    // create button to trigger the menu
    this.button_ = document.createElement('a');
    this.button_.classList.add('mdl-select__button');
    this.button_.classList.add('mdl-button');
    this.button_.classList.add('mdl-js-button');
    this.button_.innerHTML = this.select_.value;
    this.button_.addEventListener('click', this.clickMenu_.bind(this));

    // create menu
    this.menu_ = document.createElement('ul');
    this.menu_.classList.add('mdl-select__menu');
    this.menu_.classList.add('mdl-menu');
    this.menu_.classList.add('mdl-menu--bottom-left');
    this.menu_.classList.add('mdl-js-menu');
    this.menu_.classList.add('mdl-js-ripple-effect');

    var options = this.select_.querySelectorAll('option');
    for (var i = 0; i < options.length; i++) {
      var menuItem = document.createElement('li');
      menuItem.classList.add('mdl-menu__item');
      // menuItem.setAttribute('value', options[i].getAttribute('value'));
      menuItem.innerHTML = options[i].innerHTML;
      menuItem.addEventListener('click', this.clickMenuItem_.bind(this));
      this.menu_.appendChild(menuItem);
    }

    this.element_.appendChild(this.button_);
    this.element_.appendChild(this.menu_);

    componentHandler.upgradeElement(this.menu_, 'MaterialMenu');
  }
};

MaterialSelectfield.prototype.clickMenu_ = function(evt) {
  'use strict';

  this.menu_.MaterialMenu.show();
  var callback = function(e) {
    // Check to see if the document is processing the same event that
    // displayed the item in the first place. If so, do nothing.
    if (e !== evt) {
      document.removeEventListener('click', callback);
      this.menu_.MaterialMenu.hide();
    }
  }.bind(this);
  document.addEventListener('click', callback);
};

MaterialSelectfield.prototype.clickMenuItem_ = function(event) {
  'use strict';

  // change select to point to selected item (change index to index of menuItem inside menu)
  this.select_.selectedIndex = Array.prototype.indexOf.call(event.target.parentElement.childNodes, event.target);

  // get the option that has been chosen from our original select
  var option = this.select_.options[this.select_.selectedIndex];

  // set the buton text to the text of the selected option
  this.button_.innerHTML = option.innerHTML;
};

// The component registers itself. It can assume componentHandler is
// available in the global scope.
componentHandler.register({
  constructor: MaterialSelectfield,
  classAsString: 'MaterialSelectfield',
  cssClass: 'mdl-js-selectfield'
});
