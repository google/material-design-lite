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
import MDLRippleFoundation from './foundation';
import {supportsCssVariables, getMatchesProperty} from './util';

const MATCHES = getMatchesProperty(HTMLElement.prototype);

export {MDLRippleFoundation};

export default class MDLRipple extends MDLComponent {
  static attachTo(root, {isUnbounded = undefined} = {}) {
    const ripple = new MDLRipple(root);
    // Only override unbounded behavior if option is explicitly specified
    if (isUnbounded !== undefined) {
      ripple.unbounded = isUnbounded;
    }
    return ripple;
  }

  get unbounded() {
    return this.unbounded_;
  }

  set unbounded(unbounded) {
    const {UNBOUNDED} = MDLRippleFoundation.cssClasses;
    this.unbounded_ = Boolean(unbounded);
    if (this.unbounded_) {
      this.root_.classList.add(UNBOUNDED);
    } else {
      this.root_.classList.remove(UNBOUNDED);
    }
  }

  getDefaultFoundation() {
    return new MDLRippleFoundation({
      browserSupportsCssVars: () => supportsCssVariables(window),
      isUnbounded: () => this.unbounded,
      isSurfaceActive: () => this.root_[MATCHES](':active'),
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      registerInteractionHandler: (evtType, handler) => this.root_.addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType, handler) => this.root_.removeEventListener(evtType, handler),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      updateCssVariable: (varName, value) => this.root_.style.setProperty(varName, value),
      computeBoundingRect: () => this.root_.getBoundingClientRect(),
      getWindowPageOffset: () => ({x: window.pageXOffset, y: window.pageYOffset})
    });
  }

  initialSyncWithDOM() {
    this.unbounded = 'mdlRippleIsUnbounded' in this.root_.dataset;
  }
}
