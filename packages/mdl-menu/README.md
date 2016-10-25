# MDL Menu

The MDL Menu component is a spec-aligned menu component adhering to the
[Material Design menu specification](https://material.google.com/components/menus.html).
It implements simple menus. Menus require JavaScript to work correctly, but the open and closed states are correct on
first render.

## Installation

> Note: Installation via the npm registry will be available after alpha.

## Simple menu usage

A simple menu is usually closed, appearing when opened. It is appropriate for any display size.

```html
<div class="mdl-simple-menu">
  <ul class="mdl-simple-menu__items mdl-list" role="menu">
    <li class="mdl-list-item" role="menuitem" tabindex="0">
      A Menu Item
    </li>
    <li class="mdl-list-item" role="menuitem" tabindex="0">
      Another Menu Item
    </li>
  </ul>
</div>
```

```js
let menu = new mdl.SimpleMenu(document.querySelector('.mdl-simple-menu'));
// Add event listener to some button to toggle the menu on and off.
document.querySelector('.some-button').addEventListener('click', () => menu.open = !menu.open);
```

You can start the menu in its open state by adding the `mdl-simple-menu--open` class to your HTML:

```html
<div class="mdl-simple-menu mdl-simple-menu--open">
...
</div>
```


### Using the JS Component

MDL Simple Menu ships with a Component / Foundation combo which allows for frameworks to richly integrate the
correct menu behaviors into idiomatic components.

The component has a read-write property, `open`, which keeps track of the visual state of the component.

```js
// Analyse current state.
console.log('The menu is ' + (menu.open ? 'open' : 'closed'));
// Open menu.
menu.open = true;
// Close menu.
menu.open = false;
```

#### Including in code

##### ES2015

```javascript
import {MDLSimpleMenu, MDLSimpleMenuFoundation} from 'mdl-menu';
```

##### CommonJS

```javascript
const mdlMenu = require('mdl-menu');
const MDLSimpleMenu = mdlMenu.MDLSimpleMenu;
const MDLSimpleMenuFoundation = mdlMenu.MDLSimpleMenuFoundation;
```

##### AMD

```javascript
require(['path/to/mdl-menu'], mdlMenu => {
  const MDLSimpleMenu = mdlMenu.MDLSimpleMenu;
  const MDLSimpleMenuFoundation = mdlMenu.MDLSimpleMenuFoundation;
});
```

##### Global

```javascript
const MDLSimpleMenu = mdl.Menu.MDLSimpleMenu;
const MDLSimpleMenuFoundation = mdl.Menu.MDLSimpleMenuFoundation;
```

#### Automatic Instantiation

If you do not care about retaining the component instance for the simple menu, simply call `attachTo()` and pass it a
DOM element.  

```javascript
mdl.MDLSimpleMenu.attachTo(document.querySelector('.mdl-simple-menu'));
```

#### Manual Instantiation

Simple menus can easily be initialized using their default constructors as well, similar to `attachTo`.

```javascript
import MDLSimpleMenu from 'mdl-menu';

const menu = new MDLSimpleMenu(document.querySelector('.mdl-simple-menu'));
```

### Using the Foundation Class

MDL Simple Menu ships with an `MDLSimpleMenuFoundation` class that external frameworks and libraries can use to
integrate the component. As with all foundation classes, an adapter object must be provided.
The adapter for temporary drawers must provide the following functions, with correct signatures:

| Method Signature | Description |
| --- | --- |
| `addClass(className: string) => void` | Adds a class to the root element. |
| `removeClass(className: string) => void` | Removes a class from the root element. |
| `hasClass(className: string) => boolean` | Returns boolean indicating whether element has a given class. |
| `hasNecessaryDom() => boolean` | Returns boolean indicating whether the necessary DOM is present (namely, the `mdl-temporary-drawer__drawer` drawer container). |
| `getInnerDimensions() => {width: number, height: number}` | Returns an object with the items container width and height |
| `setScale(x: string, y: string) => void` | Sets the transform on the root element to the provided (x, y) scale. |
| `setInnerScale(x: string, y: string) => void` | Sets the transform on the items container to the provided (x, y) scale. |
| `getNumberOfItems() => numbers` | Returns the number of elements inside the items container. |
| `getYParamsForItemAtIndex(index: number) => {top: number, height: number}` | Returns an object with the offset top and offset height values for the element inside the items container at the provided index |
| `setTransitionDelayForItemAtIndex(index: number, value: string) => void` | Sets the transition delay on the element inside the items container at the provided index to the provided value. |
