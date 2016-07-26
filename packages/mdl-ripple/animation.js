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

/**
 * Create a sequential animation/transition from a list of class names.
 */
export default class SequentialAnimation {
  constructor(ref, renderer, isAnimation = false) {
    this.elementRef_ = ref;

    this.renderer_ = renderer;

    this.eventName_ = isAnimation ? 'animationend' : 'transitionend';

    this.isAnimation_ = isAnimation;

    this.onFinish = null;

    /**
     * Store the promise rejection function for use later.
     */
    this.reject_ = null;
  }

  start(...sequence) {
    const promise = sequence.reduce((acc, cur) => {
      let clsName;
      const useNamedFinish = Array.isArray(cur);
      if (useNamedFinish) {
        clsName = cur[0];
      } else {
        clsName = cur;
      }

      let listener;
      let rejecter;
      const promise = new Promise((resolve, reject) => {
        rejecter = reject;
        listener = ev => {
          if (!this.isAnimation_ && (!useNamedFinish || useNamedFinish && ev.propertyName === cur[1]) ||
              this.isAnimation_ && ev.animationName === cur[1]) {
            // Cleanup current animation and trigger next.
            this.renderer_.removeEventListener(this.elementRef_, this.eventName_, listener);
            this.renderer_.removeClass(this.elementRef_, clsName);
            resolve();
          }
        };
      }).catch(() => {
        // Animation chain was canceled - remove current class.
        this.renderer_.removeEventListener(this.elementRef_, this.eventName_, listener);
        this.renderer_.removeClass(this.elementRef_, clsName);
      });
      return acc.then(() => {
        this.reject_ = rejecter;
        this.renderer_.addEventListener(this.elementRef_, this.eventName_, listener);
        // Begin the next animation.
        this.renderer_.addClass(this.elementRef_, clsName);
        return promise;
      });
    }, Promise.resolve());

    promise.then(() => {
      if (this.onFinish) {
        this.onFinish();
      }
    });
  }

  stop() {
    if (this.reject_) {
      this.reject_();
      this.reject_ = null;
    }
  }
}
