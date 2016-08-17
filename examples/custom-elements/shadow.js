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

window.customElements.define('shadow-checkbox', class extends HTMLElement {
  constructor() {
    super();

    const {ROOT: CSS_ROOT} = MDLCheckboxFoundation.cssClasses;
    const {NATIVE_CONTROL_SELECTOR} = MDLCheckboxFoundation.strings;

    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <link href="checkbox-styles.css" rel="stylesheet">
      <div class="${CSS_ROOT}">
        <input type="checkbox"
               class="${CSS_ROOT}__native-control"/>
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
          <div class="mdl-checkbox__mixedmark"></div>
        </div>
      </div>
    `;

    this.setAttribute('role', 'checkbox');
    this.root_ = this.shadowRoot.querySelector(`.${CSS_ROOT}`);
    this.native_ = this.root_.querySelector(NATIVE_CONTROL_SELECTOR);

    this.foundation_ = this.getDefaultFoundation();
    this.foundation_.init();

    this.changeListener_ = () => this.readState();
    this.native_.addEventListener('change', this.changeListener_);

    this.syncState();
  }

  disconnectedCallback() {
    this.native_.removeEventListener('change', this.changeListener_);
    this.foundation_.destroy();
  }

  static get observedAttributes() {
    return ['checked', 'indeterminate', 'disabled'];
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(val) {
    if (val) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate');
  }

  set indeterminate(val) {
    if (val) {
      this.setAttribute('indeterminate', '');
    } else {
      this.removeAttribute('indeterminate');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.syncState();
  }

  readState() {
    this.disabled = this.native_.disabled;
    this.checked = this.native_.checked;
    this.indeterminate = this.native_.indeterminate;
  }

  syncState() {
    if (this.disabled) {
      this.setAttribute('tabindex', '-1');
      this.setAttribute('aria-disabled', 'true');
      this.native_.disabled = true;
    } else {
      this.setAttribute('tabindex', '0');
      this.setAttribute('aria-disabled', 'false');
      this.native_.disabled = false;
    }

    if (this.checked) {
      this.setAttribute('aria-checked', this.indeterminate ? 'mixed' : 'true');
      this.native_.checked = true;
    } else {
      this.setAttribute('aria-checked', this.indeterminate ? 'mixed' : 'false');
      this.native_.checked = false;
    }
  }

  getDefaultFoundation() {
    const {ANIM_END_EVENT_NAME} = MDLCheckboxFoundation.strings;

    return new MDLCheckboxFoundation({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      registerAnimationEndHandler: handler => this.root_.addEventListener(ANIM_END_EVENT_NAME, handler),
      deregisterAnimationEndHandler: handler => this.root_.removeEventListener(ANIM_END_EVENT_NAME, handler),
      registerChangeHandler: handler => this.native_.addEventListener('change', handler),
      deregisterChangeHandler: handler => this.native_.removeEventListener('change', handler),
      getNativeControl: () => this.native_,
      forceLayout: () => this.root_.offsetWidth,
      isAttachedToDOM: () => Boolean(this.parentNode)
    });
  }
});
