---
title: Badges
description: Variations on Material Design badges.
codepen: VwxBwKZ
---

Badges are small, discrete pieces of information that can be attached to other elements.

## Preview

<div class="preview">
  <a href="#" class="badge" data-badge="10">Default</a>
  <a href="#" class="badge elevated" data-badge="2">Elevated</a>
  <a href="#" class="badge secondary" data-badge="3">Secondary</a>
  <a href="#" class="badge tertiary" data-badge="4">Tertiary</a>
  <a href="#" class="badge tertiary" data-badge="">Tertiary</a>
</div>

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
@import url('https://rodydavis.github.io/material-design-lite/css/components/badge/style.css');
```

## Usage

Start with a `a` or `div` element and add the `tooltip` class name and `data-badge` attribute:

```html
<a href="#" class="tooltip" data-badge="1">Link</a>
```

The **data-badge** attribute is required and can be any number or string.

If the string is empty, the badge will be displayed as a dot.

## Variants

### Default

<div class="preview">
  <a href="#" class="badge" data-badge="1">Link</a>
</div>

```html
<a href="#" class="badge" data-badge="1">Link</a>
```

### Elevated

<div class="preview">
  <a href="#" class="badge elevated" data-badge="1">Link</a>
</div>

```html
<a href="#" class="badge elevated" data-badge="1">Link</a>
```

### Secondary

<div class="preview">
  <a href="#" class="badge secondary" data-badge="1">Link</a>
</div>

```html
<a href="#" class="badge secondary" data-badge="1">Link</a>
```

### Tertiary

<div class="preview">
  <a href="#" class="badge tertiary" data-badge="1">Link</a>
</div>

```html
<a href="#" class="badge tertiary" data-badge="1">Link</a>
```

## Design Tokens

| Token                                  | Description                                 | Default                                                                                     |
|----------------------------------------|---------------------------------------------|---------------------------------------------------------------------------------------------|
| `--md-sys-comp-badge-size`             | The container size of the badge indicator   | 22px                                                                                        |
| `--md-sys-comp-badge-dot-size`         | The empty badge dot container size          | 11px                                                                                        |
| `--md-sys-comp-badge-background-color` | The background color of the badge indicator | <div class="tooltip token-box color-error" data-tooltip="--md-sys-color-error"></div>       |
| `--md-sys-comp-badge-color`            | The foreground color of the badge indicator | <div class="tooltip token-box color-on-error" data-tooltip="--md-sys-color-on-error"></div> |