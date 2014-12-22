/**
 * Class constructor for Layout WSK component.
 * Implements WSK component design pattern defined at:
 * https://github.com/jasonmayes/wsk-component-design-pattern
 * @param {HTMLElement} element The element that will be upgraded.
 */
function MaterialLayout(element) {
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
MaterialLayout.prototype.Constant_ = {
  MAX_WIDTH: '(max-width: 850px)'
};


/**
 * Modes.
 * @enum {number}
 * @private
 */
MaterialLayout.prototype.Mode_ = {
  STANDARD: 0,
  SEAMED: 1,
  WATERFALL: 2,
  SCROLL: 3
};


/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 * @enum {string}
 * @private
 */
MaterialLayout.prototype.CssClasses_ = {
  /**
   * Class names should use camelCase and be prefixed with the word "material"
   * to minimize conflict with 3rd party systems.
   */

  // TODO: Upgrade classnames in HTML / CSS / JS to use material prefix to
  // reduce conflict and convert to camelCase for consistency.
  WSK_LAYOUT_HEADER: 'wsk-layout__header',

  WSK_LAYOUT_DRAWER: 'wsk-layout__drawer',

  WSK_LAYOUT_CONTENT: 'wsk-layout__content',

  WSK_LAYOUT_HEADER_SEAMED: 'wsk-layout__header--seamed',

  WSK_LAYOUT_HEADER_WATERFALL: 'wsk-layout__header--waterfall',

  WSK_LAYOUT_HEADER_SCROLL: 'wsk-layout__header--scroll',

  WSK_LAYOUT_DRAWER_BTN: 'wsk-layout__drawer-button',

  WSK_LAYOUT_FIXED_HEADER: 'wsk-layout--fixed-header',

  WSK_LAYOUT_OBFUSCATOR: 'wsk-layout__obfuscator',

  SHADOW_CLASS: 'is-casting-shadow',

  COMPACT_CLASS: 'is-compact',

  SMALL_SCREEN_CLASS: 'is-small-screen',

  DRAWER_OPEN_CLASS: 'is-visible'
};


/**
 * Generate a scroll handler function.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialLayout.prototype.scrollHandlerGenerator_ = function(header, content) {
  'use strict';

  return function() {
    if (content.scrollTop > 0) {
      header.classList.add(this.CssClasses_.SHADOW_CLASS);
      header.classList.add(this.CssClasses_.COMPACT_CLASS);
    } else {
      header.classList.remove(this.CssClasses_.SHADOW_CLASS);
      header.classList.remove(this.CssClasses_.COMPACT_CLASS);
    }
  }.bind(this);
};


/**
 * Generate a screenSize handler function.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialLayout.prototype.screenSizeHandlerGenerator_ =
    function(mediaQuery, layout, drawer) {
  'use strict';

  return function() {
    if (mediaQuery.matches) {
      layout.classList.add(this.CssClasses_.SMALL_SCREEN_CLASS);
    }
    else {
      layout.classList.remove(this.CssClasses_.SMALL_SCREEN_CLASS);
      // Collapse drawer (if any) when moving to a large screen size.
      if (drawer) {
        drawer.classList.remove(this.CssClasses_.DRAWER_OPEN_CLASS);
      }
    }
  }.bind(this);
};


/**
 * Generate a drawerToggle handler function.
 * @param {Event} event The event that fired.
 * @private
 */
MaterialLayout.prototype.drawerToggleHandlerGenerator_ =
    function(drawer) {
  'use strict';

  return function() {
    drawer.classList.toggle(this.CssClasses_.DRAWER_OPEN_CLASS);
  }.bind(this);
};


/**
 * Initialize element.
 */
MaterialLayout.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var header = this.element_.querySelector('.' +
        this.CssClasses_.WSK_LAYOUT_HEADER);
    var drawer = this.element_.querySelector('.' +
        this.CssClasses_.WSK_LAYOUT_DRAWER);
    var content = this.element_.querySelector('.' +
        this.CssClasses_.WSK_LAYOUT_CONTENT);

    var mode = this.Mode_.STANDARD;

    // Keep an eye on screen size, and add/remove auxiliary class for styling
    // of small screens.
    var mediaQuery = window.matchMedia(this.Constant_.MAX_WIDTH);
    var screenSizeHandler =
        this.screenSizeHandlerGenerator_(mediaQuery, this.element_,
        drawer).bind(this);
    mediaQuery.addListener(screenSizeHandler);
    screenSizeHandler();

    if (header) {
      if (header.classList.contains(
          this.CssClasses_.WSK_LAYOUT_HEADER_SEAMED)) {
        mode = this.Mode_.SEAMED;
      } else if (header.classList.contains(
          this.CssClasses_.WSK_LAYOUT_HEADER_WATERFALL)) {
        mode = this.Mode_.WATERFALL;
      } else if (this.element_.classList.contains(
          this.CssClasses_.WSK_LAYOUT_HEADER_SCROLL)) {
        mode = this.Mode_.SCROLL;
      }

      if (mode === this.Mode_.STANDARD) {
        header.classList.add(this.CssClasses_.SHADOW_CLASS);
      } else if (mode === this.Mode_.SEAMED || mode === this.Mode_.SCROLL) {
        header.classList.remove(this.CssClasses_.SHADOW_CLASS);
      } else if (mode === this.Mode_.WATERFALL) {
        // Add and remove shadows depending on scroll position.
        // Also add/remove auxiliary class for styling of the compact version of
        // the header.
        var scrollHandler = this.scrollHandlerGenerator_(header,
            content).bind(this);
        content.addEventListener('scroll', scrollHandler);
        scrollHandler();
      }
    }

    // Add drawer toggling button to our layout, if we have an openable drawer.
    if (drawer) {
      var drawerButton = document.createElement('div');
      drawerButton.classList.add(this.CssClasses_.WSK_LAYOUT_DRAWER_BTN);
      var clickHandler = this.drawerToggleHandlerGenerator_(drawer).bind(this);
      drawerButton.addEventListener('click', clickHandler);

      // If we have a fixed header, add the button to the header rather than
      // the layout.
      if (this.element_.classList.contains(
          this.CssClasses_.WSK_LAYOUT_FIXED_HEADER)) {
        header.insertBefore(drawerButton, header.firstChild);
      } else {
        this.element_.insertBefore(drawerButton, content);
      }

      var obfuscator = document.createElement('div');
      obfuscator.classList.add(this.CssClasses_.WSK_LAYOUT_OBFUSCATOR);
      this.element_.appendChild(obfuscator);
      obfuscator.addEventListener('click', clickHandler);
    }
  }
};


window.addEventListener('load', function() {
  'use strict';

  // On document ready, the component registers itself. It can assume
  // componentHandler is available in the global scope.
  componentHandler.register({
    constructor: MaterialLayout,
    classAsString: 'MaterialLayout',
    cssClass: 'wsk-js-layout'
  });
});