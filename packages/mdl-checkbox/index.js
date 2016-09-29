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
import MDLCheckboxFoundation from './foundation';

export {MDLCheckboxFoundation};

export default class MDLCheckbox extends MDLComponent {
  static attachTo(root) {
    return new MDLCheckbox(root);
  }

  getDefaultFoundation() {
    const {ANIM_END_EVENT_NAME, NATIVE_CONTROL_SELECTOR} = MDLCheckboxFoundation.strings;
    const nativeCb = this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
    return new MDLCheckboxFoundation({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      registerAnimationEndHandler: handler => this.root_.addEventListener(ANIM_END_EVENT_NAME, handler),
      deregisterAnimationEndHandler: handler => this.root_.removeEventListener(ANIM_END_EVENT_NAME, handler),
      registerChangeHandler: handler => nativeCb.addEventListener('change', handler),
      deregisterChangeHandler: handler => nativeCb.removeEventListener('change', handler),
      getNativeControl: () => nativeCb,
      forceLayout: () => this.root_.offsetWidth,
      isAttachedToDOM: () => Boolean(this.root_.parentNode)
    });
  }
}
