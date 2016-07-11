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
