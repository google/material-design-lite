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
import Radio from 'mdl-radio';
import Ripple from 'mdl-ripple';
import autoInit from 'mdl-auto-init';

console.info('Hello, MDL!!!');

// Register all components
autoInit.register('MDLCheckbox', Checkbox);

// Export all components.
export {
  BaseComponent,
  Checkbox,
  Radio,
  Ripple,
  autoInit
};
