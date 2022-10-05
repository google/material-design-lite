---
title: Buttons
description: Variations on Material Design buttons.
link: https://material.io/components/buttons
tab: "components"
codepen: OJZvWRQ
---

Buttons communicate actions that users can take. They are typically placed throughout your UI, in places like:

- Dialogs
- Modal windows
- Forms
- Cards
- Toolbars

Buttons are just one option for representing actions in a product and shouldn’t be overused. Too many buttons on a screen disrupts the visual hierarchy.

## Preview

<div class="preview">
  <button>Default</button>
  <button class="elevated">Elevated</button>
  <button class="filled">Filled</button>
  <button class="filled-tonal">Filled Tonal</button>
  <button class="outlined">Outlined</button>
  <button class="text">Text</button>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/button/style.css');
```

## Usage

Start with a `button` or `div` element and add the `button` class name:

```html
<button class="button">Default</button>
```

The `button` class name is implicit when using the `button` element.

## Variants

### Default

Default button styling.

```html
<button>Default</button>
```

#### States

<div class="preview">
  <button>Default</button>
  <button class="hover">Hovered</button>
  <button class="focus">Focused</button>
  <button class="active">Active</button>
  <button disabled>Disabled</button>
</div>

### Elevated

Elevated buttons are essentially filled tonal buttons with a shadow. To prevent shadow creep, only use them when absolutely necessary, such as when the button requires visual separation from a patterned background.

```html
<button class="elevated">Elevated</button>
```

#### States

<div class="preview">
  <button class="elevated">Default</button>
  <button class="elevated hover">Hovered</button>
  <button class="elevated focus">Focused</button>
  <button class="elevated active">Active</button>
  <button class="elevated" disabled>Disabled</button>
</div>

### Filled

Filled buttons have the most visual impact after the FAB, and should be used for important, final actions that complete a flow, like Save, Join now, or Confirm.

```html
<button class="filled">Filled</button>
```

#### States

<div class="preview">
  <button class="filled">Default</button>
  <button class="filled hover">Hovered</button>
  <button class="filled focus">Focused</button>
  <button class="filled active">Active</button>
  <button class="filled" disabled>Disabled</button>
</div>

### Filled tonal

A filled tonal button is an alternative middle ground between filled and outlined buttons. They’re useful in contexts where a lower-priority button requires slightly more emphasis than an outline would give, such as "Next" in an onboarding flow. Tonal buttons use the secondary color mapping.

```html
<button class="filled-tonal">Filled Tonal</button>
```

#### States

<div class="preview">
  <button class="filled-tonal">Default</button>
  <button class="filled-tonal hover">Hovered</button>
  <button class="filled-tonal focus">Focused</button>
  <button class="filled-tonal active">Active</button>
  <button class="filled-tonal" disabled>Disabled</button>
</div>

### Outlined

Outlined buttons are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app.

Outlined buttons pair well with filled buttons to indicate an alternative, secondary action.

```html
<button class="outlined">Outlined</button>
```

#### States

<div class="preview">
  <button class="outlined">Default</button>
  <button class="outlined hover">Hovered</button>
  <button class="outlined focus">Focused</button>
  <button class="outlined active">Active</button>
  <button class="outlined" disabled>Disabled</button>
</div>

### Text

Text buttons are used for the lowest priority actions, especially when presenting multiple options.

Text buttons can be placed on a variety of backgrounds. Until the button is interacted with, its container isn’t visible.

```html
<button class="text">Text</button>
```

#### States

<div class="preview">
  <button class="text">Default</button>
  <button class="text hover">Hovered</button>
  <button class="text focus">Focused</button>
  <button class="text active">Active</button>
  <button class="text" disabled>Disabled</button>
</div>

## Design Tokens

| Token                                   | Description                        | Default                                                                                   |
|-----------------------------------------|------------------------------------|-------------------------------------------------------------------------------------------|
| `--md-sys-comp-button-background-color` | The background color of the button | <div class="tooltip token-box color-surface" data-tooltip="--md-sys-color-surface"></div> |
| `--md-sys-comp-button-color`            | The foreground color of the button | <div class="tooltip token-box color-primary" data-tooltip="--md-sys-color-primary"></div> |
| `--md-comp-button-container-height` | The height of the container | `40px` |

## Accessibility

- [ARIA Resources](https://static.corp.google.com/ariablueprints/button/button.html)
