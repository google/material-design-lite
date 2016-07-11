import {Directive, HostBinding, Input} from 'angular2/core';

@Directive({
  selector: '[md-checkbox-label]'
})
export class CheckboxLabelDirective {
  @HostBinding('class') className: string = 'md-checkbox-label';
  @Input() id: string;
}
