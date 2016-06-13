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
 * The MaterialRadio class wraps a Material Design radio component.
 *
 * @extends {MaterialComponent}
 * @export
 */
class MaterialRadio extends MaterialComponent {
  /**
   * Initialize radio from a DOM node.
   *
   * @param {Element=} optRoot The element being upgraded.
   */
  constructor(optRoot) {
    super(optRoot);

    // Check if the root has the right class.
    if (!this.root_.classList.contains(this.constructor.cssClasses_.ROOT)) {
      throw new Error('MaterialRadio missing ' +
          `${this.constructor.cssClasses_.ROOT} class.`);
    }

    // Look for required sub-nodes in the root's DOM.
    this.input_ =
        this.root_.querySelector(`.${MaterialRadio.cssClasses_.INPUT}`);
    if (!this.input_) {
      throw new Error(
          `MaterialRadio missing ${MaterialRadio.cssClasses_.INPUT} node.`);
    }

    // Initialize event listeners.
    this.changeListener_ = this.onChange_.bind(this);
    this.focusListener_ =
        () => this.root_.classList.add(MaterialRadio.cssClasses_.IS_FOCUSED);
    this.blurListener_ =
        () => this.root_.classList.remove(MaterialRadio.cssClasses_.IS_FOCUSED);
    this.mouseUpListener_ = this.blur_.bind(this);

    // Finalize initialization.
    this.init_();
  }

  /**
   * Generates an ID for a new Radio. Keeps a counter to ensure uniqueness.
   * @return {string} The generated ID.
   */
  static generateId_() {
    MaterialRadio.autoCounter_ = (MaterialRadio.autoCounter_ || 0) + 1;
    return `mdlradio-${MaterialRadio.autoCounter_}`;
  }

  /**
   * Creates the DOM subtree for a new component.
   * Greatly simplifies programmatic component creation.
   *
   * @protected
   * @nocollapse
   * @return {Element} The DOM subtree for the component.
   */
  static buildDom_() {
    let root = document.createElement('label');
    let input = document.createElement('input');
    let label = document.createElement('span');
    let id = MaterialRadio.generateId_();
    root.htmlFor = id;
    root.classList.add(MaterialRadio.cssClasses_.ROOT);
    input.type = 'radio';
    input.id = id;
    input.classList.add(MaterialRadio.cssClasses_.INPUT);
    root.appendChild(input);
    label.classList.add(MaterialRadio.cssClasses_.LABEL);
    root.appendChild(label);

    return root;
  }

  /**
   * CSS classes used in this component.
   *
   * @override
   * @protected
   * @return {Object<string, string>} The CSS classes used in this component.
   */
  static get cssClasses_() {
    return {
      ROOT: 'mdl-radio',
      JS: 'mdl-js-radio',
      INPUT: 'mdl-radio__input',
      LABEL: 'mdl-radio__label',

      IS_FOCUSED: 'is-focused',
      IS_DISABLED: 'is-disabled',
      IS_CHECKED: 'is-checked'
    };
  }

  /**
   * Check the input's toggle state and update display.
   *
   * @param {Element} root The root node of the MaterialRadio.
   * @param {Element} input The input node of the MaterialRadio.
   * @private
   */
  static checkToggleState_(root, input) {
    if (input.checked) {
      root.classList.add(MaterialRadio.cssClasses_.IS_CHECKED);
    } else {
      root.classList.remove(MaterialRadio.cssClasses_.IS_CHECKED);
    }
  }

  /**
   * Check the input's disabled state and update display.
   *
   * @param {Element} root The root node of the MaterialRadio.
   * @param {Element} input The input node of the MaterialRadio.
   * @private
   */
  static checkDisabled_(root, input) {
    if (input.disabled) {
      root.classList.add(MaterialRadio.cssClasses_.IS_DISABLED);
    } else {
      root.classList.remove(MaterialRadio.cssClasses_.IS_DISABLED);
    }
  }

  /**
   * Attach all listeners to the DOM.
   *
   * @override
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
   * @override
   * @export
   */
  removeEventListeners() {
    this.input_.removeEventListener('change', this.changeListener_);
    this.input_.removeEventListener('focus', this.focusListener_);
    this.input_.removeEventListener('blur', this.blurListener_);
    this.root_.removeEventListener('mouseup', this.mouseUpListener_);
  }

  /**
   * Set "checked" value on radio.
   *
   * @param {boolean} value The value to set the property to.
   * @export
   */
  set checked(value) {
    this.input_.checked = value;
    this.refresh();
  }

  /**
   * Return "checked" value on radio.
   *
   * @return {boolean} The current value of the property.
   * @export
   */
  get checked() {
    return this.input_.checked;
  }

  /**
   * Disable / enable the radio component.
   *
   * @param {boolean} value The value to set the property to.
   * @export
   */
  set disabled(value) {
    this.input_.disabled = value;
    this.refresh();
  }

  /**
   * Return whether the radio component is disabled or enabled.
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
   * @override
   * @export
   */
  refresh() {
    MaterialRadio.checkDisabled_(this.root_, this.input_);
    MaterialRadio.checkToggleState_(this.root_, this.input_);
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
   * Update all radio buttons on the page.
   *
   * Since other radio buttons don't get change events, we need to look for
   * them to refresh their appearance.
   * @private
   */
  onChange_() {
    requestAnimationFrame(() => {
      let radios =
          document.querySelectorAll(`.${MaterialRadio.cssClasses_.ROOT}`);
      for (let i = 0; i < radios.length; i++) {
        let input =
            radios[i].querySelector(`.${MaterialRadio.cssClasses_.INPUT}`);
        // Different name == different group, so no point updating those.
        if (input &&
            input.getAttribute('name') === this.input_.getAttribute('name')) {
          MaterialRadio.checkDisabled_(radios[i], input);
          MaterialRadio.checkToggleState_(radios[i], input);
        }
      }
    });
  }
}
