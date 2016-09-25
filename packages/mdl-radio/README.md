# MDL Radio

The MDL Radio component provides a radio button adhering to the [Material Design Specification](https://material.google.com/components/selection-controls.html#selection-controls-radio-button).
It requires no Javascript out of the box, but can be enhanced with Javascript to provide better
interaction UX as well as a component-level API for state modification.

## Installation

> NOTE: Installation via NPM will be available post-alpha.

## Usage

```html
<div class="mdl-radio">
  <input class="mdl-radio__native-control" type="radio" id="radio-1" name="radios" checked>
  <div class="mdl-radio__background">
    <div class="mdl-radio__outer-circle"></div>
    <div class="mdl-radio__inner-circle"></div>
  </div>
</div>
<label id="radio-1-label" for="radio-1">Radio 1</label>

<div class="mdl-radio">
  <input class="mdl-radio__native-control" type="radio" id="radio-2" name="radios">
  <div class="mdl-radio__background">
    <div class="mdl-radio__outer-circle"></div>
    <div class="mdl-radio__inner-circle"></div>
  </div>
</div>
<label id="radio-2-label" for="radio-2">Radio 2</label>
```

> NOTE: We plan on creating a generic `mdl-form-field` wrapper class - as seen within the demo -
> that can be used to position form controls and labels, as well as make them RTL-aware.
> See https://github.com/google/material-design-lite/issues/4775.

#### Disabled Radios

```html
<div class="mdl-radio mdl-radio--disabled">
  <input class="mdl-radio__native-control" type="radio" id="radio-1" name="radios" disabled>
  <div class="mdl-radio__background">
    <div class="mdl-radio__outer-circle"></div>
    <div class="mdl-radio__inner-circle"></div>
  </div>
</div>
<label id="radio-1-label" for="radio-1">Disabled Radio 1</label>
```

Note that `mdl-radio--disabled` is necessary on the root element in order to avoid having the ripple
elements intercept pointer events when using JS.

### Using the JS Component

MDL Radio ships with Component / Foundation classes which provide enhanced interaction UX via
[mdl-ripple](../mdl-ripple), as well as APIs for programmatically altering the radio's state.

#### Including in code

##### ES2015

```javascript
import MDLRadio, {MDLRadioFoundation} from 'mdl-radio';
```

##### CommonJS

```javascript
const mdlRadio = require('mdl-radio');
const MDLRadio = mdlRadio.default;
const MDLRadioFoundation = mdlRadio.MDLRadioFoundation;
```

##### AMD

```javascript
require(['path/to/mdl-radio'], mdlRadio => {
  const MDLRadio = mdlRadio.default;
  const MDLRadioFoundation = mdlRadio.MDLRadioFoundation;
});
```

##### Global

```javascript
const MDLRadio = mdl.Radio.default;
const MDLRadioFoundation = mdl.Radio.MDLRadioFoundation;
```

#### Fully-automatic: DOM Rendering + Initialization

```javascript
const root = MDLRadio.buildDom({id: 'my-radio', labelId: 'my-radio-label'});
const radio = MDLRadio.attachTo(root);
// append root to element, etc...
```

You can use `MDLRadio.buildDom` to dynamically construct radio DOM for you.
`MDLRadio.buildDom` takes an options object with values described below:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | `mdl-radio-<unique_id>` | The id for the native radio control. |
| `labelId` | `string` | `mdl-radio-label-<id_value>` | The id of the element which label's this radio. The default will use the `id` param and prefix it with `mdl-radio-label`. This value is attached to the `aria-labelledby` attribute on the native control. |
| `groupId` | `string` | '' | When supplied, this will be given to the "name" attribute on the native radio control, allowing you to specify that a collection of buttons are part of the same radio group. |

> **NOTE**: Regardless of how you instantiate a radio element, you should always strive to
> provide an id for the radio that's used within its label's `for` attribute, as well as an id
> for its label which is used in the native control's `aria-labelledby` attribute. This will ensure
> that assistive devices function properly when using this component.

#### Using an existing element.

If you do not care about retaining the component instance for the radio, simply call `attachTo()`
and pass it a DOM element.  

```javascript
mdl.Radio.attachTo(document.querySelector('.mdl-radio'));
```

#### Manual Instantiation

Radios can easily be initialized using their default constructors as well, similar to `attachTo`.

```javascript
import MDLRadio from 'mdl-radio';

const radio = new MDLRadio(document.querySelector('.mdl-radio'));
```

#### MDLRadio API

Similar to regular DOM elements, the `MDLRadio` functionality is exposed through accessor
methods.

##### MDLRadio.checked

Boolean. Proxies to the foundation's `isChecked`/`setChecked` methods when retrieved/set
respectively.

##### MDLRadio.disabled

Boolean. Proxies to the foundation's `isDisabled/setDisabled` methods when retrieved/set
respectively.

### Using the Foundation Class

Since MDL Radio is primarily driven by its native control, the adapter API is extremely simple.

| Method Signature | Description |
| --- | --- |
| `getNativeControl() => HTMLInputElement?` | Returns the native radio control, if available. Note that if this control is not available, the methods that rely on it will exit gracefully.|

#### The full foundation API

##### MDLRadioFoundation.isChecked() => boolean

Returns the value of `adapter.getNativeControl().checked`. Returns `false` if `getNativeControl()`
does not return an object.

##### MDLRadioFoundation.setChecked(checked: boolean) => void

Sets the value of `adapter.getNativeControl().checked`. Does nothing if `getNativeControl()` does
not return an object.

##### MDLRadioFoundation.isDisabled() => boolean

Returns the value of `adapter.getNativeControl().disabled`. Returns `false` if `getNativeControl()`
does not return an object.

##### MDLRadioFoundation.setDisabled(disabled: boolean) => void

Sets the value of `adapter.getNativeControl().disabled`. Also adds/removes the `mdl-radio--disabled`
class based whether or not `disabled` is true. Gracefully handles the absence of a return value of
`getNativeControl()`.

## Theming

MDL Radios use the theme's primary color by default for on states, and are completely dark theme
aware.
