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
 * The MaterialCheckbox class wraps a Material Design checkbox component.
 *
 * @export
 */
class MaterialCheckbox {
  /**
   * Initialize checkbox from a DOM node.
   *
   * @param {Element} root The element being upgraded.
   */
  constructor(root) {
    // Check if the root has the right class.
    if (!root.classList.contains(MaterialCheckbox.classes_.ROOT)) {
      throw new Error(
          `MaterialCheckbox missing ${MaterialCheckbox.classes_.ROOT} class.`);
    }
    this.root_ = root;

    // Look for required sub-nodes in the root's DOM.
    this.input_ = root.querySelector(`.${MaterialCheckbox.classes_.INPUT}`);
    if (!this.input_) {
      throw new Error(
          `MaterialCheckbox missing ${MaterialCheckbox.classes_.INPUT} node.`);
    }

    // Initialize events.
    this.input_.addEventListener('change', this.refresh.bind(this));
    this.input_.addEventListener('focus',
        () => this.root_.classList.add(MaterialCheckbox.classes_.IS_FOCUSED));
    this.input_.addEventListener('blur',
        () => this.root_.classList.remove(
            MaterialCheckbox.classes_.IS_FOCUSED));
    this.root_.addEventListener('mouseup', this.blur_.bind(this));

    // Refresh component.
    this.refresh();
  }

  // Numeric constants used in this component.
  static get numbers_() {
    return {
      TINY_TIMEOUT: 0.001
    };
  }

  // String constants used in this component.
  static get strings_() {
    return {
      CLASS_NAME: 'MaterialCheckbox'
    };
  }

  // CSS classes used in this component.
  static get classes_() {
    return {
      ROOT: 'mdl-checkbox',
      JS: 'mdl-js-checkbox',
      INPUT: 'mdl-checkbox__input',

      IS_FOCUSED: 'is-focused',
      IS_DISABLED: 'is-disabled',
      IS_CHECKED: 'is-checked',
      IS_UPGRADED: 'is-upgraded'
    };
  }

  /**
   * Initialize all self-managed instances under the given node.
   * This will only initialize components that have specifically been marked
   * for self-management.
   *
   * @param {Node} docRoot The node under which to look for components.
   * @export
   */
  static initComponents(docRoot) {
    var nodes = docRoot.querySelectorAll(
        `.${MaterialCheckbox.classes_.ROOT}.${MaterialCheckbox.classes_.JS}`);
    for (let i = 0; i < nodes.length; i++) {
      // Attach new component to DOM property.
      nodes[i][MaterialCheckbox.strings_.CLASS_NAME] =
          new MaterialCheckbox(nodes[i]);
    }
  }

  // Return class name as a string. Useful for automation after obfuscation.
  get classAsString() {
    return MaterialCheckbox.strings_.CLASS_NAME;
  }

  /**
   * Set "checked" value on checkbox.
   *
   * @param {boolean} value The value to set the property to.
   * @export
   */
  set checked(value) {
    this.input_.checked = value;
    this.refresh();
  }

  /**
   * Return "checked" value on checkbox.
   *
   * @return {boolean} The current value of the property.
   * @export
   */
  get checked() {
    return this.input_.checked;
  }

  /**
   * Disable / enable the checkbox component.
   *
   * @param {boolean} value The value to set the property to.
   * @export
   */
  set disabled(value) {
    this.input_.disabled = value;
    this.refresh();
  }

  /**
   * Return whether the checkbox component is disabled or enabled.
   *
   * @return {boolean} The current value of the property.
   * @export
   */
  get disabled() {
    return this.input_.disabled;
  }

  /**
   * Run a visual refresh on the component, in case it's gone out of sync.
   *
   * @export
   */
  refresh() {
    this.checkDisabled_();
    this.checkToggleState_();
  }

  /**
   * Add blur.
   */
  blur_() {
    // TODO: figure out why there's a focus event being fired after our blur,
    // so that we can avoid this hack.
    setTimeout(() => this.input_.blur(),
        MaterialCheckbox.numbers_.TINY_TIMEOUT);
  }

  /**
   * Check the input's toggle state and update display.
   */
  checkToggleState_() {
    if (this.input_.checked) {
      this.root_.classList.add(MaterialCheckbox.classes_.IS_CHECKED);
    } else {
      this.root_.classList.remove(MaterialCheckbox.classes_.IS_CHECKED);
    }
  }

  /**
   * Check the input's disabled state and update display.
   */
  checkDisabled_() {
    if (this.input_.disabled) {
      this.root_.classList.add(MaterialCheckbox.classes_.IS_DISABLED);
    } else {
      this.root_.classList.remove(MaterialCheckbox.classes_.IS_DISABLED);
    }
  }
}

// Initialize all self-managed components in the document.
MaterialCheckbox.initComponents(document);
