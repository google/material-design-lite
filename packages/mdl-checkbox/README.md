# MDL Checkbox

The MDL Checkbox component is a spec-aligned checkbox component adhering to the
[Material Design checkbox requirements](https://material.google.com/components/selection-controls.html#selection-controls-checkbox).
It works without JavaScript with basic functionality for all states. If you use the JavaScript object for a checkbox, then it will be add more intricate animation effects when switching between states.

## Installation

> Note: Installation via the npm registry will be available after alpha.

## Usage

### Standalone Checkbox

```html
<div class="mdl-checkbox">
  <input type="checkbox"
         class="mdl-checkbox__native-control"
         id="my-checkbox"
         aria-labelledby="my-checkbox-label" />
  <div class="mdl-checkbox__background">
    <svg version="1.1" class="mdl-checkbox__checkmark"
         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
         xml:space="preserve">
      <path class="mdl-checkbox__checkmark__path" fill="none" stroke="white"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
    </svg>
  <div class="mdl-checkbox__mixedmark"></div>
</div>
<label for="my-checkbox" id="my-checkbox-label">My Checkbox</label>
```

The checkbox component is driven by an underlying native checkbox element. This element is sized and
positioned the same way as the checkbox component itself, allowing for proper behavior of assistive
devices.

You can also add an `mdl-checkbox--theme-dark` modifier class to the component to use the dark theme
checkbox styles.

### Checkbox wrapper class

MDL Checkbox comes with an `mdl-checkbox-wrapper` class which you can use to easily lay out a
checkbox / label combo side-by-side. The wrapper is RTL-aware and supports start and end alignment.

```html
<div class="mdl-checkbox-wrapper">
  <div class="mdl-checkbox-wrapper__layout">
    <div class="mdl-checkbox">
      <input type="checkbox"
             class="mdl-checkbox__native-control"
             id="my-checkbox"
             aria-labelledby="my-checkbox-label" />
      <div class="mdl-checkbox__background">
        <svg version="1.1" class="mdl-checkbox__checkmark"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             xml:space="preserve">
          <path class="mdl-checkbox__checkmark__path" fill="none" stroke="white"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
        </svg>
      <div class="mdl-checkbox__mixedmark"></div>
    </div>
    <label for="my-checkbox" id="my-checkbox-label">My Checkbox</label>
  </div>
</div>
```

To switch the order of the checkbox and label, no DOM modification is necessary. Simply add a
`mdl-checkbox-wrapper--align-end` modifier class the the wrapper block.

```html
<div class="mdl-checkbox-wrapper mdl-checkbox-wrapper--align-end">
  <div class="mdl-checkbox-wrapper__layout">
    <!-- ... -->
  </div>
</div>
```

### Using the JS Component

MDL Checkbox ships with a Component / Foundation combo which progressively enhances the checkbox
state transitions to achieve full parity with the material design motion for switching checkbox
states.

#### Including in code

##### ES2015

```javascript
import MDLCheckbox, {MDLCheckboxFoundation} from 'mdl-checkbox';
```

##### CommonJS

```javascript
const mdlCheckbox = require('mdl-checkbox');
const MDLCheckbox = mdlCheckbox.default;
const MDLCheckboxFoundation = mdlCheckbox.MDLCheckboxFoundation;
```

##### AMD

```javascript
require(['path/to/mdl-checkbox'], mdlCheckbox => {
  const MDLCheckbox = mdlCheckbox.default;
  const MDLCheckboxFoundation = mdlCheckbox.MDLCheckboxFoundation;
});
```

##### Global

```javascript
const MDLCheckbox = mdl.Checkbox.default;
const MDLCheckboxFoundation = mdl.Checkbox.MDLCheckboxFoundation;
```

#### Automatic Instantiation

If you do not care about retaining the component instance for the checkbox, simply call `attachTo()`
and pass it a DOM element.  

```javascript
mdl.Checkbox.attachTo(document.querySelector('.mdl-checkbox'));
```

#### Manual Instantiation

Checkboxes can easily be initialized using their default constructors as well, similar to `attachTo`.

```javascript
import MDLCheckbox from 'mdl-checkbox';

const checkbox = new MDLCheckbox(document.querySelector('.mdl-checkbox'));
```

#### MDLCheckbox API

The MDLCheckbox API provides accessor properties similar to those found on a native checkbox element.

##### MDLCheckbox.checked

Boolean. Returns whether or not the checkbox is checked. Setting this property will update the
underlying checkbox element.

##### MDLCheckbox.indeterminate

Boolean. Returns whether or not the checkbox is indeterminate. Setting this property will update the
underlying checkbox element.

##### MDLCheckbox.disabled

Boolean. Returns whether or not the checkbox is disabled. Setting this property will update the
underlying checkbox element.

### Using the Foundation Class

MDL Checkbox ships with an `MDLCheckboxFoundation` class that external frameworks and libraries can
use to integrate the component. As with all foundation classes, an adapter object must be provided.
The adapter for checkboxes must provide the following functions, with correct signatures:

| Method Signature | Description |
| --- | --- |
| `addClass(className: string) => void` | Adds a class to the root element. |
| `removeClass(className: string) => void` | Removes a class from the root element. |
| `registerAnimationEndHandler(handler: EventListener) => void` | Registers an event handler to be called when an `animationend` event is triggered on the root element. Note that you must account for
vendor prefixes in order for this to work correctly. |
| `deregisterAnimationEndHandler(handler: EventListener) => void` | Deregisters an event handler from an `animationend` event listener. This will only be called with handlers that have previously been passed to `registerAnimationEndHandler` calls. |
| `registerChangeHandler(handler: EventListener) => void` | Registers an event handler to be called when a `change` event is triggered on the native control (_not_ the root element). |
| `deregisterChangeHandler(handler: EventListener) => void` | Deregisters an event handler that was previously passed to `registerChangeHandler`. |
| `getNativeControl() => HTMLInputElement?` | Returns the native checkbox control, if available. Note that if this control is not available, the methods that rely on it will exit gracefully.|
| `forceLayout() => void` | Force-trigger a layout on the root element. This is needed to restart
animations correctly. If you find that you do not need to do this, you can simply make it a no-op. |
| `isAttachedToDOM() => boolean` | Returns true if the component is currently attached to the DOM, false otherwise.` |

#### MDLCheckboxFoundation API

##### MDLCheckboxFoundation.isChecked() => boolean

Returns whether or not the underlying input is checked. Returns false when no input is available.

##### MDLCheckboxFoundation.setChecked(checked: boolean)

Updates the `checked` property on the underlying input. Does nothing when the underlying input is
not present.

##### MDLCheckboxFoundation.isIndeterminate() => boolean

Returns whether or not the underlying input is indeterminate. Returns false when no input is
available.

##### MDLCheckboxFoundation.setIndeterminate(indeterminate: boolean)

Updates the `indeterminate` property on the underlying input. Does nothing when the underlying input
is not present.

##### MDLCheckboxFoundation.isDisabled() => boolean

Returns whether or not the underlying input is disabled. Returns false when no input is available.

##### MDLCheckboxFoundation.setDisabled(disabled: boolean)

Updates the `disabled` property on the underlying input. Does nothing when the underlying input is
not present.

## Theming

> TK once mdl-theming lands.
