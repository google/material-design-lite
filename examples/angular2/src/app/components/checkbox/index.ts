import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CheckboxComponent } from './checkbox';
import { CheckboxWrapperComponent } from './checkbox-wrapper';
import { CheckboxLabelDirective } from './checkbox-label';

const CHECKBOX_COMPONENTS = [
  CheckboxComponent,
  CheckboxLabelDirective,
  CheckboxWrapperComponent
];

@NgModule({
  imports: [FormsModule],
  exports: [CHECKBOX_COMPONENTS],
  declarations: [CHECKBOX_COMPONENTS],
})
export class CheckboxModule {}