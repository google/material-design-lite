/**
 * Class constructor for Radio WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
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
  STARTING_POSITION: 1
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialRadio.prototype.CssClasses_ = {
  /**
   * Class names should use camelCase and be prefixed with the word "material"
   * to minimize conflict with 3rd party systems.
   */

  // TODO: Upgrade classnames in HTML / CSS / JS to use material prefix to
  // reduce conflict and convert to camelCase for consistency.
  DEMO_JS_MOVABLE_AREA: 'demo-js-movable-area',

  DEMO_POSITION_PREFIX: 'demo-position-'
};


/**
 * Handle change of state.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRadio.prototype.onChange_ = function(event) {
  'use strict';

  this.updateClasses_(this.btnElement_, this.element_);

  // Since other radio buttons don't get change events, we need to look for
  // them to update their classes.
  var radios = document.querySelectorAll('.wsk-js-radio');
  for (var i = 0; i < radios.length; i++) {
    var button = radios[i].querySelector('.wsk-radio__button');
    // Different name == different group, so no point updating those.
    if (button.getAttribute('name') === this.btnElement_.getAttribute('name')) {
      this.updateClasses_(button, radios[i]);
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

  this.element_.classList.add('is-focused');
};


/**
 * Handle lost focus.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRadio.prototype.onBlur_ = function(event) {
  'use strict';

  this.element_.classList.remove('is-focused');
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
 * @param {HTMLElement} button The button whose classes we should update.
 * @param {HTMLElement} label The label whose classes we should update.
 * @private
 */
MaterialRadio.prototype.updateClasses_ = function(button, label) {
  'use strict';

  if (button.disabled) {
    label.classList.add('is-disabled');
  } else {
    label.classList.remove('is-disabled');
  }

  if (button.checked) {
    label.classList.add('is-checked');
  } else {
    label.classList.remove('is-checked');
  }
};


/**
 * Add blur.
 * @private
 */
MaterialRadio.prototype.blur_ = function(event) {
  'use strict';

  // TODO: figure out why there's a focus event being fired after our blur,
  // so that we can avoid this hack.
  window.setTimeout(function() { this.btnElement_.blur(); }, 0.001);
};


/**
 * Initialize element.
 */
MaterialRadio.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.btnElement_ = this.element_.querySelector('.wsk-radio__button');
    
    var outerCircle = document.createElement('span');
    outerCircle.classList.add('wsk-radio__outer-circle');

    var innerCircle = document.createElement('span');
    innerCircle.classList.add('wsk-radio__inner-circle');

    this.element_.appendChild(outerCircle);
    this.element_.appendChild(innerCircle);
    
    var rippleContainer;
    if (this.element_.classList.contains('wsk-js-ripple-effect')) {
      this.element_.classList.add('wsk-js-ripple-effect--ignore-events');
      rippleContainer = document.createElement('span');
      rippleContainer.classList.add('wsk-radio__ripple-container');
      rippleContainer.classList.add('wsk-js-ripple-effect');
      rippleContainer.classList.add('wsk-ripple--center');

      var ripple = document.createElement('span');
      ripple.classList.add('wsk-ripple');

      rippleContainer.appendChild(ripple);
      this.element_.appendChild(rippleContainer);
    }

    this.btnElement_.addEventListener('change', this.onChange_.bind(this));
    
    this.btnElement_.addEventListener('focus', this.onFocus_.bind(this));

    this.btnElement_.addEventListener('blur', this.onBlur_.bind(this));

    this.element_.addEventListener('mouseup', this.onMouseup_.bind(this));

    rippleContainer.addEventListener('mouseup', this.onMouseup_.bind(this));

    this.updateClasses_(this.btnElement_, this.element_);
    this.element_.classList.add('is-upgraded'); 
  }
};


window.addEventListener('load', function() {
  'use strict';

  // On document ready, the component registers itself. It can assume
  // componentHandler is available in the global scope.
  componentHandler.register({
    constructor: MaterialRadio,
    classAsString: 'MaterialRadio',
    cssClass: 'wsk-js-radio'
  });
});