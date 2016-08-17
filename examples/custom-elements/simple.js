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

import MDLCheckboxFoundation from './node_modules/mdl-checkbox/foundation';
import MDLCheckbox from './node_modules/mdl-checkbox';

window.customElements.define('simple-checkbox', class extends HTMLElement {
  constructor() {
    super();

    const {NATIVE_CONTROL_SELECTOR} = MDLCheckboxFoundation.strings;

    this.root_ = MDLCheckbox.buildDom();
    this.appendChild(this.root_);

    this.native_ = this.root_.querySelector(NATIVE_CONTROL_SELECTOR);

    this.mdlCheckbox_ = new MDLCheckbox(this.root_);
  }

  disconnectedCallback() {
    this.mdlCheckbox_.destroy();
  }

  get disabled() {
    return this.native_.disabled;
  }

  set disabled(val) {
    this.native_.disabled = val;
  }

  get checked() {
    return this.native_.checked;
  }

  set checked(val) {
    this.native_.checked = val;
  }

  get indeterminate() {
    return this.native_.indeterminate;
  }

  set indeterminate(val) {
    this.native_.indeterminate = val;
  }
});
