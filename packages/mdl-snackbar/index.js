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
import MDLSnackbarFoundation from './foundation';

export {MDLSnackbarFoundation};

export class MDLSnackbar extends MDLComponent {
  static attachTo(root) {
    return new MDLSnackbar(root);
  }

  show(data) {
    this.foundation_.show(data);
  }

  getDefaultFoundation() {
    const {
      TRANS_END_EVENT_NAME,
      TEXT_SELECTOR,
      ACTION_BUTTON_SELECTOR
    } = MDLSnackbarFoundation.strings;
    const getText = () => this.root_.querySelector(TEXT_SELECTOR);
    const getActionButton = () => this.root_.querySelector(ACTION_BUTTON_SELECTOR);

    /* eslint brace-style: "off" */
    return new MDLSnackbarFoundation({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      setAriaHidden: () => this.root_.setAttribute('aria-hidden', 'true'),
      unsetAriaHidden: () => this.root_.removeAttribute('aria-hidden'),
      setActionAriaHidden: () => getActionButton().setAttribute('aria-hidden', 'true'),
      unsetActionAriaHidden: () => getActionButton().removeAttribute('aria-hidden'),
      setActionText: text => { getActionButton().textContent = text; },
      setMessageText: text => { getText().textContent = text; },
      registerActionClickHandler: handler => getActionButton().addEventListener('click', handler),
      deregisterActionClickHandler: handler => getActionButton().removeEventListener('click', handler),
      registerTransitionEndHandler: handler => this.root_.addEventListener(TRANS_END_EVENT_NAME, handler),
      deregisterTransitionEndHandler: handler => this.root_.removeEventListener(TRANS_END_EVENT_NAME, handler)
    });
  }
}
