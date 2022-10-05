---
title: Dividers
description: Variations on Material Design dividers.
link: https://m3.material.io/components/divider
codepen: YzLjdOr
---

Dividers can reinforce tapability, such as when used to separate list items or define tappable regions in an accordion.

## Preview

<div class="preview">
  <div class="divider" style="min-width: 400px"></div>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/divider/style.css');
```

## Usage

Start with a **hr** or **div** element and add the **divider** class name:

```html
<hr class="divider">
```

The **divider** class name is implicit when using the **hr** element.

## Variants

### Default

Default chip styling.

<div class="preview">
  <hr class="divider">
</div>

```html
<hr class="divider">
```

## Design Tokens

| Token                                   | Description                        | Default                                                                                   |
|-----------------------------------------|------------------------------------|-------------------------------------------------------------------------------------------|
| `--md-sys-comp-divider-color` | The color of the divider | <div class="tooltip token-box color-outline-variant" data-tooltip="--md-sys-color-outline-variant"></div> |
| `--md-comp-divider-container-height`     | The height of the container        | `1px`                                                                                    |
| `--md-comp-divider-container-width`     | The width of the container        | `100%`                                                                                    |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr)
- [Material Design](https://m3.material.io/components/divider)
