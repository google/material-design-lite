---
title: Bottom App Bar
description: Variations on Material Design bottom app bars.
link: https://m3.material.io/components/bottom-app-bar/overview
tab: "components"
playground: https://codepen.io/rodydavis/embed/oNdMNWv?default-tab=html%2Cresult&editable=true
---

Bottom app bars provide access to a bottom navigation drawer and include multiple actions and an optional floating action button.

## Preview

<footer class="bottom-app-bar" style="min-width: 400px">
  <div class="actions">
    <button class="icon button">
      <i class="material-icons">search</i>
    </button>
    <button class="icon button">
      <i class="material-icons">delete</i>
    </button>
    <button class="icon button">
      <i class="material-icons">archive</i>
    </button>
  </div>
  <button class="fab">
    <i class="material-icons">add</i>
  </button>
</footer>

## Installation

To import just the component styles, copy the following into your project's `styles.css` file:

```css
/* Core Styles */
@import url('https://rodydavis.github.io/material-design-lite/css/core.css');
/* Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
/* Roboto Font */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap');
/* Component Styles */
@import url('https://rodydavis.github.io/material-design-lite/css/components/bottom-app-bar/style.css');
```

## Usage

Start with a `div` or `footer` element and add the `bottom-app-bar` class name:

```html
<footer class="bottom-app-bar"></footer>
```

#### Actions

To add actions to the bottom app bar, add a div with the `actions` class name with buttons as children:

```html
<footer class="bottom-app-bar">
  <div class="actions">
    <button class="icon">
      <i class="material-icons">search</i>
    </button>
    <button class="icon">
      <i class="material-icons">delete</i>
    </button>
    <button class="icon">
      <i class="material-icons">archive</i>
    </button>
  </div>
</footer>
```

#### Floating Action Button

To add a floating action button to the bottom app bar, add a `button` element with the `fab` class name:

```html
<footer class="bottom-app-bar">
  <button class="fab">
    <i class="material-icons">add</i>
  </button>
</footer>
```

#### Examples

```html
<footer class="bottom-app-bar">
  <div class="actions">
    <button class="icon">
      <i class="material-icons">search</i>
    </button>
    <button class="icon">
      <i class="material-icons">delete</i>
    </button>
    <button class="icon">
      <i class="material-icons">archive</i>
    </button>
  </div>
  <button class="fab">
    <i class="material-icons">add</i>
  </button>
</footer>
```

## Styling

Since the bottom app bar is meant to be at the bottom of the screen, it is recommended to use a `div` or `footer` element with position `fixed` or `sticky`  and `bottom: 0` to keep it at the bottom of the screen.

```css
.bottom-app-bar {
  position: fixed; /* or sticky */
  bottom: 0;
}
```

### Design Tokens

| Token                               | Description                                | Default                                                                                                         |
|-------------------------------------|--------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| `--md-sys-color-surface`            | The background color of the bottom app bar | <div class="tooltip token-box color-surface" data-tooltip="--md-sys-color-surface"></div>                       |
| `--md-sys-color-on-surface`         | The foreground color of the bottom app bar | <div class="tooltip token-box color-on-surface" data-tooltip="--md-sys-color-on-surface"></div>                 |
| `--md-sys-color-surface-variant`    | The background color of the fab            | <div class="tooltip token-box color-surface-variant" data-tooltip="--md-sys-color-surface-variant"></div>       |
| `--md-sys-color-on-surface-variant` | The foreground color of the icons          | <div class="tooltip token-box color-on-surface-variant" data-tooltip="--md-sys-color-on-surface-variant"></div> |


## Playground

<iframe height="400" style="width: 100%;" scrolling="no" title="Bottom App Bars" src="https://codepen.io/rodydavis/embed/oNdMNWv?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/rodydavis/pen/oNdMNWv">
  Bottom App Bars</a> by Rody Davis (<a href="https://codepen.io/rodydavis">@rodydavis</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

