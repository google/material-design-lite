---
title: Chips
description: Variations on Material Design chips.
link: https://material.io/components/chips
codepen: YzLjKRM
---

Chips can show multiple interactive elements together in the same area, such as a list of selectable movie times, or a series of email contacts. There are four types of chips: assist, filter, input, and suggestion.

## Preview

<div class="preview">
  <button class="chip">
    <i class="material-icons">add</i>
    <label>Default</label>
  </button>
  <button class="chip assist">
    <i class="material-icons">info</i>
    <label>Assist</label>
  </button>
  <button class="chip filter">
    <i class="material-icons">filter_list</i>
    <label>Filter</label>
  </button>
  <button class="chip input">
    <i class="material-icons">edit</i>
    <label>Input</label>
  </button>
  <button class="chip suggestion">
    <i class="material-icons">help</i>
    <label>Suggestion</label>
  </button>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/chip/style.css');
```

## Usage

Start with a **button** or **div** element and add the **chip** class name:

```html
<button class="chip">Chip</button>
```

### Leading Icon (Optional)

<div class="preview">
  <button class="chip">
    <i class="material-icons">favorite</i>
    <label>Chip</label>
  </button>
</div>

To add a leading icon to a chip add a **i** element with the **material-icons** class name:

```html
<button class="chip">
  <i class="material-icons">favorite</i>
  <label>Chip</label>
</button>
```

### Trailing Icon (Optional)

<div class="preview">
  <button class="chip">
    <label>Chip</label>
    <i class="material-icons">close</i>
  </button>
</div>

To add a trailing icon to a chip add a **i** element with the **material-icons** class name:

```html
<button class="chip">
    <label>Chip</label>
  <i class="material-icons">close</i>
</button>
```

## Variants

### Default

Default chip styling.

<div class="preview">
  <button class="chip">
    <i class="material-icons">add</i>
    <label>Default</label>
  </button>
  <button class="chip hover">
    <i class="material-icons">add</i>
    <label>Hovered</label>
  </button>
  <button class="chip active">
    <i class="material-icons">add</i>
    <label>Active</label>
  </button>
  <button class="chip focus">
    <i class="material-icons">add</i>
    <label>Focus</label>
  </button>
  <button class="chip" disabled>
    <i class="material-icons">add</i>
    <label>Disabled</label>
  </button>
</div>

```html
<button class="chip">
  <i class="material-icons">add</i>
  <label>Default</label>
</button>
```

### Assist

Assist chip styling.

<div class="preview">
  <button class="chip assist">
    <i class="material-icons">info</i>
    <label>Default</label>
  </button>
  <button class="chip assist hover">
    <i class="material-icons">info</i>
    <label>Hovered</label>
  </button>
  <button class="chip assist active">
    <i class="material-icons">info</i>
    <label>Active</label>
  </button>
  <button class="chip assist focus">
    <i class="material-icons">info</i>
    <label>Focus</label>
  </button>
  <button class="chip assist" disabled>
    <i class="material-icons">info</i>
    <label>Disabled</label>
  </button>
</div>

```html
<button class="chip assist">
  <i class="material-icons">info</i>
  <label>Default</label>
</button>
```

### Filter

Filter chip styling.

<div class="preview">
  <button class="chip filter">
    <i class="material-icons">filter_list</i>
    <label>Default</label>
  </button>
  <button class="chip filter hover">
    <i class="material-icons">filter_list</i>
    <label>Hovered</label>
  </button>
  <button class="chip filter active">
    <i class="material-icons">filter_list</i>
    <label>Active</label>
  </button>
  <button class="chip filter focus">
    <i class="material-icons">filter_list</i>
    <label>Focus</label>
  </button>
  <button class="chip filter" disabled>
    <i class="material-icons">filter_list</i>
    <label>Disabled</label>
  </button>
</div>

```html
<button class="chip filter">
  <i class="material-icons">filter_list</i>
  <label>Default</label>
</button>
```

### Input

Input chip styling.

<div class="preview">
  <button class="chip input">
    <i class="material-icons">edit</i>
    <label>Default</label>
  </button>
  <button class="chip input hover">
    <i class="material-icons">edit</i>
    <label>Hovered</label>
  </button>
  <button class="chip input active">
    <i class="material-icons">edit</i>
    <label>Active</label>
  </button>
  <button class="chip input focus">
    <i class="material-icons">edit</i>
    <label>Focus</label>
  </button>
  <button class="chip input" disabled>
    <i class="material-icons">edit</i>
    <label>Disabled</label>
  </button>
</div>

```html
<button class="chip input">
  <i class="material-icons">edit</i>
  <label>Default</label>
</button>
```

### Suggestion

Suggestion chip styling.

<div class="preview">
  <button class="chip suggestion">
    <i class="material-icons">help</i>
    <label>Default</label>
  </button>
  <button class="chip suggestion hover">
    <i class="material-icons">help</i>
    <label>Hovered</label>
  </button>
  <button class="chip suggestion active">
    <i class="material-icons">help</i>
    <label>Active</label>
  </button>
  <button class="chip suggestion focus">
    <i class="material-icons">help</i>
    <label>Focus</label>
  </button>
  <button class="chip suggestion" disabled>
    <i class="material-icons">help</i>
    <label>Disabled</label>
  </button>
</div>

```html
<button class="chip suggestion">
  <i class="material-icons">help</i>
  <label>Default</label>
</button>
```

## Design Tokens

| Token                                   | Description                        | Default                                                                                   |
|-----------------------------------------|------------------------------------|-------------------------------------------------------------------------------------------|
| `--md-sys-comp-chip-background-color` | The background color of the chip | <div class="tooltip token-box color-surface" data-tooltip="--md-sys-color-surface"></div> |
| `--md-sys-comp-chip-color`            | The foreground color of the chip | <div class="tooltip token-box color-primary" data-tooltip="--md-sys-color-primary"></div> |
| `--md-comp-button-container-height`     | The height of the container        | `32px`                                                                                    |

## Accessibility

- [ARIA Resources](https://static.corp.google.com/ariablueprints/button/button.html)
