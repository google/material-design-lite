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

import BaseComponent from 'mdl-base';
import Checkbox from 'mdl-checkbox';
import IconToggle from 'mdl-icon-toggle';
import Radio from 'mdl-radio';
import Ripple from 'mdl-ripple';
import {MDLTemporaryDrawer as TemporaryDrawer} from 'mdl-drawer';
import autoInit from 'mdl-auto-init';

// Register all components
autoInit.register('MDLCheckbox', Checkbox);
autoInit.register('MDLTemporaryDrawer', TemporaryDrawer);
autoInit.register('MDLRipple', Ripple);
autoInit.register('MDLIconToggle', IconToggle);
autoInit.register('MDLRadio', Radio);

// Export all components.
export {
  BaseComponent,
  Checkbox,
  IconToggle,
  Radio,
  Ripple,
  TemporaryDrawer,
  autoInit
};
