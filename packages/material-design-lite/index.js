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

import * as base from 'mdl-base';
import * as checkbox from 'mdl-checkbox';
import * as iconToggle from 'mdl-icon-toggle';
import * as radio from 'mdl-radio';
import * as ripple from 'mdl-ripple';
import * as drawer from 'mdl-drawer';
import * as textfield from 'mdl-textfield';
import * as snackbar from 'mdl-snackbar';
import autoInit from 'mdl-auto-init';

// Register all components
autoInit.register('MDLCheckbox', checkbox.MDLCheckbox);
autoInit.register('MDLTemporaryDrawer', drawer.MDLTemporaryDrawer);
autoInit.register('MDLRipple', ripple.MDLRipple);
autoInit.register('MDLIconToggle', iconToggle.MDLIconToggle);
autoInit.register('MDLRadio', radio.MDLRadio);
autoInit.register('MDLSnackbar', snackbar.MDLSnackbar);
autoInit.register('MDLTextfield', textfield.MDLTextfield);

// Export all components.
export {
  base,
  checkbox,
  iconToggle,
  radio,
  ripple,
  snackbar,
  drawer,
  textfield,
  autoInit
};
