---
title: Buttons
description: Variations on Material Design buttons.
setup: |
  import Preview from "../../../components/Preview.astro";
---

Buttons communicate actions that users can take. They are typically placed throughout your UI, in places like:

- Dialogs
- Modal windows
- Forms
- Cards
- Toolbars

Buttons are just one option for representing actions in a product and shouldn’t be overused. Too many buttons on a screen disrupts the visual hierarchy.

## Default

Default button styling.

<Preview>
    <button class="button">Button</button>
    <button class="button">
        <i class="material-icons">add</i>
        <label>Label</label>
    </button>
    <button class="button" disabled>Disabled</button>
</Preview>

```html
<button class="button">My Button</button>
```

## Ripple

Default button with ripple.

<Preview>
    <button class="button ripple">Button</button>
    <button class="button ripple">
        <i class="material-icons">add</i>
        <label>Label</label>
    </button>
    <button class="button ripple" disabled>Disabled</button>
</Preview>

```html
<button class="button ripple">My Button</button>
```

## Elevated

Elevated buttons are essentially filled tonal buttons with a shadow. To prevent shadow creep, only use them when absolutely necessary, such as when the button requires visual separation from a patterned background.

<Preview>
    <button class="button elevated" >Button</button>
    <button class="button elevated" >
        <i class="material-icons">add</i>
        <label>Label</label>
    </button>
    <button class="button elevated"  disabled>Disabled</button>
</Preview>

```html
<button class="button elevated"></button>
```

## Filled

Filled buttons have the most visual impact after the FAB, and should be used for important, final actions that complete a flow, like Save, Join now, or Confirm.

<Preview>
    <button class="button filled ripple" >Button</button>
    <button class="button filled" >
        <i class="material-icons">add</i>
        <label>Label</label>
    </button>
    <button class="button filled"  disabled>Disabled</button>
</Preview>

```html
<button class="button filled"></button>
```

## Filled tonal

A filled tonal button is an alternative middle ground between filled and outlined buttons. They’re useful in contexts where a lower-priority button requires slightly more emphasis than an outline would give, such as "Next" in an onboarding flow. Tonal buttons use the secondary color mapping.

<Preview>
    <button class="button filled-tonal" >Button</button>
    <button class="button filled-tonal" >
        <i class="material-icons">add</i>
        <label>Label</label>
    </button>
    <button class="button filled-tonal"  disabled>Disabled</button>             
</Preview>

```html
<button class="button filled-tonal"></button>
```

## Outlined

Outlined buttons are medium-emphasis buttons. They contain actions that are important, but aren’t the primary action in an app.

Outlined buttons pair well with filled buttons to indicate an alternative, secondary action.

<Preview>
    <button class="button outlined" >Button</button>
    <button class="button outlined" >
        <i class="material-icons">add</i>
        <label>Label</label>
    </button>
    <button class="button outlined"  disabled>Disabled</button>
</Preview>

```html
<button class="button outlined"></button>
```

## Text

Text buttons are used for the lowest priority actions, especially when presenting multiple options.

Text buttons can be placed on a variety of backgrounds. Until the button is interacted with, its container isn’t visible.

<Preview>
    <button class="button text" >Button</button>
    <button class="button text" >
        <i class="material-icons">add</i>
        <label>Label</label>
    </button>
    <button class="button text"  disabled>Disabled</button>
</Preview>

```html
<button class="button text"></button>
```
