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
 * Base class for all MDL components.
 *
 * @export
 */
class MaterialComponent {
  /**
   * Initialize component from a DOM node.
   *
   * @param {Element=} optRoot The element being upgraded. If none, a new DOM
   *     subtree gets created for the component.
   */
  constructor(optRoot) {
    this.root_ = optRoot || this.constructor.buildDom_();
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Creates the DOM subtree for a new component.
   * Greatly simplifies programmatic component creation.
   *
   * @protected
   * @nocollapse
   * @return {Element} The DOM subtree for the component.
   */
  static buildDom_() {
    // Empty in base class. Throw error if not correctly overriden.
    throw new Error('Should be implemented in components.');
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * CSS classes used in this component.
   *
   * @protected
   * @return {Object<string, string>} The CSS classes used in this component.
   */
  static get cssClasses_() {
    // Empty in base class. Throw error if not correctly overriden.
    throw new Error('Should have ROOT and JS keys with the style class names,' +
      ' e.g. mdl-button and mdl-js-button.');
  }

  /**
   * Number constants used in this component.
   *
   * @protected
   * @return {Object<string, number>} The numbers used in this component.
   */
  static get numbers_() {
    // Empty in base class.
    return {};
  }

  /**
   * String constants used in this component.
   *
   * @protected
   * @return {Object<string, string>} The strings used in this component.
   */
  static get strings_() {
    // Empty in base class.
    return {};
  }

  /**
   * Initialize component by running common tasks.
   *
   * @protected
   */
  init_() {
    // Attach event listeners to the DOM.
    this.addEventListeners();

    // Refresh component.
    this.refresh();

    // Add CSS marker that component upgrade is finished.
    // Useful, but beware flashes of unstyled content when relying on this.
    this.root_.classList.add(
        `${this.constructor.cssClasses_.ROOT}--is-upgraded`);
  }

  /**
   * Returns the root element for the component.
   *
   * @return {Element} The root element for the component.
   * @export
   */
  get root() {
    return this.root_;
  }

  /**
   * Attach all listeners to the DOM.
   *
   * @export
   */
  addEventListeners() {
    // Empty in base class. Throw error if not correctly overriden.
    throw new Error('Should be implemented in components.');
  }

  /**
   * Remove all listeners from the DOM.
   *
   * @export
   */
  removeEventListeners() {
    // Empty in base class. Throw error if not correctly overriden.
    throw new Error('Should be implemented in components.');
  }

  /**
   * Run a visual refresh on the component, in case it's gone out of sync.
   *
   * @export
   */
  refresh() {
    // Empty in base class. Throw error if not correctly overriden.
    throw new Error('Should be implemented in components.');
  }

  /**
   * Kills a component, removing all event listeners and deleting the node from
   * the DOM.
   *
   * @export
   */
  kill() {
    this.removeEventListeners();

    if (this.root_.parentNode) {
      this.root_.parentNode.removeChild(this.root_);
    }
  }
}
