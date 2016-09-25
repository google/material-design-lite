# MDL Snackbar

The MDL Snackbar component is a spec-aligned snackbar/toast component adhering to the
[Material Design snackbars & toasts requirements](https://material.google.com/components/snackbars-toasts.html#snackbars-toasts-specs).
It requires JavaScript the trigger the display and hide of the snackbar.

## Installation

> Note: Installation via the npm registry will be available after alpha.

## Usage

### Snackbar DOM

```html
<div class="mdl-snackbar"
     aria-live="assertive"
     aria-atomic="true"
     aria-hidden="true">
  <div class="mdl-snackbar__text"></div>
  <div class="mdl-snackbar__action-wrapper">
    <button type="button" class="mdl-button mdl-snackbar__action-button"></button>
  </div>
</div>
```

### Using the JS Component

MDL Snackbar ships with a Component / Foundation combo which provides the API for showing snackbar
messages with optional action.

#### Including in code

##### ES2015

```javascript
import MDLSnackbar, {MDLSnackbarFoundation} from 'mdl-snackbar';
```

##### CommonJS

```javascript
const mdlSnackbar = require('mdl-snackbar');
const MDLSnackbar = mdlSnackbar.default;
const MDLSnackbarFoundation = mdlSnackbar.MDLSnackbarFoundation;
```

##### AMD

```javascript
require(['path/to/mdl-snackbar'], mdlSnackbar => {
  const MDLSnackbar = mdlSnackbar.default;
  const MDLSnackbarFoundation = mdlSnackbar.MDLSnackbarFoundation;
});
```

##### Global

```javascript
const MDLSnackbar = mdl.Snackbar.default;
const MDLSnackbarFoundation = mdl.Snackbar.MDLSnackbarFoundation;
```

#### Fully-automatic: DOM Rendering + Initialization

```javascript
const root = MDLSnackbar.buildDom();
const snackbar = MDLSnackbar.attachTo(root);
// append root to element, etc...
```

You can use `MDLSnackbar.buildDom` to dynamically construct snackbar DOM for you.

#### Using an existing element.

If you do not care about retaining the component instance for the snackbar, simply call `attachTo()`
and pass it a DOM element.  

```javascript
mdl.Snackbar.attachTo(document.querySelector('.mdl-snackbar'));
```

#### Manual Instantiation

Snackbars can easily be initialized using their default constructors as well, similar to `attachTo`.

```javascript
import MDLSnackbar from 'mdl-snackbar';

const snackbar = new MDLSnackbar(document.querySelector('.mdl-snackbar'));
```

### Showing a message and action

Once you have obtained an MDLSnackbar instance attached to the DOM, you can use
the `show` method to trigger the display of a message with optional action. The
`show`  method takes an object for snackbar data. The table below shows the
properties and their usage.

| Property | Effect | Remarks | Type |
|-----------|--------|---------|---------|
| message   | The text message to display. | Required | String |
| timeout   | The amount of time in milliseconds to show the snackbar. | Optional (default 2750) | Integer |
| actionHandler | The function to execute when the action is clicked. | Optional | Function |
| actionText | The text to display for the action button. | Required if actionHandler is set |  String |
| multiline | Whether to show the snackbar with space for multiple lines of text | Optional |  Boolean |
| actionOnBottom | Whether to show the action below the multiple lines of text | Optional, applies when multiline is true |  Boolean |

### Using the Foundation Class

MDL Snackbar ships with an `MDLSnackbarFoundation` class that external frameworks and libraries can
use to integrate the component. As with all foundation classes, an adapter object must be provided.
The adapter for snackbars must provide the following functions, with correct signatures:

| Method Signature | Description |
| --- | --- |
| `addClass(className: string) => void` | Adds a class to the root element. |
| `removeClass(className: string) => void` | Removes a class from the root element. |
| `setAriaHidden() => void` | Sets `aria-hidden="true"` on the root element. |
| `unsetAriaHidden() => void` | Removes the `aria-hidden` attribute from the root element. |
| `setMessageText(message: string) => void` | Set the text content of the message element. |
| `setActionText(actionText: string) => void` | Set the text content of the action element. |
| `setActionAriaHidden() => void` | Sets `aria-hidden="true"` on the action element. |
| `unsetActionAriaHidden() => void` | Removes the `aria-hidden` attribute from the action element. |
| `registerActionClickHandler(handler: EventListener) => void` | Registers an event handler to be called when a `click` event is triggered on the action element. |
| `deregisterActionClickHandler(handler: EventListener) => void` | Deregisters an event handler from a `click` event on the action element. This will only be called with handlers that have previously been passed to `registerActionClickHandler` calls. |
| `registerTransitionEndHandler(handler: EventListener) => void` | Registers an event handler to be called when an `transitionend` event is triggered on the root element. Note that you must account for vendor prefixes in order for this to work correctly. |
| `deregisterTransitionEndHandler(handler: EventListener) => void` | Deregisters an event handler from an `transitionend` event listener. This will only be called with handlers that have previously been passed to `registerTransitionEndHandler` calls. |

## Avoiding Flash-Of-Unstyled-Content (FOUC)

If you are loading the `mdl-snackbar` CSS asynchronously, you may experience a brief flash-of-unstyled-content (FOUC) due to the
snackbar's translate transition running once the CSS loads. To avoid this temporary FOUC, you can add the following simple style
before the `mdl-snackbar` CSS is loaded:

```css
.mdl-snackbar { transform: translateY(100%); }
```
This will move the snackbar offscreen until the CSS is fully loaded and avoids a translate transition upon load.
