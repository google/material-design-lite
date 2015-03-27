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
  HEADER: 'wsk-layout__header',
  DRAWER: 'wsk-layout__drawer',
  CONTENT: 'wsk-layout__content',
  DRAWER_BTN: 'wsk-layout__drawer-button',

  JS_RIPPLE_EFFECT: 'wsk-js-ripple-effect',
  RIPPLE_CONTAINER: 'wsk-layout__tab-ripple-container',
  RIPPLE: 'wsk-ripple',
  RIPPLE_IGNORE_EVENTS: 'wsk-js-ripple-effect--ignore-events',

  HEADER_SEAMED: 'wsk-layout__header--seamed',
  HEADER_WATERFALL: 'wsk-layout__header--waterfall',
  HEADER_SCROLL: 'wsk-layout__header--scroll',

  FIXED_HEADER: 'wsk-layout--fixed-header',
  OBFUSCATOR: 'wsk-layout__obfuscator',

  TAB_BAR: 'wsk-layout__tab-bar',
  TAB_CONTAINER: 'wsk-layout__tab-bar-container',
  TAB: 'wsk-layout__tab',
  TAB_BAR_BUTTON: 'wsk-layout__tab-bar-button',
  TAB_BAR_LEFT_BUTTON: 'wsk-layout__tab-bar-left-button',
  TAB_BAR_RIGHT_BUTTON: 'wsk-layout__tab-bar-right-button',
  PANEL: 'wsk-layout__tab-panel',

  HAS_DRAWER_CLASS: 'has-drawer',
  SHADOW_CLASS: 'is-casting-shadow',
  COMPACT_CLASS: 'is-compact',
  SMALL_SCREEN_CLASS: 'is-small-screen',
  DRAWER_OPEN_CLASS: 'is-visible',
  ACTIVE_CLASS: 'is-active',
  UPGRADED_CLASS: 'is-upgraded'
};

/**
 * Handles scrolling on the content.
 * @private
 */
MaterialLayout.prototype.contentScrollHandler_ = function() {
  'use strict';

  if (this.content_.scrollTop > 0) {
    this.header_.classList.add(this.CssClasses_.SHADOW_CLASS);
    this.header_.classList.add(this.CssClasses_.COMPACT_CLASS);
  } else {
    this.header_.classList.remove(this.CssClasses_.SHADOW_CLASS);
    this.header_.classList.remove(this.CssClasses_.COMPACT_CLASS);
  }
};

/**
 * Handles changes in screen size.
 * @private
 */
MaterialLayout.prototype.screenSizeHandler_ = function() {
  'use strict';

  if (this.screenSizeMediaQuery_.matches) {
    this.element_.classList.add(this.CssClasses_.SMALL_SCREEN_CLASS);
  } else {
    this.element_.classList.remove(this.CssClasses_.SMALL_SCREEN_CLASS);
    // Collapse drawer (if any) when moving to a large screen size.
    if (this.drawer_) {
      this.drawer_.classList.remove(this.CssClasses_.DRAWER_OPEN_CLASS);
    }
  }
};

/**
 * Handles toggling of the drawer.
 * @param {Element} drawer The drawer container element.
 * @private
 */
MaterialLayout.prototype.drawerToggleHandler_ = function() {
  'use strict';

  this.drawer_.classList.toggle(this.CssClasses_.DRAWER_OPEN_CLASS);
};

/**
 * Reset tab state, dropping active classes
 * @private
 */
MaterialLayout.prototype.resetTabState_ = function(tabBar) {
  'use strict';

  for (var k = 0; k < tabBar.length; k++) {
    tabBar[k].classList.remove(this.CssClasses_.ACTIVE_CLASS);
  }
};

/**
 * Reset panel state, droping active classes
 * @private
 */
MaterialLayout.prototype.resetPanelState_ = function(panels) {
  'use strict';

  for (var j = 0; j < panels.length; j++) {
    panels[j].classList.remove(this.CssClasses_.ACTIVE_CLASS);
  }
};

/**
 * Initialize element.
 */
MaterialLayout.prototype.init = function() {
  'use strict';

  if (this.element_) {
    var container = document.createElement('div');
    container.classList.add('wsk-layout__container');
    this.element_.parentElement.insertBefore(container, this.element_);
    this.element_.parentElement.removeChild(this.element_);
    container.appendChild(this.element_);

    this.header_ = this.element_.querySelector('.' + this.CssClasses_.HEADER);
    this.drawer_ = this.element_.querySelector('.' + this.CssClasses_.DRAWER);
    this.tabBar_ = this.element_.querySelector('.' + this.CssClasses_.TAB_BAR);
    this.content_ = this.element_.querySelector('.' + this.CssClasses_.CONTENT);

    var mode = this.Mode_.STANDARD;

    // Keep an eye on screen size, and add/remove auxiliary class for styling
    // of small screens.
    this.screenSizeMediaQuery_ = window.matchMedia(this.Constant_.MAX_WIDTH);
    this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this));
    this.screenSizeHandler_();

    if (this.header_) {
      if (this.header_.classList.contains(this.CssClasses_.HEADER_SEAMED)) {
        mode = this.Mode_.SEAMED;
      } else if (this.header_.classList.contains(
          this.CssClasses_.HEADER_WATERFALL)) {
        mode = this.Mode_.WATERFALL;
      } else if (this.element_.classList.contains(
          this.CssClasses_.HEADER_SCROLL)) {
        mode = this.Mode_.SCROLL;
      }

      if (mode === this.Mode_.STANDARD) {
        this.header_.classList.add(this.CssClasses_.SHADOW_CLASS);
        if (this.tabBar_) {
          this.tabBar_.classList.add(this.CssClasses_.SHADOW_CLASS);
        }
      } else if (mode === this.Mode_.SEAMED || mode === this.Mode_.SCROLL) {
        this.header_.classList.remove(this.CssClasses_.SHADOW_CLASS);
        if (this.tabBar_) {
          this.tabBar_.classList.remove(this.CssClasses_.SHADOW_CLASS);
        }
      } else if (mode === this.Mode_.WATERFALL) {
        // Add and remove shadows depending on scroll position.
        // Also add/remove auxiliary class for styling of the compact version of
        // the header.
        this.content_.addEventListener('scroll',
            this.contentScrollHandler_.bind(this));
        this.contentScrollHandler_();
      }
    }

    // Add drawer toggling button to our layout, if we have an openable drawer.
    if (this.drawer_) {
      var drawerButton = document.createElement('div');
      drawerButton.classList.add(this.CssClasses_.DRAWER_BTN);
      drawerButton.addEventListener('click',
          this.drawerToggleHandler_.bind(this));

      // Add a class if the layout has a drawer, for altering the left padding.
      // Adds the HAS_DRAWER_CLASS to the elements since this.header_ may or may
      // not be present.
      this.element_.classList.add(this.CssClasses_.HAS_DRAWER_CLASS);

      // If we have a fixed header, add the button to the header rather than
      // the layout.
      if (this.element_.classList.contains(this.CssClasses_.FIXED_HEADER)) {
        this.header_.insertBefore(drawerButton, this.header_.firstChild);
      } else {
        this.element_.insertBefore(drawerButton, this.content_);
      }

      var obfuscator = document.createElement('div');
      obfuscator.classList.add(this.CssClasses_.OBFUSCATOR);
      this.element_.appendChild(obfuscator);
      obfuscator.addEventListener('click',
          this.drawerToggleHandler_.bind(this));
    }

    // Initialize tabs, if any.
    if (this.tabBar_) {
      var tabContainer = document.createElement('div');
      tabContainer.classList.add(this.CssClasses_.TAB_CONTAINER);
      this.element_.insertBefore(tabContainer, this.tabBar_);
      this.element_.removeChild(this.tabBar_);

      var leftButton = document.createElement('div');
      leftButton.classList.add(this.CssClasses_.TAB_BAR_BUTTON);
      leftButton.classList.add(this.CssClasses_.TAB_BAR_LEFT_BUTTON);
      leftButton.addEventListener('click', function() {
        this.tabBar_.scrollLeft -= 100;
      }.bind(this));

      var rightButton = document.createElement('div');
      rightButton.classList.add(this.CssClasses_.TAB_BAR_BUTTON);
      rightButton.classList.add(this.CssClasses_.TAB_BAR_RIGHT_BUTTON);
      rightButton.addEventListener('click', function() {
        this.tabBar_.scrollLeft += 100;
      }.bind(this));

      tabContainer.appendChild(leftButton);
      tabContainer.appendChild(this.tabBar_);
      tabContainer.appendChild(rightButton);

      // Add and remove buttons depending on scroll position.
      var tabScrollHandler = function() {
        if (this.tabBar_.scrollLeft > 0) {
          leftButton.classList.add(this.CssClasses_.ACTIVE_CLASS);
        } else {
          leftButton.classList.remove(this.CssClasses_.ACTIVE_CLASS);
        }

        if (this.tabBar_.scrollLeft <
            this.tabBar_.scrollWidth - this.tabBar_.offsetWidth) {
          rightButton.classList.add(this.CssClasses_.ACTIVE_CLASS);
        } else {
          rightButton.classList.remove(this.CssClasses_.ACTIVE_CLASS);
        }
      }.bind(this);

      this.tabBar_.addEventListener('scroll', tabScrollHandler);
      tabScrollHandler();

      if (this.tabBar_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)) {
        this.tabBar_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
      }

      // Select element tabs, document panels
      var tabs = this.tabBar_.querySelectorAll('.' + this.CssClasses_.TAB);
      var panels = this.content_.querySelectorAll('.' + this.CssClasses_.PANEL);

      // Create new tabs for each tab element
      for (var i = 0; i < tabs.length; i++) {
        new MaterialLayoutTab(tabs[i], tabs, panels, this);
      }
    }

    this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS);
  }
};

function MaterialLayoutTab(tab, tabs, panels, layout) {
  'use strict';

  if (tab) {
    if (layout.tabBar_.classList.contains(
        layout.CssClasses_.JS_RIPPLE_EFFECT)) {
      var rippleContainer = document.createElement('span');
      rippleContainer.classList.add(layout.CssClasses_.RIPPLE_CONTAINER);
      rippleContainer.classList.add(layout.CssClasses_.JS_RIPPLE_EFFECT);
      var ripple = document.createElement('span');
      ripple.classList.add(layout.CssClasses_.RIPPLE);
      rippleContainer.appendChild(ripple);
      tab.appendChild(rippleContainer);
    }

    tab.addEventListener('click', function(e) {
      e.preventDefault();
      var href = tab.href.split('#')[1];
      var panel = layout.content_.querySelector('#' + href);
      layout.resetTabState_(tabs);
      layout.resetPanelState_(panels);
      tab.classList.add(layout.CssClasses_.ACTIVE_CLASS);
      panel.classList.add(layout.CssClasses_.ACTIVE_CLASS);
    });

  }
}

// The component registers itself. It can assume componentHandler is available
// in the global scope.
componentHandler.register({
  constructor: MaterialLayout,
  classAsString: 'MaterialLayout',
  cssClass: 'wsk-js-layout'
});
