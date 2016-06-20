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
 * The MaterialSlider class wraps a Material Design slider component.
 *
 * @export
 */
class MaterialSlider extends MaterialComponent {
  /**
   * Initialize slider from a DOM node.
   *
   * @param {Element=} optRoot The element being upgraded.
   */
  constructor(optRoot) {
    super(optRoot);

    // Check if the root has the right class.
    if (!this.root_.classList.contains(this.constructor.cssClasses_.ROOT)) {
      throw new Error('MaterialSlider missing ' +
          `${this.constructor.cssClasses_.ROOT} class.`);
    }

    // Look for required sub-nodes in the root's DOM.
    this.input_ =
        this.root_.querySelector(`.${MaterialSlider.cssClasses_.INPUT}`);
    if (!this.input_) {
      throw new Error('MaterialSlider missing ' +
          `${MaterialSlider.cssClasses_.INPUT} node.`);
    }

    // Look for optional sub-nodes in the root's DOM.
    this.background_ = this.root_.querySelector(
        `.${MaterialSlider.cssClasses_.BACKGROUND}`);
    if (this.background_) {
      this.backgroundLower_ = this.background_.querySelector(
          `.${MaterialSlider.cssClasses_.LOWER}`);
      this.backgroundUpper_ = this.background_.querySelector(
          `.${MaterialSlider.cssClasses_.UPPER}`);
    }

    // Initialize event listeners.
    this.changeListener_ = this.refresh.bind(this);
    this.focusListener_ =
        () => this.root_.classList.add(MaterialSlider.cssClasses_.IS_FOCUSED);
    this.blurListener_ = () => this.root_.classList.remove(
        MaterialSlider.cssClasses_.IS_FOCUSED);
    this.mouseUpListener_ = this.blur_.bind(this);
    this.inputListener_ = this.updateValue_.bind(this);

    // Finalize initialization.
    this.init_();
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
    let root = document.createElement('div');
    let input = document.createElement('input');
    let background = document.createElement('div');
    let upper = document.createElement('div');
    let lower = document.createElement('div');
    root.classList.add(MaterialSlider.cssClasses_.ROOT);
    background.classList.add(MaterialSlider.cssClasses_.BACKGROUND);
    lower.classList.add(MaterialSlider.cssClasses_.LOWER);
    background.appendChild(lower);
    upper.classList.add(MaterialSlider.cssClasses_.UPPER);
    background.appendChild(upper);
    root.appendChild(background);
    input.type = 'range';
    input.min = 0;
    input.max = 100;
    input.value = 0;
    input.classList.add(MaterialSlider.cssClasses_.INPUT);
    root.appendChild(input);

    return root;
  }

  /**
   * CSS classes used in this component.
   *
   * @protected
   * @return {Object<string, string>} The CSS classes used in this component.
   */
  static get cssClasses_() {
    return {
      ROOT: 'mdl-slider',
      JS: 'mdl-js-slider',
      INPUT: 'mdl-slider__input',
      BACKGROUND: 'mdl-slider__background',
      UPPER: 'mdl-slider__background-upper',
      LOWER: 'mdl-slider__background-lower',

      IS_FOCUSED: 'is-focused',
      IS_DISABLED: 'is-disabled',
      IS_LOWEST_VALUE: 'is-lowest-value'
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
    this.input_.addEventListener('input', this.inputListener_);
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
    this.input_.removeEventListener('input', this.inputListener_);
    this.root_.removeEventListener('mouseup', this.mouseUpListener_);
  }

  /**
   * Set value on slider.
   *
   * @param {string} num The value to set the property to.
   * @export
   */
  set value(num) {
    this.input_.value = num;
    this.refresh();
  }

  /**
   * Return value on checkbox.
   *
   * @return {string} The current value of the property.
   * @export
   */
  get value() {
    return this.input_.value;
  }

  /**
   * Disable / enable the checkbox component.
   *
   * @param {boolean} value The value to set the property to.
   * @export
   */
  set disabled(value) {
    this.input_.disabled = Boolean(value);
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
    this.updateValue_();
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
   * Check the input's value and update display.
   *
   * @private
   */
  updateValue_() {
    // Calculate and apply percentages to div structure behind slider.
    let fraction = (this.input_.value - this.input_.min) /
        (this.input_.max - this.input_.min);

    if (fraction === 0) {
      this.input_.classList.add(MaterialSlider.cssClasses_.IS_LOWEST_VALUE);
    } else {
      this.input_.classList.remove(MaterialSlider.cssClasses_.IS_LOWEST_VALUE);
    }

    if (this.backgroundLower_ && this.backgroundUpper_) {
      this.backgroundLower_.style.flex = fraction;
      this.backgroundLower_.style.webkitFlex = fraction;
      this.backgroundUpper_.style.flex = 1 - fraction;
      this.backgroundUpper_.style.webkitFlex = 1 - fraction;
    }
  }

  /**
   * Check the input's disabled state and update display.
   *
   * @private
   */
  checkDisabled_() {
    if (this.input_.disabled) {
      this.root_.classList.add(MaterialSlider.cssClasses_.IS_DISABLED);
    } else {
      this.root_.classList.remove(MaterialSlider.cssClasses_.IS_DISABLED);
    }
  }
}
