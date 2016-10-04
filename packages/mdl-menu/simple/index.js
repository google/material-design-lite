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
import MDLSimpleMenuFoundation from './foundation';
import {getTransformPropertyName} from '../util';

export {MDLSimpleMenuFoundation};

export class MDLSimpleMenu extends MDLComponent {
  static attachTo(root) {
    return new MDLSimpleMenu(root);
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

  /* Return the item container element inside the component. */
  get items() {
    return this.root_.querySelector(MDLSimpleMenuFoundation.strings.ITEMS_SELECTOR);
  }

  getDefaultFoundation() {
    return new MDLSimpleMenuFoundation({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      hasClass: className => this.root_.classList.contains(className),
      hasNecessaryDom: () => Boolean(this.items),
      getInnerDimensions: () => {
        const {items} = this;
        return {width: items.offsetWidth, height: items.offsetHeight};
      },
      setScale: (x, y) => {
        this.root_.style[getTransformPropertyName(window)] = `scale(${x}, ${y})`;
      },
      setInnerScale: (x, y) => {
        this.items.style[getTransformPropertyName(window)] = `scale(${x}, ${y})`;
      },
      getNumberOfItems: () => this.items.children.length,
      getYParamsForItemAtIndex: index => {
        const {offsetTop: top, offsetHeight: height} = this.items.children[index];
        return {top, height};
      },
      setTransitionDelayForItemAtIndex: (index, value) =>
        this.items.children[index].style.setProperty('transition-delay', value)
    });
  }
}
