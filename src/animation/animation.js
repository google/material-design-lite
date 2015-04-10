/**
 * Class constructor for Animation WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/mdl-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function DemoAnimation(element) {
  'use strict';

  this.element_ = element;
  this.position_ = this.Constant_.STARTING_POSITION;
  this.movable_ = this.element_.querySelector('.' + this.CssClasses_.MOVABLE);
  // Initialize instance.
  this.init();
}

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string | number}
 * @private
 */
DemoAnimation.prototype.Constant_ = {
  STARTING_POSITION: 1
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
DemoAnimation.prototype.CssClasses_ = {
  MOVABLE: 'demo-animation__movable',
  POSITION_PREFIX: 'demo-animation--position-'
};

/**
 * Handle click of element.
 * @param {Event} event The event that fired.
 * @private
 */
DemoAnimation.prototype.handleClick_ = function(event) {
  'use strict';

  this.movable_.classList.remove(this.CssClasses_.POSITION_PREFIX +
      this.position_);
  this.position_++;
  if (this.position_ > 6) {
    this.position_ = 1;
  }
  this.movable_.classList.add(this.CssClasses_.POSITION_PREFIX +
      this.position_);
};

/**
 * Initialize element.
 */
DemoAnimation.prototype.init = function() {
  'use strict';

  if (this.element_) {
    if (!this.movable_) {
      console.error('Was expecting to find an element with class name ' +
          this.CssClasses_.MOVABLE + ' inside of: ', this.element_);
      return;
    }

    this.element_.addEventListener('click', this.handleClick_.bind(this));
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: DemoAnimation,
  classAsString: 'DemoAnimation',
  cssClass: 'demo-js-animation'
});
