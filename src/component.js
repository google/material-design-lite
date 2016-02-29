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
   * @param {Element} root The element being upgraded.
   */
  constructor(root) {
    this.root_ = root;

    // Check if the root has the right class.
    if (!root.classList.contains(this.constructor.classes_.ROOT)) {
      throw new Error(`${this.constructor.classAsString} missing ` +
          `${this.constructor.classes_.ROOT} class.`);
    }
  }

  /**
   * CSS classes used in this component.
   *
   * @protected
   * @return {Object<string, string>}
   */
  static get classes_() {
    // Empty in base class. Throw error if not correctly overriden.
    throw new Error('Should have ROOT and JS keys with the style class names,' +
      ' e.g. mdl-button and mdl-js-button.');
  }

  /**
   * Number constants used in this component.
   *
   * @protected
   */
  static get numbers_() {
    // Empty in base class.
    return {};
  }

  /**
   * String constants used in this component.
   *
   * @protected
   */
  static get strings_() {
    // Empty in base class. Throw error if not correctly overriden.
    throw new Error('Should have a CLASS_NAME key with the script class name,' +
        ' e.g. MaterialButton.');
  }

  /**
   * Return class name as a string. Useful for automation after obfuscation.
   *
   * @suppress {missingProperties}
   * @nocollapse
   * @export
   */
  static get classAsString() {
    return this.strings_.CLASS_NAME;
  }

  /**
   * Initialize all self-managed instances under the given node.
   * This will only initialize components that have specifically been marked
   * for self-management.
   *
   * @param {Node} docRoot The node under which to look for components.
   * @nocollapse
   * @export
   */
  static initComponents(docRoot) {
    var nodes = docRoot.querySelectorAll(
        `.${this.classes_.ROOT}.${this.classes_.JS}`);
    for (let i = 0; i < nodes.length; i++) {
      // Attach new component to DOM property.
      nodes[i][this.strings_.CLASS_NAME] = new this(nodes[i]);
    }
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
}
