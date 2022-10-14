---
title: Progress Indicator
description: Variations on Material Design progress indicators.
codepen: MWGqQgg
link: https://material.io/components/progress-indicators
---

## Preview

<div class="preview">
  <progress>Loading...</progress>
  <progress value="75" max="100">75%</progress>
  <div class="progress linear" style="--progress: 75%">
    <progress value="75" max="100">75%</progress>
  </div>
  <div class="progress linear indeterminate">
    <progress indeterminate>75%</progress>
  </div>
  <div class="progress circular" style="--progress: 35%">
    <progress value="35" max="100">35%</progress>
  </div>
  <div class="progress circular indeterminate">
    <progress indeterminate>75%</progress>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/progress/style.css');
```

## Usage

Start with a **progress** or **div** element and add the **progress** class name:

```html
<progress class="progress"></progress>
```

By default, the progress indicator color will be the system default using the [**accent-color**](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color) CSS variable.

## Variants

### Indeterminate

To make a progress indicator indeterminate add the **indeterminate** attribute:

```html
<progress class="progress" indeterminate></progress>
```

### Linear Determinate

The value is set as a CSS custom property on the **progress** element and also in the **progress** element's **value** attribute for accessibility. The default progress element will be hidden.

The value is a percentage between 0 and 100.

<div class="preview">
  <div class="progress linear" style="--progress: 75%">
    <progress value="75" max="100">75%</progress>
  </div>
</div>

```html
<div class="progress linear" style="--progress: 75%">
  <progress value="75" max="100">75%</progress>
</div>
```

### Linear Indeterminate

To make a linear progress indicator indeterminate add the **indeterminate** attribute:

<div class="preview">
  <div class="progress linear indeterminate">
    <progress indeterminate>75%</progress>
  </div>
</div>

```html
<div class="progress linear indeterminate">
  <progress indeterminate>75%</progress>
</div>
```

### Circular Determinate

The value is set as a CSS custom property on the **progress** element and also in the **progress** element's **value** attribute for accessibility. The default progress element will be hidden.

The value is a percentage between 0 and 100.

<div class="preview">
  <div class="progress circular" style="--progress: 35%">
    <progress value="35" max="100">35%</progress>
  </div>
</div>

```html
<div class="progress circular" style="--progress: 35%">
  <progress value="35" max="100">35%</progress>
</div>
```

### Circular Indeterminate

To make a circular progress indicator indeterminate add the **indeterminate** attribute:

<div class="preview">
  <div class="progress circular indeterminate">
    <progress indeterminate>75%</progress>
  </div>
</div>

```html
<div class="progress circular indeterminate">
  <progress indeterminate>75%</progress>
</div>
```

## Design Tokens

| Token                                          | Description                                | Default                                                                                                   |
|------------------------------------------------|--------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `--md-sys-comp-progress-background-color`      | The background color of the bar            | <div class="tooltip token-box color-surface-variant" data-tooltip="--md-sys-color-surface-variant"></div> |
| `--md-sys-comp-progress-color`                 | The foreground color of the bar            | <div class="tooltip token-box color-primary" data-tooltip="--md-sys-color-primary"></div>                 |
| `--md-sys-comp-progress-size`                  | The size of the bar                        | `4px`                                                                                                     |
| `--md-sys-comp-progress-circular-size`         | The size of the circular indicator         | `32px`                                                                                                    |
| `--md-sys-comp-progress-circular-center-color` | The center color of the circular indicator | <div class="tooltip token-box color-surface" data-tooltip="--md-sys-color-surface"></div>                 |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul)
