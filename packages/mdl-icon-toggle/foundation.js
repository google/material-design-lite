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

const ROOT = 'mdl-icon-toggle';

export default class MDLIconToggleFoundation extends MDLFoundation {
  static get cssClasses() {
    return {
      ROOT,
      DISABLED: `${ROOT}--disabled`
    };
  }

  static get strings() {
    return {
      DATA_TOGGLE_ON: 'data-toggle-on',
      DATA_TOGGLE_OFF: 'data-toggle-off',
      ARIA_PRESSED: 'aria-pressed',
      ARIA_DISABLED: 'aria-disabled',
      ARIA_LABEL: 'aria-label'
    };
  }

  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerInteractionHandler: (/* type: string, handler: EventListener */) => {},
      deregisterInteractionHandler: (/* type: string, handler: EventListener */) => {},
      setText: (/* text: string */) => {},
      getTabIndex: () => /* number */ 0,
      setTabIndex: (/* tabIndex: number */) => {},
      getAttr: (/* name: string */) => /* string */ '',
      setAttr: (/* name: string, value: string */) => {},
      rmAttr: (/* name: string */) => {},
      notifyChange: (/* evtData: {isOn: boolean} */) => {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MDLIconToggleFoundation.defaultAdapter, adapter));
    this.on_ = false;
    this.disabled_ = false;
    this.savedTabIndex_ = -1;
    this.toggleOnData_ = null;
    this.toggleOffData_ = null;
    this.clickHandler_ = () => this.toggleFromEvt_();
    this.isHandlingKeydown_ = false;
    this.keydownHandler_ = evt => {
      if (isSpace(evt)) {
        this.isHandlingKeydown_ = true;
        return evt.preventDefault();
      }
    };
    this.keyupHandler_ = evt => {
      if (isSpace(evt)) {
        this.isHandlingKeydown_ = false;
        this.toggleFromEvt_();
      }
    };
  }

  init() {
    this.refreshToggleData();
    this.adapter_.registerInteractionHandler('click', this.clickHandler_);
    this.adapter_.registerInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.registerInteractionHandler('keyup', this.keyupHandler_);
  }

  refreshToggleData() {
    const {DATA_TOGGLE_ON, DATA_TOGGLE_OFF} = MDLIconToggleFoundation.strings;
    this.toggleOnData_ = this.parseJsonDataAttr_(DATA_TOGGLE_ON);
    this.toggleOffData_ = this.parseJsonDataAttr_(DATA_TOGGLE_OFF);
  }

  destroy() {
    this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
    this.adapter_.deregisterInteractionHandler('keydown', this.keydownHandler_);
    this.adapter_.deregisterInteractionHandler('keyup', this.keyupHandler_);
  }

  toggleFromEvt_() {
    this.toggle();
    const {on_: isOn} = this;
    this.adapter_.notifyChange({isOn});
  }

  isOn() {
    return this.on_;
  }

  toggle(isOn = !this.on_) {
    this.on_ = isOn;

    const {ARIA_LABEL, ARIA_PRESSED} = MDLIconToggleFoundation.strings;
    const {content, label, cssClass} = this.on_ ? this.toggleOnData_ : this.toggleOffData_;
    const {cssClass: classToRemove} = this.on_ ? this.toggleOffData_ : this.toggleOnData_;

    if (this.on_) {
      this.adapter_.setAttr(ARIA_PRESSED, 'true');
    } else {
      this.adapter_.setAttr(ARIA_PRESSED, 'false');
    }

    if (classToRemove) {
      this.adapter_.removeClass(classToRemove);
    }
    if (cssClass) {
      this.adapter_.addClass(cssClass);
    }
    if (content) {
      this.adapter_.setText(content);
    }
    if (label) {
      this.adapter_.setAttr(ARIA_LABEL, label);
    }
  }

  parseJsonDataAttr_(dataAttr) {
    const val = this.adapter_.getAttr(dataAttr);
    if (!val) {
      return {};
    }
    return JSON.parse(val);
  }

  isDisabled() {
    return this.disabled_;
  }

  setDisabled(isDisabled) {
    this.disabled_ = isDisabled;

    const {DISABLED} = MDLIconToggleFoundation.cssClasses;
    const {ARIA_DISABLED} = MDLIconToggleFoundation.strings;

    if (this.disabled_) {
      this.savedTabIndex = this.adapter_.getTabIndex();
      this.adapter_.setTabIndex(-1);
      this.adapter_.setAttr(ARIA_DISABLED, 'true');
      this.adapter_.addClass(DISABLED);
    } else {
      this.adapter_.setTabIndex(this.savedTabIndex);
      this.adapter_.rmAttr(ARIA_DISABLED);
      this.adapter_.removeClass(DISABLED);
    }
  }

  isKeyboardActivated() {
    return this.isHandlingKeydown_;
  }
}

function isSpace({key, keyCode}) {
  return key && key === 'Space' || keyCode === 32;
}
