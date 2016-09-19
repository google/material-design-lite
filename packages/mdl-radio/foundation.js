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

const ROOT = 'mdl-radio';

export default class MDLRadioFoundation extends MDLFoundation {
  static get cssClasses() {
    return {
      ROOT,
      DISABLED: `${ROOT}--disabled`
    };
  }

  static get strings() {
    return {
      NATIVE_CONTROL_SELECTOR: `.${ROOT}__native-control`
    };
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      getNativeControl: () => /* HTMLInputElement */ {}
    };
  }

  isChecked() {
    return this.getNativeControl_().checked;
  }

  setChecked(checked) {
    this.getNativeControl_().checked = checked;
  }

  isDisabled() {
    return this.getNativeControl_().disabled;
  }

  setDisabled(disabled) {
    const {DISABLED} = MDLRadioFoundation.cssClasses;
    this.getNativeControl_().disabled = disabled;
    if (disabled) {
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.removeClass(DISABLED);
    }
  }

  getNativeControl_() {
    return this.adapter_.getNativeControl() || {
      checked: false,
      disabled: false
    };
  }
}
