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
import MDLTemporaryDrawerFoundation from './foundation';
import * as util from '../util';

export {MDLTemporaryDrawerFoundation};

export default class MDLTemporaryDrawer extends MDLComponent {
  static buildDom() {
    const {ROOT: CSS_ROOT} = MDLTemporaryDrawerFoundation.cssClasses;

    const root = document.createElement('aside');
    root.classList.add(CSS_ROOT);
    root.innerHTML = `<nav class="${CSS_ROOT}__drawer"></nav>`;

    return root;
  }

  static attachTo(root) {
    return new MDLTemporaryDrawer(root);
  }

  get open() {
    return this.foundation_.isOpen();
  }

  set open(value) {
    if (value) {
      this.foundation_.open();
    } else {
      this.foundation_.close();
    }
  }

  /* Return the drawer element inside the component. */
  get drawer() {
    return this.root_.querySelector(MDLTemporaryDrawerFoundation.strings.DRAWER_SELECTOR);
  }

  getDefaultFoundation() {
    const {FOCUSABLE_ELEMENTS, OPACITY_VAR_NAME} = MDLTemporaryDrawerFoundation.strings;

    return new MDLTemporaryDrawerFoundation({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      hasClass: className => this.root_.classList.contains(className),
      hasNecessaryDom: () => Boolean(this.drawer),
      registerInteractionHandler: (evt, handler) => this.root_.addEventListener(util.remapEvent(evt), handler),
      deregisterInteractionHandler: (evt, handler) => this.root_.removeEventListener(util.remapEvent(evt), handler),
      registerDrawerInteractionHandler: (evt, handler) => this.drawer.addEventListener(util.remapEvent(evt), handler),
      deregisterDrawerInteractionHandler: (evt, handler) =>
          this.drawer.removeEventListener(util.remapEvent(evt), handler),
      registerTransitionEndHandler: handler => this.drawer.addEventListener('transitionend', handler),
      deregisterTransitionEndHandler: handler => this.drawer.removeEventListener('transitionend', handler),
      getDrawerWidth: () => this.drawer.offsetWidth,
      setTranslateX: value => this.drawer.style.setProperty(
          util.getTransformPropertyName(), value === null ? null : `translateX(${value}px)`),
      updateCssVariable: value => {
        if (util.supportsCssCustomProperties()) {
          this.root_.style.setProperty(OPACITY_VAR_NAME, value);
        }
      },
      getFocusableElements: () => this.drawer.querySelectorAll(FOCUSABLE_ELEMENTS),
      saveElementTabState: el => util.saveElementTabState(el),
      restoreElementTabState: el => util.restoreElementTabState(el),
      makeElementUntabbable: el => el.setAttribute('tabindex', -1),
      isRtl: () => getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl'
    });
  }
}
