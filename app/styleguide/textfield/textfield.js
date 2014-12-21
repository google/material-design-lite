/**
 * Class constructor for Textfield WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialTextfield(element) {
  'use strict';

  this.element_ = element;
  this.maxRows = this.Constant_.NO_MAX_ROWS;
  // Initialize instance.
  this.init();
}

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 * @private
 */
MaterialTextfield.prototype.Constant_ = {
  NO_MAX_ROWS: -1,
  MAX_ROWS_ATTRIBUTE: 'maxrows'
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialTextfield.prototype.CssClasses_ = {
  /**
   * Class names should use camelCase and be prefixed with the word "material"
   * to minimize conflict with 3rd party systems.
   */

  // TODO: Upgrade classnames in HTML / CSS / JS to use material prefix to
  // reduce conflict and convert to camelCase for consistency.
  WSK_TEXT_EXP_ICO_RIP_CONTAINER: 'wsk-textfield-expandable-icon__ripple__' +
      'container',

  WSK_JS_RIPPLE_EFFECT: 'wsk-js-ripple-effect',

  WSK_RIPPLE_CENTER: 'wsk-ripple--center',

  WSK_RIPPLE: 'wsk-ripple',

  IS_DIRTY: 'is-dirty'
};


/**
 * Handle upgrade of icon element.
 * @param {HTMLElement} iconElement HTML element to contain icon.
 * @private
 */
MaterialTextfield.prototype.expandableIcon_ = function(iconElement) {
  'use strict';

  if (!iconElement.getAttribute('data-upgraded')) {
    var container = document.createElement('span');
    container.classList.add(this.CssClasses_.WSK_TEXT_EXP_ICO_RIP_CONTAINER);
    container.classList.add(this.CssClasses_.WSK_JS_RIPPLE_EFFECT);
    container.classList.add(this.CssClasses_.WSK_RIPPLE_CENTER);

    var ripple = document.createElement('span');
    ripple.classList.add(this.CssClasses_.WSK_RIPPLE);
    container.appendChild(ripple);

    iconElement.appendChild(container);
    iconElement.setAttribute('data-upgraded', '');
  }
};


/**
 * Handle input being entered.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTextfield.prototype.onInputChange_ = function(event) {
  'use strict';

  if (event.target.value && event.target.value.length > 0) {
    event.target.classList.add(this.CssClasses_.IS_DIRTY);
  } else {
    event.target.classList.remove(this.CssClasses_.IS_DIRTY);
  }
};


/**
 * Handle input being entered.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTextfield.prototype.onKeyDown_ = function(event) {
  'use strict';

  var currentRowCount = event.target.value.split('\n').length;
  if (event.keyCode === 13) {
    if (currentRowCount >= this.maxRows) {
      event.preventDefault();
    }
  }
};


/**
 * Initialize element.
 */
MaterialTextfield.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var expandableIcons =
        document.querySelectorAll('.wsk-textfield-expandable-icon');
    for (var i = 0; i < expandableIcons.length; ++i) {
      this.expandableIcon_(expandableIcons[i]);
    }

    if (this.element_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE)) {
      this.maxRows = parseInt(this.element_.getAttribute(
          this.Constant_.MAX_ROWS_ATTRIBUTE), 10);
      if (isNaN(this.maxRows)) {
        console.log(
            'maxrows attribute provided, but wasn\'t a number: ' +
            this.maxRows);
        this.maxRows = this.Constant_.NO_MAX_ROWS;
      }
    }

    this.element_.addEventListener('input', this.onInputChange_.bind(this));
    if (this.maxRows !== this.Constant_.NO_MAX_ROWS) {
      // TODO: This should handle pasting multi line text.
      // Currently doesn't.
      this.element_.addEventListener('keydown', this.onKeyDown_.bind(this));
    }
  }
};


window.addEventListener('load', function() {
  'use strict';

  // On document ready, the component registers itself. It can assume
  // componentHandler is available in the global scope.
  componentHandler.register({
    constructor: MaterialTextfield,
    classAsString: 'MaterialTextfield',
    cssClass: 'wsk-js-textfield'
  });
});