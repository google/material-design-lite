---
title: Focus Ring
description: Variations on Material Design focus rings.
codepen: BaxPvbq
---

## Preview

<div class="preview">
  <button class="focus-ring">Button</button>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/focus-ring/style.css');
```

## Usage

Start with a **button** element (or element that can be focused) and add the **focus-ring** class name:

```html
<button class="focus-ring">Button</button>
```

## Variants

### Default

Default focus ring styling.

<div class="preview">
  <button class="focus-ring">Button</button>
</div>

```html
<button class="focus-ring">Button</button>
```

## Design Tokens

| Token                            | Description                 | Default                                                                                                         |
|----------------------------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------|
| `--md-sys-comp-focus-ring-color` | The color of the focus ring | <div class="tooltip token-box color-on-surface-variant" data-tooltip="--md-sys-color-on-surface-variant"></div> |
| `--md-sys-comp-focus-ring-width` | The width of the focus ring | `2px`                                                                                                           |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
