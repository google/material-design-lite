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

import {Component, HostBinding, ViewEncapsulation} from 'angular2/core';

@Component({
  selector: 'md-checkbox-wrapper',
  template: `
    <div class="md-checkbox-wrapper__layout">
      <ng-content></ng-content>
    </div>
  `,
  // Style URLs are pulled in by md-checkbox, which we assume we are using.
  encapsulation: ViewEncapsulation.None
})
export class CheckboxWrapperComponent {
  @HostBinding('class') className: string = 'md-checkbox-wrapper';
};
