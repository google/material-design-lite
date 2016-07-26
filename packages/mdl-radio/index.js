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

import MDLBaseComponent, {
  MDLBaseAdapter
} from 'mdl-base-component';
import MDLRadioMixin, {
  Identifier
} from './mixin';

export default class MDLRadio extends MDLBaseComponent {
  static attachTo(root) {
    return new MDLRadio(root);
  }

  constructor(root) {
    super(root);

    const nativeInput = root.getElementsByClassName(Identifier.NATIVE_INPUT)[0];
    const elements = {
      [Identifier.ROOT]: root,
      [Identifier.NATIVE_INPUT]: nativeInput
    };

    this.elements_ = elements;

    this.initMdlRadio_();
  }
}

MDLRadioMixin.call(MDLRadio.prototype, MDLBaseAdapter);
