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
import MDLRippleFoundation from './foundation';
import {supportsCssVariables, getMatchesProperty} from './util';

const MATCHES = getMatchesProperty(HTMLElement.prototype);

export {MDLRippleFoundation};

export class MDLRipple extends MDLComponent {
  static attachTo(root, {isUnbounded = undefined} = {}) {
    const ripple = new MDLRipple(root);
    // Only override unbounded behavior if option is explicitly specified
    if (isUnbounded !== undefined) {
      ripple.unbounded = isUnbounded;
    }
    return ripple;
  }

  static createAdapter(instance) {
    return {
      browserSupportsCssVars: () => supportsCssVariables(window),
      isUnbounded: () => instance.unbounded,
      isSurfaceActive: () => instance.root_[MATCHES](':active'),
      addClass: className => instance.root_.classList.add(className),
      removeClass: className => instance.root_.classList.remove(className),
      registerInteractionHandler: (evtType, handler) => instance.root_.addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType, handler) => instance.root_.removeEventListener(evtType, handler),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      updateCssVariable: (varName, value) => instance.root_.style.setProperty(varName, value),
      computeBoundingRect: () => instance.root_.getBoundingClientRect(),
      getWindowPageOffset: () => ({x: window.pageXOffset, y: window.pageYOffset})
    };
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
    return new MDLRippleFoundation(MDLRipple.createAdapter(this));
  }

  initialSyncWithDOM() {
    this.unbounded = 'mdlRippleIsUnbounded' in this.root_.dataset;
  }
}
