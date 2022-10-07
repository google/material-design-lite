---
title: Top App Bar
description: Variations on Material Design top app bars.
link: https://m3.material.io/components/top-app-bar
codepen: wvjERKq
---

## Preview

<div class="preview">
<header class="top-app-bar center-aligned" style="min-width: 400px">
  <button class="icon-button leading">
    <i class="material-icons">menu</i>
  </button>
  <span class="title">Title Large</span>
  <div class="actions">
    <button class="icon-button">
      <i class="material-icons">search</i>
    </button>
  </div>
</header>
<header class="top-app-bar small" style="min-width: 400px">
  <button class="icon-button leading">
    <i class="material-icons">arrow_back</i>
  </button>
  <span class="title">Title Large</span>
  <div class="actions">
    <button class="icon-button">
      <i class="material-icons">info</i>
    </button>
    <button class="icon-button">
      <i class="material-icons">filter_list</i>
    </button>
    <button class="icon-button">
      <i class="material-icons">settings</i>
    </button>
  </div>
</header>
<header class="top-app-bar medium" style="min-width: 400px">
  <button class="icon-button leading">
    <i class="material-icons">menu</i>
  </button>
  <span class="title">Headline Small</span>
  <div class="actions">
    <button class="icon-button">
      <i class="material-icons">info</i>
    </button>
    <button class="icon-button">
      <i class="material-icons">settings</i>
    </button>
  </div>
</header>
<header class="top-app-bar large" style="min-width: 400px">
  <button class="icon-button leading">
    <i class="material-icons">menu</i>
  </button>
  <span class="title">Headline Medium</span>
  <div class="actions">
    <button class="icon-button">
      <i class="material-icons">info</i>
    </button>
    <button class="icon-button">
      <i class="material-icons">settings</i>
    </button>
  </div>
</header>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/list/style.css');
@import url('https://rodydavis.github.io/material-design-lite/css/components/top-app-bar/style.css');
```

## Usage

Start with a **header** element and add the **top-app-bar** class name:

```html
<header class="top-app-bar">
   <span class="title">Title</span>
</header>
```

The **top-app-bar** class name is implicit when using the **header** element.

### Scrollable

Add the **scrolled** class name to the **top-app-bar** to make it have a scrollable effect.

<div class="preview">
  <header class="top-app-bar scrolled" style="min-width: 400px">
    <span class="title">Title</span>
  </header>
</div>

```html
<header class="top-app-bar scrolled">
  <span class="title">Title</span>
</header>
```

```js
const header = document.querySelector(".top-app-bar");
window.addEventListener("scroll", (e) => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
```

## Variants

### Default

Default top app bar styling.

<div class="preview">
  <header class="top-app-bar center-aligned" style="min-width: 400px">
    <button class="icon-button leading">
      <i class="material-icons">menu</i>
    </button>
    <span class="title">Title Large</span>
    <div class="actions">
      <button class="icon-button">
        <i class="material-icons">search</i>
      </button>
    </div>
  </header>
</div>

```html
<header class="top-app-bar center-aligned">
  <button class="icon-button leading">
    <i class="material-icons">menu</i>
  </button>
  <span class="title">Title Large</span>
  <div class="actions">
    <button class="icon-button">
      <i class="material-icons">search</i>
    </button>
  </div>
</header>
```

### Small

Small top app bar styling.

<div class="preview">
  <header class="top-app-bar small" style="min-width: 400px">
    <button class="icon-button leading">
      <i class="material-icons">arrow_back</i>
    </button>
    <span class="title">Title Large</span>
    <div class="actions">
      <button class="icon-button">
        <i class="material-icons">info</i>
      </button>
      <button class="icon-button">
        <i class="material-icons">filter_list</i>
      </button>
      <button class="icon-button">
        <i class="material-icons">settings</i>
      </button>
    </div>
  </header>
</div>

```html
<header class="top-app-bar small">
  <button class="icon-button leading">
    <i class="material-icons">arrow_back</i>
  </button>
  <span class="title">Title Large</span>
  <div class="actions">
    <button class="icon-button">
      <i class="material-icons">info</i>
    </button>
    <button class="icon-button">
      <i class="material-icons">filter_list</i>
    </button>
    <button class="icon-button">
      <i class="material-icons">settings</i>
    </button>
  </div>
</header>
```

### Medium

Medium top app bar styling.

<div class="preview">
  <header class="top-app-bar medium" style="min-width: 400px">
    <button class="icon-button leading">
      <i class="material-icons">arrow_back</i>
    </button>
    <span class="title">Headline Small</span>
    <div class="actions">
      <button class="icon-button">
        <i class="material-icons">info</i>
      </button>
      <button class="icon-button">
        <i class="material-icons">filter_list</i>
      </button>
      <button class="icon-button">
        <i class="material-icons">settings</i>
      </button>
    </div>
  </header>
</div>

```html
<header class="top-app-bar medium">
  <button class="icon-button leading">
    <i class="material-icons">arrow_back</i>
  </button>
  <span class="title">Headline Small</span>
  <div class="actions">
    <button class="icon-button">
      <i class="material-icons">info</i>
    </button>
    <button class="icon-button">
      <i class="material-icons">filter_list</i>
    </button>
    <button class="icon-button">
      <i class="material-icons">settings</i>
    </button>
  </div>
</header>
```

### Large

Large top app bar styling.

<div class="preview">
  <header class="top-app-bar large" style="min-width: 400px">
    <button class="icon-button leading">
      <i class="material-icons">arrow_back</i>
    </button>
    <span class="title">Headline Medium</span>
    <div class="actions">
      <button class="icon-button">
        <i class="material-icons">info</i>
      </button>
      <button class="icon-button">
        <i class="material-icons">filter_list</i>
      </button>
      <button class="icon-button">
        <i class="material-icons">settings</i>
      </button>
    </div>
  </header>
</div>

```html
<header class="top-app-bar large">
  <button class="icon-button leading">
    <i class="material-icons">arrow_back</i>
  </button>
  <span class="title">Headline Medium</span>
  <div class="actions">
    <button class="icon-button">
      <i class="material-icons">info</i>
    </button>
    <button class="icon-button">
      <i class="material-icons">filter_list</i>
    </button>
    <button class="icon-button">
      <i class="material-icons">settings</i>
    </button>
  </div>
</header>
```

## Design Tokens

| Token                                | Description                    | Default |
|--------------------------------------|--------------------------------|---------|
| `--md-comp-top-app-bar-padding` | The padding of the container | `16px` |
| `--md-sys-comp-top-app-bar-background-color` | The background color of the container | <div class="tooltip token-box color-surface" data-tooltip="--md-sys-color-surface"></div>       |
| `--md-sys-comp-top-app-bar-color`            | The foreground color of the container | <div class="tooltip token-box color-on-surface" data-tooltip="--md-sys-color-on-surface"></div> |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header)
- [Material Design](https://m3.material.io/components/top-app-bar)
