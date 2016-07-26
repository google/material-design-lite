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

import MDLBaseComponent from 'mdl-base-component';
import MDLCheckboxMixin from './mixin';
import {cssClasses, strings, numbers} from './constants';

/**
 * A Material Design Checkbox.
 * @constructor
 * @final
 * @extends MDLBaseComponent
 */
export default class MDLCheckbox extends MDLBaseComponent {
  static attachTo(root) {
    return new MDLCheckbox(root);
  }

  static mixInto(CtorOrProto, options) {
    const proto = typeof CtorOrProto === 'function' ? CtorOrProto.prototype : CtorOrProto;
    MDLCheckboxMixin.call(proto, options);
  }

  static get cssClasses() {
    return cssClasses;
  }

  static get strings() {
    return strings;
  }

  static get numbers() {
    return numbers;
  }

  constructor(root) {
    super(root);
    this.nativeCb_ = this.root_.querySelector(strings.NATIVE_CONTROL_SELECTOR);
    this.initMdlCheckbox_();
  }
}
MDLCheckboxMixin.call(MDLCheckbox.prototype, {
  addClass(className) {
    this.root_.classList.add(className);
  },
  removeClass(className) {
    this.root_.classList.remove(className);
  },
  addEventListener(type, listener) {
    this.root_.addEventListener(type, listener);
  },
  removeEventListener(type, listener) {
    this.root_.removeEventListener(type, listener);
  },
  getNativeCheckbox() {
    return this.nativeCb_;
  },
  addNativeCheckboxListener(type, listener) {
    this.nativeCb_.addEventListener(type, listener);
  },
  removeNativeCheckboxListener(type, listener) {
    this.nativeCb_.removeEventListener(type, listener);
  },
  forceLayout() {
    // Return to prevent optimizers thinking this is dead code.
    return this.root_.offsetWidth;
  },
  isAttachedToDOM() {
    return Boolean(this.root_.parentNode);
  }
});
