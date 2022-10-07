---
title: Snackbar
description: Variations on Material Design snackbars.
link: https://material.io/components/snackbars
codepen: oNdPPXg
---

## Preview

<div class="preview">
  <div class="snackbar">
    <span>Default snackbar with action</span>
    <button class="text">Action</button>
  </div>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/snackbar/style.css');
```

## Usage

Start with a **div** element and add the **snackbar** class name:

```html
<div class="snackbar"></div>
```

Then add a **span** element with the message:

```html
<div class="snackbar">
  <span>Default snackbar with action</span>
</div>
```

To add an action button, add a **button** element with the **text** class name:

```html
<div class="snackbar">
  <span>Default snackbar with action</span>
  <button class="text">Action</button>
</div>
```

## Variants

### Default

Default snackbar styling.

<div class="preview">
  <div class="snackbar">
    <span>Default snackbar with action</span>
    <button class="text">Action</button>
  </div>
</div>

```html
<div class="snackbar">
  <span>Default snackbar with action</span>
  <button class="text">Action</button>
</div>
```

## Design Tokens

| Token                                   | Description                 | Default |
|-----------------------------------------|-----------------------------|---------|
| `--md-sys-comp-snackbar-container-width` | The width of the container | `344px`  |
| `--md-sys-comp-snackbar-background-color`            | The background color of the container | <div class="tooltip token-box color-inverse-surface" data-tooltip="--md-sys-color-inverse-surface"></div> |
| `--md-sys-comp-snackbar-color`            | The foreground color of the container | <div class="tooltip token-box color-inverse-on-surface" data-tooltip="--md-sys-color-inverse-on-surface"></div> |

## Resources

- [Material Design](https://material.io/components/snackbars)
