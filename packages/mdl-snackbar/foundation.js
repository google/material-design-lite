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

export default class MDLSnackbarFoundation extends MDLFoundation {
  static get cssClasses() {
    return cssClasses;
  }

  static get strings() {
    return strings;
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      setAriaHidden: () => {},
      unsetAriaHidden: () => {},
      setMessageText: (/* message: string */) => {},
      setActionText: (/* actionText: string */) => {},
      setActionAriaHidden: () => {},
      unsetActionAriaHidden: () => {},
      registerActionClickHandler: (/* handler: EventListener */) => {},
      deregisterActionClickHandler: (/* handler: EventListener */) => {},
      registerTransitionEndHandler: (/* handler: EventListener */) => {},
      deregisterTransitionEndHandler: (/* handler: EventListener */) => {}
    };
  }

  get active() {
    return this.active_;
  }

  constructor(adapter) {
    super(Object.assign(MDLSnackbarFoundation.defaultAdapter, adapter));

    this.active_ = false;
    this.queue_ = [];
    this.actionClickHandler_ = () => this.invokeAction_();
  }

  init() {
    this.adapter_.registerActionClickHandler(this.actionClickHandler_);
    this.adapter_.setAriaHidden();
    this.adapter_.setActionAriaHidden();
  }

  destroy() {
    this.adapter_.deregisterActionClickHandler(this.actionClickHandler_);
  }

  show(data) {
    if (!data) {
      throw new Error(
        'Please provide a data object with at least a message to display.');
    }
    if (!data.message) {
      throw new Error('Please provide a message to be displayed.');
    }
    if (data.actionHandler && !data.actionText) {
      throw new Error('Please provide action text with the handler.');
    }

    if (this.active) {
      this.queue_.push(data);
      return;
    }

    const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = cssClasses;
    const {MESSAGE_TIMEOUT} = numbers;

    this.adapter_.setMessageText(data.message);

    if (data.multiline) {
      this.adapter_.addClass(MULTILINE);
      if (data.actionOnBottom) {
        this.adapter_.addClass(ACTION_ON_BOTTOM);
      }
    }

    if (data.actionHandler) {
      this.adapter_.setActionText(data.actionText);
      this.actionHandler_ = data.actionHandler;
      this.setActionHidden_(false);
    } else {
      this.setActionHidden_(true);
      this.actionHandler_ = null;
      this.adapter_.setActionText(null);
    }

    this.active_ = true;
    this.adapter_.addClass(ACTIVE);
    this.adapter_.unsetAriaHidden();

    setTimeout(this.cleanup_.bind(this), data.timeout || MESSAGE_TIMEOUT);
  }

  invokeAction_() {
    if (!this.actionHandler_) {
      return;
    }

    this.actionHandler_();
  }

  cleanup_() {
    const {ACTIVE, MULTILINE, ACTION_ON_BOTTOM} = cssClasses;

    this.adapter_.removeClass(ACTIVE);

    const handler = () => {
      this.adapter_.deregisterTransitionEndHandler(handler);
      this.adapter_.removeClass(MULTILINE);
      this.adapter_.removeClass(ACTION_ON_BOTTOM);
      this.setActionHidden_(true);
      this.adapter_.setMessageText(null);
      this.adapter_.setActionText(null);
      this.adapter_.setAriaHidden();
      this.active_ = false;
      this.showNext_();
    };

    this.adapter_.registerTransitionEndHandler(handler);
  }

  showNext_() {
    if (!this.queue_.length) {
      return;
    }

    this.show(this.queue_.shift());
  }

  setActionHidden_(isHidden) {
    if (isHidden) {
      this.adapter_.setActionAriaHidden();
    } else {
      this.adapter_.unsetActionAriaHidden();
    }
  }
}
