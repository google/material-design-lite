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

/**
 * The MaterialMenu class wraps a Material Design menu component.
 *
 * @export
 */
class MaterialMenu extends MaterialComponent {
  /**
   * Initialize checkbox from a DOM node.
   *
   * @param {Element} root The element being upgraded.
   */
  constructor(root) {
    super(root);

    // Look for sub-nodes in the root's DOM.
    this.list_ = this.root_.querySelector(`.${MaterialMenu.classes_.LIST}`);
    if (!this.list_) {
      throw new Error(
          `MaterialMenu missing ${MaterialMenu.classes_.LIST} node.`);
    }
    // Outline is optional, given that it's a visual-only thing.
    this.outline_ =
        this.root_.querySelector(`.${MaterialMenu.classes_.OUTLINE}`);

    // Initialize event listeners.
    this.itemClickListener_ = this.itemClicked_.bind(this);
    this.documentClickListener_ = this.documentClicked_.bind(this);
    this.transitionListener_ = this.transitionEnd_.bind(this);

    // Initialize variables.
    this.closing_ = false;
    this.animating_ = false;
    this.anchor_ = null;
    if (this.root_.hasAttribute('data-mdl-anchor')) {
      this.anchor_ = document.querySelector(
            `#${this.root_.getAttribute('data-mdl-anchor')}`);
    }

    // Finalize initialization.
    this.init_();
  }

  /**
   * String constants used in this component.
   *
   * @protected
   * @return {Object<string, string>} The strings used in this component.
   */
  static get strings_() {
    return {
      CLASS_NAME: 'MaterialMenu'
    };
  }

  /**
   * Number constants used in this component.
   *
   * @protected
   * @return {Object<string, number>} The numbers used in this component.
   */
  static get numbers_() {
    return {
      // Total duration of the menu animation.
      TRANSITION_DURATION_SECONDS: 0.3,
      // The fraction of the total duration we want to use for menu item
      // animations.
      TRANSITION_DURATION_FRACTION: 0.8,
      // How long the menu stays open after choosing an option (so the user can
      // get some visual feedback).
      CLOSE_TIMEOUT: 150
    };
  }

  /**
   * CSS classes used in this component.
   *
   * @protected
   * @return {Object<string, string>} The CSS classes used in this component.
   */
  static get classes_() {
    return {
      ROOT: 'mdl-menu',
      JS: 'mdl-js-menu',
      LIST: 'mdl-menu__list',
      ITEM: 'mdl-menu__item',
      OUTLINE: 'mdl-menu__outline',

      // Statuses
      IS_VISIBLE: 'is-visible',
      IS_ANIMATING: 'is-animating',

      // Alignment options
      BOTTOM_LEFT: 'mdl-menu--bottom-left',  // This is the default.
      BOTTOM_RIGHT: 'mdl-menu--bottom-right',
      TOP_LEFT: 'mdl-menu--top-left',
      TOP_RIGHT: 'mdl-menu--top-right',
      UNALIGNED: 'mdl-menu--unaligned'
    };
  }

  /**
   * Calculates the initial clip (for opening the menu) or final clip (for closing
   * it), and applies it. This allows us to animate from or to the correct point,
   * that is, the point it's aligned to in the "for" element.
   *
   * @param {number} height Height of the clip rectangle
   * @param {number} width Width of the clip rectangle
   * @private
   */
  applyClip_(height, width) {
    if (this.root_.classList.contains(MaterialMenu.classes_.UNALIGNED)) {
      // Do not clip.
      this.list_.style.removeProperty('clip');
    } else if (
        this.root_.classList.contains(MaterialMenu.classes_.BOTTOM_RIGHT)) {
      // Clip to the top right corner of the menu.
      this.list_.style.setProperty('clip', `rect(0 ${width}px 0 ${width}px)`);
    } else if (this.root_.classList.contains(MaterialMenu.classes_.TOP_LEFT)) {
      // Clip to the bottom left corner of the menu.
      this.list_.style.setProperty('clip', `rect(${height}px 0 ${height}px 0)`);
    } else if (this.root_.classList.contains(MaterialMenu.classes_.TOP_RIGHT)) {
      // Clip to the bottom right corner of the menu.
      this.list_.style.setProperty('clip',
          `rect(${height}px ${width}px ${height}px ${width}px)`);
    } else {
      // Default: do not clip (same as clipping to the top left corner).
      this.list_.style.removeProperty('clip');
    }
  }

  /**
   * Positions the menu relative to an anchor, according to options.
   */
  positionMenu_() {
    if (this.anchor_ && this.anchor_.parentElement) {
      let anchorRect = this.anchor_.getBoundingClientRect();
      let parentRect = this.anchor_.parentElement.getBoundingClientRect();

      if (this.root_.classList.contains(MaterialMenu.classes_.UNALIGNED)) {
        // Do not position the menu automatically. Requires the developer to
        // manually specify position.
      } else if (this.root_.classList.contains(
            MaterialMenu.classes_.BOTTOM_RIGHT)) {
        // Position below the anchor element, aligned to its right.
        this.root_.style.setProperty('top',
            `${this.anchor_.offsetTop + this.anchor_.offsetHeight}px`);
        this.root_.style.setProperty('right',
            `${parentRect.right - anchorRect.right}px`);
        this.root_.style.removeProperty('bottom');
        this.root_.style.removeProperty('left');
      } else if (this.root_.classList.contains(
            MaterialMenu.classes_.TOP_LEFT)) {
        // Position above the anchor element, aligned to its left.
        this.root_.style.removeProperty('top');
        this.root_.style.removeProperty('right');
        this.root_.style.setProperty('bottom',
            `${parentRect.bottom - anchorRect.top}px`);
        this.root_.style.setProperty('left', `${this.anchor_.offsetLeft}px`);
      } else if (this.root_.classList.contains(
            MaterialMenu.classes_.TOP_RIGHT)) {
        // Position above the anchor element, aligned to its right.
        this.root_.style.removeProperty('top');
        this.root_.style.setProperty('right',
            `${parentRect.right - anchorRect.right}px`);
        this.root_.style.setProperty('bottom',
            `${parentRect.bottom - anchorRect.top}px`);
        this.root_.style.removeProperty('left');
      } else {
        // Default: position below the anchor element, aligned to its left.
        this.root_.style.setProperty('top',
            `${this.anchor_.offsetTop + this.anchor_.offsetHeight}px`);
        this.root_.style.removeProperty('right');
        this.root_.style.removeProperty('bottom');
        this.root_.style.setProperty('left', `${this.anchor_.offsetLeft}px`);
      }
    }
  }

  /**
   * Handles a click event on an item.
   *
   * @param {Event} evt The event that fired.
   * @private
   */
  itemClicked_(evt) {
    if (evt.target.hasAttribute('disabled')) {
      evt.stopPropagation();
    } else {
      // Wait some time before closing menu, so the user can see the ripple.
      this.closing_ = true;
      window.setTimeout(() => {
        this.hide();
        this.closing_ = false;
      }, MaterialMenu.numbers_.CLOSE_TIMEOUT);
    }
  }

  /**
   * Handles a click event on the document.
   *
   * @param {Event} evt The event that fired.
   * @private
   */
  documentClicked_(evt) {
    if (!this.closing_ && !this.animating_ &&
        evt.target.parentNode !== this.list_) {
      this.hide();
    }
  }

  /**
   * Handles the end of an animation on the element.
   *
   * @param {Event} evt The event that fired.
   * @private
   */
  transitionEnd_(evt) {
    evt.target.classList.remove(MaterialMenu.classes_.IS_ANIMATING);
    this.animating_ = false;
  }

  /**
   * Attach all listeners to the DOM.
   *
   * @export
   */
  addEventListeners() {
    let items = this.list_.querySelectorAll(`.${MaterialMenu.classes_.ITEM}`);
    for (let i = 0; i < items.length; i++) {
      // Add a listener to each menu item.
      items[i].addEventListener('click', this.itemClickListener_);
    }

    this.list_.addEventListener('transitionend', this.transitionListener_);
    this.list_.addEventListener('webkitTransitionEnd',
        this.transitionListener_);

    // Global event listener. This has to be removed, otherwise we have a
    // memory leak.
    document.addEventListener('click', this.documentClickListener_);
  }

  /**
   * Remove all listeners from the DOM.
   *
   * @export
   */
  removeEventListeners() {
    let items = this.list_.querySelectorAll(`.${MaterialMenu.classes_.ITEM}`);
    for (let i = 0; i < items.length; i++) {
      // Add a listener to each menu item.
      items[i].removeEventListener('click', this.itemClickListener_);
    }

    this.list_.removeEventListener('transitionend', this.transitionListener_);
    this.list_.removeEventListener('webkitTransitionEnd',
        this.transitionListener_);

    // Global event listener. This has to be removed, otherwise we have a
    // memory leak.
    document.removeEventListener('click', this.documentClickListener_);
  }

  /**
   * Run a visual refresh on the component, in case it's gone out of sync.
   *
   * @export
   */
  refresh() {
    // Nothing to do no this component.
  }

  /**
   * Show the menu.
   *
   * @export
   */
  show() {
    if (this.list_) {
      this.animating_ = true;

      this.positionMenu_();

      // Measure the inner element.
      let height = this.list_.getBoundingClientRect().height;
      let width = this.list_.getBoundingClientRect().width;

      // Apply the inner element's size to the container and outline.
      this.root_.style.setProperty('width', width + 'px');
      this.root_.style.setProperty('height', height + 'px');

      if (this.outline_) {
        this.outline_.style.setProperty('width', width + 'px');
        this.outline_.style.setProperty('height', height + 'px');
      }

      let transitionDuration =
          MaterialMenu.numbers_.TRANSITION_DURATION_SECONDS *
          MaterialMenu.numbers_.TRANSITION_DURATION_FRACTION;

      // Calculate transition delays for individual menu items, so that they fade
      // in one at a time.
      let items = this.list_.querySelectorAll(`.${MaterialMenu.classes_.ITEM}`);
      for (let i = 0; i < items.length; i++) {
        let itemDelay = null;
        if (this.root_.classList.contains(MaterialMenu.classes_.TOP_LEFT) ||
            this.root_.classList.contains(MaterialMenu.classes_.TOP_RIGHT)) {
          itemDelay = ((height - items[i].offsetTop - items[i].offsetHeight) /
              height * transitionDuration);
        } else {
          itemDelay = (items[i].offsetTop / height * transitionDuration);
        }
        items[i].style.setProperty('transition-delay', itemDelay + 's');
      }

      // Apply the initial clip to the text before we start animating.
      this.applyClip_(height, width);

      // Wait for the next frame, turn on animation, and apply the final clip.
      // Also make it visible. This triggers the transitions.
      requestAnimationFrame(() => {
        this.list_.classList.add(MaterialMenu.classes_.IS_ANIMATING);
        this.list_.style.setProperty('clip',
            `rect(0 ${width}px ${height}px 0)`);
        this.root_.classList.add(MaterialMenu.classes_.IS_VISIBLE);
      });
    }
  }

  /**
   * Hide the menu.
   *
   * @export
   */
  hide() {
    if (this.list_) {
      this.animating_ = true;

      let items = this.list_.querySelectorAll(`.${MaterialMenu.classes_.ITEM}`);

      // Remove all transition delays; menu items fade out concurrently.
      for (let i = 0; i < items.length; i++) {
        items[i].style.removeProperty('transition-delay');
      }

      // Measure the inner element.
      let rect = this.list_.getBoundingClientRect();
      let height = rect.height;
      let width = rect.width;

      // Turn on animation, and apply the final clip. Also make invisible.
      // This triggers the transitions.
      this.list_.classList.add(MaterialMenu.classes_.IS_ANIMATING);
      this.applyClip_(height, width);
      this.root_.classList.remove(MaterialMenu.classes_.IS_VISIBLE);
    }
  }

  /**
   * Toggles the menu.
   *
   * @export
   */
  toggle() {
    if (this.root_.classList.contains(MaterialMenu.classes_.IS_VISIBLE)) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Sets the anchor for the menu.
   * As an alternative, you can declaratively set `data-mdl-anchor`.
   *
   * @param {Element} anchor The element to use as an anchor for positioning.
   * @export
   */
  set anchor(anchor) {
    if (!(anchor instanceof Element)) {
      throw new Error('Anchor should be an Element.');
    }
    this.anchor_ = anchor;
  }

  /**
   * Returns the anchor for the menu.
   *
   * @return {Element} The element being used as an anchor for positioning.
   * @export
   */
  get anchor() {
    return this.anchor_;
  }
}

// Initialize all self-managed components in the document.
MaterialMenu.initComponents(document);
