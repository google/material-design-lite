---
title: Cards
description: Variations on Material Design cards.
link: https://material.io/components/cards
codepen: BaxPVdg
---

Use a card to display content and actions on a single topic.

Cards should be easy to scan for relevant and actionable information. Elements like text and images should be placed on cards in a way that clearly indicates hierarchy.

## Preview

<div class="preview">
    <div class="card">
        <div class="title">Play relaxing songs</div>
        <div class="subtitle">From your recent favorites</div>
        <div class="actions">
            <button class="filled">Get started</button>
        </div>
    </div>
    <div class="card filled">
        <div class="title">Play relaxing songs</div>
        <div class="subtitle">From your recent favorites</div>
        <div class="actions">
            <button class="filled">Get started</button>
        </div>
    </div>
    <div class="card outlined">
        <div class="title">Play relaxing songs</div>
        <div class="subtitle">From your recent favorites</div>
        <div class="actions">
            <button class="filled">Get started</button>
        </div>
    </div>
    <div class="card elevated">
        <div class="title">Play relaxing songs</div>
        <div class="subtitle">From your recent favorites</div>
        <div class="actions">
            <button class="filled">Get started</button>
        </div>
    </div>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/card/style.css');
```

## Usage

Start with a `div` element and add the `card` class name:

```html
<div class="card"></div>
```

### Optional Image

To add an image to a card add a `img` element at the top of the card:

```html
<div class="card">
    <img src="https://via.placeholder.com/300X200" alt="Landscape">
</div>
```

## Variants

### Default

<div class="preview">
  <div class="card">
        <div class="title">Play relaxing songs</div>
        <div class="subtitle">From your recent favorites</div>
        <div class="actions">
            <button class="filled">Get started</button>
        </div>
    </div>
</div>

```html
<div class="card">
  <div class="title">Play relaxing songs</div>
  <div class="subtitle">From your recent favorites</div>
  <div class="actions">
    <button class="filled">Get started</button>
  </div>
</div>
```

### Filled

<div class="preview">
  <div class="card filled">
    <div class="title">Play relaxing songs</div>
    <div class="subtitle">From your recent favorites</div>
    <div class="actions">
        <button class="filled">Get started</button>
    </div>
  </div>
</div>

```html
<div class="card filled">
  <div class="title">Play relaxing songs</div>
  <div class="subtitle">From your recent favorites</div>
  <div class="actions">
    <button class="filled">Get started</button>
  </div>
</div>
```

### Outlined

<div class="preview">
  <div class="card outlined">
    <div class="title">Play relaxing songs</div>
    <div class="subtitle">From your recent favorites</div>
    <div class="actions">
        <button class="filled">Get started</button>
    </div>
  </div>
</div>

```html
<div class="card outlined">
  <div class="title">Play relaxing songs</div>
  <div class="subtitle">From your recent favorites</div>
  <div class="actions">
    <button class="filled">Get started</button>
  </div>
</div>
```

### Elevated

<div class="preview">
  <div class="card elevated">
    <div class="title">Play relaxing songs</div>
    <div class="subtitle">From your recent favorites</div>
    <div class="actions">
        <button class="filled">Get started</button>
    </div>
  </div>
</div>

```html
<div class="card elevated">
  <div class="title">Play relaxing songs</div>
  <div class="subtitle">From your recent favorites</div>
  <div class="actions">
    <button class="filled">Get started</button>
  </div>
</div>
```

## Design Tokens

| Token                                   | Description                        | Default                                                                                   |
|-----------------------------------------|------------------------------------|-------------------------------------------------------------------------------------------|
| `--md-sys-color-surface` | The background color of the card | <div class="tooltip token-box color-surface" data-tooltip="--md-sys-color-surface"></div> |
| `--md-sys-color-on-surface`            | The foreground color of the button | <div class="tooltip token-box color-on-surface" data-tooltip="--md-sys-color-on-surface"></div> |
| `--md-sys-comp-card-width`     | The width of the container        | `300px`                                                                                    |
