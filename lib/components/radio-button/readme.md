---
title: Radio Button
description: Variations on Material Design radio buttons.
codepen: WNJgzmE
---

## Preview

<div class="preview">
  <input
  class="radio-button"
  type="radio"
  name="question"
  value="false"
  id="false"
  />
  <input
    class="radio-button"
    type="radio"
    name="question"
    value="true"
    id="true"
    checked
  />
</div>

## Installation

To import just the component styles, copy the following into your project's **styles.css** file:

```css
/* Core Styles */
@import url('https://rodydavis.github.io/material-design-lite/css/core.css');
/* Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
/* Roboto Font */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap');
/* Component Styles */
@import url('https://rodydavis.github.io/material-design-lite/css/components/radio-button/style.css');
```

## Usage

Start with a **input** element and add the **type=radio** attribute and **radio-button** class name:

```html
<input class="radio-button" type="radio"/>
```

The **radio-button** class name is implicit when using the **type=radio** element.

To set the radio button as checked, add the **checked** attribute:

```html
<input class="radio-button" type="radio" checked/>
```

## Variants

### Default

Default list tile styling.

<div class="preview">
   <input class="radio-button" type="radio" name="radio" checked/>
</div>

```html
<input class="radio-button" type="radio" name="radio" checked/>
```

## Design Tokens

| Token                                         | Description           | Default                                                                                                         |
|-----------------------------------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------|
| `--md-sys-comp-radio-button-unselected-color` | Unselected icon color | <div class="tooltip token-box color-on-surface-variant" data-tooltip="--md-sys-color-on-surface-variant"></div> |
| `--md-sys-comp-radio-button-selected-color`   | Selected icon color   | <div class="tooltip token-box color-primary" data-tooltip="--md-sys-color-primary"></div>                       |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)
