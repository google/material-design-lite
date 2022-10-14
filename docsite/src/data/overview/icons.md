---
title: Icons
description: Material Design icons.
tab: "overview"
---

## Material Icons

Material Design uses the [Material Icons](https://fonts.google.com/icons) from Google fonts in the components.

### Default

<icons-preview variant="material-icons"></icons-preview>

```html
<i class="material-icons">edit<i>
```

## Material Symbols

It is possible to use the variable font for [Material Symbols](https://developers.google.com/fonts/docs/material_symbols) with a simple change.

> To change an axis of the icons, use the following variables

```css
:root {
  --material-symbols-fill: 0;
  --material-symbols-wght: 400;
  --material-symbols-grad: 0;
  --material-symbols-opsz: 48;
}
```

### Rounded

<icons-preview variant="material-symbols-rounded"></icons-preview>

```html
<i class="material-symbols-rounded">edit<i>
```

### Sharp

<icons-preview variant="material-symbols-sharp"></icons-preview>

```html
<i class="material-symbols-sharp">edit<i>
```

### Outlined

<icons-preview variant="material-symbols-outlined"></icons-preview>


```html
<i class="material-symbols-outlined">edit<i>
```