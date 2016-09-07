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

const ROOT = 'mdl-temporary-drawer';

export const cssClasses = {
  ROOT,
  OPEN: `${ROOT}--open`,
  ANIMATING: `${ROOT}--animating`,
  RIGHT: `${ROOT}--right`
};

export const strings = {
  DRAWER_SELECTOR: `.${ROOT}__drawer`,
  OPACITY_VAR_NAME: `--${ROOT}-opacity`,
  FOCUSABLE_ELEMENTS: 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' +
      'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]'
};
