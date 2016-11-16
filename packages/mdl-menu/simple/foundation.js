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
import {clamp, bezierProgress} from '../util';

export default class MDLSimpleMenuFoundation extends MDLFoundation {
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
      hasClass: (/* className: string */) => {},
      hasNecessaryDom: () => /* boolean */ false,
      getInnerDimensions: () => /* { width: number, height: number } */ ({}),
      hasAnchor: () => /* boolean */ false,
      getAnchorDimensions: () =>
          /* { width: number, height: number, top: number, right: number, bottom: number, left: number } */ ({}),
      getWindowDimensions: () => /* { width: number, height: number } */ ({}),
      setScale: (/* x: number, y: number */) => {},
      setInnerScale: (/* x: number, y: number */) => {},
      getNumberOfItems: () => /* number */ 0,
      registerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* type: string, handler: EventListener */) => {},
      registerDocumentClickHandler: (/* handler: EventListener */) => {},
      deregisterDocumentClickHandler: (/* handler: EventListener */) => {},
      getYParamsForItemAtIndex: (/* index: number */) => /* {top: number, height: number} */ ({}),
      setTransitionDelayForItemAtIndex: (/* index: number, value: string */) => {},
      getIndexForEventTarget: (/* target: EventTarget */) => /* number */ 0,
      notifySelected: (/* evtData: {index: number} */) => {},
      notifyCancel: () => {},
      saveFocus: () => {},
      restoreFocus: () => {},
      isFocused: () => /* boolean */ false,
      focus: () => {},
      getFocusedItemIndex: () => /* number */ -1,
      focusItemAtIndex: (/* index: number */) => {},
      isRtl: () => /* boolean */ false,
      setTransformOrigin: (/* origin: string */) => {},
      setPosition: (/* position: { top: string, right: string, bottom: string, left: string } */) => {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MDLSimpleMenuFoundation.defaultAdapter, adapter));
    this.clickHandler_ = evt => this.handlePossibleSelected_(evt);
    this.keydownHandler_ = evt => this.handleKeyboardDown_(evt);
    this.keyupHandler_ = evt => this.handleKeyboardUp_(evt);
    this.documentClickHandler_ = evt => {
      this.adapter_.notifyCancel();
      this.close();
    };
    this.isOpen_ = false;
    this.startScaleX_ = 0;
    this.startScaleY_ = 0;
    this.targetScale_ = 1;
    this.scaleX_ = 0;
    this.scaleY_ = 0;
    this.running_ = false;
    this.selectedTriggerTimerId_ = 0;
  }

  init() {
    const {ROOT, OPEN} = MDLSimpleMenuFoundation.cssClasses;

    if (!this.adapter_.hasClass(ROOT)) {
      throw new Error(`${ROOT} class required in root element.`);
    }

    if (!this.adapter_.hasNecessaryDom()) {
      throw new Error(`Required DOM nodes missing in ${ROOT} component.`);
    }

    if (this.adapter_.hasClass(OPEN)) {
      this.isOpen_ = true;
    }

    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
    this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
  }

  destroy() {
    clearTimeout(this.selectedTriggerTimerId_);
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
    this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterDocumentClickHandler(this.documentClickHandler_);
  }

  // Calculate transition delays for individual menu items, so that they fade in one at a time.
  applyTransitionDelays_() {
    const {BOTTOM_LEFT, BOTTOM_RIGHT} = MDLSimpleMenuFoundation.cssClasses;
    const numItems = this.adapter_.getNumberOfItems();
    const {height} = this.dimensions_;
    const transitionDuration = MDLSimpleMenuFoundation.numbers.TRANSITION_DURATION_MS / 1000;
    const start = MDLSimpleMenuFoundation.numbers.TRANSITION_SCALE_ADJUSTMENT_Y;

    for (let index = 0; index < numItems; index++) {
      const {top: itemTop, height: itemHeight} = this.adapter_.getYParamsForItemAtIndex(index);
      this.itemHeight_ = itemHeight;
      let itemDelayFraction = itemTop / height;
      if (this.adapter_.hasClass(BOTTOM_LEFT) || this.adapter_.hasClass(BOTTOM_RIGHT)) {
        itemDelayFraction = ((height - itemTop - itemHeight) / height);
      }
      const itemDelay = (start + itemDelayFraction * (1 - start)) * transitionDuration;
      // Use toFixed() here to normalize CSS unit precision across browsers
      this.adapter_.setTransitionDelayForItemAtIndex(index, `${itemDelay.toFixed(3)}s`);
    }
  }

  // Remove transition delays from menu items.
  removeTransitionDelays_() {
    const numItems = this.adapter_.getNumberOfItems();
    for (let i = 0; i < numItems; i++) {
      this.adapter_.setTransitionDelayForItemAtIndex(i, null);
    }
  }

  // Animate menu opening or closing.
  animationLoop_() {
    const time = window.performance.now();
    const {TRANSITION_DURATION_MS, TRANSITION_X1, TRANSITION_Y1, TRANSITION_X2, TRANSITION_Y2,
        TRANSITION_SCALE_ADJUSTMENT_X, TRANSITION_SCALE_ADJUSTMENT_Y} = MDLSimpleMenuFoundation.numbers;
    const currentTime = clamp((time - this.startTime_) / TRANSITION_DURATION_MS);

    // Animate X axis very slowly, so that only the Y axis animation is visible during fade-out.
    let currentTimeX = clamp(
      (currentTime - TRANSITION_SCALE_ADJUSTMENT_X) / (1 - TRANSITION_SCALE_ADJUSTMENT_X)
    );
    // No time-shifting on the Y axis when closing.
    let currentTimeY = currentTime;

    let startScaleY = this.startScaleY_;
    if (this.targetScale_ === 1) {
      // Start with the menu at the height of a single item.
      if (this.itemHeight_) {
        startScaleY = Math.max(this.itemHeight_ / this.dimensions_.height, startScaleY);
      }
      // X axis moves faster, so time-shift forward.
      currentTimeX = clamp(currentTime + TRANSITION_SCALE_ADJUSTMENT_X);
      // Y axis moves slower, so time-shift backwards and adjust speed by the difference.
      currentTimeY = clamp(
        (currentTime - TRANSITION_SCALE_ADJUSTMENT_Y) / (1 - TRANSITION_SCALE_ADJUSTMENT_Y)
      );
    }

    // Apply cubic bezier easing independently to each axis.
    const easeX = bezierProgress(currentTimeX, TRANSITION_X1, TRANSITION_Y1, TRANSITION_X2, TRANSITION_Y2);
    const easeY = bezierProgress(currentTimeY, TRANSITION_X1, TRANSITION_Y1, TRANSITION_X2, TRANSITION_Y2);

    // Calculate the scales to apply to the outer container and inner container.
    this.scaleX_ = this.startScaleX_ + (this.targetScale_ - this.startScaleX_) * easeX;
    const invScaleX = 1 / (this.scaleX_ === 0 ? 1 : this.scaleX_);
    this.scaleY_ = startScaleY + (this.targetScale_ - startScaleY) * easeY;
    const invScaleY = 1 / (this.scaleY_ === 0 ? 1 : this.scaleY_);

    // Apply scales.
    this.adapter_.setScale(this.scaleX_, this.scaleY_);
    this.adapter_.setInnerScale(invScaleX, invScaleY);

    // Stop animation when we've covered the entire 0 - 1 range of time.
    if (currentTime < 1) {
      requestAnimationFrame(() => this.animationLoop_());
    } else {
      this.running_ = false;
      this.adapter_.removeClass(MDLSimpleMenuFoundation.cssClasses.ANIMATING);
    }
  }

  // Starts the open or close animation.
  animateMenu_() {
    this.startTime_ = window.performance.now();
    this.startScaleX_ = this.scaleX_;
    this.startScaleY_ = this.scaleY_;

    this.targetScale_ = this.isOpen_ ? 1 : 0;

    if (!this.running_) {
      this.running_ = true;
      requestAnimationFrame(() => this.animationLoop_());
    }
  }

  focusOnOpen_(focusIndex) {
    if (focusIndex === null) {
      // First, try focusing the menu.
      this.adapter_.focus();
      // If that doesn't work, focus first item instead.
      if (!this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(0);
      }
    } else {
      this.adapter_.focusItemAtIndex(focusIndex);
    }
  }

  // Handle keys that we want to repeat on hold (tab and arrows).
  handleKeyboardDown_(evt) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (evt.altKey || evt.ctrlKey || evt.metaKey) {
      return true;
    }

    const {keyCode, key, shiftKey} = evt;
    const isTab = key === 'Tab' || keyCode === 9;
    const isArrowUp = key === 'ArrowUp' || keyCode === 38;
    const isArrowDown = key === 'ArrowDown' || keyCode === 40;

    const focusedItemIndex = this.adapter_.getFocusedItemIndex();
    const lastItemIndex = this.adapter_.getNumberOfItems() - 1;

    if (shiftKey && isTab && focusedItemIndex === 0) {
      this.adapter_.focusItemAtIndex(lastItemIndex);
      evt.preventDefault();
      return false;
    }

    if (!shiftKey && isTab && focusedItemIndex === lastItemIndex) {
      this.adapter_.focusItemAtIndex(0);
      evt.preventDefault();
      return false;
    }

    if (isArrowUp) {
      if (focusedItemIndex === 0 || this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(lastItemIndex);
      } else {
        this.adapter_.focusItemAtIndex(focusedItemIndex - 1);
      }
    }

    if (isArrowDown) {
      if (focusedItemIndex === lastItemIndex || this.adapter_.isFocused()) {
        this.adapter_.focusItemAtIndex(0);
      } else {
        this.adapter_.focusItemAtIndex(focusedItemIndex + 1);
      }
    }

    return true;
  }

  // Handle keys that we don't want to repeat on hold (Enter, Space, Escape).
  handleKeyboardUp_(evt) {
    // Do nothing if Alt, Ctrl or Meta are pressed.
    if (evt.altKey || evt.ctrlKey || evt.metaKey) {
      return true;
    }

    const {keyCode, key} = evt;
    const isEnter = key === 'Enter' || keyCode === 13;
    const isSpace = key === 'Space' || keyCode === 32;
    const isEscape = key === 'Escape' || keyCode === 27;

    if (isEnter || isSpace) {
      this.handlePossibleSelected_(evt);
    }

    if (isEscape) {
      this.adapter_.notifyCancel();
      this.close();
    }

    return true;
  }

  handlePossibleSelected_(evt) {
    const targetIndex = this.adapter_.getIndexForEventTarget(evt.target);
    if (targetIndex < 0) {
      return;
    }
    // Debounce multiple selections
    if (this.selectedTriggerTimerId_) {
      return;
    }
    this.selectedTriggerTimerId_ = setTimeout(() => {
      this.selectedTriggerTimerId_ = 0;
      this.close();
      this.adapter_.notifySelected({index: targetIndex});
    }, numbers.SELECTED_TRIGGER_DELAY);
  }

  autoPosition_() {
    if (!this.adapter_.hasAnchor()) {
      return;
    }

    // Defaults: open from the top left.
    let vertical = 'top';
    let horizontal = 'left';

    const anchor = this.adapter_.getAnchorDimensions();
    const windowDimensions = this.adapter_.getWindowDimensions();

    const topOverflow = anchor.top + this.dimensions_.height - windowDimensions.height;
    const bottomOverflow = this.dimensions_.height - anchor.bottom;
    const extendsBeyondTopBounds = topOverflow > 0;

    if (extendsBeyondTopBounds) {
      if (bottomOverflow < topOverflow) {
        vertical = 'bottom';
      }
    }

    const leftOverflow = anchor.left + this.dimensions_.width - windowDimensions.width;
    const rightOverflow = this.dimensions_.width - anchor.right;
    const extendsBeyondLeftBounds = leftOverflow > 0;
    const extendsBeyondRightBounds = rightOverflow > 0;

    if (this.adapter_.isRtl()) {
      // In RTL, we prefer to open from the right.
      horizontal = 'right';
      if (extendsBeyondRightBounds && leftOverflow < rightOverflow) {
        horizontal = 'left';
      }
    } else if (extendsBeyondLeftBounds && rightOverflow < leftOverflow) {
      horizontal = 'right';
    }

    const position = {
      [horizontal]: '0',
      [vertical]: '0'
    };

    this.adapter_.setTransformOrigin(`${vertical} ${horizontal}`);
    this.adapter_.setPosition(position);
  }

  // Open the menu.
  open({focusIndex = null} = {}) {
    this.adapter_.saveFocus();
    this.adapter_.addClass(MDLSimpleMenuFoundation.cssClasses.ANIMATING);
    requestAnimationFrame(() => {
      this.dimensions_ = this.adapter_.getInnerDimensions();
      this.applyTransitionDelays_();
      this.autoPosition_();
      this.animateMenu_();
      this.adapter_.addClass(MDLSimpleMenuFoundation.cssClasses.OPEN);
      this.focusOnOpen_(focusIndex);
      this.adapter_.registerDocumentClickHandler(this.documentClickHandler_);
    });
    this.isOpen_ = true;
  }

  // Close the menu.
  close() {
    this.adapter_.deregisterDocumentClickHandler(this.documentClickHandler_);
    this.adapter_.addClass(MDLSimpleMenuFoundation.cssClasses.ANIMATING);
    requestAnimationFrame(() => {
      this.removeTransitionDelays_();
      this.animateMenu_();
      this.adapter_.removeClass(MDLSimpleMenuFoundation.cssClasses.OPEN);
    });
    this.isOpen_ = false;
    this.adapter_.restoreFocus();
  }

  isOpen() {
    return this.isOpen_;
  }
}
