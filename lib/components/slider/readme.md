---
title: Slider
description: Variations on Material Design sliders.
link: https://m3.material.io/components/sliders/overview
codepen: rNvZrgq
---

## Preview

<div class="preview">
  <input class="slider" type="range" min="0" max="100" />
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/slider/style.css');
```

## Usage

Start with a **input** element and add the **slider** class name and **type="range"**:

```html
<input class="slider" type="range">
```

The **slider** class name is implicit when used with the **input** element and **type="range"**.

## Variants

### Default

Default slider styling.

<div class="preview">
  <input class="slider" type="range">
</div>

```html
<input class="slider" type="range">
```

## Design Tokens

| Token                                | Description                    | Default |
|--------------------------------------|--------------------------------|---------|
| `--md-sys-comp-slider-container-height` | The height of the container | `36px` |
| `--md-sys-comp-slider-container-width` | The width of the container | `100%` |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)
- [Material Design](https://m3.material.io/components/sliders/overview)
