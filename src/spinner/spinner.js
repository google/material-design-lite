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
 * The MaterialSpinner class wraps a Material Design spinner component.
 *
 * @export
 */
class MaterialSpinner extends MaterialComponent {
  /**
   * Initialize spinner from a DOM node.
   *
   * @param {Element} root The element being upgraded.
   */
  constructor(root) {
    super(root);

    // Check if the root has the right class.
    if (!root.classList.contains(this.constructor.cssClasses_.ROOT)) {
      throw new Error('MaterialSpinner missing ' +
          `${this.constructor.cssClasses_.ROOT} class.`);
    }

    // Finalize initialization.
    this.init_();
  }

  /**
   * CSS classes used in this component.
   *
   * @protected
   * @return {Object<string, string>} The CSS classes used in this component.
   */
  static get cssClasses_() {
    return {
      ROOT: 'mdl-spinner',
      JS: 'mdl-js-spinner',

      IS_ACTIVE: 'is-active'
    };
  }

  /**
   * Attach all listeners to the DOM.
   *
   * @export
   */
  addEventListeners() {
    // No event listeners needed for MaterialSpinner.
  }

  /**
   * Remove all listeners from the DOM.
   *
   * @export
   */
  removeEventListeners() {
    // No event listeners needed for MaterialSpinner.
  }

  /**
   * Set whether or not the spinner should be active.
   *
   * @param {boolean} value The value to set the property to.
   * @export
   */
  set active(value) {
    if (value) {
      this.root_.classList.add(MaterialSpinner.cssClasses_.IS_ACTIVE);
    } else {
      this.root_.classList.remove(MaterialSpinner.cssClasses_.IS_ACTIVE);
    }
  }

  /**
   * Return whether the spinner is currently active.
   *
   * @return {boolean} The current value of the property.
   * @export
   */
  get active() {
    return this.root_.classList.contains(MaterialSpinner.cssClasses_.IS_ACTIVE);
  }

  /**
   * Run a visual refresh on the component, in case it's gone out of sync.
   *
   * @export
   */
  refresh() {
    // No refresh logic needed for MaterialSpinner.
  }
}
