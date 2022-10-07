---
title: Tooltip
description: Variations on Material Design tooltips.
link: https://material.io/components/tooltips
codepen: OJZoaoX
---

## Preview

<div class="preview">
  <a class="tooltip" href="#" data-tooltip="Tooltip contents here!">Hover Me!</a>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/tooltip/style.css');
```

## Usage

Start with a **div** element and add the **tooltip** class name and **data-tooltip** attribute:

```html
<a class="tooltip" href="#" data-tooltip="Tooltip contents here!">Hover Me!</a>
```

It is also to use the **aria-label** attribute:

```html
<a class="tooltip" href="#" aria-label="Tooltip contents here!">Hover Me!</a>
```

## Design Tokens

| Token                                    | Description                           | Default                                                                                                         |
|------------------------------------------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| `--md-sys-comp-tooltip-background-color` | The background color of the container | <div class="tooltip token-box color-inverse-surface" data-tooltip="--md-sys-color-inverse-surface"></div>       |
| `--md-sys-comp-tooltip-color`            | The foreground color of the container | <div class="tooltip token-box color-inverse-on-surface" data-tooltip="--md-sys-color-inverse-on-surface"></div> |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)
- [Material Design](https://material.io/components/tooltips)
