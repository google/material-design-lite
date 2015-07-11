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
 * Class constructor for Ripple MDL component.
 * Implements MDL component design pattern defined at:
 * https://github.com/jasonmayes/mdl-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialRipple(element) {
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
MaterialRipple.prototype.Constant_ = {
  INITIAL_SCALE: 'scale(0.0001, 0.0001)',
  INITIAL_SIZE: '1px',
  INITIAL_OPACITY: '0.4',
  FINAL_OPACITY: '0',
  FINAL_SCALE: ''
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialRipple.prototype.CssClasses_ = {
  RIPPLE_CENTER: 'mdl-ripple--center',
  RIPPLE_EFFECT_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
  RIPPLE: 'mdl-ripple',
  IS_PLACED: 'is-placed',
  IS_SCALED: 'is-scaled',
  IS_VISIBLE: 'is-visible'
};

/**
 * Handle mouse / finger down on element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRipple.prototype.downHandler_ = function(event) {
  'use strict';

  this.rippleElement_ = this.rippleEl_.parentNode.appendChild(this.rippleEl_.cloneNode());

  if (!this.rippleElement_.style.width && !this.rippleElement_.style.height) {
    var rect = this.element_.getBoundingClientRect();
    this.boundHeight = rect.height;
    this.boundWidth = rect.width;
    this.rippleSize_ = Math.sqrt(Math.pow(this.boundWidth, 2) +
        Math.pow(this.boundHeight, 2)) * 1.1;
    this.rippleElement_.style.width = this.rippleSize_ + 'px';
    this.rippleElement_.style.height = this.rippleSize_ + 'px';
  }

  this.rippleElement_.classList.add(this.CssClasses_.IS_VISIBLE);

  if (event.type === 'mousedown' && this.ignoringMouseDown_) {
    this.ignoringMouseDown_ = false;
  } else {
    if (event.type === 'touchstart') {
      this.ignoringMouseDown_ = true;
    }
    var frameCount = this.getFrameCount();
    if (frameCount > 0) {
      return;
    }
    this.setFrameCount(1);
    var bound = event.currentTarget.getBoundingClientRect();
    var x;
    var y;
    // Check if we are handling a keyboard click.
    if (event.clientX === 0 && event.clientY === 0) {
      x = Math.round(bound.width / 2);
      y = Math.round(bound.height / 2);
    } else {
      var clientX = event.clientX ? event.clientX : event.touches[0].clientX;
      var clientY = event.clientY ? event.clientY : event.touches[0].clientY;
      x = Math.round(clientX - bound.left);
      y = Math.round(clientY - bound.top);
    }
    this.setRippleXY(x, y);
    this.setRippleStyles(true);
    window.requestAnimationFrame(this.animFrameHandler.bind(this));
  }
};

/**
 * Handle mouse / finger up on element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRipple.prototype.upHandler_ = function(event) {
  'use strict';

  // Don't fire for the artificial "mouseup" generated by a double-click.
  if (event && event.detail !== 2) {
    this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE);
  }
  removeRipple(this.rippleElement_, this.CssClasses_.IS_VISIBLE);

  function removeRipple(elem, elemClass) {
    elem.classList.remove(elemClass);
    setTimeout(function() {
      elem.remove();
    }, 1300);
  }
};

/**
 * Initialize element.
 */
MaterialRipple.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var recentering =
        this.element_.classList.contains(this.CssClasses_.RIPPLE_CENTER);
    if (!this.element_.classList.contains(
        this.CssClasses_.RIPPLE_EFFECT_IGNORE_EVENTS)) {
      this.rippleEl_ = this.element_.querySelector('.' +
          this.CssClasses_.RIPPLE);
      this.frameCount_ = 0;
      this.rippleSize_ = 0;
      this.x_ = 0;
      this.y_ = 0;

      // Touch start produces a compat mouse down event, which would cause a
      // second ripples. To avoid that, we use this property to ignore the first
      // mouse down after a touch start.
      this.ignoringMouseDown_ = false;

      this.boundDownHandler = this.downHandler_.bind(this);
      this.element_.addEventListener('mousedown',
        this.boundDownHandler);
      this.element_.addEventListener('touchstart',
          this.boundDownHandler);

      this.boundUpHandler = this.upHandler_.bind(this);
      this.element_.addEventListener('mouseup', this.boundUpHandler);
      this.element_.addEventListener('mouseleave', this.boundUpHandler);
      this.element_.addEventListener('touchend', this.boundUpHandler);
      this.element_.addEventListener('blur', this.boundUpHandler);

      this.getFrameCount = function() {
        return this.frameCount_;
      };

      this.setFrameCount = function(fC) {
        this.frameCount_ = fC;
      };

      this.getRippleElement = function() {
        return this.rippleElement_;
      };

      this.setRippleXY = function(newX, newY) {
        this.x_ = newX;
        this.y_ = newY;
      };

      this.setRippleStyles = function(start) {
        if (this.rippleElement_ !== null) {
          if (recentering === false) {
            this.rippleElement_.style.marginLeft = -this.rippleSize_ / 2 - (this.boundWidth / 2 - this.x_) + 'px';
            this.rippleElement_.style.marginTop = -this.rippleSize_ / 2 - (this.boundHeight / 2 - this.y_) + 'px';
          } else {
            this.rippleElement_.style.marginLeft = -this.rippleSize_ / 2 + 'px';
            this.rippleElement_.style.marginTop = -this.rippleSize_ / 2 + 'px';
          }

          if (start) {
            this.rippleElement_.classList.remove(this.CssClasses_.IS_PLACED);
          } else {
            this.rippleElement_.classList.add(this.CssClasses_.IS_SCALED);
            this.rippleElement_.classList.add(this.CssClasses_.IS_PLACED);
            this.rippleElement_.style.marginLeft = -this.rippleSize_ / 2 + 'px';
            this.rippleElement_.style.marginTop = -this.rippleSize_ / 2 + 'px';
          }
        }
      };

      this.animFrameHandler = function() {
        if (this.frameCount_-- > 0) {
          window.requestAnimationFrame(this.animFrameHandler.bind(this));
        } else {
          this.setRippleStyles(false);
        }
      };
    }
  }
};

/*
* Downgrade the component
*/
MaterialRipple.prototype.mdlDowngrade_ = function() {
  'use strict';
  this.element_.removeEventListener('mousedown',
  this.boundDownHandler);
  this.element_.removeEventListener('touchstart',
      this.boundDownHandler);

  this.element_.removeEventListener('mouseup', this.boundUpHandler);
  this.element_.removeEventListener('mouseleave', this.boundUpHandler);
  this.element_.removeEventListener('touchend', this.boundUpHandler);
  this.element_.removeEventListener('blur', this.boundUpHandler);
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialRipple,
  classAsString: 'MaterialRipple',
  cssClass: 'mdl-js-ripple-effect',
  widget: false
});
