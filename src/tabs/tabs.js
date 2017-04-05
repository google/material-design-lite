/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function() {
  'use strict';

  /**
   * Class constructor for Tabs MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {Element} element The element that will be upgraded.
   */
  var MaterialTabs = function MaterialTabs(element) {
    // Stores the HTML element.
    this.element_ = element;

    // Initialize instance.
    this.init();
  };
  window['MaterialTabs'] = MaterialTabs;

  /**
   * Store constants in one place so they can be updated easily.
   *
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
   *
   * @enum {string}
   * @private
   */
  MaterialTabs.prototype.CssClasses_ = {
    TAB_CLASS: 'mdl-tabs__tab',
    PANEL_CLASS: 'mdl-tabs__panel',
    ACTIVE_CLASS: 'is-active',
    UPGRADED_CLASS: 'is-upgraded',

    MDL_JS_RIPPLE_EFFECT: 'mdl-js-ripple-effect',
    MDL_RIPPLE_CONTAINER: 'mdl-tabs__ripple-container',
    MDL_RIPPLE: 'mdl-ripple',
    MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
    TAB_BAR_CLASS: 'mdl-tabs__tab-bar'
  };

  /**
     * Keycodes, for code readability.
     *
     * @enum {number}
     * @private
     */
  MaterialTabs.prototype.Keycodes_ = {
      LEFT_ARROW: 37,
      RIGHT_ARROW: 39
    };

  /**
     * Handles a keyboard navigation events on the drawer.
     *
     * @param {Event} evt The event that fired.
     * @private
     */
  MaterialTabs.prototype.handleTabKeyboardEvent_ = function(evt) {
      // Only react when left or right arrow pressed and tabs exist.
      if ((evt.keyCode === this.Keycodes_.LEFT_ARROW || evt.keyCode === this.Keycodes_.RIGHT_ARROW) && this.tabsBar_) {
        var currentIndex = Array.prototype.slice.call(this.tabs_).indexOf(evt.target);
        // Navigate tabs in tablist with left and right arrow keys.
        if (evt.keyCode === this.Keycodes_.LEFT_ARROW) {
          evt.preventDefault();
          if (0 < currentIndex) {
            // Give element focus and call click listener to activate panel.
            this.tabs_[currentIndex - 1].focus();
            this.tabs_[currentIndex - 1].click();
          } else {
            this.tabs_[this.tabs_.length - 1].focus();
            this.tabs_[this.tabs_.length - 1].click();
          }
        } else {
          evt.preventDefault();
          if (this.tabs_.length > currentIndex + 1) {
            this.tabs_[currentIndex + 1].focus();
            this.tabs_[currentIndex + 1].click();
          } else {
            this.tabs_[0].focus();
            this.tabs_[0].click();
          }
        }
      }
    };

  /**
   * Handle clicks to a tabs component
   *
   * @private
   */
  MaterialTabs.prototype.initTabs_ = function() {
    if (this.element_.classList.contains(this.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
      this.element_.classList.add(
        this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS);
    }

    // Select element tab_bar, tabs, document panels
    this.tabs_ = this.element_.querySelectorAll('.' + this.CssClasses_.TAB_CLASS);
    this.panels_ =
        this.element_.querySelectorAll('.' + this.CssClasses_.PANEL_CLASS);
    this.tabsBar_ =
        this.element_.querySelector('.'  + this.CssClasses_.TAB_BAR_CLASS);

    // Create new tabs for each tab element
    for (var i = 0; i < this.tabs_.length; i++) {
      new MaterialTab(this.tabs_[i], this);
    }

    this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS);

    this.tabsBar_.setAttribute('role', 'tablist');

    // Set attributes for newly created tabs.
    for (var ind = 0; ind < this.tabs_.length; ind++) {
      if (this.tabs_[ind].classList.contains(this.CssClasses_.ACTIVE_CLASS)) {
        this.tabs_[ind].setAttribute('aria-selected', 'true');
        this.tabs_[ind].setAttribute('tabindex', '0');
      } else {
        this.tabs_[ind].setAttribute('aria-selected', 'false');
        this.tabs_[ind].setAttribute('tabindex', '-1');
      }
      this.tabs_[ind].addEventListener('keydown', this.handleTabKeyboardEvent_.bind(this));
    }

    // Set attributes for newly created panels.
    for (var index = 0; index < this.panels_.length; index++) {
      this.panels_[index].setAttribute('role', 'tabpanel');
      var tabId = this.panels_[index].id + '-tab';
      this.panels_[index].setAttribute('aria-labelledby', tabId);
    }

  };

  /**
   * Reset tab state, dropping active classes
   *
   * @private
   */
  MaterialTabs.prototype.resetTabState_ = function() {
    for (var k = 0; k < this.tabs_.length; k++) {
      this.tabs_[k].classList.remove(this.CssClasses_.ACTIVE_CLASS);
      this.tabs_[k].setAttribute('aria-selected', 'false');
      this.tabs_[k].setAttribute('tabindex', '-1');
    }
  };

  /**
   * Reset panel state, droping active classes
   *
   * @private
   */
  MaterialTabs.prototype.resetPanelState_ = function() {
    for (var j = 0; j < this.panels_.length; j++) {
      this.panels_[j].classList.remove(this.CssClasses_.ACTIVE_CLASS);
    }
  };

  /**
   * Initialize element.
   */
  MaterialTabs.prototype.init = function() {
    if (this.element_) {
      this.initTabs_();
    }
  };

  /**
   * Constructor for an individual tab.
   *
   * @constructor
   * @param {Element} tab The HTML element for the tab.
   * @param {MaterialTabs} ctx The MaterialTabs object that owns the tab.
   */
  function MaterialTab(tab, ctx) {
    if (tab) {

      tab.setAttribute('role', 'tab');

      if (ctx.element_.classList.contains(ctx.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
        var rippleContainer = document.createElement('span');
        rippleContainer.classList.add(ctx.CssClasses_.MDL_RIPPLE_CONTAINER);
        rippleContainer.classList.add(ctx.CssClasses_.MDL_JS_RIPPLE_EFFECT);
        var ripple = document.createElement('span');
        ripple.classList.add(ctx.CssClasses_.MDL_RIPPLE);
        rippleContainer.appendChild(ripple);
        tab.appendChild(rippleContainer);
      }

      if (tab.getAttribute('href').charAt(0) === '#') {
        var href = tab.href.split('#')[1];
        var tabId = href + '-tab';
        tab.setAttribute('aria-controls', href);
        tab.setAttribute('id', tabId);

        tab.addEventListener('click', function(e) {
            e.preventDefault();
            var panel = ctx.element_.querySelector('#' + href);
            ctx.resetTabState_();
            ctx.resetPanelState_();
            tab.classList.add(ctx.CssClasses_.ACTIVE_CLASS);
            panel.classList.add(ctx.CssClasses_.ACTIVE_CLASS);
            tab.setAttribute('aria-selected', 'true');
            tab.setAttribute('tabindex', '0');
          });
      }

    }
  }

  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  componentHandler.register({
    constructor: MaterialTabs,
    classAsString: 'MaterialTabs',
    cssClass: 'mdl-js-tabs'
  });
})();
