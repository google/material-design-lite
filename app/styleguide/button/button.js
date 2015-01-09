/**
 * Class constructor for Button WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
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
  WSK_JS_RIPPLE_EFFECT: 'wsk-js-ripple-effect',

  WSK_BUTTON_RIPPLE_CONTAINER: 'wsk-button__ripple-container',

  WSK_RIPPLE: 'wsk-ripple'
};


/**
 * Handle blur of element.
 * @param {HTMLElement} element The instance of a button we want to blur.
 * @private
 */
MaterialButton.prototype.blurHandlerGenerator_ = function(element) {
  'use strict';

  return function() {element.blur();};
};


/**
 * Initialize element.
 */
MaterialButton.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var blurHandler = this.blurHandlerGenerator_(this.element_);
    if (this.element_.classList.contains(
        this.CssClasses_.WSK_JS_RIPPLE_EFFECT)) {
      var rippleContainer = document.createElement('span');
      rippleContainer.classList.add(
          this.CssClasses_.WSK_BUTTON_RIPPLE_CONTAINER);
      var ripple = document.createElement('span');
      ripple.classList.add(this.CssClasses_.WSK_RIPPLE);
      rippleContainer.appendChild(ripple);
      ripple.addEventListener('mouseup', blurHandler);
      this.element_.appendChild(rippleContainer);
    }
    this.element_.addEventListener('mouseup', blurHandler);
  }
};


// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialButton,
  classAsString: 'MaterialButton',
  cssClass: 'wsk-js-button'
});
