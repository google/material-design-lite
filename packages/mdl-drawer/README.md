# MDL Drawer

The MDL Drawer component is a spec-aligned drawer component adhering to the
[Material Design navigation drawer pattern](https://material.google.com/patterns/navigation-drawer.html).
It implements permanent and temporary drawers. Permanent drawers are CSS-only and require no JavaScript, whereas
temporary drawers require JavaScript to function, in order to respond to user interaction.

## Installation

> Note: Installation via the npm registry will be available after alpha.


## Permanent drawer usage

A permanent drawer is always open, sitting to the side of the content. It is appropriate for any display size larger
than mobile.

> TODO(sgomes): Give advice on how to hide permanent drawer in mobile.

```html
<nav class="mdl-permanent-drawer mdl-typography">
  <div class="mdl-permanent-drawer__toolbar-spacer"></div>
  <div class="mdl-permanent-drawer__content">
    <nav id="icon-with-text-demo" class="mdl-list">
      <a class="mdl-list-item mdl-permanent-drawer--selected" href="#">
        <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
      </a>
      <a class="mdl-list-item" href="#">
        <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">star</i>Star
      </a>
    </nav>
  </div>
</nav>
<div>
  Toolbar and page content go inside here.
</div>
```

In the example above, we've set the drawer above the toolbar, and are using a toolbar spacer to ensure that it is
presented correctly, with the correct amount of space to match the toolbar height. Note that you can place content
inside the toolbar spacer.

Permanent drawers can also be set below the toolbar:

```html
<div>Toolbar goes here</div>

<div class="content">
  <nav class="mdl-permanent-drawer mdl-typography">
    <nav id="icon-with-text-demo" class="mdl-list">
      <a class="mdl-list-item mdl-permanent-drawer--selected" href="#">
        <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
      </a>
      <a class="mdl-list-item" href="#">
        <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">star</i>Star
      </a>
    </nav>
  <main>
    Page content goes here.
  </main>
</div>
```

CSS classes:

| Class                                  | Description                                                                |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `mdl-permanent-drawer`                 | Mandatory. Needs to be set on the root element of the component.           |
| `mdl-permanent-drawer__content`        | Mandatory. Needs to be set on the container node for the drawer content.   |
| `mdl-permanent-drawer__toolbar-spacer` | Optional. Add to node to provide the matching amount of space for toolbar. |


## Temporary drawer usage

A temporary drawer is usually closed, sliding out at a higher elevation than the content when opened. It is appropriate
for any display size.

```html
<aside class="mdl-temporary-drawer mdl-typography">
  <nav class="mdl-temporary-drawer__drawer">
    <header class="mdl-temporary-drawer__header">
      <div class="mdl-temporary-drawer__header-content">
        Header here
      </div>
    </header>
    <nav id="icon-with-text-demo" class="mdl-temporary-drawer__content mdl-list">
      <a class="mdl-list-item mdl-temporary-drawer--selected" href="#">
        <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
      </a>
      <a class="mdl-list-item" href="#">
        <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">star</i>Star
      </a>
      </a>
    </nav>
  </nav>
</aside>
```

```js
let drawer = new mdl.drawer.MDLTemporaryDrawer(document.querySelector('.mdl-temporary-drawer'));
document.querySelector('.menu').addEventListener('click', () => drawer.open = true);
```

### Headers and toolbar spacers

Temporary drawers can use toolbar spacers, headers, or neither.

A toolbar spacer adds to the drawer the same amount of space that the toolbar takes up in your application. This is
very useful for visual alignment and consistency. Note that you can place content inside the toolbar spacer.

```html
<aside class="mdl-temporary-drawer mdl-typography">
  <nav class="mdl-temporary-drawer__drawer">

    <div class="mdl-temporary-drawer__toolbar-spacer"></div>

    <nav id="icon-with-text-demo" class="mdl-temporary-drawer__content mdl-list">
      <a class="mdl-list-item mdl-temporary-drawer--selected" href="#">
        <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
      </a>
      <a class="mdl-list-item" href="#">
        <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">star</i>Star
      </a>
      </a>
    </nav>
  </nav>
</aside>
```

A header, on the other hand, is a large rectangular area that maintains a 16:9 ratio. It's often used for user account
selection.
It uses an outer `mdl-temporary-drawer__header` for positioning, with an inner `mdl-temporary-drawer__header-content`
for placing the actual content, which will be bottom-aligned.

```html
<aside class="mdl-temporary-drawer mdl-typography">
  <nav class="mdl-temporary-drawer__drawer">

    <header class="mdl-temporary-drawer__header">
      <div class="mdl-temporary-drawer__header-content">
        Header content goes here
      </div>
    </header>

    <nav id="icon-with-text-demo" class="mdl-temporary-drawer__content mdl-list">
      <a class="mdl-list-item mdl-temporary-drawer--selected" href="#">
        <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
      </a>
      <a class="mdl-list-item" href="#">
        <i class="material-icons mdl-list-item__start-detail" aria-hidden="true">star</i>Star
      </a>
      </a>
    </nav>
  </nav>
</aside>
```

CSS classes:

| Class                                  | Description                                                                |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `mdl-temporary-drawer`                 | Mandatory. Needs to be set on the root element of the component.           |
| `mdl-temporary-drawer__drawer`         | Mandatory. Needs to be set on the container node for the drawer content.   |
| `mdl-temporary-drawer__content`        | Optional. Should be set on the list of items inside the drawer.            |
| `mdl-temporary-drawer__toolbar-spacer` | Optional. Add to node to provide the matching amount of space for toolbar. |
| `mdl-temporary-drawer__header`         | Optional. Add to container node to create a 16:9 drawer header.            |
| `mdl-temporary-drawer__header-content` | Optional. Add to content node inside `mdl-temporary-drawer__header`.       |

### Using the JS Component

MDL Temporary Drawer ships with a Component / Foundation combo which allows for frameworks to richly integrate the
correct drawer behaviors into idiomatic components.

#### Including in code

##### ES2015

```javascript
import {MDLTemporaryDrawer, MDLTemporaryDrawerFoundation} from 'mdl-drawer';
```

##### CommonJS

```javascript
const mdlDrawer = require('mdl-drawer');
const MDLTemporaryDrawer = mdlDrawer.MDLTemporaryDrawer;
const MDLTemporaryDrawerFoundation = mdlDrawer.MDLTemporaryDrawerFoundation;
```

##### AMD

```javascript
require(['path/to/mdl-drawer'], mdlDrawer => {
  const MDLTemporaryDrawer = mdlDrawer.MDLTemporaryDrawer;
  const MDLTemporaryDrawerFoundation = mdlDrawer.MDLTemporaryDrawerFoundation;
});
```

##### Global

```javascript
const MDLTemporaryDrawer = mdl.drawer.MDLTemporaryDrawer;
const MDLTemporaryDrawerFoundation = mdl.drawer.MDLTemporaryDrawerFoundation;
```

#### Automatic Instantiation

If you do not care about retaining the component instance for the temporary drawer, simply call `attachTo()`
and pass it a DOM element.  

```javascript
mdl.drawer.MDLTemporaryDrawer.attachTo(document.querySelector('.mdl-temporary-drawer'));
```

#### Manual Instantiation

Temporary drawers can easily be initialized using their default constructors as well, similar to `attachTo`.

```javascript
import {MDLTemporaryDrawer} from 'mdl-drawer';

const drawer = new MDLTemporaryDrawer(document.querySelector('.mdl-temporary-drawer'));
```

### Using the Foundation Class

MDL Temporary Drawer ships with an `MDLTemporaryDrawerFoundation` class that external frameworks and libraries can
use to integrate the component. As with all foundation classes, an adapter object must be provided.
The adapter for temporary drawers must provide the following functions, with correct signatures:

| Method Signature | Description |
| --- | --- |
| `addClass(className: string) => void` | Adds a class to the root element. |
| `removeClass(className: string) => void` | Removes a class from the root element. |
| `hasClass(className: string) => boolean` | Returns boolean indicating whether element has a given class. |
| `hasNecessaryDom() => boolean` | Returns boolean indicating whether the necessary DOM is present (namely, the `mdl-temporary-drawer__drawer` drawer container). |
| `registerInteractionHandler(evt: string, handler: EventListener) => void` | Adds an event listener to the root element, for the specified event name. |
| `deregisterInteractionHandler(evt: string, handler: EventListener) => void` | Removes an event listener from the root element, for the specified event name. |
| `registerDrawerInteractionHandler(evt: string, handler: EventListener) => void` | Adds an event listener to the drawer container sub-element, for the specified event name. |
| `deregisterDrawerInteractionHandler(evt: string, handler: EventListener) => void` | Removes an event listener from drawer container sub-element, for the specified event name. |
| `registerTransitionEndHandler(handler: EventListener) => void` | Registers an event handler to be called when a `transitionend` event is triggered on the drawer container sub-element element. |
| `deregisterTransitionEndHandler(handler: EventListener) => void` | Deregisters an event handler from a `transitionend` event listener. This will only be called with handlers that have previously been passed to `registerTransitionEndHandler` calls. |
| `registerDocumentKeydownHandler(handler: EventListener) => void` | Registers an event handler on the `document` object for a `keydown` event. |
| `deregisterDocumentKeydownHandler(handler: EventListener) => void` | Deregisters an event handler on the `document` object for a `keydown` event. |
| `getDrawerWidth() => number` | Returns the current drawer width, in pixels. |
| `setTranslateX(value: number) => void` | Sets the current position for the drawer, in pixels from the border. |
| `updateCssVariable(value: string) => void` | Sets a CSS custom property, for controlling the current background opacity when manually dragging the drawer. |
| `getFocusableElements() => NodeList` | Returns the node list of focusable elements inside the drawer. |
| `saveElementTabState(el: Element) => void` | Saves the current tab index for the element in a data property. |
| `restoreElementTabState(el: Element) => void` | Restores the saved tab index (if any) for an element. |
| `makeElementUntabbable(el: Element) => void` | Makes an element untabbable. |
| `isRtl() => boolean` | Returns boolean indicating whether the current environment is RTL. |
