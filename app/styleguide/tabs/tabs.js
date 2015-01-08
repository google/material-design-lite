/**
 * Class constructor for Tabs WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialTabs(element) {
  'use strict';

  // Stores the HTML element.
  this.element_ = element;

  // Initialize instance.
  this.init();
}

/**
 * Store constants in one place so they can be updated easily.
 * @enum {string}
 * @private
 */
MaterialTabs.prototype.Constant_ = {
  // None at the moment.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialTabs.prototype.CssClasses_ = {
  TAB_CLASS: 'wsk-tabs__tab',
  PANEL_CLASS: 'wsk-tabs__panel',
  ACTIVE_CLASS: 'is-active',
  UPGRADED_CLASS: 'is-upgraded',

  WSK_JS_RIPPLE_EFFECT: 'wsk-js-ripple-effect',
  WSK_RIPPLE_CONTAINER: 'wsk-tabs__ripple-container',
  WSK_RIPPLE: 'wsk-ripple',
  WSK_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events'
};

/**
 * Handle clicks to a tabs component
 * @private
 */
MaterialTabs.prototype.initTabs_ = function(e) {
  'use strict';

  if (this.element_.classList.contains(this.CssClasses_.WSK_JS_RIPPLE_EFFECT)) {
    this.element_.classList.add(
      this.CssClasses_.WSK_JS_RIPPLE_EFFECT_IGNORE_EVENTS);
  }

  // Select element tabs, document panels
  this.tabs_ = this.element_.querySelectorAll('.' + this.CssClasses_.TAB_CLASS);
  this.panels_ =
      this.element_.querySelectorAll('.' + this.CssClasses_.PANEL_CLASS);

  // Create new tabs for each tab element
  for (var i = 0; i < this.tabs_.length; i++) {
    new MaterialTab(this.tabs_[i], this);
  }

  this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS);
};

/**
 * Reset tab state, dropping active classes
 * @private
 */
MaterialTabs.prototype.resetTabState_ = function() {
  'use strict';

  for (var k = 0; k < this.tabs_.length; k++) {
    this.tabs_[k].classList.remove(this.CssClasses_.ACTIVE_CLASS);
  }
};

/**
 * Reset panel state, droping active classes
 * @private
 */
MaterialTabs.prototype.resetPanelState_ = function() {
  'use strict';

  for (var j = 0; j < this.panels_.length; j++) {
    this.panels_[j].classList.remove(this.CssClasses_.ACTIVE_CLASS);
  }
};

MaterialTabs.prototype.init = function() {
  'use strict';

  if (this.element_) {
    this.initTabs_();
  }
};

function MaterialTab(tab, ctx) {
  'use strict';

  if (tab) {
    if (ctx.element_.classList.contains(ctx.CssClasses_.WSK_JS_RIPPLE_EFFECT)) {
      var rippleContainer = document.createElement('span');
      rippleContainer.classList.add(ctx.CssClasses_.WSK_RIPPLE_CONTAINER);
      rippleContainer.classList.add(ctx.CssClasses_.WSK_JS_RIPPLE_EFFECT);
      var ripple = document.createElement('span');
      ripple.classList.add(ctx.CssClasses_.WSK_RIPPLE);
      rippleContainer.appendChild(ripple);
      tab.appendChild(rippleContainer);
    }

    tab.addEventListener('click', function(e) {
      e.preventDefault();
      var href = tab.href.split('#')[1];
      var panel = document.querySelector('#' + href);
      ctx.resetTabState_();
      ctx.resetPanelState_();
      tab.classList.add(ctx.CssClasses_.ACTIVE_CLASS);
      panel.classList.add(ctx.CssClasses_.ACTIVE_CLASS);
    });

  }
}

window.addEventListener('load', function() {
  'use strict';

  // On document ready, the component registers itself. It can assume
  // componentHandler is available in the global scope.
  componentHandler.register({
    constructor: MaterialTabs,
    classAsString: 'MaterialTabs',
    cssClass: 'wsk-js-tabs'
  });
});
