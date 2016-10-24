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

import {MDLFoundation} from 'mdl-base';

const ROOT = 'mdl-textfield';

export default class MDLTextfieldFoundation extends MDLFoundation {
  static get cssClasses() {
    return {
      ROOT,
      UPGRADED: `${ROOT}--upgraded`,
      DISABLED: `${ROOT}--disabled`,
      FOCUSED: `${ROOT}--focused`,
      INVALID: `${ROOT}--invalid`,
      HELPTEXT_PERSISTENT: `${ROOT}-helptext--persistent`,
      HELPTEXT_VALIDATION_MSG: `${ROOT}-helptext--validation-msg`,
      LABEL_FLOAT_ABOVE: `${ROOT}__label--float-above`
    };
  }

  static get strings() {
    return {
      ARIA_HIDDEN: 'aria-hidden',
      ROLE: 'role'
    };
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      addClassToLabel: (/* className: string */) => {},
      removeClassFromLabel: (/* className: string */) => {},
      addClassToHelptext: (/* className: string */) => {},
      removeClassFromHelptext: (/* className: string */) => {},
      helptextHasClass: (/* className: string */) => /* boolean */ false,
      registerInputFocusHandler: (/* handler: EventListener */) => {},
      deregisterInputFocusHandler: (/* handler: EventListener */) => {},
      registerInputBlurHandler: (/* handler: EventListener */) => {},
      deregisterInputBlurHandler: (/* handler: EventListener */) => {},
      setHelptextAttr: (/* name: string, value: string */) => {},
      removeHelptextAttr: (/* name: string, value: string */) => {},
      getNativeInput: () => /* HTMLInputElement */ ({})
    };
  }

  constructor(adapter = {}) {
    super(Object.assign(MDLTextfieldFoundation.defaultAdapter, adapter));
    this.inputFocusHandler_ = () => this.activateFocus_();
    this.inputBlurHandler_ = () => this.deactivateFocus_();
  }

  init() {
    this.adapter_.addClass(MDLTextfieldFoundation.cssClasses.UPGRADED);
    this.adapter_.registerInputFocusHandler(this.inputFocusHandler_);
    this.adapter_.registerInputBlurHandler(this.inputBlurHandler_);
  }

  destroy() {
    this.adapter_.removeClass(MDLTextfieldFoundation.cssClasses.UPGRADED);
    this.adapter_.deregisterInputFocusHandler(this.inputFocusHandler_);
    this.adapter_.deregisterInputBlurHandler(this.inputBlurHandler_);
  }

  activateFocus_() {
    const {FOCUSED, LABEL_FLOAT_ABOVE} = MDLTextfieldFoundation.cssClasses;
    this.adapter_.addClass(FOCUSED);
    this.adapter_.addClassToLabel(LABEL_FLOAT_ABOVE);
    this.showHelptext_();
  }

  showHelptext_() {
    const {ARIA_HIDDEN} = MDLTextfieldFoundation.strings;
    this.adapter_.removeHelptextAttr(ARIA_HIDDEN);
  }

  deactivateFocus_() {
    const {FOCUSED, INVALID, LABEL_FLOAT_ABOVE} = MDLTextfieldFoundation.cssClasses;
    const input = this.getNativeInput_();
    const isValid = input.checkValidity();

    this.adapter_.removeClass(FOCUSED);
    if (!input.value) {
      this.adapter_.removeClassFromLabel(LABEL_FLOAT_ABOVE);
    }
    if (isValid) {
      this.adapter_.removeClass(INVALID);
    } else {
      this.adapter_.addClass(INVALID);
    }
    this.updateHelptextOnDeactivation_(isValid);
  }

  updateHelptextOnDeactivation_(isValid) {
    const {HELPTEXT_PERSISTENT, HELPTEXT_VALIDATION_MSG} = MDLTextfieldFoundation.cssClasses;
    const {ROLE} = MDLTextfieldFoundation.strings;
    const helptextIsPersistent = this.adapter_.helptextHasClass(HELPTEXT_PERSISTENT);
    const helptextIsValidationMsg = this.adapter_.helptextHasClass(HELPTEXT_VALIDATION_MSG);
    const validationMsgNeedsDisplay = helptextIsValidationMsg && !isValid;

    if (validationMsgNeedsDisplay) {
      this.adapter_.setHelptextAttr(ROLE, 'alert');
    } else {
      this.adapter_.removeHelptextAttr(ROLE);
    }

    if (helptextIsPersistent || validationMsgNeedsDisplay) {
      return;
    }
    this.hideHelptext_();
  }

  hideHelptext_() {
    const {ARIA_HIDDEN} = MDLTextfieldFoundation.strings;
    this.adapter_.setHelptextAttr(ARIA_HIDDEN, 'true');
  }

  isDisabled() {
    return this.getNativeInput_().disabled;
  }

  setDisabled(disabled) {
    const {DISABLED} = MDLTextfieldFoundation.cssClasses;
    this.getNativeInput_().disabled = disabled;
    if (disabled) {
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.removeClass(DISABLED);
    }
  }

  getNativeInput_() {
    return this.adapter_.getNativeInput() || {
      checkValidity: () => true,
      value: '',
      disabled: false
    };
  }
}
