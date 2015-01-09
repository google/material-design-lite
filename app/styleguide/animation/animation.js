/**
 * Class constructor for Animation WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialAnimation(element) {
  'use strict';

  this.element_ = element;
  this.position_ = this.Constant_.STARTING_POSITION;
  this.moveable_ = this.element_.querySelector('.' +
      this.CssClasses_.DEMO_JS_MOVABLE_AREA);
  // Initialize instance.
  this.init();
}

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 * @private
 */
MaterialAnimation.prototype.Constant_ = {
  STARTING_POSITION: 1
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialAnimation.prototype.CssClasses_ = {
  DEMO_JS_MOVABLE_AREA: 'demo-js-movable-area',

  DEMO_POSITION_PREFIX: 'demo-position-'
};


/**
 * Handle click of element.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialAnimation.prototype.handleClick_ = function(event) {
  'use strict';

  this.moveable_.classList.remove(this.CssClasses_.DEMO_POSITION_PREFIX +
      this.position_);
  this.position_++;
  if (this.position_ > 6) {
    this.position_ = 1;
  }
  this.moveable_.classList.add(this.CssClasses_.DEMO_POSITION_PREFIX +
      this.position_);
};


/**
 * Initialize element.
 */
MaterialAnimation.prototype.init = function() {
  'use strict';

  if (this.element_) {
    if (!this.moveable_) {
      console.error('Was expecting to find an element with class ' +
          'name .demo-js-movable-area in side of: ', this.element_);
      return;
    }

    this.element_.addEventListener('click', this.handleClick_.bind(this));
  }
};


window.addEventListener('load', function() {
  'use strict';

  // On document ready, the component registers itself. It can assume
  // componentHandler is available in the global scope.
  componentHandler.register({
    constructor: MaterialAnimation,
    classAsString: 'MaterialAnimation',
    cssClass: 'demo-js-clickable-area'
  });
});
