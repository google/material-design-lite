## Introduction

The Material Design Lite (MDL) **search** component is a user interface element that allows users to quickly locate content by searching for it. The component consists of a search text field and a dropdown list that displays search suggestions as the user types. The dropdown appears when the search component is focused, updates as the input changes, and is dismissed after a choice is made. Back and cancel navigation icons optionally appear on the left and right of the search component.

Searching is a common feature of apps that support large amounts of information. Their design and use is an important factor in the overall user experience. See the menu component's [Material Design specifications page](https://material.io/guidelines/patterns/search.html) for details.

There are three main types of search components, each with its own basic coding requirements. The types are *inset*, *header*, and *expandable*.

### To include an *inset* MDL **search** component:

&nbsp;1. Code an "outer" `<div>` element to hold the search box.
```html
<div>
...
</div>
```
&nbsp;2. Inside the div, code an `<input>` element with a `type` attribute of `"text"` (the search field).
```html
<div>
  <input type="text">
</div>
```
&nbsp;3. Also inside the div, after the text field, code a `<ul>` element to be used as the search suggestion dropdown.
```html
<div>
  <input type="text">
  <ul></ul>
</div>
```
&nbsp;4. Add `search` and `submit` attributes to the "outer" div container, providing function names that will be called each time the search changes (`search`) and when the search is submitted (`submit`), and an optional `debounce` timer attribute to prevent repetitive calls to your callbacks.
```html
<div search="mySearchFcn" submit="mySubmitFcn" debounce="100">
  <input type="text">
  <ul></ul>
</div>
```
&nbsp;5. Optionally, code `<label>` elements for a left "search" icon and a right "mic" icon. These icons will update dynamically as a user searches, providing back (left) and cancel (right) options for the user to exit the seach. If present, they must be placed *before* the `<input>` element.
```html
<div search="mySearchFcn" submit="mySubmitFcn" debounce="100">
  <label>
    <i class="material-icons">search</i>
  </label>
  <label>
    <i class="material-icons">mic</i>
  </label>
  <input type="text">
  <ul></ul>
</div>
```
&nbsp;6. Add one or more MDL classes, separated by spaces, to the div container, search field, dropdown, and left/right icons using the `class` attribute.
```html
<div class="mdl-search mdl-js-search mdl-search--inset" search="mySearchFcn" submit="mySubmitFcn" debounce="100">
  <label class="mdl-search__left-icon mdl-button--icon mdl-button mdl-js-button">
    <i class="material-icons">search</i>
  </label>
  <label class="mdl-search__right-icon mdl-button--icon mdl-button mdl-js-button">
    <i class="material-icons">mic</i>
  </label>
  <input class="mdl-search__input" type="text">
  <ul class="mdl-search__dropdown"></ul>
</div>
```
The inset search component is ready for use.

#### Examples

Inset search component without responsive icons.
```html
<div class="mdl-search mdl-js-search mdl-search--inset" search="mySearchFcn" submit="mySubmitFcn" debounce="100">
  <input class="mdl-search__input" type="text" placeholder="Search here">
  <ul class="mdl-search__dropdown"></ul>
</div>
```

Full-width inset search component with animated dropdown and ripple effects.
```html
<div class="mdl-search mdl-js-search mdl-search--inset mdl-search--full-width mdl-search--animate mdl-search--ripple" search="mySearchFcn" submit="mySubmitFcn" debounce="100">
  <input class="mdl-search__input" type="text" placeholder="Search here">
  <ul class="mdl-search__dropdown"></ul>
</div>
```

Inset search component with responsive icons.
```html
<div class="mdl-search mdl-js-search mdl-search--inset" search="mySearchFcn" submit="mySubmitFcn" debounce="100">
  <label class="mdl-search__left-icon mdl-button--icon mdl-button mdl-js-button">
    <i class="material-icons">search</i>
  </label>
  <label class="mdl-search__right-icon mdl-button--icon mdl-button mdl-js-button">
    <i class="material-icons">mic</i>
  </label>
  <input class="mdl-search__input" type="text" placeholder="Search here">
  <ul class="mdl-search__dropdown"></ul>
</div>
```

Fully unstyled search component.
```html
<div class="mdl-search mdl-js-search" search="mySearchFcn" submit="mySubmitFcn" debounce="100">
  <input class="mdl-search__input" type="text" placeholder="Search here">
  <ul class="mdl-search__dropdown"></ul>
</div>
```

Search component with MDL textfield styling.
```html
<div class="mdl-search mdl-js-search mdl-textfield mdl-textfield--floating-label" search="mySearchFcn" submit="mySubmitFcn" debounce="100">
  <input id="search" class="mdl-search__input" type="text">
  <label class="mdl-textfield__label" for="search">Search here</label>
  <ul class="mdl-search__dropdown"></ul>
</div>
```

### To include a *header* MDL **search** component:

&nbsp;1. Create a basic `mdl-layout` component with a header (see the [MDL Layout guide](https://getmdl.io/components/index.html#layout-section) for details).
```html
<div class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
  </header>
  ...
</div>
```
&nbsp;2. Code a `<div>` element for the mdl-layout's `drawer-button`, and give it an `id` attribute of your choice (normally, this element is automatically created by the mdl-layout component).
```html
<div class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div id="drawer-button" class="mdl-layout__drawer-button">
      <i class="material-icons">menu</i>
    </div>
  </header>
  ...
</div>
```
&nbsp;3. Code a `<div>` element to contain all other header content, give it an `id` attribute of your choice, and then place an mdl-layout `header-row` inside of this container.
```html
<div class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div id="drawer-button" class="mdl-layout__drawer-button">
      <i class="material-icons">menu</i>
    </div>
    <div id="header-wrapper" class="mdl-search__header-wrapper">
      <div class="mdl-layout__header-row">
      </div>
    </div>
  </header>
  ...
</div>
```
&nbsp;4. Code an "outer" `<div>` element inside the header-row to hold the search box.
```html
<div class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div id="drawer-button" class="mdl-layout__drawer-button">
      <i class="material-icons">menu</i>
    </div>
    <div id="header-wrapper" class="mdl-search__header-wrapper">
      <div class="mdl-layout__header-row">
        <div>
        </div>
      </div>
    </div>
  </header>
  ...
</div>
```
&nbsp;5. Inside the div, code an `<input>` element with a `type` attribute of `"text"` (the search field).
```html
<div class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div id="drawer-button" class="mdl-layout__drawer-button">
      <i class="material-icons">menu</i>
    </div>
    <div id="header-wrapper" class="mdl-search__header-wrapper">
      <div class="mdl-layout__header-row">
        <div>
          <input type="text">
        </div>
      </div>
    </div>
  </header>
  ...
</div>
```
&nbsp;6. Also inside the div, after the text field, code a `<ul>` element with a `for` attribute whose value matches the `header-wrapper` element's `id` value. This will cause the dropdown to correctly display below the full header bar.
```html
<div class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div id="drawer-button" class="mdl-layout__drawer-button">
      <i class="material-icons">menu</i>
    </div>
    <div id="header-wrapper" class="mdl-search__header-wrapper">
      <div class="mdl-layout__header-row">
        <input type="text">
        <ul for="header-wrapper"></ul>
      </div>
    </div>
  </header>
  ...
</div>
```
&nbsp;7. Add `search` and `submit` attributes to the "outer" div container, providing function names that will be called each time the search changes (`search`) and when the search is submitted (`submit`), and an optional `debounce` timer attribute to prevent repetitive calls to your callbacks.
```html
<div class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div id="drawer-button" class="mdl-layout__drawer-button">
      <i class="material-icons">menu</i>
    </div>
    <div id="header-wrapper" class="mdl-search__header-wrapper">
      <div class="mdl-layout__header-row">
        <div search="mySearchFcn" submit="mySubmitFcn" debounce="100">
          <input type="text">
          <ul for="header-wrapper"></ul>
        </div>
      </div>
    </div>
  </header>
  ...
</div>
```
&nbsp;8. Code a `<label>` element for the right "mic" icon, placing it *before* the `<input>` element, and add a `left-icon` attribute to the "outer" div container whose value matches the `drawer-button` element's `id` value.
```html
<div class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div id="drawer-button" class="mdl-layout__drawer-button">
      <i class="material-icons">menu</i>
    </div>
    <div id="header-wrapper" class="mdl-search__header-wrapper">
      <div class="mdl-layout__header-row">
        <div search="mySearchFcn" submit="mySubmitFcn" left-icon="drawer-button">
          <label>
            <i class="material-icons">mic</i>
          </label>
          <input type="text">
          <ul for="header-wrapper"></ul>
        </div>
      </div>
    </div>
  </header>
  ...
</div>
```
&nbsp;9. Add one or more MDL classes, separated by spaces, to the div container, search field, dropdown, and right icon using the `class` attribute.
```html
<div class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div id="drawer-button" class="mdl-layout__drawer-button">
      <i class="material-icons">menu</i>
    </div>
    <div id="header-wrapper" class="mdl-search__header-wrapper">
      <div class="mdl-layout__header-row">
        <div class="mdl-search mdl-js-search mdl-search--header" search="mySearchFcn" submit="mySubmitFcn" left-icon="drawer-button">
          <label class="mdl-search__right-icon mdl-button--icon mdl-button mdl-js-button">
            <i class="material-icons">mic</i>
          </label>
          <input class="mdl-search__input" type="text">
          <ul class="mdl-search__dropdown" for="header-wrapper"></ul>
        </div>
      </div>
    </div>
  </header>
  ...
</div>
```
The header search component is ready for use.

#### Examples

Header search component with dropdown.
```html
<div class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div id="drawer-button" class="mdl-layout__drawer-button" aria-expanded="false" role="button" tabindex="0">
      <i class="material-icons">menu</i>
    </div>
    <div id="header-wrapper" class="mdl-search__header-wrapper">
      <div class="mdl-layout__header-row">
        <div class="mdl-search mdl-js-search mdl-search--header" search="mySearchFcn" submit="mySubmitFcn" left-icon="drawer-button">
          <label class="mdl-search__right-icon mdl-button--icon mdl-button mdl-js-button">
            <i class="material-icons">mic</i>
          </label>
          <input class="mdl-search__input" type="text" placeholder="Search here">
          <ul class="mdl-search__dropdown" for="header-wrapper"></ul>
        </div>
      </div>
    </div>
  </header>
  ...
</div>
```

Header search component with external suggestion list instead of dropdown (using `for` attribute on `<input>` element).
```html
<div class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div id="drawer-button" class="mdl-layout__drawer-button" aria-expanded="false" role="button" tabindex="0">
      <i class="material-icons">menu</i>
    </div>
    <div class="mdl-search__header-wrapper">
      <div class="mdl-layout__header-row">
        <div class="mdl-search mdl-js-search mdl-search--header" search="mySearchFcn" submit="mySubmitFcn" left-icon="drawer-button">
          <label class="mdl-search__right-icon mdl-button--icon mdl-button mdl-js-button">
            <i class="material-icons">mic</i>
          </label>
          <input class="mdl-search__input" type="text" for="suggestions" placeholder="Search here">
        </div>
      </div>
    </div>
  </header>
  ...
  <div id="suggestions"></div>
</div>
```

### To include an *expandable* MDL **search** component:

> **Note:** The expandable search requires a non-static positioned ancestor element, which the component will expand to fill. If the component is used in the header, use `mdl-search__header-wrapper` for this purpose.

&nbsp;1. Code a non-static positioned `<div>` element for the expandable search to fill.
```html
<div style="position:relative;">
...
</div>
```
&nbsp;2. Code an "outer" `<div>` element to hold the search box.
```html
<div style="position:relative;">
  <div>
  </div>
</div>
```
&nbsp;3. Inside the div, code an `<input>` element with a `type` attribute of `"text"` (the search field).
```html
<div style="position:relative;">
  <div>
    <input type="text">
  </div>
</div>
```
&nbsp;4. Also inside the div, after the text field, code a `<ul>` element to be used as the search suggestion dropdown.
```html
<div style="position:relative;">
  <div>
    <input type="text">
    <ul></ul>
  </div>
</div>
```
&nbsp;5. Add `search` and `submit` attributes to the "outer" div container, providing function names that will be called each time the search changes (`search`) and when the search is submitted (`submit`), and an optional `debounce` timer attribute to prevent repetitive calls to your callbacks.
```html
<div style="position:relative;">
  <div search="mySearchFcn" submit="mySubmitFcn" debounce="100">
    <input type="text">
    <ul></ul>
  </div>
</div>
```
&nbsp;6. Code `<label>` elements for a left "search" icon and an optional right "mic" icon and place them *before* the `<input>` element.
```html
<div style="position:relative;">
  <div search="mySearchFcn" submit="mySubmitFcn" debounce="100">
    <label>
      <i class="material-icons">search</i>
    </label>
    <label>
      <i class="material-icons">mic</i>
    </label>
    <input type="text">
    <ul></ul>
  </div>
</div>
```
&nbsp;7. Add one or more MDL classes, separated by spaces, to the div container, search field, dropdown, and left/right icons using the `class` attribute.
```html
<div style="position:relative;">
  <div class="mdl-search mdl-js-search mdl-search--expandable" search="mySearchFcn" submit="mySubmitFcn" debounce="100">
    <label class="mdl-search__left-icon mdl-button--icon mdl-button mdl-js-button">
      <i class="material-icons">search</i>
    </label>
    <label class="mdl-search__right-icon mdl-button--icon mdl-button mdl-js-button">
      <i class="material-icons">mic</i>
    </label>
    <input class="mdl-search__input" type="text">
    <ul class="mdl-search__dropdown"></ul>
  </div>
</div>
```
The expandable search component is ready for use.

#### Examples

Expandable search component in a fixed-size div.
```html
<div style="position:relative; width:500px; height:50px;">
  <div class="mdl-search mdl-js-search mdl-search--expandable" search="mySearchFcn" submit="mySubmitFcn" debounce="100">
    <label class="mdl-search__left-icon mdl-button--icon mdl-button mdl-js-button">
      <i class="material-icons">search</i>
    </label>
    <label class="mdl-search__right-icon mdl-button--icon mdl-button mdl-js-button">
      <i class="material-icons">mic</i>
    </label>
    <input class="mdl-search__input" type="text" placeholder="Search here">
    <ul class="mdl-search__dropdown"></ul>
  </div>
</div>
```

Expandable search component in an mdl-layout header.
```html
<div class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div id="header-wrapper" class="mdl-search__header-wrapper">
      <div class="mdl-layout__header-row">
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-search mdl-js-search mdl-search--expandable" search="mySearchFcn" submit="mySubmitFcn" debounce="100">
          <label class="mdl-search__left-icon mdl-button--icon mdl-button mdl-js-button">
            <i class="material-icons">search</i>
          </label>
          <label class="mdl-search__right-icon mdl-button--icon mdl-button mdl-js-button">
            <i class="material-icons">mic</i>
          </label>
          <input class="mdl-search__input" type="text" placeholder="Search here">
          <ul class="mdl-search__dropdown" for="header-wrapper"></ul>
        </div>
      </div>
    </div>
  </header>
  ...
</div>
```

## The MDL **search** component callbacks

The MDL **search** component is designed to update its list of search suggestions as the user types, and to respond when a user submits their search. These two features are exposed as a `search` callback and a `submit` callback, which are customized by providing function names in the `search` and `submit` attributes of the component:

```html
<div class="mdl-search mdl-js-search" search="mySearchFcn" submit="mySubmitFcn">
```

To avoid repetitive calls over a short time interval as the user types, it is recommended to "debounce" these callbacks by setting an optional `debounce` attribute on the component, with a time interval value in milliseconds:

```html
<div class="mdl-search mdl-js-search" search="mySearchFcn" submit="mySubmitFcn" debounce="100">
```

### The **search** callback:

This function will be called every time the value of the search input is changed, as well as once on initial registration of the component. It should have two parameters: `val`, the current value of the search input, and `done`, a callback function that expects an array of `HTML Elements` to use as the list of search suggestions (i.e. in the search dropdown):

```javascript
function searchCallback(val, done)
```

Search suggestions passed to `done` must be formatted as an array of `<li>` elements with class `mdl-search__item`. Elements can be created using a custom function or by using the `MaterialSearch` component's built-in public methods, `createItem` and `createItems`. The search callback has access to the `MaterialSearch` component and its properties and functions via the `this` keyword, which is bound by default to the `MaterialSearch` component.

The public methods `createItem` and `createItems` have the following signatures:

```javascript
function createItem(str, icon, data)
function createItems(str, icon, data)
```

`createItem` returns a single list item element with the given `str` text, an optional `icon` material-icon displayed on the left, and optional `data` object attached to the element as the property `mdlSearchData`. `createItem` performs the same task, but accepts an array of text `str`, creating a separate element for each value. Parameters `icon` and `data` may either be unary (same value will be used for each element) or an array with the same length as `str`.

Empty searches (`val===''`) should return a list of historical search suggestions, as indicated by the [Material Design specifications page](https://material.io/guidelines/patterns/search.html), and using the material-icon `access_time` to indicate that they are historical suggestions.

#### Example

Search callback using built-in list element creator.
```javascript
function mySearchFcn(val, done) {
  if (val) {
    // Create search suggestions (simply splits the search query into individual letters).
    var itemText = val.split('');
    var items = this.createItems(itemText, ' ', itemText);
  } else {
    // Create historical suggestions.
    var historyText = ['History 1', 'History 2', 'History 3'];
    var items = this.createItems(historyText, 'access_time', historyText);
  }
  // Display the suggestions.
  done(items);
}
```

### The **submit** callback:

This function will be called when a user clicks a search suggestion or when they press enter in the search input. It should have two parameters: `val`, the `HTML Element` of the selected suggestion (or the `string` value of the search input, if enter was pressed), and `index`, the index of the selected suggestion (`undefined` if enter was pressed):

```javascript
function submitCallback(val, index)
```

When search suggestions are created using the built-in `createItem(s)`, data can be attached to each component's `mdlSearchData` property. This data can be useful in determining the correct action when a search suggestion is selected.

The [Material Design specifications page](https://material.io/guidelines/patterns/search.html) states that, on submission, search results should be "formatted as cards and appear in the main body of the page beneath the toolbar." Implementation of search results is outside the scope of the MDL search component.

#### Example

Submit callback using `mdlSearchData` property.
```javascript
function mySubmitFcn(val, index) {
  // Check for `mdlSearchData` (`val` will be string if user pressed enter from input).
  if (val.mdlSearchData) {
    alert('You selected item ' + (index+1) + ': ' + val.mdlSearchData);
  } else {
    alert('You submitted ' + val);
  }
}
```

## Configuration options

The MDL CSS classes apply various predefined visual and behavioral enhancements to the menu. The table below lists the available classes and their effects.

| MDL class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-search` | Defines container as an MDL component | Required on "outer" div element |
| `mdl-js-search` | Assigns basic MDL behavior to search | Required on "outer" div element |
| `mdl-search__input` | Defines element as search input | Required on input element |
| `mdl-search__dropdown` | Defines element as search dropdown | Required on ul element |
| `mdl-search__left-icon` | Defines label as search back button | Required on label element |
| `mdl-search__right-icon` | Defines label as search cancel button | Required on label element |
| `mdl-search__item` | Defines element as a search suggestion | Required on li elements in dropdown |
| `mdl-search__item--full-bleed-divider` | Modifies an item to have a full bleed divider between it and the next list item. | Optional on li elements |
| `mdl-search__item-icon` | Defines label as a search item icon | Required on item label element |
| `mdl-button--icon` | Defines label as an MDL icon container | Required on left, right, and item icon labels |
| `material-icons` | Defines span as a material icon | Required on an inline element |
| `mdl-search--inset` | Applies *inset box* styling | Optional; goes on "outer" div element |
| `mdl-search--header` | Styles element for use in MDL layout header | Optional; goes on "outer" div element |
| `mdl-search--expandable` | Turns search into an icon that expands to fill its parent | Optional; goes on "outer" div element, and must have a relative-position ancestor |
| `mdl-search__header-wrapper` | Defines container as an MDL component | For header search bars, required on a div enclosing the MDL "header-row" |
| `mdl-search--full-width` | Applies full-width styling | Optional; goes on "outer" div element |
| `mdl-search--align-right` | Applies right-aligned text styling | Optional; goes on "outer" div element |
| `mdl-search--animate` | Enable dropdown animations | Optional; goes on "outer" div element | 
| `mdl-search--ripple` | Enable dropdown ripple effects | Optional; goes on "outer" div element |

(1) The "search" and "mic" icons are used here as an example. Other icons can be used by modifying the text. For a list of available icons, see [this page](https://www.google.com/design/icons).

>**Note:** Disabled versions of the search suggestion options are provided, and are invoked with the standard HTML boolean attribute `disabled` or `data-mdl-disabled`. `<li class="mdl-search__item" disabled>Medium</li>`
>This attribute may be added or removed programmatically via scripting.
