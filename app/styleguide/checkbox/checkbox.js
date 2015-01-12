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
  WSK_CHECKBOX_INPUT: 'wsk-checkbox__input',

  WSK_CHECKBOX_BOX_OUTLINE: 'wsk-checkbox__box-outline',

  WSK_CHECKBOX_FOCUS_HELPER: 'wsk-checkbox__focus-helper',

  WSK_CHECKBOX_TICK_OUTLINE: 'wsk-checkbox__tick-outline',

  WSK_CHECKBOX_BOT_RIGHT: 'wsk-checkbox__bottom-right',

  WSK_CHECKBOX_BOT_LEFT: 'wsk-checkbox__bottom-left',

  WSK_CHECKBOX_BOTTOM: 'wsk-checkbox__bottom',

  WSK_CHECKBOX_TOP_LEFT: 'wsk-checkbox__top-left',

  WSK_CHECKBOX_TOP_RIGHT: 'wsk-checkbox__top-right',

  WSK_JS_RIPPLE_EFFECT: 'wsk-js-ripple-effect',

  WSK_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events',

  WSK_CHECKBOX_RIPPLE_CONTAINER: 'wsk-checkbox__ripple-container',

  WSK_RIPPLE_CENTER: 'wsk-ripple--center',

  WSK_RIPPLE: 'wsk-ripple',

  IS_FOCUSED: 'is-focused',

  IS_DISABLED: 'is-disabled',

  IS_CHECKED: 'is-checked'
};


/**
 * Handle change of state.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onChange_ = function(event) {
  'use strict';

  this.updateClasses_(this.btnElement_, this.element_);
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
MaterialCheckbox.prototype.updateClasses_ = function(button, label) {
  'use strict';

  if (button.disabled) {
    label.classList.add(this.CssClasses_.IS_DISABLED);
  } else {
    label.classList.remove(this.CssClasses_.IS_DISABLED);
  }

  if (button.checked) {
    label.classList.add(this.CssClasses_.IS_CHECKED);
  } else {
    label.classList.remove(this.CssClasses_.IS_CHECKED);
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
    this.btnElement_.blur();
  }.bind(this), this.Constant_.TINY_TIMEOUT);
};


/**
 * Initialize element.
 */
MaterialCheckbox.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.btnElement_ = this.element_.querySelector('.' +
        this.CssClasses_.WSK_CHECKBOX_INPUT);

    var boxOutline = document.createElement('span');
    boxOutline.classList.add(this.CssClasses_.WSK_CHECKBOX_BOX_OUTLINE);

    var tickContainer = document.createElement('span');
    tickContainer.classList.add(this.CssClasses_.WSK_CHECKBOX_FOCUS_HELPER);

    var tickOutline = document.createElement('span');
    tickOutline.classList.add(this.CssClasses_.WSK_CHECKBOX_TICK_OUTLINE);

    var bottomRight = document.createElement('span');
    bottomRight.classList.add(this.CssClasses_.WSK_CHECKBOX_BOT_RIGHT);

    var bottomLeft = document.createElement('span');
    bottomLeft.classList.add(this.CssClasses_.WSK_CHECKBOX_BOT_LEFT);

    var bottom = document.createElement('span');
    bottom.classList.add(this.CssClasses_.WSK_CHECKBOX_BOTTOM);

    var topLeft = document.createElement('span');
    topLeft.classList.add(this.CssClasses_.WSK_CHECKBOX_TOP_LEFT);

    var topRight = document.createElement('span');
    topRight.classList.add(this.CssClasses_.WSK_CHECKBOX_TOP_RIGHT);

    boxOutline.appendChild(tickOutline);
    boxOutline.appendChild(topLeft);
    boxOutline.appendChild(topRight);
    boxOutline.appendChild(bottomRight);
    boxOutline.appendChild(bottomLeft);
    boxOutline.appendChild(bottom);

    this.element_.appendChild(tickContainer);
    this.element_.appendChild(boxOutline);

    var rippleContainer;
    if (this.element_.classList.contains(
        this.CssClasses_.WSK_JS_RIPPLE_EFFECT)) {
      this.element_.classList.add(
          this.CssClasses_.WSK_JS_RIPPLE_EFFECT_IGNORE_EVENTS);
      rippleContainer = document.createElement('span');
      rippleContainer.classList.add(
          this.CssClasses_.WSK_CHECKBOX_RIPPLE_CONTAINER);
      rippleContainer.classList.add(this.CssClasses_.WSK_JS_RIPPLE_EFFECT);
      rippleContainer.classList.add(this.CssClasses_.WSK_RIPPLE_CENTER);

      var ripple = document.createElement('span');
      ripple.classList.add(this.CssClasses_.WSK_RIPPLE);

      rippleContainer.appendChild(ripple);
      this.element_.appendChild(rippleContainer);
    }

    this.btnElement_.addEventListener('change', this.onChange_.bind(this));

    this.btnElement_.addEventListener('focus', this.onFocus_.bind(this));

    this.btnElement_.addEventListener('blur', this.onBlur_.bind(this));

    this.element_.addEventListener('mouseup', this.onMouseUp_.bind(this));

    rippleContainer.addEventListener('mouseup', this.onMouseUp_.bind(this));

    this.updateClasses_(this.btnElement_, this.element_);
    this.element_.classList.add('is-upgraded');
  }
};


// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialCheckbox,
  classAsString: 'MaterialCheckbox',
  cssClass: 'wsk-js-checkbox'
});
