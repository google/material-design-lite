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
class MaterialCheckbox extends MaterialComponent {
  /**
   * Initialize checkbox from a DOM node.
   *
   * @param {Element} root The element being upgraded.
   */
  constructor(root) {
    super(root);

    // Look for required sub-nodes in the root's DOM.
    this.input_ =
        this.root_.querySelector(`.${MaterialCheckbox.classes_.INPUT}`);
    if (!this.input_) {
      throw new Error(
          `MaterialCheckbox missing ${MaterialCheckbox.classes_.INPUT} node.`);
    }

    // Initialize event listeners.
    this.changeListener_ = this.refresh.bind(this);
    this.focusListener_ =
        () => this.root_.classList.add(MaterialCheckbox.classes_.IS_FOCUSED);
    this.blurListener_ =
        () => this.root_.classList.remove(MaterialCheckbox.classes_.IS_FOCUSED);
    this.mouseUpListener_ = this.blur_.bind(this);

    // Finalize initialization.
    this.init_();
  }

  /**
   * String constants used in this component.
   *
   * @protected
   * @return {Object<string, string>}
   */
  static get strings_() {
    return {
      CLASS_NAME: 'MaterialCheckbox'
    };
  }

  /**
   * CSS classes used in this component.
   *
   * @protected
   * @return {Object<string, string>}
   */
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
   * Attach all listeners to the DOM.
   *
   * @export
   */
  addEventListeners() {
    this.input_.addEventListener('change', this.changeListener_);
    this.input_.addEventListener('focus', this.focusListener_);
    this.input_.addEventListener('blur', this.blurListener_);
    this.root_.addEventListener('mouseup', this.mouseUpListener_);
  }

  /**
   * Remove all listeners from the DOM.
   *
   * @export
   */
  removeEventListeners() {
    this.input_.removeEventListener('change', this.changeListener_);
    this.input_.removeEventListener('focus', this.focusListener_);
    this.input_.removeEventListener('blur', this.blurListener_);
    this.root_.removeEventListener('mouseup', this.mouseUpListener_);
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
   *
   * @private
   */
  blur_() {
    requestAnimationFrame(() => this.input_.blur());
  }

  /**
   * Check the input's toggle state and update display.
   *
   * @private
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
   *
   * @private
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
