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
 * Class constructor for Radio MDL component.
 * Implements MDL component design pattern defined at:
 * https://github.com/jasonmayes/mdl-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialRadio(element) {
  'use strict';

  this.element_ = element;

  // Initialize instance.
  this.init();
}

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 * @private
 */
MaterialRadio.prototype.Constant_ = {
  TINY_TIMEOUT: 0.001
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialRadio.prototype.CssClasses_ = {
  IS_FOCUSED: 'is-focused',
  IS_DISABLED: 'is-disabled',
  IS_CHECKED: 'is-checked',
  IS_UPGRADED: 'is-upgraded',
  JS_RADIO: 'mdl-js-radio',
  RADIO_BTN: 'mdl-radio__button',
  RADIO_OUTER_CIRCLE: 'mdl-radio__outer-circle',
  RADIO_INNER_CIRCLE: 'mdl-radio__inner-circle',
  RIPPLE_EFFECT: 'mdl-js-ripple-effect',
  RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
  RIPPLE_CONTAINER: 'mdl-radio__ripple-container',
  RIPPLE_CENTER: 'mdl-ripple--center',
  RIPPLE: 'mdl-ripple'
};

/**
 * Handle change of state.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRadio.prototype.onChange_ = function(event) {
  'use strict';

  // Since other radio buttons don't get change events, we need to look for
  // them to update their classes.
  var radios = document.getElementsByClassName(this.CssClasses_.JS_RADIO);
  for (var i = 0; i < radios.length; i++) {
    var button = radios[i].querySelector('.' + this.CssClasses_.RADIO_BTN);
    // Different name == different group, so no point updating those.
    if (button.getAttribute('name') === this.btnElement_.getAttribute('name')) {
      radios[i].MaterialRadio.updateClasses_();
    }
  }
};

/**
 * Handle focus.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRadio.prototype.onFocus_ = function(event) {
  'use strict';

  this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle lost focus.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRadio.prototype.onBlur_ = function(event) {
  'use strict';

  this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle mouseup.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRadio.prototype.onMouseup_ = function(event) {
  'use strict';

  this.blur_();
};

/**
 * Update classes.
 * @private
 */
MaterialRadio.prototype.updateClasses_ = function() {
  'use strict';
  this.checkDisabled();
  this.checkToggleState();
};

/**
 * Add blur.
 * @private
 */
MaterialRadio.prototype.blur_ = function(event) {
  'use strict';

  // TODO: figure out why there's a focus event being fired after our blur,
  // so that we can avoid this hack.
  window.setTimeout(function() {
    this.btnElement_.blur();
  }.bind(this), this.Constant_.TINY_TIMEOUT);
};

// Public methods.

/**
* Check the components disabled state.
* @public
*/
MaterialRadio.prototype.checkDisabled = function() {
  'use strict';
  if (this.btnElement_.disabled) {
    this.element_.classList.add(this.CssClasses_.IS_DISABLED);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
  }
};

/**
* Check the components toggled state.
* @public
*/
MaterialRadio.prototype.checkToggleState = function() {
  'use strict';
  if (this.btnElement_.checked) {
    this.element_.classList.add(this.CssClasses_.IS_CHECKED);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
  }
};

/**
 * Disable radio.
 * @public
 */
MaterialRadio.prototype.disable = function() {
  'use strict';

  this.btnElement_.disabled = true;
  this.updateClasses_();
};

/**
 * Enable radio.
 * @public
 */
MaterialRadio.prototype.enable = function() {
  'use strict';

  this.btnElement_.disabled = false;
  this.updateClasses_();
};

/**
 * Check radio.
 * @public
 */
MaterialRadio.prototype.check = function() {
  'use strict';

  this.btnElement_.checked = true;
  this.updateClasses_();
};

/**
 * Uncheck radio.
 * @public
 */
MaterialRadio.prototype.uncheck = function() {
  'use strict';

  this.btnElement_.checked = false;
  this.updateClasses_();
};

/**
 * Initialize element.
 */
MaterialRadio.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.btnElement_ = this.element_.querySelector('.' +
        this.CssClasses_.RADIO_BTN);

    var outerCircle = document.createElement('span');
    outerCircle.classList.add(this.CssClasses_.RADIO_OUTER_CIRCLE);

    var innerCircle = document.createElement('span');
    innerCircle.classList.add(this.CssClasses_.RADIO_INNER_CIRCLE);

    this.element_.appendChild(outerCircle);
    this.element_.appendChild(innerCircle);

    var rippleContainer;
    if (this.element_.classList.contains(
        this.CssClasses_.RIPPLE_EFFECT)) {
      this.element_.classList.add(
          this.CssClasses_.RIPPLE_IGNORE_EVENTS);
      rippleContainer = document.createElement('span');
      rippleContainer.classList.add(
          this.CssClasses_.RIPPLE_CONTAINER);
      rippleContainer.classList.add(this.CssClasses_.RIPPLE_EFFECT);
      rippleContainer.classList.add(this.CssClasses_.RIPPLE_CENTER);
      rippleContainer.addEventListener('mouseup', this.onMouseup_.bind(this));

      var ripple = document.createElement('span');
      ripple.classList.add(this.CssClasses_.RIPPLE);

      rippleContainer.appendChild(ripple);
      this.element_.appendChild(rippleContainer);
    }

    this.btnElement_.addEventListener('change', this.onChange_.bind(this));
    this.btnElement_.addEventListener('focus', this.onFocus_.bind(this));
    this.btnElement_.addEventListener('blur', this.onBlur_.bind(this));
    this.element_.addEventListener('mouseup', this.onMouseup_.bind(this));

    this.updateClasses_();
    this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialRadio,
  classAsString: 'MaterialRadio',
  cssClass: 'mdl-js-radio',
  widget: true
});
