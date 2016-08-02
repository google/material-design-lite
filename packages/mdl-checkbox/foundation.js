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
import {cssClasses, strings, numbers} from './constants';

const CB_PROTO_PROPS = ['checked', 'indeterminate'];

export default class MDLCheckboxFoundation extends MDLFoundation {
  static get cssClasses() {
    return cssClasses;
  }

  static get strings() {
    return strings;
  }

  static get numbers() {
    return numbers;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerAnimationEndHandler: (/* handler: EventListener */) => {},
      deregisterAnimationEndHandler: (/* handler: EventListener */) => {},
      registerChangeHandler: (/* handler: EventListener */) => {},
      deregisterChangeHandler: (/* handler: EventListener */) => {},
      getNativeControl: () => /* HTMLInputElement */ {},
      forceLayout: () => {},
      isAttachedToDOM: () => /* boolean */ {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MDLCheckboxFoundation.defaultAdapter, adapter));

    this.currentCheckState_ = strings.TRANSITION_STATE_INIT;
    this.currentAnimationClass_ = '';
    this.animEndLatchTimer_ = 0;
    this.animEndHandler_ = () => {
      clearTimeout(this.animEndLatchTimer_);
      this.animEndLatchTimer_ = setTimeout(() => {
        this.adapter_.removeClass(this.currentAnimationClass_);
        this.adapter_.deregisterAnimationEndHandler(this.animEndHandler_);
      }, numbers.ANIM_END_LATCH_MS);
    };
    this.changeHandler_ = () => this.transitionCheckState_();
  }

  init() {
    this.adapter_.registerChangeHandler(this.changeHandler_);
    this.installPropertyChangeHooks_();
  }

  destroy() {
    this.adapter_.deregisterChangeHandler(this.changeHandler_);
    this.uninstallPropertyChangeHooks_();
  }

  installPropertyChangeHooks_() {
    const nativeCb = this.adapter_.getNativeControl();
    if (!nativeCb) {
      return;
    }
    const cbProto = Object.getPrototypeOf(nativeCb);

    CB_PROTO_PROPS.forEach(controlState => {
      const desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
      // We have to check for this descriptor, since some browsers (Safari) don't support its return.
      // See: https://bugs.webkit.org/show_bug.cgi?id=49739
      if (validDescriptor(desc)) {
        Object.defineProperty(nativeCb, controlState, {
          get: desc.get,
          set: state => {
            desc.set.call(nativeCb, state);
            this.transitionCheckState_();
          },
          configurable: desc.configurable,
          enumerable: desc.enumerable
        });
      }
    });
  }

  uninstallPropertyChangeHooks_() {
    const nativeCb = this.adapter_.getNativeControl();
    if (!nativeCb) {
      return;
    }
    const cbProto = Object.getPrototypeOf(nativeCb);

    CB_PROTO_PROPS.forEach(controlState => {
      const desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
      if (validDescriptor(desc)) {
        Object.defineProperty(nativeCb, controlState, desc);
      }
    });
  }

  transitionCheckState_() {
    const nativeCb = this.adapter_.getNativeControl();
    if (!nativeCb) {
      return;
    }
    const oldState = this.currentCheckState_;
    const newState = this.determineCheckState_(nativeCb);
    if (oldState === newState) {
      return;
    }

    // Check to ensure that there isn't a previously existing animation class, in case for example
    // the user interacted with the checkbox before the animation was finished.
    if (this.currentAnimationClass_.length > 0) {
      clearTimeout(this.animEndLatchTimer_);
      this.adapter_.forceLayout();
      this.adapter_.removeClass(this.currentAnimationClass_);
    }

    this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
    this.currentCheckState_ = newState;

    // Check for parentNode so that animations are only run when the element is attached
    // to the DOM.
    if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
      this.adapter_.addClass(this.currentAnimationClass_);
      this.adapter_.registerAnimationEndHandler(this.animEndHandler_);
    }
  }

  determineCheckState_(nativeCb) {
    const {
      TRANSITION_STATE_INDETERMINATE,
      TRANSITION_STATE_CHECKED,
      TRANSITION_STATE_UNCHECKED
    } = strings;

    if (nativeCb.indeterminate) {
      return TRANSITION_STATE_INDETERMINATE;
    }
    return nativeCb.checked ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
  }

  getTransitionAnimationClass_(oldState, newState) {
    const {
      TRANSITION_STATE_INIT,
      TRANSITION_STATE_CHECKED,
      TRANSITION_STATE_UNCHECKED
    } = strings;

    const {
      ANIM_UNCHECKED_CHECKED,
      ANIM_UNCHECKED_INDETERMINATE,
      ANIM_CHECKED_UNCHECKED,
      ANIM_CHECKED_INDETERMINATE,
      ANIM_INDETERMINATE_CHECKED,
      ANIM_INDETERMINATE_UNCHECKED
    } = MDLCheckboxFoundation.cssClasses;

    switch (oldState) {
      case TRANSITION_STATE_INIT:
        if (newState === TRANSITION_STATE_UNCHECKED) {
          return '';
        }
        // fallthrough
      case TRANSITION_STATE_UNCHECKED:
        return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
      case TRANSITION_STATE_CHECKED:
        return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
      // TRANSITION_STATE_INDETERMINATE
      default:
        return newState === TRANSITION_STATE_CHECKED ?
          ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
    }
  }
}

function validDescriptor(inputPropDesc) {
  return inputPropDesc && typeof inputPropDesc.set === 'function';
}
