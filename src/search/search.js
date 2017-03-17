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
   * Class constructor for Search MDL component.
   * Implements MDL component design pattern defined at:
   * https://github.com/jasonmayes/mdl-component-design-pattern
   *
   * @constructor
   * @param {HTMLElement} element The element that will be upgraded.
   */
  var MaterialSearch = function MaterialSearch(element) {
    this.element_ = element;
    // Initialize instance.
    this.init();
  };
  window['MaterialSearch'] = MaterialSearch;

  /**
   * Store constants in one place so they can be updated easily.
   *
   * @enum {string | number}
   * @private
   */
  MaterialSearch.prototype.Constant_ = {
    SEARCH_CBK_ATTRIBUTE: 'search',
    SUBMIT_CBK_ATTRIBUTE: 'submit',
    DEBOUNCE_TIMER_ATTRIBUTE: 'debounce',
    LEFT_ICON_ATTRIBUTE: 'left-icon',
    RIGHT_ICON_ATTRIBUTE: 'right-icon',
    LEFT_ICON_HTML: '<i class="material-icons">arrow_back</i>',
    RIGHT_ICON_HTML: '<i class="material-icons">clear</i>',
    // Total duration of the dropdown animation.
    TRANSITION_DURATION_SECONDS: 0.3,
    // The fraction of the total duration we want to use for dropdown item animations.
    TRANSITION_DURATION_FRACTION: 0.8,
    // How long the dropdown stays open after choosing an option (so the user can see
    // the ripple).
    CLOSE_TIMEOUT: 150
  };

  /**
   * Keycodes, for code readability.
   *
   * @enum {number}
   * @private
   */
  MaterialSearch.prototype.Keycodes_ = {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    UP_ARROW: 38,
    DOWN_ARROW: 40
  };

  /**
   * Store strings for class names defined by this component that are used in
   * JavaScript. This allows us to simply change it in one place should we
   * decide to modify at a later date.
   *
   * @enum {string}
   * @private
   */
  MaterialSearch.prototype.CssClasses_ = {
    INPUT: 'mdl-search__input',
    DROPDOWN: 'mdl-search__dropdown',
    DROPDOWN_CONTAINER: 'mdl-search__dropdown-container',
    DROPDOWN_OUTLINE: 'mdl-search__dropdown-outline',
    LEFT_ICON: 'mdl-search__left-icon',
    RIGHT_ICON: 'mdl-search__right-icon',
    ITEM: 'mdl-search__item',
    ITEM_ICON: 'mdl-search__item-icon',
    ITEM_RIPPLE_CONTAINER: 'mdl-search__item-ripple-container',
    RIPPLE_EFFECT: 'mdl-js-ripple-effect',
    RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
    RIPPLE: 'mdl-ripple',
    ENABLE_RIPPLE: 'mdl-search--ripple',
    ENABLE_ANIMATION: 'mdl-search--animate',
    // Statuses
    IS_ANIMATING: 'is-animating',
    IS_DIRTY: 'is-dirty',
    IS_DISABLED: 'is-disabled',
    IS_FOCUSED: 'is-focused',
    IS_HIDDEN: 'is-hidden',
    IS_ROTATED: 'is-rotated',
    IS_UPGRADED: 'is-upgraded',
    IS_VISIBLE: 'is-visible'
  };

  /**
   * Initialize element.
   */
  MaterialSearch.prototype.init = function() {
    if (this.element_) {
      // Gather element info.
      this.input_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
      this.dropdown_ = this.element_.querySelector('.' + this.CssClasses_.DROPDOWN);
      this.leftIcon_ = this.getElement_(this.element_, this.Constant_.LEFT_ICON_ATTRIBUTE, this.CssClasses_.LEFT_ICON);
      this.rightIcon_ = this.getElement_(this.element_, this.Constant_.RIGHT_ICON_ATTRIBUTE, this.CssClasses_.RIGHT_ICON);
      // Gather callback info.
      this.searchCallback_ = this.getFunction_(this.element_, this.Constant_.SEARCH_CBK_ATTRIBUTE);
      this.submitCallback_ = this.getFunction_(this.element_, this.Constant_.SUBMIT_CBK_ATTRIBUTE);
      this.debounceTimer_ = parseInt(this.element_.getAttribute(
        /** @type {string} */ (this.Constant_.DEBOUNCE_TIMER_ATTRIBUTE)), 10);
      if (this.debounceTimer_) {
        this.searchCallback_ = this.debounce_(this.searchCallback_, this.debounceTimer_);
        this.submitCallback_ = this.debounce_(this.submitCallback_, this.debounceTimer_);
      }
      // Setup listeners.
      this.boundSetSuggestions = this.setSuggestions.bind(this);
      this.element_.addEventListener('click', function() { this.focus(); }.bind(this));
      this.element_.addEventListener('focus', this.onFocus_.bind(this), true);
      this.element_.addEventListener('blur', this.onBlur_.bind(this), true);
      // Setup input element.
      if (this.input_) {
        this.value_ = this.input_.value;
        this.forElement_ = this.getForElement_(this.input_);
        this.input_.addEventListener('input', this.onInput_.bind(this));
        this.input_.addEventListener('keydown', this.onKeyDown_.bind(this));
        this.input_.addEventListener('click', this.onFocus_.bind(this));
        this.input_.addEventListener('reset', this.onReset_.bind(this));
      }
      // Setup dropdown element.
      if (this.dropdown_) {
        // Optional 'for' element to reposition the dropdown element.
        this.dropdownTarget_ = this.getForElement_(this.dropdown_);
        if (this.dropdownTarget_) {
          this.dropdownTarget_.appendChild(this.dropdown_);
        } else {
          this.dropdownTarget_ = this.dropdown_.parentElement;
        }
        // Copy left-icon attribute for custom item-icon styling.
        if (this.element_.hasAttribute('left-icon')) {
          this.dropdown_.setAttribute('left-icon', this.element_.getAttribute('left-icon'));
        }
        // Create container for the dropdown.
        var container = document.createElement('div');
        container.classList.add(this.CssClasses_.DROPDOWN_CONTAINER);
        this.dropdown_.parentElement.insertBefore(container, this.dropdown_);
        this.dropdown_.parentElement.removeChild(this.dropdown_);
        container.appendChild(this.dropdown_);
        this.dropdownContainer_ = container;
        if (this.dropdown_.classList.contains(this.CssClasses_.ENABLE_ANIMATION)) {
          this.dropdownContainer_.classList.add(this.CssClasses_.ENABLE_ANIMATION);
          this.boundRemoveAnimationEndListener_ = this.removeAnimationEndListener_.bind(this);
        }
        // Create outline for the dropdown (shadow and background).
        var outline = document.createElement('div');
        outline.classList.add(this.CssClasses_.DROPDOWN_OUTLINE);
        this.dropdownOutline_ = outline;
        container.insertBefore(outline, this.dropdown_);
        // Initialize the dropdown.
        this.dropdownSetSize_(0, null);
        if (!this.forElement_) {
          this.forElement_ = this.dropdown_;
        }
      }
      // Initialize the search suggestion target element.
      if (this.forElement_) {
        this.usingDropdown_ = this.forElement_ === this.dropdown_;
        this.boundItemClick_ = this.handleItemClick_.bind(this);
        this.boundItemKeydown_ = this.handleItemKeyboardEvent_.bind(this);
        this.forElement_.addEventListener('blur', this.onBlur_.bind(this), true);
        this.enableItems_();
      }
      // Initialize the left icon (search/back button).
      if (this.leftIcon_) {
        this.leftIconNew_ = this.leftIcon_.cloneNode(true);
        this.leftIconNew_.innerHTML = this.Constant_.LEFT_ICON_HTML;
        this.leftIconNew_.addEventListener('click', this.leftIconClick_.bind(this));
        this.leftIconNew_.classList.add(this.CssClasses_.IS_HIDDEN);
        this.leftIcon_.parentElement.appendChild(this.leftIconNew_);
        this.leftIconChanged_ = false;
      }
      // Initialize the right icon (mic/cancel button).
      if (this.rightIcon_) {
        this.rightIconNew_ = this.rightIcon_.cloneNode(true);
        this.rightIconNew_.innerHTML = this.Constant_.RIGHT_ICON_HTML;
        this.rightIconNew_.addEventListener('click', this.rightIconClick_.bind(this));
        this.rightIconNew_.classList.add(this.CssClasses_.IS_HIDDEN);
        this.rightIcon_.parentElement.appendChild(this.rightIconNew_);
        this.rightIconChanged_ = false;
      }
      // Activate the component.
      this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
      if (this.input_) {
        // Setup input classes/icons, call the search callback, and set autofocus.
        this.updateClasses_();
        if (this.searchCallback_) {
          this.searchCallback_.call(this, this.input_.value, this.boundSetSuggestions);
        }
        if (this.input_.hasAttribute('autofocus')) {
          this.input_.focus();
        }
      }
    }
  };

  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If `immediate` is passed, trigger the function on the
   * leading edge, instead of the trailing.
   *
   * @see https://davidwalsh.name/javascript-debounce-function
   * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
   * @param {Function} func Function to wrap.
   * @param {number} wait Timeout in ms.
   * @param {boolean=} immediate Whether to execute at the beginning (`false`).
   * @return {Function}
   * @private
   */
  MaterialSearch.prototype.debounce_ = function debounce(func, wait, immediate) {
    if (!func)  { return null; }
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      var callNow = immediate && !timeout;
      if (timeout)  { clearTimeout(timeout); }
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) { func.apply(context, args); }
      }, wait);
      if (callNow)  { func.apply(context, args); }
    };
  };

  /**
   * Return the matching function that is named in the given attribute.
   *
   * @param {Element} el The element to search.
   * @param {string|number} attribute The attribute to search for.
   * @return {Function}
   * @private
   */
  MaterialSearch.prototype.getFunction_ = function(el, attribute) {
    var str = el.getAttribute(/** @type {string} */ (attribute));
    return typeof window[str] === 'function' ? window[str] : null;
  };

  /**
   * Return any 'for' element attached to the given element.
   *
   * @param {Element} el The element to search.
   * @return {Element}
   * @private
   */
  MaterialSearch.prototype.getForElement_ = function(el) {
    var forElId = el.getAttribute('for') || el.getAttribute('data-mdl-for');
    return forElId ? document.getElementById(forElId) : null;
  };

  /**
   * Return the HTML element that is named in the given attribute or that has
   * the given CSS class.
   *
   * @param {Element} el The element to search.
   * @param {string|number} attribute The attribute to search for.
   * @param {string|number} cssClass The class to search for.
   * @return {Element}
   * @private
   */
  MaterialSearch.prototype.getElement_ = function(el, attribute, cssClass) {
    var id = el.getAttribute(/** @type {string} */ (attribute));
    return document.getElementById(id) || el.querySelector('.' + cssClass);
  };

  /**
   * Add listeners and classes to each dropdown item.
   *
   * @private
   */
  MaterialSearch.prototype.enableItems_ = function() {
    if (this.element_ && this.forElement_) {
      // Add listeners and tab indexes to each dropdown item.
      var items = this.forElement_.querySelectorAll('.' + this.CssClasses_.ITEM);
      for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('click', this.boundItemClick_);
        items[i].addEventListener('keydown', this.boundItemKeydown_);
        items[i].tabIndex = '-1';
      }
      // Add ripple classes to each item, if the user has enabled ripples.
      if (this.element_.classList.contains(this.CssClasses_.ENABLE_RIPPLE)) {
        // MaterialMenu used RIPPLE_EFFECT on the parent and then added the class below,
        // but that caused problems, so I switched to ENABLE_RIPPLE.
        // this.element_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
        for (i = 0; i < items.length; i++) {
          var item = items[i];
          var rippleContainer = document.createElement('span');
          rippleContainer.classList.add(this.CssClasses_.ITEM_RIPPLE_CONTAINER);
          var ripple = document.createElement('span');
          ripple.classList.add(this.CssClasses_.RIPPLE);
          rippleContainer.appendChild(ripple);
          item.appendChild(rippleContainer);
          item.classList.add(this.CssClasses_.RIPPLE_EFFECT);
        }
      }
      // Upgrade the elements.
      componentHandler.upgradeElements(this.forElement_);
    }
  };

  /**
   * Handle textfield input.
   *
   * @param {Event=} evt The event that fired.
   * @private
   */
  MaterialSearch.prototype.onInput_ = function(evt) {
    // Prevent 'phantom inputs' on mobile when the event loses focus (i.e. 'onchange').
    if (this.value_ === this.input_.value) {
      return this.updateClasses_();
    }
    this.value_ = this.input_.value;
    // Update classes and call the search callback.
    this.updateClasses_();
    if (this.searchCallback_) {
      this.searchCallback_.call(this, this.input_.value, this.boundSetSuggestions);
    }
  };

  /**
   * Handle a keyboard event on the input element.
   *
   * @param {Event} evt The event that fired.
   * @private
   */
  MaterialSearch.prototype.onKeyDown_ = function(evt) {
    if (this.forElement_) {
      // Handle showing/hiding the dropdown.
      if (this.usingDropdown_ && this.dropdownContainer_) {
        var isVisible = this.dropdownContainer_.classList.contains(this.CssClasses_.IS_VISIBLE);
        if (isVisible && evt.keyCode === this.Keycodes_.ESCAPE) {
          evt.preventDefault();
          return this.hide();
        } else if (!isVisible && (evt.keyCode === this.Keycodes_.UP_ARROW || evt.keyCode === this.Keycodes_.DOWN_ARROW)) {
          evt.preventDefault();
          return this.show();
        }
      }
      // Handle enter key.
      if (evt.keyCode === this.Keycodes_.ENTER) {
        evt.preventDefault();
        this.hide();
        this.submitCallback_.call(this, this.input_.value);
      }
      // Handle escape key.
      if (evt.keyCode === this.Keycodes_.ESCAPE) {
        evt.preventDefault();
        return this.input_.blur();
      }
      // Handle item navigation.
      var items = this.forElement_.querySelectorAll('.' + this.CssClasses_.ITEM + ':not([disabled])');
      if (items && items.length > 0) {
        if (evt.keyCode === this.Keycodes_.UP_ARROW) {
          evt.preventDefault();
          return items[items.length - 1].focus();
        } else if (evt.keyCode === this.Keycodes_.DOWN_ARROW) {
          evt.preventDefault();
          return items[0].focus();
        }
      }
    }
  };

  /**
   * Handle focus.
   *
   * @param {Event} evt The event that fired.
   * @private
   */
  MaterialSearch.prototype.onFocus_ = function(evt) {
    this.checkFocus();
  };

  /**
   * Handle lost focus.
   *
   * @param {Event} evt The event that fired.
   * @private
   */
  MaterialSearch.prototype.onBlur_ = function(evt) {
    // Delayed operation because blur occurs before the new focus is set.
    window.setTimeout(this.checkFocus.bind(this), 0);
  };

  /**
   * Handle reset event from out side.
   *
   * @param {Event} event The event that fired.
   * @private
   */
  MaterialSearch.prototype.onReset_ = function(event) {
    this.updateClasses_();
  };

  /**
   * Handle class updates.
   *
   * @private
   */
  MaterialSearch.prototype.updateClasses_ = function() {
    this.checkDisabled();
    this.checkDirty();
    this.checkFocus();
  };

  /**
   * Handle a keyboard event on an item.
   *
   * @param {Event} evt The event that fired.
   * @private
   */
  MaterialSearch.prototype.handleItemKeyboardEvent_ = function(evt) {
    if (this.forElement_ && this.input_) {
      // Only register item keypresses if the items are visible.
      if (this.usingDropdown_ && !this.dropdownContainer_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
        return;
      }
      var items = this.forElement_.querySelectorAll('.' + this.CssClasses_.ITEM + ':not([disabled])');
      if (items && items.length > 0) {
        var currentIndex = Array.prototype.slice.call(items).indexOf(evt.currentTarget);
        if (evt.keyCode === this.Keycodes_.UP_ARROW) {
          // Up: Navigate through menu.
          evt.preventDefault();
          if (currentIndex > 0) {
            items[currentIndex - 1].focus();
          } else {
            this.input_.focus();
          }
        } else if (evt.keyCode === this.Keycodes_.DOWN_ARROW) {
          // Down: Navigate through menu.
          evt.preventDefault();
          if (items.length > currentIndex + 1) {
            items[currentIndex + 1].focus();
          } else {
            this.input_.focus();
          }
        } else if (evt.keyCode === this.Keycodes_.ENTER) {
          // Enter: Simulate an item click (mousedown/mouseup to trigger ripple).
          evt.preventDefault();
          var e = new MouseEvent('mousedown');
          evt.currentTarget.dispatchEvent(e);
          e = new MouseEvent('mouseup');
          evt.currentTarget.dispatchEvent(e);
          evt.currentTarget.click();
        } else if (evt.keyCode === this.Keycodes_.ESCAPE) {
          // Escape: Hide and return focus to input.
          evt.preventDefault();
          this.input_.focus();
          this.hide();
        } else {
          // Redirect any other keypresses to the input element.
          this.input_.focus();
        }
      }
    }
  };

  /**
   * Handle a click event on an item.
   *
   * @param {Event} evt The event that fired.
   * @private
   */
  MaterialSearch.prototype.handleItemClick_ = function(evt) {
    // Ignore item clicks if the item is disabled.
    if (evt.currentTarget.hasAttribute('disabled')) {
      evt.stopPropagation();
    } else {
      // Wait some time before closing dropdown, so the user can see the ripple.
      this.closing_ = true;
      window.setTimeout(function(evt) {
        this.hide();
        this.input_.blur();
        this.closing_ = false;
      }.bind(this), /** @type {number} */ (this.Constant_.CLOSE_TIMEOUT));
      // Call the submit callback.
      if (this.submitCallback_) {
        // Get item index, if possible.
        var index;
        if (this.forElement_) {
          var items = this.forElement_.querySelectorAll('.' + this.CssClasses_.ITEM + ':not([disabled])');
          index = Array.prototype.slice.call(items).indexOf(evt.currentTarget);
        } else {
          index = null;
        }
        this.submitCallback_.call(this, evt.currentTarget, index);
      }
    }
  };

  /**
   * Handle a click event on the left icon.
   *
   * @param {Event} evt The event that fired.
   * @private
   */
  MaterialSearch.prototype.leftIconClick_ = function(evt) {
    // Activate the 'Back' action.
    evt.stopPropagation();
    this.input_.blur();
    this.change('');
  };

  /**
   * Handle a click event on the right icon.
   *
   * @param {Event} evt The event that fired.
   * @private
   */
  MaterialSearch.prototype.rightIconClick_ = function(evt) {
    // Activate the 'Cancel' action.
    evt.preventDefault();
    this.input_.focus();
    this.change('');
  };

  /**
   * Update the icons based on focus/dirty status.
   *
   * @private
   */
  MaterialSearch.prototype.iconUpdate_ = function() {
    // Gather state info.
    var classList = this.element_.classList;
    var isFocused = classList.contains(this.CssClasses_.IS_FOCUSED);
    var isDirty = classList.contains(this.CssClasses_.IS_DIRTY);
    // Left icon should turn into a back button if searchbox is focused or dirty.
    if (this.leftIcon_) {
      if (this.leftIconChanged_ && !(isFocused || isDirty)) {
        this.iconAnimation_(this.leftIconNew_, this.leftIcon_);
        this.leftIconChanged_ = false;
      } else if (!this.leftIconChanged_ && (isFocused || isDirty)) {
        this.iconAnimation_(this.leftIcon_, this.leftIconNew_);
        this.leftIconChanged_ = true;
      }
    }
    // Right icon should turn into a cancel button if searchbox is dirty.
    if (this.rightIcon_) {
      if (this.rightIconChanged_ && !isDirty) {
        this.iconAnimation_(this.rightIconNew_, this.rightIcon_);
        this.rightIconChanged_ = false;
      } else if (!this.rightIconChanged_ && isDirty) {
        this.iconAnimation_(this.rightIcon_, this.rightIconNew_);
        this.rightIconChanged_ = true;
      }
    }
  };

  /**
   * Animate the icon change, if icon animation is enabled.
   *
   * @param {Element} oldIcon Icon to hide.
   * @param {Element} newIcon Icon to show.
   * @private
   */
  MaterialSearch.prototype.iconAnimation_ = function(oldIcon, newIcon) {
    oldIcon.classList.toggle(this.CssClasses_.IS_HIDDEN);
    newIcon.classList.toggle(this.CssClasses_.IS_HIDDEN);
    // Rotate the icons, if animation is enabled.
    if (oldIcon.classList.contains(this.CssClasses_.ENABLE_ANIMATION)) {
      oldIcon.classList.toggle(this.CssClasses_.IS_ROTATED);
      newIcon.classList.toggle(this.CssClasses_.IS_ROTATED);
    }
  };

  /**
   * Set the container and outline to the specified size, and clip the inner
   * element.
   *
   * @param {number} height Height of the dropdown.
   * @param {number|null} width Width of the dropdown (null=auto).
   * @private
   */
  MaterialSearch.prototype.dropdownSetSize_ = function(height, width) {
    // Automatically determine the correct width, if it is not provided.
    width = width === null ? this.dropdownTarget_.getBoundingClientRect().width : width;
    this.dropdown_.style.width = width + 'px';
    this.dropdown_.style.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)';
    this.dropdownContainer_.style.height = height + 'px';
    this.dropdownContainer_.style.width = width + 'px';
    this.dropdownOutline_.style.height = height + 'px';
    this.dropdownOutline_.style.width = width + 'px';
  };

  /**
   * Animate the dropdown changing size, if animations are enabled.
   *
   * @param {number} height Height of the dropdown.
   * @param {number} width Width of the dropdown.
   * @param {number} heightOrig Starting height of the dropdown, for animation.
   * @private
   */
  MaterialSearch.prototype.dropdownAnimation_ = function(height, width, heightOrig) {
    if (height !== heightOrig && this.dropdown_.classList.contains(this.CssClasses_.ENABLE_ANIMATION)) {
      // Apply the initial clip to the text before we start animating.
      this.dropdownSetSize_(heightOrig, width);
      // Wait for the next frame, turn on animation, and apply the final clip.
      window.requestAnimationFrame(function() {
        this.dropdown_.classList.add(this.CssClasses_.IS_ANIMATING);
        this.dropdownSetSize_(height, width);
        this.dropdownContainer_.classList.add(this.CssClasses_.IS_VISIBLE);
      }.bind(this));
      // Clean up after the animation is complete.
      this.addAnimationEndListener_();
    } else {
      // Animated dropdowns that just need to change width go here too.
      this.dropdownSetSize_(height, width);
      this.dropdownContainer_.classList.add(this.CssClasses_.IS_VISIBLE);
    }
  };

  /**
   * Add an event listener to clean up after the animation ends.
   *
   * @private
   */
  MaterialSearch.prototype.addAnimationEndListener_ = function() {
    this.dropdown_.addEventListener('transitionend', this.boundRemoveAnimationEndListener_);
    this.dropdown_.addEventListener('webkitTransitionEnd', this.boundRemoveAnimationEndListener_);
  };

  /**
   * Cleanup function to remove animation listeners.
   *
   * @param {Event} evt
   * @private
   */
  MaterialSearch.prototype.removeAnimationEndListener_ = function(evt) {
    // Only execute for the element we're listening to (not children).
    if (evt.target === evt.currentTarget) {
      // Remove animating class, item transition delays, and listeners.
      evt.currentTarget.classList.remove(this.CssClasses_.IS_ANIMATING);
      var items = this.dropdown_.querySelectorAll('.' + this.CssClasses_.ITEM);
      for (var i = 0; i < items.length; i++) {
        items[i].style.removeProperty('transition-delay');
      }
      this.dropdown_.removeEventListener('transitionend', this.boundRemoveAnimationEndListener_);
      this.dropdown_.removeEventListener('webkitTransitionEnd', this.boundRemoveAnimationEndListener_);
    }
  };

  // Public methods.

  /**
   * Check the disabled state and update field accordingly.
   *
   * @public
   */
  MaterialSearch.prototype.checkDisabled = function() {
    if (this.input_.disabled) {
      this.element_.classList.add(this.CssClasses_.IS_DISABLED);
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
    }
  };
  MaterialSearch.prototype['checkDisabled'] = MaterialSearch.prototype.checkDisabled;

  /**
    * Check the focus state and update field accordingly.
    *
    * @public
    */
  MaterialSearch.prototype.checkFocus = function() {
    // Check for focused/active children, and show/hide the dropdown.
    if (this.element_.querySelector(':focus') ||
        (this.forElement_ && this.forElement_.querySelector(':focus'))) {
      this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
      this.show();
    } else if (this.input_ && this.element_.querySelector(':active')) {
      this.input_.focus();
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
      this.hide();
    }
    // Update left/right icons.
    this.iconUpdate_();
  };
  MaterialSearch.prototype['checkFocus'] = MaterialSearch.prototype.checkFocus;

  /**
   * Check the dirty state and update field accordingly.
   *
   * @public
   */
  MaterialSearch.prototype.checkDirty = function() {
    // Check for non-empty input.
    if (this.input_.value && this.input_.value.length > 0) {
      this.element_.classList.add(this.CssClasses_.IS_DIRTY);
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
    }
    // Update left/right icons.
    this.iconUpdate_();
  };
  MaterialSearch.prototype['checkDirty'] = MaterialSearch.prototype.checkDirty;

  /**
   * Disable text field.
   *
   * @public
   */
  MaterialSearch.prototype.disable = function() {
    this.input_.disabled = true;
    this.checkDisabled();
  };
  MaterialSearch.prototype['disable'] = MaterialSearch.prototype.disable;

  /**
   * Enable text field.
   *
   * @public
   */
  MaterialSearch.prototype.enable = function() {
    this.input_.disabled = false;
    this.checkDisabled();
  };
  MaterialSearch.prototype['enable'] = MaterialSearch.prototype.enable;

  /**
   * Update text field value.
   *
   * @param {string=} value The value to which to set the control (optional).
   * @param {boolean=} silent Set the value without triggering the search callback.
   * @public
   */
  MaterialSearch.prototype.change = function(value, silent) {
    // Update the input value.
    this.input_.value = value || '';
    // Trigger an input event, or only update classes if silent.
    if (silent) {
      this.value_ = this.input_.value;
      this.updateClasses_();
    } else {
      this.onInput_();
    }
  };
  MaterialSearch.prototype['change'] = MaterialSearch.prototype.change;

  /**
   * Focus the search field.
   *
   * @param {boolean=} force Force the focus (i.e. if window isn't active).
   * @public
   */
  MaterialSearch.prototype.focus = function(force) {
    this.input_.focus();
    if (force) {
      this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
      this.show();
      this.iconUpdate_();
    }
  };
  MaterialSearch.prototype['focus'] = MaterialSearch.prototype.focus;

  /**
   * Blur the search field.
   *
   * @param {boolean=} force Force the blur (i.e. if window isn't active).
   * @public
   */
  MaterialSearch.prototype.blur = function(force) {
    this.input_.blur();
    if (force) {
      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
      this.hide();
      this.iconUpdate_();
    }
  };
  MaterialSearch.prototype['blur'] = MaterialSearch.prototype.blur;

  /**
   * Display the dropdown.
   *
   * @param {Event=} evt The event that fired.
   * @public
   */
  MaterialSearch.prototype.show = function(evt) {
    if (this.dropdown_ && this.dropdownContainer_ && this.dropdownOutline_) {
      // Handle empty lists and already-visible dropdowns.
      var items = this.dropdown_.querySelectorAll('.' + this.CssClasses_.ITEM);
      if (items.length === 0) {
        return this.hide();
      } else if (this.dropdownContainer_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
        return this.redraw();
      }
      // Match the width of the target element.
      var width = this.dropdownTarget_.getBoundingClientRect().width;
      var height = this.dropdown_.getBoundingClientRect().height;
      // Initialize animations.
      if (this.dropdown_.classList.contains(this.CssClasses_.ENABLE_ANIMATION)) {
        // Fade in individual dropdown items one at a time.
        var transitionDuration = this.Constant_.TRANSITION_DURATION_SECONDS * this.Constant_.TRANSITION_DURATION_FRACTION;
        for (var i = 0; i < items.length; i++) {
          var itemDelay = null;
          itemDelay = items[i].offsetTop / height * transitionDuration + 's';
          items[i].style.transitionDelay = itemDelay;
        }
      }
      // Perform animations.
      this.dropdownAnimation_(height, width, 0);
    }
  };
  MaterialSearch.prototype['show'] = MaterialSearch.prototype.show;

  /**
   * Hide the dropdown.
   *
   * @public
   */
  MaterialSearch.prototype.hide = function() {
    if (this.dropdown_ && this.dropdownContainer_ && this.dropdownOutline_ &&
        this.dropdownContainer_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
      // Perform animations.
      if (this.dropdown_.classList.contains(this.CssClasses_.ENABLE_ANIMATION)) {
        this.dropdown_.classList.add(this.CssClasses_.IS_ANIMATING);
        this.addAnimationEndListener_();
      }
      // Hide the dropdown.
      this.dropdownSetSize_(0, null);
      this.dropdownContainer_.classList.remove(this.CssClasses_.IS_VISIBLE);
    }
  };
  MaterialSearch.prototype['hide'] = MaterialSearch.prototype.hide;

  /**
   * Display or hide the dropdown, depending on current state.
   *
   * @param {Event=} evt The event that fired.
   * @public
   */
  MaterialSearch.prototype.toggle = function(evt) {
    if (this.dropdownContainer_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
      this.hide();
    } else {
      this.show(evt);
    }
  };
  MaterialSearch.prototype['toggle'] = MaterialSearch.prototype.toggle;

  /**
   * Redraw the dropdown.
   *
   * @public
   */
  MaterialSearch.prototype.redraw = function() {
    if (this.dropdown_ && this.dropdownContainer_ && this.dropdownOutline_) {
      // Handle empty lists and already-visible dropdowns.
      var items = this.dropdown_.querySelectorAll('.' + this.CssClasses_.ITEM);
      if (items.length === 0) {
        return this.hide();
      } else if (!this.dropdownContainer_.classList.contains(this.CssClasses_.IS_VISIBLE)) {
        return this.show();
      }
      // Match the width of the target element.
      var width = this.dropdownTarget_.getBoundingClientRect().width;
      var height = this.dropdown_.getBoundingClientRect().height;
      var heightOrig = this.dropdownContainer_.getBoundingClientRect().height;
      this.dropdownAnimation_(height, width, heightOrig);
    }
  };
  MaterialSearch.prototype['redraw'] = MaterialSearch.prototype.redraw;

  /**
   * Return a search suggestion list element.
   *
   * @param {string} str The text to display in the list element.
   * @param {string=} icon Optional item icon (for history, use 'access_time').
   * @param {Object=} data Optional item data, stored as el.mdlSearchData.
   * @return {!Element}
   * @public
   */
  MaterialSearch.prototype.createItem = function(str, icon, data) {
    // Create the element.
    var el = document.createElement('li');
    el.classList.add(this.CssClasses_.ITEM);
    el.innerHTML = str;
    // Add an icon if specified.
    if (icon) {
      var iconEl = document.createElement('label');
      iconEl.className = 'mdl-button--icon ' + this.CssClasses_.ITEM_ICON;
      var iconInnerEl = document.createElement('i');
      iconInnerEl.className = 'material-icons';
      iconInnerEl.innerHTML = icon;
      iconEl.appendChild(iconInnerEl);
      el.insertBefore(iconEl, el.firstChild);
    }
    // Attach data if specified.
    if (typeof data !== 'undefined') {
      el.mdlSearchData = data;
    }
    return el;
  };
  MaterialSearch.prototype['createItem'] = MaterialSearch.prototype.createItem;

  /**
   * Return an array of search suggestion list elements, using createItem.
   *
   * @param {Array<string>} str The text to display in each list element.
   * @param {(Array<string>|string)=} icon Optional item icon for each element.
   * @param {(Array<Object>|Object)=} data Optional item data for each element.
   * @return {!Array<Element>}
   * @public
   */
  MaterialSearch.prototype.createItems = function(str, icon, data) {
    // Promote icon and data to arrays if they are unary or missing.
    icon = icon instanceof Array ? icon : str.map(function() { return icon; });
    data = data instanceof Array ? data : str.map(function() { return data; });
    // Create and return the elements.
    var els = new Array(str.length);
    for (var i = 0; i < str.length; i++) {
      els[i] = this.createItem(str[i], icon[i], data[i]);
    }
    return els;
  };
  MaterialSearch.prototype['createItems'] = MaterialSearch.prototype.createItems;

  /**
   * Update the dropdown with the provided search suggestion elements.
   *
   * @param {!Array<Element>} items An array of search suggestion elements.
   * @public
   */
  MaterialSearch.prototype.setSuggestions = function(items) {
    if (this.forElement_) {
      // Clear the destination and add each item.
      this.forElement_.innerHTML = '';
      items = items ? items : [];
      for (var i = 0; i < items.length; i++) {
        this.forElement_.appendChild(items[i]);
      }
      // Enable/upgrade the items and redraw the menu.
      this.enableItems_();
      if (this.element_ && this.element_.classList.contains(this.CssClasses_.IS_FOCUSED)) {
        this.redraw();
      }
    }
  };
  MaterialSearch.prototype['setSuggestions'] = MaterialSearch.prototype.setSuggestions;

  // The component registers itself. It can assume componentHandler is available
  // in the global scope.
  componentHandler.register({
    constructor: MaterialSearch,
    classAsString: 'MaterialSearch',
    cssClass: 'mdl-js-search',
    widget: true
  });
})();
