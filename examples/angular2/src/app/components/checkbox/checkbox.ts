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
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/common';
// Since we don't have typings (yet) we require mdl-checkbox manually.
const {default: MDLCheckbox} = require('mdl-checkbox');
// Use webpack's require function to load the css
const MDL_CHECKBOX_STYLES = require('mdl-checkbox-styles');

// Needed for ngModel to work properly.
const MD_CHECKBOX_CONTROL_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    });

type UnlistenerMap = WeakMap<EventListener, Function>;

@Component({
  moduleId: module.id,
  selector: 'md-checkbox',
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
  @Output() change: EventEmitter<Event> = new EventEmitter();
  @HostBinding('class') className: string = 'md-checkbox';
  @ViewChild('nativeCb') nativeCb: ElementRef;
  // value accessor stuff
  onTouched: () => any = () => {};

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => {};
  private _unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

  constructor(private _renderer: Renderer, private _root: ElementRef) {}

  ngAfterViewInit() {
    (<any>this).initMdlCheckbox_();
  }

  ngOnDestroy() {
    // inherited from MDLCheckbox
    (<any>this).removeEventListeners();
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
}
// NOTE: We can make this better by providing type definitions for MixInto
MDLCheckbox.mixInto(CheckboxComponent, {
  addClass(className: string) {
    const {_renderer: renderer, _root: root} = <any>this;
    renderer.setElementClass(root.nativeElement, className, true);
  },

  removeClass(className: string) {
    const {_renderer: renderer, _root: root} = <any>this;
    renderer.setElementClass(root.nativeElement, className, false);
  },

  addEventListener(type: string, listener: EventListener) {
    const self = <any>this;
    if (self._root) {
      listen.call(self, self._root, type, listener);
    }
  },

  removeEventListener(type: string, listener: EventListener) {
    unlisten.call(<any>this, type, listener);
  },

  getNativeCheckbox() {
    const {nativeCb} = <any>this;
    if (!nativeCb) {
      throw new Error('Invalid state');
    }
    return nativeCb.nativeElement;
  },

  addNativeCheckboxListener(type: string, listener: EventListener) {
    const self = <any>this;
    if (self.nativeCb) {
      listen.call(self, self.nativeCb, type, listener);
    }
  },

  removeNativeCheckboxListener(type, listener) {
    unlisten.call(<any>this, type, listener);
  },

  forceLayout() {
    const {_root: root} = <any>this;
    // Return to prevent optimizers thinking this is dead code.
    return root.offsetWidth;
  },

  isAttachedToDOM() {
    const self = <any>this;
    return !!self._root && !!self._root.nativeElement;
  }
});

function listen(ref: ElementRef, type: string, listener: EventListener) {
  const self = <any>this;
  if (!self._unlisteners.has(type)) {
    self._unlisteners.set(type, new WeakMap<EventListener, Function>());
  }
  const unlistener = self._renderer.listen(ref.nativeElement, type, listener);
  self._unlisteners.get(type).set(listener, unlistener);
}

function unlisten(type: string, listener: EventListener) {
  const self = <any>this;
  if (!self._unlisteners.has(type)) {
    return;
  }
  const unlisteners = self._unlisteners.get(type);
  if (!unlisteners.has(listener)) {
    return;
  }
  unlisteners.get(listener)();
  unlisteners.delete(listener);
}
