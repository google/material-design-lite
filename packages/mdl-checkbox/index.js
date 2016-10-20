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
import MDLCheckboxFoundation from './foundation';

export {MDLCheckboxFoundation};

export class MDLCheckbox extends MDLComponent {
  static attachTo(root) {
    return new MDLCheckbox(root);
  }

  get nativeCb_() {
    const {NATIVE_CONTROL_SELECTOR} = MDLCheckboxFoundation.strings;
    return this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
  }

  getDefaultFoundation() {
    const {ANIM_END_EVENT_NAME} = MDLCheckboxFoundation.strings;
    return new MDLCheckboxFoundation({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      registerAnimationEndHandler: handler => this.root_.addEventListener(ANIM_END_EVENT_NAME, handler),
      deregisterAnimationEndHandler: handler => this.root_.removeEventListener(ANIM_END_EVENT_NAME, handler),
      registerChangeHandler: handler => this.nativeCb_.addEventListener('change', handler),
      deregisterChangeHandler: handler => this.nativeCb_.removeEventListener('change', handler),
      getNativeControl: () => this.nativeCb_,
      forceLayout: () => this.root_.offsetWidth,
      isAttachedToDOM: () => Boolean(this.root_.parentNode)
    });
  }

  get checked() {
    return this.foundation_.isChecked();
  }

  set checked(checked) {
    this.foundation_.setChecked(checked);
  }

  get indeterminate() {
    return this.foundation_.isIndeterminate();
  }

  set indeterminate(indeterminate) {
    this.foundation_.setIndeterminate(indeterminate);
  }

  get disabled() {
    return this.foundation_.isDisabled();
  }

  set disabled(disabled) {
    this.foundation_.setDisabled(disabled);
  }
}
