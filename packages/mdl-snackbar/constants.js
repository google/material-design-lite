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

const ROOT = 'mdl-snackbar';

export const cssClasses = {
  ROOT,
  TEXT: `${ROOT}__text`,
  ACTION_WRAPPER: `${ROOT}__action-wrapper`,
  ACTION_BUTTON: `${ROOT}__action-button`,
  ACTIVE: `${ROOT}--active`,
  MULTILINE: `${ROOT}--multiline`,
  ACTION_ON_BOTTOM: `${ROOT}--action-on-bottom`
};

export const strings = {
  get TRANS_END_EVENT_NAME() {
    const el = document.createElement('div');
    // NOTE: We can immediately assume that the prefix is 'webkit' in browsers that don't
    // support unprefixed transtions since the only browsers up to two major versions back that
    // don't support unprefixed names are mobile Safari and Android native browser, both of
    // which use the 'webkit' prefix.
    return 'transition' in el.style ? 'transitionend' : 'webkitTransitionEnd';
  },

  get TEXT_SELECTOR() {
    return `.${cssClasses.TEXT}`;
  },

  get ACTION_WRAPPER_SELECTOR() {
    return `.${cssClasses.ACTION_WRAPPER}`;
  },

  get ACTION_BUTTON_SELECTOR() {
    return `.${cssClasses.ACTION_BUTTON}`;
  }
};

export const numbers = {
  MESSAGE_TIMEOUT: 2750
};
