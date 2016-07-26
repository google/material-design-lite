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

import {Component} from '@angular/core';
import {CheckboxComponent} from '../checkbox/checkbox';
import {CheckboxWrapperComponent} from '../checkbox/checkbox-wrapper';
import {CheckboxLabelDirective} from '../checkbox/checkbox-label';

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.html',
  styleUrls: ['app/components/home/home.css'],
  providers: [],
  directives: [
    CheckboxComponent,
    CheckboxLabelDirective,
    CheckboxWrapperComponent
  ],
  pipes: []
})
export class Home {
  public isChecked: boolean = false;
  public isIndeterminate: boolean = false;
  public labelId: string = 'my-checkbox-label';
  public changeEventCount: number = 0;

  public get status(): string {
    if (this.isIndeterminate) {
      return 'indeterminate';
    }
    return this.isChecked ? 'checked' : 'unchecked';
  }

  handleChange() {
    this.isIndeterminate = false;
    this.changeEventCount++;
  }
}
