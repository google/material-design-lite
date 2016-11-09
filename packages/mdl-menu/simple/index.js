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
import {PARENT_CHILD_ROLES} from './constants';
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
  get itemsContainer_() {
    return this.root_.querySelector(MDLSimpleMenuFoundation.strings.ITEMS_SELECTOR);
  }

  /* Return the items within the menu. Note that this only contains the set of elements within
   * the items container that are proper list items, and not supplemental / presentational DOM
   * elements.
   */
  get items() {
    const {itemsContainer_: itemsContainer} = this;
    const childRole = PARENT_CHILD_ROLES[itemsContainer.getAttribute('role')];
    return [].slice.call(itemsContainer.querySelectorAll(`[role="${childRole}"]`));
  }

  getDefaultFoundation() {
    return new MDLSimpleMenuFoundation({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      hasClass: className => this.root_.classList.contains(className),
      hasNecessaryDom: () => Boolean(this.itemsContainer_),
      getInnerDimensions: () => {
        const {itemsContainer_: itemsContainer} = this;
        return {width: itemsContainer.offsetWidth, height: itemsContainer.offsetHeight};
      },
      setScale: (x, y) => {
        this.root_.style[getTransformPropertyName(window)] = `scale(${x}, ${y})`;
      },
      setInnerScale: (x, y) => {
        this.itemsContainer_.style[getTransformPropertyName(window)] = `scale(${x}, ${y})`;
      },
      getNumberOfItems: () => this.items.length,
      registerInteractionHandler: (type, handler) => this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.root_.removeEventListener(type, handler),
      getYParamsForItemAtIndex: index => {
        const {offsetTop: top, offsetHeight: height} = this.items[index];
        return {top, height};
      },
      setTransitionDelayForItemAtIndex: (index, value) =>
        this.items[index].style.setProperty('transition-delay', value),
      getIndexForEventTarget: target => this.items.indexOf(target),
      notifySelected: evtData => this.emit('MDLSimpleMenu:selected', {
        index: evtData.index,
        item: this.items[evtData.index]
      })
    });
  }

  initialSyncWithDOM() {
    this.validateRole_();
  }

  validateRole_() {
    const VALID_ROLES = Object.keys(PARENT_CHILD_ROLES);
    const role = this.itemsContainer_.getAttribute('role');
    if (!role) {
      throw new Error(
        'Missing "role" attribute on menu items list element. A "role" attribute is needed for the menu to ' +
        `function properly. Please choose one of ${VALID_ROLES}`
      );
    }
    if (VALID_ROLES.indexOf(role) < 0) {
      throw new Error(`Invalid menu items list role "${role}." Please choose one of ${VALID_ROLES}`);
    }
  }
}
