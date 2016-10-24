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

import {MDLComponent} from 'mdl-base';
import {MDLRipple, MDLRippleFoundation} from 'mdl-ripple';

import MDLRadioFoundation from './foundation';

export {MDLRadioFoundation};

export class MDLRadio extends MDLComponent {
  static attachTo(root) {
    return new MDLRadio(root);
  }

  get checked() {
    return this.foundation_.isChecked();
  }

  set checked(checked) {
    this.foundation_.setChecked(checked);
  }

  get disabled() {
    return this.foundation_.isDisabled();
  }

  set disabled(disabled) {
    this.foundation_.setDisabled(disabled);
  }

  constructor() {
    super(...arguments);
    this.ripple_ = this.initRipple_();
  }

  initRipple_() {
    const adapter = Object.assign(MDLRipple.createAdapter(this), {
      isUnbounded: () => true,
      // Radio buttons technically go "active" whenever there is *any* keyboard interaction. This is not the
      // UI we desire.
      isSurfaceActive: () => false,
      registerInteractionHandler: (type, handler) => this.nativeControl_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.nativeControl_.removeEventListener(type, handler),
      computeBoundingRect: () => {
        const {left, top} = this.root_.getBoundingClientRect();
        const DIM = 40;
        return {
          top,
          left,
          right: left + DIM,
          bottom: top + DIM,
          width: DIM,
          height: DIM
        };
      }
    });
    const foundation = new MDLRippleFoundation(adapter);
    return new MDLRipple(this.root_, foundation);
  }

  get nativeControl_() {
    return this.root_.querySelector(MDLRadioFoundation.strings.NATIVE_CONTROL_SELECTOR);
  }

  destroy() {
    this.ripple_.destroy();
    super.destroy();
  }

  getDefaultFoundation() {
    return new MDLRadioFoundation({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      getNativeControl: () => this.root_.querySelector(MDLRadioFoundation.strings.NATIVE_CONTROL_SELECTOR)
    });
  }
}
