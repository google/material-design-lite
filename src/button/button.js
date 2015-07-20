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
 * Class constructor for Button MDL component.
 * Implements MDL component design pattern defined at:
 * https://github.com/jasonmayes/mdl-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialButton(element) {
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
MaterialButton.prototype.Constant_ = {
  // None for now.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialButton.prototype.CssClasses_ = {
  RIPPLE_EFFECT: 'mdl-js-ripple-effect',
  RIPPLE_CONTAINER: 'mdl-button__ripple-container',
  RIPPLE: 'mdl-ripple'
};

/**
 * Handle blur of element.
 * @param {HTMLElement} element The instance of a button we want to blur.
 * @private
 */
MaterialButton.prototype.blurHandler = function(event) {
  'use strict';

  if (event) {
    this.element_.blur();
  }
};

// Public methods.

/**
 * Disable button.
 * @public
 */
MaterialButton.prototype.disable = function() {
  'use strict';

  this.element_.disabled = true;
};

/**
 * Enable button.
 * @public
 */
MaterialButton.prototype.enable = function() {
  'use strict';

  this.element_.disabled = false;
};

/**
 * Initialize element.
 */
MaterialButton.prototype.init = function() {
  'use strict';

  if (this.element_) {
    if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
      var rippleContainer = document.createElement('span');
      rippleContainer.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
      this.rippleElement_ = document.createElement('span');
      this.rippleElement_.classList.add(this.CssClasses_.RIPPLE);
      rippleContainer.appendChild(this.rippleElement_);
      this.boundRippleBlurHandler = this.blurHandler.bind(this);
      this.rippleElement_.addEventListener('mouseup', this.boundRippleBlurHandler);
      this.element_.appendChild(rippleContainer);
    }
    this.boundButtonBlurHandler = this.blurHandler.bind(this);
    this.element_.addEventListener('mouseup', this.boundButtonBlurHandler);
    this.element_.addEventListener('mouseleave', this.boundButtonBlurHandler);
  }
};

/**
 * Downgrade the element.
 */
MaterialButton.prototype.mdlDowngrade_ = function() {
  'use strict';
  if (this.rippleElement_) {
    this.rippleElement_.removeEventListener('mouseup', this.boundRippleBlurHandler);
  }
  this.element_.removeEventListener('mouseup', this.boundButtonBlurHandler);
  this.element_.removeEventListener('mouseleave', this.boundButtonBlurHandler);
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialButton,
  classAsString: 'MaterialButton',
  cssClass: 'mdl-js-button',
  widget: true
});
