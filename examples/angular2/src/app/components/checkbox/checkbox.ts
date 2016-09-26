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

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  Provider,
  Renderer,
  ViewChild,
  ViewEncapsulation,
  forwardRef
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

// Since we don't have typings (yet) we require mdl-checkbox manually.
const {MDLCheckboxFoundation} = require('mdl-checkbox');
// Use webpack's require function to load the css
const MDL_CHECKBOX_STYLES = require('mdl-checkbox-styles');

// Needed for ngModel to work properly.
export const MD_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

type UnlistenerMap = WeakMap<EventListener, Function>;


@Component({
  selector: 'mdl-checkbox',
  templateUrl: 'app/components/checkbox/checkbox.html',
  styles: [String(MDL_CHECKBOX_STYLES)],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MD_CHECKBOX_CONTROL_VALUE_ACCESSOR]
})
export class CheckboxComponent implements AfterViewInit, OnDestroy {
  @Input() checked: boolean = false;
  @Input() indeterminate: boolean = false;
  @Input() labelId: string;
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  @HostBinding('class') className: string = 'mdl-checkbox';
  @ViewChild('nativeCb') nativeCb: ElementRef;
  // value accessor stuff
  onTouched: () => any = () => {};

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => {};
  private _unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

  // Here we instantiate our checkbox adapter, using angular's abstraction mechanisms to interop
  // with the angular2 environment.
  private _mdlAdapter: MDLFoudationAdapter = {
    addClass: (className: string) => {
      const {_renderer: renderer, _root: root} = this;
      renderer.setElementClass(root.nativeElement, className, true);
    },
    removeClass: (className: string) => {
      const {_renderer: renderer, _root: root} = this;
      renderer.setElementClass(root.nativeElement, className, false);
    },
    registerAnimationEndHandler: (handler: EventListener) => {
      if (this._root) {
        this.listen_(MDLCheckboxFoundation.strings.ANIM_END_EVENT_NAME, handler);
      }
    },
    deregisterAnimationEndHandler: (handler: EventListener) => {
      this.unlisten_(MDLCheckboxFoundation.strings.ANIM_END_EVENT_NAME, handler);
    },
    registerChangeHandler: (handler: EventListener) => {
      if (this._root) {
        this.listen_('change', handler, this.nativeCb);
      }
    },
    deregisterChangeHandler: (handler: EventListener) => {
      this.unlisten_('change', handler);
    },
    getNativeControl: () => {
      const {nativeCb} = this;
      if (!nativeCb) {
        throw new Error('Invalid state');
      }
      return nativeCb.nativeElement;
    },
    forceLayout: () => {
      if (this._root) {
        // Return to prevent optimizers thinking this is dead code.
        return this._root.nativeElement.offsetWidth;
      }
    },
    isAttachedToDOM: () => Boolean(this._root)
  };

  // Now we simply instantiate our foundation given our adapter.
  private _foundation: {init: Function, destroy: Function} =
      new MDLCheckboxFoundation(this._mdlAdapter);

  constructor(private _renderer: Renderer, private _root: ElementRef) {}

  // Lifecycle methods where we initialize and destroy (respectively) the checkbox foundation.
  ngAfterViewInit() {
    this._foundation.init();
  }
  ngOnDestroy() {
    this._foundation.destroy();
  }

  handleChange(evt: Event) {
    // Stop native checkbox change event from bubbling.
    evt.stopPropagation();
    this._controlValueAccessorChangeFn((<any>evt.target).checked);
    this.change.emit(evt);
  }

  // ControlValueAccessor stuff below, for ngModel.

  writeValue(value: any) {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  listen_(type: string, listener: EventListener, ref: ElementRef = this._root) {
    if (!this._unlisteners.has(type)) {
      this._unlisteners.set(type, new WeakMap<EventListener, Function>());
    }
    const unlistener = this._renderer.listen(ref.nativeElement, type, listener);
    this._unlisteners.get(type).set(listener, unlistener);
  }

  unlisten_(type: string, listener: EventListener) {
    if (!this._unlisteners.has(type)) {
      return;
    }
    const unlisteners = this._unlisteners.get(type);
    if (!unlisteners.has(listener)) {
      return;
    }
    unlisteners.get(listener)();
    unlisteners.delete(listener);
  }
}
