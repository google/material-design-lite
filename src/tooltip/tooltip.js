/**
 * Class constructor for Tooltip WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialTooltip(element) {
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
MaterialTooltip.prototype.Constant_ = {
  // None for now.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialTooltip.prototype.CssClasses_ = {
  IS_ACTIVE: 'is-active'
};


/**
 * Handle mouseenter for tooltip.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTooltip.prototype.handleMouseEnter_ = function(event) {
  'use strict';

  event.stopPropagation();
  var props = event.target.getBoundingClientRect();
  this.element_.style.left = props.left + (props.width / 2) + 'px';
  this.element_.style.marginLeft = -1 * (this.element_.offsetWidth / 2) + 'px';
  this.element_.style.top = props.top + props.height + 10 + 'px';
  this.element_.classList.add(this.CssClasses_.IS_ACTIVE);
};


/**
 * Handle mouseleave for tooltip.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTooltip.prototype.handleMouseLeave_ = function(event) {
  'use strict';

  event.stopPropagation();
  this.element_.classList.remove(this.CssClasses_.IS_ACTIVE);
};


/**
 * Initialize element.
 */
MaterialTooltip.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var forElId = this.element_.getAttribute('for');
    var forEl = null;

    if (forElId) {
      forEl = document.getElementById(forElId);
    }

    if (forEl) {
      forEl.addEventListener('mouseenter', this.handleMouseEnter_.bind(this),
          false);
      forEl.addEventListener('mouseleave', this.handleMouseLeave_.bind(this));
    }
  }
};


// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialTooltip,
  classAsString: 'MaterialTooltip',
  cssClass: 'wsk-tooltip'
});
