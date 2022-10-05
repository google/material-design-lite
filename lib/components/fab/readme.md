---
title: Floating Action Button
description: Variations on Material Design fabs.
link: https://m3.material.io/components/floating-action-button
codepen: LYmBMzR
---

There are three sizes of floating action buttons: FAB, small FAB, and large FAB.

## Preview

<div class="preview">
  <button class="fab">
    <i class="material-icons">add</i>
  </button>
  <button class="fab small">
    <i class="material-icons">add</i>
  </button>
  <button class="fab large">
    <i class="material-icons">add</i>
  </button>
  <button class="fab extended">Extended</button>
  <button class="fab surface">
    <i class="material-icons">add</i>
  </button>
  <button class="fab secondary">
    <i class="material-icons">add</i>
  </button>
  <button class="fab tertiary">
    <i class="material-icons">add</i>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/fab/style.css');
```

## Usage

Start with a **button** or **div** element and add the **fab** class name:

```html
<button class="fab"></button>
```

## Variants

### Default

Default fab styling.

<div class="preview">
  <button class="fab">
    <i class="material-icons">add</i>
  </button>
  <button class="fab hover">
    <i class="material-icons">add</i>
  </button>
  <button class="fab active">
    <i class="material-icons">add</i>
  </button>
  <button class="fab focus">
    <i class="material-icons">add</i>
  </button>
  <button class="fab" disabled>
    <i class="material-icons">add</i>
  </button>
</div>

```html
<button class="fab">
  <i class="material-icons">add</i>
</button>
```

### Small

Small fab styling.

<div class="preview">
  <button class="fab small">
    <i class="material-icons">add</i>
  </button>
  <button class="fab small hover">
    <i class="material-icons">add</i>
  </button>
  <button class="fab small active">
    <i class="material-icons">add</i>
  </button>
  <button class="fab small focus">
    <i class="material-icons">add</i>
  </button>
  <button class="fab small" disabled>
    <i class="material-icons">add</i>
  </button>
</div>
  
```html
<button class="fab small">
  <i class="material-icons">add</i>
</button>
```

### Large

Large fab styling.

<div class="preview">
  <button class="fab large">
    <i class="material-icons">add</i>
  </button>
  <button class="fab large hover">
    <i class="material-icons">add</i>
  </button>
  <button class="fab large active">
    <i class="material-icons">add</i>
  </button>
  <button class="fab large focus">
    <i class="material-icons">add</i>
  </button>
  <button class="fab large" disabled>
    <i class="material-icons">add</i>
  </button>
</div>

```html
<button class="fab large">
  <i class="material-icons">add</i>
</button>
```

### Extended

Extended fab styling.

<div class="preview">
  <button class="fab extended">Extended</button>
  <button class="fab extended hover">Extended</button>
  <button class="fab extended active">Extended</button>
  <button class="fab extended focus">Extended</button>
  <button class="fab extended" disabled>Extended</button>
</div>
  
```html
<button class="fab extended">Extended</button>
```

#### Icon (Optional)

Add an icon to the extended fab.

<div class="preview">
  <button class="fab extended">
    <i class="material-icons">edit</i>
    <label>Extended</label>
  </button>
</div>

```html
<button class="fab extended">
  <i class="material-icons">edit</i>
  <label>Extended</label>
</button>
```

### Surface

Surface fab styling.

<div class="preview">
  <button class="fab surface">
    <i class="material-icons">add</i>
  </button>
  <button class="fab surface hover">
    <i class="material-icons">add</i>
  </button>
  <button class="fab surface active">
    <i class="material-icons">add</i>
  </button>
  <button class="fab surface focus">
    <i class="material-icons">add</i>
  </button>
  <button class="fab surface" disabled>
    <i class="material-icons">add</i>
  </button>
</div>

```html
<button class="fab surface">
  <i class="material-icons">add</i>
</button>
```

### Secondary

Secondary fab styling.

<div class="preview">
  <button class="fab secondary">
    <i class="material-icons">add</i>
  </button>
  <button class="fab secondary hover">
    <i class="material-icons">add</i>
  </button>
  <button class="fab secondary active">
    <i class="material-icons">add</i>
  </button>
  <button class="fab secondary focus">
    <i class="material-icons">add</i>
  </button>
  <button class="fab secondary" disabled>
    <i class="material-icons">add</i>
  </button>
</div>

```html
<button class="fab secondary">
  <i class="material-icons">add</i>
</button>
```

### Tertiary

Tertiary fab styling.

<div class="preview">
  <button class="fab tertiary">
    <i class="material-icons">add</i>
  </button>
  <button class="fab tertiary hover">
    <i class="material-icons">add</i>
  </button>
  <button class="fab tertiary active">
    <i class="material-icons">add</i>
  </button>
  <button class="fab tertiary focus">
    <i class="material-icons">add</i>
  </button>
  <button class="fab tertiary" disabled>
    <i class="material-icons">add</i>
  </button>
</div>

```html
<button class="fab tertiary">
  <i class="material-icons">add</i>
</button>
```

## Design Tokens

| Token                                | Description                     | Default                                                                                                             |
|--------------------------------------|---------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `--md-sys-comp-fab-background-color` | The background color of the fab | <div class="tooltip token-box color-primary-container" data-tooltip="--md-sys-color-primary-container"></div>       |
| `--md-sys-comp-fab-color`            | The foreground color of the fab | <div class="tooltip token-box color-on-primary-container" data-tooltip="--md-sys-color-on-primary-container"></div> |
| `--md-comp-fab-container-size`       | The height of the container     | `56px`                                                                                                              |

## Resources

- [ARIA Resources](https://static.corp.google.com/ariablueprints/button/button.html)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
- [Material Design](https://m3.material.io/components/buttons)
