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

import MDLComponent from 'mdl-base';

import MDLTextfieldFoundation from './foundation';

export {MDLTextfieldFoundation};

const {cssClasses} = MDLTextfieldFoundation;

export default class MDLTextfield extends MDLComponent {
  static attachTo(root) {
    return new MDLTextfield(root);
  }

  constructor() {
    super(...arguments);
    const input = this.input_;
    this.helptextElement = input.hasAttribute('aria-controls') ?
      document.getElementById(input.getAttribute('aria-controls')) : null;
  }

  initialSyncWithDom() {
    this.disabled = this.input_.disabled;
  }

  get disabled() {
    return this.foundation_.isDisabled();
  }

  set disabled(disabled) {
    this.foundation_.setDisabled(disabled);
  }

  get input_() {
    return this.root_.querySelector(`.${cssClasses.ROOT}__input`);
  }

  get label_() {
    return this.root_.querySelector(`.${cssClasses.ROOT}__label`);
  }

  getDefaultFoundation() {
    return new MDLTextfieldFoundation(Object.assign({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      addClassToLabel: className => {
        const label = this.label_;
        if (label) {
          label.classList.add(className);
        }
      },
      removeClassFromLabel: className => {
        const label = this.label_;
        if (label) {
          label.classList.remove(className);
        }
      }
    }, this.getInputAdapterMethods_(), this.getHelptextAdapterMethods_()));
  }

  getInputAdapterMethods_() {
    return {
      registerInputFocusHandler: handler => this.input_.addEventListener('focus', handler),
      registerInputBlurHandler: handler => this.input_.addEventListener('blur', handler),
      deregisterInputFocusHandler: handler => this.input_.removeEventListener('focus', handler),
      deregisterInputBlurHandler: handler => this.input_.removeEventListener('blur', handler),
      getNativeInput: () => this.input_
    };
  }

  getHelptextAdapterMethods_() {
    return {
      addClassToHelptext: className => {
        if (this.helptextElement) {
          this.helptextElement.classList.add(className);
        }
      },
      removeClassFromHelptext: className => {
        if (this.helptextElement) {
          this.helptextElement.classList.remove(className);
        }
      },
      helptextHasClass: className => {
        if (!this.helptextElement) {
          return false;
        }
        return this.helptextElement.classList.contains(className);
      },
      setHelptextAttr: (name, value) => {
        if (this.helptextElement) {
          this.helptextElement.setAttribute(name, value);
        }
      },
      removeHelptextAttr: name => {
        if (this.helptextElement) {
          this.helptextElement.removeAttribute(name);
        }
      }
    };
  }
}
