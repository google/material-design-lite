---
title: Switch
description: Variations on Material Design switches.
link: https://m3.material.io/components/switch
codepen: mdLGGEO
---

## Preview

<div class="preview">
  <input class="switch" type="checkbox" />
  <input class="switch icon-selected" type="checkbox" checked />
  <input class="switch icon-unselected" type="checkbox" />
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/switch/style.css');
```

## Usage

Start with a **input** element and add the **switch** class name:

```html
<input class="switch" type="checkbox" />
```

## Variants

### Default

Default switch styling.

<div class="preview">
  <input class="switch" type="checkbox"/>
  <input class="switch" type="checkbox" checked/>
  <input class="switch" type="checkbox" disabled/>
</div>

```html
<input class="switch" type="checkbox" />
```

### Icon Selected

Switch with icon selected styling.

<div class="preview">
  <input class="switch icon-selected" type="checkbox"/>
  <input class="switch icon-selected" type="checkbox" checked/>
  <input class="switch icon-selected" type="checkbox" disabled/>
</div>

```html
<input class="switch icon-selected" type="checkbox" />
```

### Icon Unselected

Switch with icon unselected styling.

<div class="preview">
  <input class="switch icon-unselected" type="checkbox"/>
  <input class="switch icon-unselected" type="checkbox" checked/>
  <input class="switch icon-unselected" type="checkbox" disabled/>
</div>

```html
<input class="switch icon-unselected" type="checkbox" />
```

## Design Tokens

| Token                                    | Description                | Default |
|------------------------------------------|----------------------------|---------|
| `--md-sys-comp-switch-thumb-size` | The size of the thumb | `16px` |
| `--md-sys-comp-switch-track-width` | The width of the track | `52px` |
| `--md-sys-comp-switch-track-height` | The height of the track | `32px` |
| `--md-sys-comp-switch-border-width` | The width of the border | `2px` |

## Resources

- [Material Design](https://m3.material.io/components/switch)
