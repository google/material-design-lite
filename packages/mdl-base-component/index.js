/**
 * Copyright 2016 Google Inc. All Rights Reserved.
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

export {MDLBaseAdapter, ref} from './adapter';

/**
 * Base class for all MDL components.
 * @export
 */
export default class MaterialComponent {
  /**
   * Initialize component from a DOM node.
   * @param {Element} root The element being upgraded.
   */
  constructor(root) {
    this.refreshFrame_ = 0;
    this.root_ = root;
    this.init_();
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * CSS classes used in this component.
   *
   * @return {Object<string, string>} The CSS classes used in this component.
   */
  static get cssClasses() {
    // Empty in base class. Throw error if not correctly overriden.
    throw new Error('Should have at least ROOT key with the style class names,' +
      ' e.g. mdl-button');
  }

  /**
   * Number constants used in this component.
   *
   * @return {Object<string, number>} The numbers used in this component.
   */
  static get numbers() {
    // Empty in base class.
    return {};
  }

  /**
   * String constants used in this component.
   *
   * @return {Object<string, string>} The strings used in this component.
   */
  static get strings() {
    // Empty in base class.
    return {};
  }

  /**
   * Initialize component by running common tasks.
   *
   * @protected
   */
  init_() {
    // Add CSS marker that component upgrade is finished.
    // Useful, but beware flashes of unstyled content when relying on this.
    this.root_.dataset.mdlUpgraded = '';
  }

  /**
   * Optional function that can be overriden if additional work needs to be done on refresh.
   * @protected
   */
  refresh_() {
    // Can be overridden in sub-component.
  }

  /**
   * Attach all listeners to the DOM.
   *
   * @export
   */
  addEventListeners() {
    // Empty in base class.
  }

  /**
   * Remove all listeners from the DOM.
   *
   * @export
   */
  removeEventListeners() {
    // Empty in base class.
  }

  /**
   * Run a visual refresh on the component, in case it's gone out of sync.
   * Ensures a refresh on the browser render loop.
   * @export
   */
  refresh() {
    if (this.refreshFrame_) {
      cancelAnimationFrame(this.refreshFrame_);
    }
    this.refreshFrame_ = requestAnimationFrame(() => {
      this.refresh_();
      this.refreshFrame_ = 0;
    });
  }

  /**
   * Kills a component, removing all event listeners and deleting the node from
   * the DOM.
   *
   * @export
   */
  kill() {
    this.removeEventListeners();
  }
}
