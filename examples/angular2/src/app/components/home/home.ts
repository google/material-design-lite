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
