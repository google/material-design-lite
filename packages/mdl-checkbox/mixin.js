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

import {cssClasses, strings, numbers} from './constants';

/**
 * AOP! Frameworks can define their own methods of doing these things should they choose to!
 * @param {!Object} options Options which won't work in advanced compilation mode...yet.
 */
export default function MDLCheckboxMixin(options = {}) {
  if (!this || typeof this !== 'object') {
    throw new Error('You must call MDLCheckboxMixin with a prototype object as its receiver');
  }

  options = Object.assign({
    addClass: () => {},
    removeClass: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    addNativeCheckboxListener: () => {},
    removeNativeCheckboxListener: () => {},
    getNativeCheckbox: () => {
      throw new Error('I will not work properly without getNativeCheckbox!');
    },
    forceLayout: () => {},
    isAttachedToDOM: () => {}
  }, options);

  Object.assign(this, {
    initMdlCheckbox_() {
      this.currentCheckState_ = strings.TRANSITION_STATE_INIT;
      this.currentAnimationClass_ = '';
      this.animEndLatchTimer_ = 0;
      this.animEndListener_ = () => {
        clearTimeout(this.animEndLatchTimer_);
        this.animEndLatchTimer_ = setTimeout(() => {
          options.removeClass.call(this, this.currentAnimationClass_);
          options.removeEventListener.call(
              this, strings.ANIM_END_EVENT_NAME, this.animEndListener_);
        }, numbers.ANIM_END_LATCH_MS);
      };

      this.eventListeners_ = {
        nativeCheckboxFocus: () => options.addClass.call(this, cssClasses.FOCUSED),
        nativeCheckboxBlur: () => options.removeClass.call(this, cssClasses.FOCUSED),
        nativeCheckboxChange: () => this.transitionCheckState_()
      };
      this.addEventListeners();
    },

    addEventListeners() {
      const {
        nativeCheckboxFocus,
        nativeCheckboxBlur,
        nativeCheckboxChange
      } = this.eventListeners_;
      options.addNativeCheckboxListener.call(this, 'focus', nativeCheckboxFocus);
      options.addNativeCheckboxListener.call(this, 'blur', nativeCheckboxBlur);
      options.addNativeCheckboxListener.call(this, 'change', nativeCheckboxChange);
      this.installPropertyChangeHooks();
    },

    removeEventListeners() {
      const {
        nativeCheckboxFocus,
        nativeCheckboxBlur,
        nativeCheckboxChange
      } = this.eventListeners_;
      options.removeNativeCheckboxListener.call(this, 'focus', nativeCheckboxFocus);
      options.removeNativeCheckboxListener.call(this, 'blur', nativeCheckboxBlur);
      options.removeNativeCheckboxListener.call(this, 'change', nativeCheckboxChange);
      this.uninstallPropertyChangeHooks();
    },

    installPropertyChangeHooks() {
      const nativeCb = options.getNativeCheckbox.call(this);
      const cbProto = Object.getPrototypeOf(nativeCb);
      // We override "checked" as change events only fire on interactions. We
      // want animations to be run when properties change as well.
      ['checked', 'indeterminate'].forEach(controlState => {
        const desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
        Object.defineProperty(nativeCb, controlState, {
          get: desc.get,
          set: state => {
            desc.set.call(nativeCb, state);
            this.transitionCheckState_();
          },
          configurable: desc.configurable,
          enumerable: desc.enumerable
        });
      });

      // NOTE: should we defineProperty indicator hooks are installed onto the nativeCb? This way
      // frameworks can check if hooks are already installed.
    },

    uninstallPropertyChangeHooks() {
      const nativeCb = options.getNativeCheckbox.call(this);
      const cbProto = Object.getPrototypeOf(nativeCb);
      ['checked', 'indeterminate'].forEach(controlState => {
        const desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
        Object.defineProperty(nativeCb, controlState, desc);
      });
    },

    transitionCheckState_() {
      const oldState = this.currentCheckState_;
      const newState = this.determineCheckState_();
      if (oldState === newState) {
        return;
      }

      // Check to ensure that there isn't a previously existing animation class, in case for example
      // the user interacted with the checkbox before the animation was finished.
      if (this.currentAnimationClass_.length > 0) {
        clearTimeout(this.animEndLatchTimer_);
        options.forceLayout.call(this);
        options.removeClass.call(this, this.currentAnimationClass_);
      }

      this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
      this.currentCheckState_ = newState;

      // Check for parentNode so that animations are only run when the element is attached
      // to the DOM.
      if (options.isAttachedToDOM.call(this) && this.currentAnimationClass_.length > 0) {
        options.addClass.call(this, this.currentAnimationClass_);
        options.addEventListener.call(
            this, strings.ANIM_END_EVENT_NAME, this.animEndListener_);
      }
    },

    determineCheckState_() {
      const nativeCb = options.getNativeCheckbox.call(this);
      const {
        TRANSITION_STATE_INDETERMINATE,
        TRANSITION_STATE_CHECKED,
        TRANSITION_STATE_UNCHECKED
      } = strings;

      if (nativeCb.indeterminate) {
        return TRANSITION_STATE_INDETERMINATE;
      }
      return nativeCb.checked ?
        TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
    },

    getTransitionAnimationClass_(oldState, newState) {
      const {
        TRANSITION_STATE_INIT,
        TRANSITION_STATE_CHECKED,
        TRANSITION_STATE_UNCHECKED,
        TRANSITION_STATE_INDETERMINATE
      } = strings;

      const {
        ANIM_UNCHECKED_CHECKED,
        ANIM_UNCHECKED_INDETERMINATE,
        ANIM_CHECKED_UNCHECKED,
        ANIM_CHECKED_INDETERMINATE,
        ANIM_INDETERMINATE_CHECKED,
        ANIM_INDETERMINATE_UNCHECKED
      } = cssClasses;

      switch (oldState) {
        case TRANSITION_STATE_INIT:
          if (newState === TRANSITION_STATE_UNCHECKED) {
            return '';
          }
          // fallthrough
        case TRANSITION_STATE_UNCHECKED:
          return newState === TRANSITION_STATE_CHECKED ?
              ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
        case TRANSITION_STATE_CHECKED:
          return newState === TRANSITION_STATE_UNCHECKED ?
              ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
        case TRANSITION_STATE_INDETERMINATE:
          return newState === TRANSITION_STATE_CHECKED ?
              ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
        default:
          return '';
      }
    }
  });
}
