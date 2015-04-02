/**
 * Class constructor for Checkbox WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialCheckbox(element) {
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
MaterialCheckbox.prototype.Constant_ = {
  TINY_TIMEOUT: 0.001
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialCheckbox.prototype.CssClasses_ = {
  INPUT: 'wsk-checkbox__input',
  BOX_OUTLINE: 'wsk-checkbox__box-outline',
  FOCUS_HELPER: 'wsk-checkbox__focus-helper',
  TICK_OUTLINE: 'wsk-checkbox__tick-outline',
  RIPPLE_EFFECT: 'wsk-js-ripple-effect',
  RIPPLE_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events',
  RIPPLE_CONTAINER: 'wsk-checkbox__ripple-container',
  RIPPLE_CENTER: 'wsk-ripple--center',
  RIPPLE: 'wsk-ripple',
  IS_FOCUSED: 'is-focused',
  IS_DISABLED: 'is-disabled',
  IS_CHECKED: 'is-checked',
  IS_UPGRADED: 'is-upgraded'
};

/**
 * Handle change of state.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onChange_ = function(event) {
  'use strict';

  this.updateClasses_();
};

/**
 * Handle focus of element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onFocus_ = function(event) {
  'use strict';

  this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle lost focus of element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onBlur_ = function(event) {
  'use strict';

  this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle mouseup.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onMouseUp_ = function(event) {
  'use strict';

  this.blur_();
};

/**
 * Handle class updates.
 * @param {HTMLElement} button The button whose classes we should update.
 * @param {HTMLElement} label The label whose classes we should update.
 * @private
 */
MaterialCheckbox.prototype.updateClasses_ = function() {
  'use strict';

  if (this.inputElement_.disabled) {
    this.element_.classList.add(this.CssClasses_.IS_DISABLED);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
  }

  if (this.inputElement_.checked) {
    this.element_.classList.add(this.CssClasses_.IS_CHECKED);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
  }
};

/**
 * Add blur.
 * @private
 */
MaterialCheckbox.prototype.blur_ = function(event) {
  'use strict';

  // TODO: figure out why there's a focus event being fired after our blur,
  // so that we can avoid this hack.
  window.setTimeout(function() {
    this.inputElement_.blur();
  }.bind(this), this.Constant_.TINY_TIMEOUT);
};

// Public methods.

/**
 * Disable checkbox.
 * @public
 */
MaterialCheckbox.prototype.disable = function() {
  'use strict';

  this.inputElement_.disabled = true;
  this.updateClasses_();
};

/**
 * Enable checkbox.
 * @public
 */
MaterialCheckbox.prototype.enable = function() {
  'use strict';

  this.inputElement_.disabled = false;
  this.updateClasses_();
};

/**
 * Check checkbox.
 * @public
 */
MaterialCheckbox.prototype.check = function() {
  'use strict';

  this.inputElement_.checked = true;
  this.updateClasses_();
};

/**
 * Uncheck checkbox.
 * @public
 */
MaterialCheckbox.prototype.uncheck = function() {
  'use strict';

  this.inputElement_.checked = false;
  this.updateClasses_();
};

/**
 * Initialize element.
 */
MaterialCheckbox.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.inputElement_ = this.element_.querySelector('.' +
        this.CssClasses_.INPUT);

    var boxOutline = document.createElement('span');
    boxOutline.classList.add(this.CssClasses_.BOX_OUTLINE);

    var tickContainer = document.createElement('span');
    tickContainer.classList.add(this.CssClasses_.FOCUS_HELPER);

    var tickOutline = document.createElement('span');
    tickOutline.classList.add(this.CssClasses_.TICK_OUTLINE);

    boxOutline.appendChild(tickOutline);

    this.element_.appendChild(tickContainer);
    this.element_.appendChild(boxOutline);

    var rippleContainer;
    if (this.element_.classList.contains(this.CssClasses_.RIPPLE_EFFECT)) {
      this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
      rippleContainer = document.createElement('span');
      rippleContainer.classList.add(this.CssClasses_.RIPPLE_CONTAINER);
      rippleContainer.classList.add(this.CssClasses_.RIPPLE_EFFECT);
      rippleContainer.classList.add(this.CssClasses_.RIPPLE_CENTER);
      rippleContainer.addEventListener('mouseup', this.onMouseUp_.bind(this));

      var ripple = document.createElement('span');
      ripple.classList.add(this.CssClasses_.RIPPLE);

      rippleContainer.appendChild(ripple);
      this.element_.appendChild(rippleContainer);
    }

    this.inputElement_.addEventListener('change', this.onChange_.bind(this));
    this.inputElement_.addEventListener('focus', this.onFocus_.bind(this));
    this.inputElement_.addEventListener('blur', this.onBlur_.bind(this));
    this.element_.addEventListener('mouseup', this.onMouseUp_.bind(this));

    this.updateClasses_();
    this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialCheckbox,
  classAsString: 'MaterialCheckbox',
  cssClass: 'wsk-js-checkbox'
});
