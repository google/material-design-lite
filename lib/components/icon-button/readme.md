---
title: Icon button
description: Variations on Material Design icon buttons.
link: https://m3.material.io/components/icon-buttons
codepen: abGawRX
---

Icons visually communicate the button’s action. Their meaning should be clear and unambiguous. Icon buttons can be grouped **together** or they can **stand alone**.

- Icon buttons can take the form of a wide range of system icons.
- Ensure the meaning of the icon is unambiguous.
- On hover, include a tooltip that describes the button’s action, rather than the name of the icon itself.
- Use the outline-style icons to indicate an unselected state and a filled style to indicate selection.


## Preview

<div class="preview">
    <button class="icon-button"><i class="material-icons">add</i></button>
    <button class="icon-button toggle"><i class="material-icons">info</i></button>
    <input class="icon-button toggle" type="checkbox" aria-label="toggle input" />
    <input class="icon-button toggle" type="checkbox" off-icon="favorite_outline" on-icon="favorite" aria-label="toggle input" />
    <button class="icon-button filled"><i class="material-icons">add</i></button>
    <button class="icon-button filled-tonal"><i class="material-icons">add</i></button>
    <button class="icon-button outlined"><i class="material-icons">add</i></button>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/icon/style.css');
```

## Usage

Start with a **button** or **div** element and add the **icon-button** class name:

```html
<button class="icon-button"></button>
```

## Variants

### Default

Default icon styling.

<div class="preview">
  <button class="icon-button">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button hover">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button active">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button focus">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button" disabled>
    <i class="material-icons">add</i>
  </button>
</div>

```html
<button class="icon-button">
  <i class="material-icons">add</i>
</button>
```

### Filled

Filled icon buttons have higher visual impact and are best for high emphasis actions.

<div class="preview">
  <button class="icon-button filled">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button filled hover">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button filled active">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button filled focus">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button filled" disabled>
    <i class="material-icons">add</i>
  </button>
</div>
  
```html
<button class="icon-button filled">
  <i class="material-icons">add</i>
</button>
```

### Filled Tonal

Filled tonal icon buttons are a middle ground between filled and outlined icon buttons. They’re useful in contexts where the button requires slightly more emphasis than an outline would give, such as a secondary action paired with a high emphasis action.

<div class="preview">
  <button class="icon-button filled-tonal">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button filled-tonal hover">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button filled-tonal active">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button filled-tonal focus">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button filled-tonal" disabled>
    <i class="material-icons">add</i>
  </button>
</div>
  
```html
<button class="icon-button filled-tonal">
  <i class="material-icons">add</i>
</button>
```

### Outlined

Outlined icon buttons are medium-emphasis buttons. They’re useful when an icon button needs more emphasis than a standard icon button but less than a filled or filled tonal icon button.

<div class="preview">
  <button class="icon-button outlined">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button outlined hover">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button outlined active">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button outlined focus">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button outlined" disabled>
    <i class="material-icons">add</i>
  </button>
</div>
  
```html
<button class="icon-button outlined">
  <i class="material-icons">add</i>
</button>
```

### Toggle

Toggle icon styling.

<div class="preview">
  <button class="icon-button toggle">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button toggle hover">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button toggle active">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button toggle focus">
    <i class="material-icons">add</i>
  </button>
  <button class="icon-button toggle" disabled>
    <i class="material-icons">add</i>
  </button>
</div>
  
```html
<button class="icon-button toggle">
  <i class="material-icons">add</i>
</button>
```

To show the checked state, add the **checked** class name or **checked** attribute to the button.

```html
<button class="icon-button toggle checked">
  <i class="material-icons">add</i>
</button>
```

#### Toggle Input

Toggle icon styling for input elements.

<div class="preview">
  <input class="icon-button toggle" type="checkbox" aria-label="toggle input" />
  <input class="icon-button toggle" type="checkbox" aria-label="toggle input" checked />
  <input class="icon-button toggle" type="checkbox" off-icon="favorite_outline" on-icon="favorite" aria-label="toggle input" />
  <input class="icon-button toggle" type="checkbox" off-icon="favorite_outline" on-icon="favorite" aria-label="toggle input" checked/>
</div>

```html
<input class="icon-button toggle" type="checkbox" aria-label="toggle input" />
```

For custom icons, use the **off-icon** and **on-icon** attributes.

```html
<input class="icon-button toggle" type="checkbox" off-icon="favorite_outline" on-icon="favorite" aria-label="toggle input" />
```

#### Toggle Filled

Toggle filled icon styling.

<div class="preview">
  <input class="icon-button toggle filled" type="checkbox" aria-label="toggle input" />
  <input class="icon-button toggle filled" type="checkbox" aria-label="toggle input" checked />
</div>
  
```html
<input class="icon-button toggle filled" type="checkbox" aria-label="toggle input" />
```

#### Toggle Filled Tonal

Toggle filled tonal icon styling.

<div class="preview">
  <input class="icon-button toggle filled-tonal" type="checkbox" aria-label="toggle input" />
  <input class="icon-button toggle filled-tonal" type="checkbox" aria-label="toggle input" checked />
</div>
  
```html
<input class="icon-button toggle filled-tonal" type="checkbox" aria-label="toggle input" />
```

## Design Tokens

| Token                                | Description                     | Default                                                                                                             |
|--------------------------------------|---------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `--md-sys-color-primary` | The foreground color of the icon-button | <div class="tooltip token-box color-primary" data-tooltip="--md-sys-color-primary"></div>       |
| `--md-comp-icon-button-state-layer-size`       | The size of the container     | `40px`                                                                                                              |

## Resources

- [ARIA Resources](https://static.corp.google.com/ariablueprints/button/button.html)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
- [Material Design](https://m3.material.io/components/icon-buttons)
