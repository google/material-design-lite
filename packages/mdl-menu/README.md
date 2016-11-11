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
<div class="mdl-simple-menu" tabindex="-1">
  <ul class="mdl-simple-menu__items mdl-list" role="menu" aria-hidden="true">
    <li class="mdl-list-item" role="menuitem" tabindex="0">
      A Menu Item
    </li>
    <li class="mdl-list-item" role="menuitem" tabindex="0">
      Another Menu Item
    </li>
  </ul>
</div>
```
> Note: adding a `tabindex` of `0` to the menu items places them in the tab order.
  Adding a `tabindex` of `-1` to the root element makes it programmatically focusable, without
  placing it in the tab order. This allows the menu to be focused on open, so that the next Tab
  keypress moves to the first menu item. If you would like the first menu item to be automatically
  focused instead, remove `tabindex="-1"` from the root element.

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

> **N.B.**: The use of `role` on both the menu's internal items list, as well as on each item, is
> _mandatory_. You may either use the role of `menu` on the list with a role of `menuitem` on each
> list item, or a role of `listbox` on the list with a role of `option` on each list item. Further
> composite roles may be supported in the future.

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

It also has two lower level methods, which control the menu directly, by showing (opening) and
hiding (closing) it:

```js
// Show (open) menu.
menu.show();
// Hide (close) menu.
menu.hide();
// Show (open) menu, and focus the menu item at index 1.
menu.show({focusIndex: 1});
```

You can still use the `open` getter property even if showing and hiding directly:

```js
menu.show();
console.log(`Menu is ${menu.open ? 'open' : 'closed'}.`);
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

#### Handling selection events

When a menu item is selected, the menu component will emit a `MDLSimpleMenu:selected` custom event
with the following `detail` data:

| property name | type | description |
| --- | --- | --- |
| `item` | `HTMLElement` | The DOM element for the selected item |
| `index` | `number` | The index of the selected item |

If the menu is closed with no selection made (for example, if the user hits `Escape` while it's open), a `MDLSimpleMenu:cancel` custom event is emitted instead, with no data attached.

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
| `getNumberOfItems() => numbers` | Returns the number of _item_ elements inside the items container. In our vanilla component, we determine this by counting the number of list items whose `role` attribute corresponds to the correct child role of the role present on the menu list element. For example, if the list element has a role of `menu` this queries for all elements that have a role of `menuitem`. |
| `registerInteractionHandler(type: string, handler: EventListener) => void` | Adds an event listener `handler` for event type `type`. |
| `deregisterInteractionHandler(type: string, handler: EventListener) => void` | Removes an event listener `handler` for event type `type`. |
| `registerDocumentClickHandler(handler: EventListener) => void` | Adds an event listener `handler` for event type 'click'. |
| `deregisterDocumentClickHandler(handler: EventListener) => void` | Removes an event listener `handler` for event type 'click'. |
| `getYParamsForItemAtIndex(index: number) => {top: number, height: number}` | Returns an object with the offset top and offset height values for the _item_ element inside the items container at the provided index. Note that this is an index into the list of _item_ elements, and not necessarily every child element of the list. |
| `setTransitionDelayForItemAtIndex(index: number, value: string) => void` | Sets the transition delay on the element inside the items container at the provided index to the provided value. The same notice for `index` applies here as above. |
| `getIndexForEventTarget(target: EventTarget) => number` | Checks to see if the `target` of an event pertains to one of the menu items, and if so returns the index of that item. Returns -1 if the target is not one of the menu items. The same notice for `index` applies here as above. |
| `notifySelected(evtData: {index: number}) => void` | Dispatches an event notifying listeners that a menu item has been selected. The function should accept an `evtData` parameter containing the an object with an `index` property representing the index of the selected item. Implementations may choose to supplement this data with additional data, such as the item itself. |
| `notifyCancel() => void` | Dispatches an event notifying listeners that the menu has been closed with no selection made. |
| `saveFocus() => void` | Stores the currently focused element on the document, for restoring with `restoreFocus`. |
| `restoreFocus() => void` | Restores the previously saved focus state, by making the previously focused element the active focus again. |
| `isFocused() => boolean` | Returns a boolean value indicating whether the root element of the simple menu is focused. |
| `focus() => void` | Focuses the root element of the simple menu. |
| `getFocusedItemIndex() => number` | Returns the index of the currently focused menu item (-1 if none). |
| `focusItemAtIndex(index: number) => void` | Focuses the menu item with the provided index. |
