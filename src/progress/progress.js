/**
 * Class constructor for Progress WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialProgress(element) {
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
MaterialProgress.prototype.Constant_ = {
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialProgress.prototype.CssClasses_ = {
};

MaterialProgress.prototype.setProgress = function(p) {
  this.bar_.style.width = p+'%';
}

/**
 * Initialize element.
 */
MaterialProgress.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var el = document.createElement('div');
    this.element_.appendChild(el);
    this.bar_ = el;
    this.element_.classList.add('is-upgraded');
  }
};

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialProgress,
  classAsString: 'MaterialProgress',
  cssClass: 'wsk-js-progress'
});
