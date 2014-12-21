/**
 * Class constructor for Item WSK component.
 * Implements WSK component design pattern defined at:
 * http://codepen.io/jasonmayes/pen/146b4483d870f79f4d33254311703ac2
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialItem(element) {
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
MaterialItem.prototype.Constant_ = {
  // None for now.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialItem.prototype.CssClasses_ = {
  /**
   * Class names should use camelCase and be prefixed with the word "material"
   * to minimize conflict with 3rd party systems.
   */

  // TODO: Upgrade classnames in HTML / CSS / JS to use material prefix to
  // reduce conflict and convert to camelCase for consistency.
  WSK_ITEM_RIPPLE_CONTAINER: 'wsk-item--ripple-container',

  WSK_RIPPLE: 'wsk-ripple'
};


/**
 * Initialize element.
 */
MaterialItem.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var rippleContainer = document.createElement('span');
    rippleContainer.classList.add(this.CssClasses_.WSK_ITEM_RIPPLE_CONTAINER);

    var ripple = document.createElement('span');
    ripple.classList.add(this.CssClasses_.WSK_RIPPLE);
    rippleContainer.appendChild(ripple);

    this.element_.appendChild(rippleContainer);
  }
};


window.addEventListener('load', function() {
  'use strict';

  // On document ready, the component registers itself. It can assume
  // componentHandler is available in the global scope.
  componentHandler.register({
    constructor: MaterialItem,
    classAsString: 'MaterialItem',
    cssClass: 'wsk-js-ripple-effect'
  });
});