---
title: Checkbox
description: Variations on Material Design checkboxes.
link: https://material.io/components/checkboxes
codepen: YzLjjwo
---

Variations on Material Design checkboxes.

## Preview

<div class="preview">
    <input type="checkbox" />
    <input type="checkbox" checked />
    <input class="indeterminate" type="checkbox" />
    <input type="checkbox" disabled />
</div>

## Installation

To import just the component styles, copy the following into your project's `styles.css` file:

```css
/* Core Styles */
@import url('https://rodydavis.github.io/material-design-lite/css/core.css');
/* Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
/* Roboto Font */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap');
/* Component Styles */
@import url('https://rodydavis.github.io/material-design-lite/css/components/checkbox/style.css');
```

## Usage

Start with a **input** element and add the **checkbox** class name:

```html
<input type="checkbox" />
```

The **checkbox** class name is implicit when using the **type=checkbox** attribute.

## Variants

### Default

<div class="preview">
    <input type="checkbox" />
</div>

```html
<input type="checkbox" />
```

### Checked

<div class="preview">
    <input type="checkbox" checked />
</div>

```html
<input type="checkbox" checked />
```

It is recommended to use the **checked** attribute to set the checkbox to checked but it is also possible to the **checked** class name.

```html
<input type="checkbox" class="checked" />
```

### Indeterminate

<div class="preview">
    <input class="indeterminate" type="checkbox" />
</div>

```html
<input class="indeterminate" type="checkbox" />
```

To manually set the checkbox to **indeterminate** run the following:

```js
const elements = document.querySelectorAll(".indeterminate");
elements.forEach((element) => {
    element.indeterminate = true;
});
```

### Disabled

<div class="preview">
    <input type="checkbox" disabled />
</div>

```html
<input type="checkbox" disabled />
```

## Design Tokens

| Token                       | Description                        | Default                                                                                         |
|-----------------------------|------------------------------------|-------------------------------------------------------------------------------------------------|
| `--md-sys-comp-checkbox-unselected-color`    | Unselected outline color   | <div class="tooltip token-box color-outline" data-tooltip="--md-sys-color-outline"></div>       |
| `--md-sys-comp-checkbox-selected-color` | Selected color of the checkbox | <div class="tooltip token-box color-primary" data-tooltip="--md-sys-color-primary"></div> |
| `--md-sys-comp-checkbox-size`  | The size of the container         | `24px`                                                                                         |

<script>
  const elements = document.querySelectorAll(".indeterminate");
  elements.forEach((element) => {
    element.indeterminate = true;
  });
</script>