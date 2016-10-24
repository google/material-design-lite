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

import {Component, HostBinding, Input, ViewEncapsulation} from '@angular/core';

const MDL_FORM_FIELD_STYLES = require('mdl-form-field-styles');

@Component({
  selector: 'mdl-form-field',
  styles: [String(MDL_FORM_FIELD_STYLES)],
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent {
  @Input() alignEnd: boolean = false;
  @HostBinding('class') get className(): string {
    return `mdl-form-field${this.alignEnd ? ' mdl-form-field--align-end' : ''}`;
  }
}
