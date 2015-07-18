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

<<<<<<< HEAD
(function() {
  'use strict';

  /**
   * Class constructor for Tooltip MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @param {HTMLElement} element The element that will be upgraded.
   */
  var MaterialTooltip = function MaterialTooltip(element) {
    this.element_ = element;

    // Initialize instance.
    this.init();
  };
  window.MaterialTooltip = MaterialTooltip;

  /**
   * Store constants in one place so they can be updated easily.
   *
   * @enum {String | Number}
   * @private
   */
  MaterialTooltip.prototype.Constant_ = {
    // None for now.
  };

  /**
   * Store strings for class names defined by this component that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {String}
   * @private
   */
  MaterialTooltip.prototype.CssClasses_ = {
    IS_ACTIVE: 'is-active'
  };

  /**
   * Handle mouseenter for tooltip.
   *
   * @param {Event} event The event that fired.
   * @private
   */
  MaterialTooltip.prototype.handleMouseEnter_ = function(event) {
    event.stopPropagation();
    var props = event.target.getBoundingClientRect();
    var left = props.left + (props.width / 2);
    var marginLeft = -1 * (this.element_.offsetWidth / 2);

=======
/**
 * Class constructor for Tooltip MDL component.
 * Implements MDL component design pattern defined at:
 * https://github.com/jasonmayes/mdl-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialTooltip(element) {
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
MaterialTooltip.prototype.Constant_ = {
  // None for now.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialTooltip.prototype.CssClasses_ = {
  IS_ACTIVE: 'is-active',
  BOTTOM: 'mdl-tooltip--bottom',
  LEFT: 'mdl-tooltip--left',
  RIGHT: 'mdl-tooltip--right',
  TOP: 'mdl-tooltip--top'
};

/**
 * Handle mouseenter for tooltip.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTooltip.prototype.handleMouseEnter_ = function(event) {
  'use strict';

  event.stopPropagation();
  var props = event.target.getBoundingClientRect();
  var left = props.left + (props.width / 2);
  var top = props.top + (props.height / 2);
  var marginLeft = -1 * (this.element_.offsetWidth / 2);
  var marginTop = -1 * (this.element_.offsetHeight / 2);

  if (this.element_.classList.contains(this.CssClasses_.LEFT) || this.element_.classList.contains(this.CssClasses_.RIGHT)) {
    if (top + marginTop < 0) {
      this.element_.style.top = 0;
      this.element_.style.marginTop = 0;
    } else {
      this.element_.style.top = top + 'px';
      this.element_.style.marginTop = marginTop + 'px';
    }
  } else {
>>>>>>> Tooltip positions
    if (left + marginLeft < 0) {
      this.element_.style.left = 0;
      this.element_.style.marginLeft = 0;
    } else {
      this.element_.style.left = left + 'px';
      this.element_.style.marginLeft = marginLeft + 'px';
<<<<<<< HEAD
=======
    }
  }

  if (this.element_.classList.contains(this.CssClasses_.TOP)) {
    this.element_.style.top = props.top - this.element_.offsetHeight - 10 + 'px';
  } else if (this.element_.classList.contains(this.CssClasses_.RIGHT)) {
    this.element_.style.left = props.left + props.width + 10 + 'px';
  } else if (this.element_.classList.contains(this.CssClasses_.LEFT)) {
    this.element_.style.left = props.left - this.element_.offsetWidth - 10 + 'px';
  } else {
    this.element_.style.top = props.top + props.height + 10 + 'px';
  }

  this.element_.classList.add(this.CssClasses_.IS_ACTIVE);
  window.addEventListener('scroll', this.boundMouseLeaveHandler, false);
  window.addEventListener('touchmove', this.boundMouseLeaveHandler, false);
};

/**
 * Handle mouseleave for tooltip.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTooltip.prototype.handleMouseLeave_ = function(event) {
  'use strict';

  event.stopPropagation();
  this.element_.classList.remove(this.CssClasses_.IS_ACTIVE);
  window.removeEventListener('scroll', this.boundMouseLeaveHandler);
  window.removeEventListener('touchmove', this.boundMouseLeaveHandler, false);
};

/**
 * Initialize element.
 */
MaterialTooltip.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var forElId = this.element_.getAttribute('for');

    if (forElId) {
      this.forElement_ = document.getElementById(forElId);
>>>>>>> Tooltip positions
    }

    this.element_.style.top = props.top + props.height + 10 + 'px';
    this.element_.classList.add(this.CssClasses_.IS_ACTIVE);
    window.addEventListener('scroll', this.boundMouseLeaveHandler, false);
    window.addEventListener('touchmove', this.boundMouseLeaveHandler, false);
  };

  /**
   * Handle mouseleave for tooltip.
   *
   * @param {Event} event The event that fired.
   * @private
   */
  MaterialTooltip.prototype.handleMouseLeave_ = function(event) {
    event.stopPropagation();
    this.element_.classList.remove(this.CssClasses_.IS_ACTIVE);
    window.removeEventListener('scroll', this.boundMouseLeaveHandler);
    window.removeEventListener('touchmove', this.boundMouseLeaveHandler, false);
  };

  /**
   * Initialize element.
   */
  MaterialTooltip.prototype.init = function() {

    if (this.element_) {
      var forElId = this.element_.getAttribute('for');

      if (forElId) {
        this.forElement_ = document.getElementById(forElId);
      }

      if (this.forElement_) {
        // Tabindex needs to be set for `blur` events to be emitted
        if (!this.forElement_.getAttribute('tabindex')) {
          this.forElement_.setAttribute('tabindex', '0');
        }

        this.boundMouseEnterHandler = this.handleMouseEnter_.bind(this);
        this.boundMouseLeaveHandler = this.handleMouseLeave_.bind(this);
        this.forElement_.addEventListener('mouseenter', this.boundMouseEnterHandler,
            false);
        this.forElement_.addEventListener('click', this.boundMouseEnterHandler,
            false);
        this.forElement_.addEventListener('blur', this.boundMouseLeaveHandler);
        this.forElement_.addEventListener('touchstart', this.boundMouseEnterHandler,
            false);
        this.forElement_.addEventListener('mouseleave', this.boundMouseLeaveHandler);
      }
    }
  };

  /**
   * Downgrade the component
   *
   * @private
   */
  MaterialTooltip.prototype.mdlDowngrade_ = function() {
    if (this.forElement_) {
      this.forElement_.removeEventListener('mouseenter', this.boundMouseEnterHandler, false);
      this.forElement_.removeEventListener('click', this.boundMouseEnterHandler, false);
      this.forElement_.removeEventListener('touchstart', this.boundMouseEnterHandler, false);
      this.forElement_.removeEventListener('mouseleave', this.boundMouseLeaveHandler);
    }
  };

  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  componentHandler.register({
    constructor: MaterialTooltip,
    classAsString: 'MaterialTooltip',
    cssClass: 'mdl-tooltip'
  });
})();
