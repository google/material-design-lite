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

let idCounter = 0;

export default class MDLCheckbox extends MDLComponent {
  static buildDom({id = `mdl-checkbox-${++idCounter}`, labelId = `mdl-checkbox-label-${id}`} = {}) {
    const {ROOT: CSS_ROOT} = MDLCheckboxFoundation.cssClasses;

    const root = document.createElement('div');
    root.classList.add(CSS_ROOT);
    root.innerHTML = `
      <input type="checkbox"
             class="${CSS_ROOT}__native-control"
             id="${id}"
             aria-labelledby="${labelId}"/>
      <div class="${CSS_ROOT}__frame"></div>
      <div class="${CSS_ROOT}__background">
        <svg version="1.1"
             class="${CSS_ROOT}__checkmark"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <path class="${CSS_ROOT}__checkmark__path"
                fill="none"
                stroke="white"
                d="M4.1,12.7 9,17.6 20.3,6.3"/>
        </svg>
        <div class="md-checkbox__mixedmark"></div>
      </div>
    `;

    return root;
  }

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
