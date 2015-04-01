/**
 * Class constructor for Checkbox WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialSwitch(element) {
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
MaterialSwitch.prototype.Constant_ = {
  TINY_TIMEOUT: 0.001
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialSwitch.prototype.CssClasses_ = {
  INPUT: 'wsk-switch__input',
  TRACK: 'wsk-switch__track',
  THUMB: 'wsk-switch__thumb',
  FOCUS_HELPER: 'wsk-switch__focus-helper',
  RIPPLE_EFFECT: 'wsk-js-ripple-effect',
  RIPPLE_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events',
  RIPPLE_CONTAINER: 'wsk-switch__ripple-container',
  RIPPLE_CENTER: 'wsk-ripple--center',
  RIPPLE: 'wsk-ripple',
  IS_FOCUSED: 'is-focused',
  IS_DISABLED: 'is-disabled',
  IS_CHECKED: 'is-checked'
};

/**
 * Handle change of state.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialSwitch.prototype.onChange_ = function(event) {
  'use strict';

  this.updateClasses_(this.btnElement_, this.element_);
};

/**
 * Handle focus of element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialSwitch.prototype.onFocus_ = function(event) {
  'use strict';

  this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle lost focus of element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialSwitch.prototype.onBlur_ = function(event) {
  'use strict';

  this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle mouseup.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialSwitch.prototype.onMouseUp_ = function(event) {
  'use strict';

  this.blur_();
};

/**
 * Handle class updates.
 * @param {HTMLElement} button The button whose classes we should update.
 * @param {HTMLElement} label The label whose classes we should update.
 * @private
 */
MaterialSwitch.prototype.updateClasses_ = function(button, label) {
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
MaterialSwitch.prototype.blur_ = function(event) {
  'use strict';

  // TODO: figure out why there's a focus event being fired after our blur,
  // so that we can avoid this hack.
  window.setTimeout(function() {
    this.btnElement_.blur();
  }.bind(this), this.Constant_.TINY_TIMEOUT);
};

// Public methods.

/**
 * Disable switch.
 * @public
 */
MaterialSwitch.prototype.disable = function() {
  'use strict';

  this.btnElement_.disabled = true;
  this.updateClasses_();
};

/**
 * Enable switch.
 * @public
 */
MaterialSwitch.prototype.enable = function() {
  'use strict';

  this.btnElement_.disabled = false;
  this.updateClasses_();
};

/**
 * Activate switch.
 * @public
 */
MaterialSwitch.prototype.on = function() {
  'use strict';

  this.btnElement_.checked = true;
  this.updateClasses_();
};

/**
 * Deactivate switch.
 * @public
 */
MaterialSwitch.prototype.off = function() {
  'use strict';

  this.btnElement_.checked = false;
  this.updateClasses_();
};

/**
 * Initialize element.
 */
MaterialSwitch.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.btnElement_ = this.element_.querySelector('.' +
        this.CssClasses_.INPUT);

    var track = document.createElement('div');
    track.classList.add(this.CssClasses_.TRACK);

    var thumb = document.createElement('div');
    thumb.classList.add(this.CssClasses_.THUMB);

    var focusHelper = document.createElement('span');
    focusHelper.classList.add(this.CssClasses_.FOCUS_HELPER);

    thumb.appendChild(focusHelper);

    this.element_.appendChild(track);
    this.element_.appendChild(thumb);

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
      rippleContainer.addEventListener('mouseup', this.onMouseUp_.bind(this));

      var ripple = document.createElement('span');
      ripple.classList.add(this.CssClasses_.RIPPLE);

      rippleContainer.appendChild(ripple);
      this.element_.appendChild(rippleContainer);
    }

    this.btnElement_.addEventListener('change', this.onChange_.bind(this));
    this.btnElement_.addEventListener('focus', this.onFocus_.bind(this));
    this.btnElement_.addEventListener('blur', this.onBlur_.bind(this));
    this.element_.addEventListener('mouseup', this.onMouseUp_.bind(this));

    this.updateClasses_(this.btnElement_, this.element_);
    this.element_.classList.add('is-upgraded');
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialSwitch,
  classAsString: 'MaterialSwitch',
  cssClass: 'wsk-js-switch'
});
