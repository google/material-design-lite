/**
 * Class constructor for Column Layout WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialColumnLayout(element) {
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
MaterialColumnLayout.prototype.Constant_ = {
  INVISIBLE_WRAPPING_ELEMENT_COUNT: 3
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialColumnLayout.prototype.CssClasses_ = {
  /**
   * Class names should use camelCase and be prefixed with the word "material"
   * to minimize conflict with 3rd party systems.
   */

  // TODO: Upgrade classnames in HTML / CSS / JS to use material prefix to
  // reduce conflict and convert to camelCase for consistency.
  INVISIBLE_WRAPPING_ELEMENT: 'wsk-column-layout__wrap-hack'
};


/**
 * Initialize element.
 */
MaterialColumnLayout.prototype.init = function() {
  'use strict';

  if (this.element_) {
    // Add some hidden elements to make sure everything aligns correctly. See
    // CSS file for details.
    for (var j = 0; j < this.Constant_.INVISIBLE_WRAPPING_ELEMENT_COUNT ; j++) {
      var hiddenHackDiv = document.createElement('div');
      hiddenHackDiv.classList.add(this.CssClasses_.INVISIBLE_WRAPPING_ELEMENT);
      this.element_.appendChild(hiddenHackDiv);
    }
  }
};


//The component registers itself. It can assume componentHandler is available
//in the global scope.
componentHandler.register({
  constructor: MaterialColumnLayout,
  classAsString: 'MaterialColumnLayout',
  cssClass: 'wsk-column-layout'
});
