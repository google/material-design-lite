---
title: Buttons
description: Variations on Material Design buttons.
setup: |
  import Preview from "../../../components/Preview.astro";
---

Icons visually communicate the button’s action. Their meaning should be clear and unambiguous. Icon buttons can be grouped **together** or they can **stand alone**.

- Icon buttons can take the form of a wide range of system icons.
- Ensure the meaning of the icon is unambiguous.
- On hover, include a tooltip that describes the button’s action, rather than the name of the icon itself.
- Use the outline-style icons to indicate an unselected state and a filled style to indicate selection.

## Standard

<Preview>
    <button class="icon">
        <i class="material-icons">add</i>
    </button>
    <button class="icon" selected>
        <i class="material-icons">check</i>
    </button>
    <button class="icon" disabled>
        <i class="material-icons">add</i>
    </button>
</Preview>

```html
<button class="icon">
  <i class="material-icons">add</i>
</button>
```

## Contained

Use a contained icon button when the component requires more visual separation from the background.

Contained icon buttons can have one of three styles:

- Filled
- Filled tonal
- Outlined

## Elevated

<Preview>
    <button class="icon elevated">
        <i class="material-icons">add</i>
    </button>
    <button class="icon elevated" disabled>
        <i class="material-icons">add</i>
    </button>
</Preview>

```html
<button class="icon elevated">
  <i class="material-icons">add</i>
</button>
```

## Filled

Filled icon buttons have higher visual impact and are best for high emphasis actions.

<Preview>
    <button class="icon contained filled">
        <i class="material-icons">add</i>
    </button>
    <button class="icon contained filled" disabled>
        <i class="material-icons">add</i>
    </button>
</Preview>

```html
<button class="icon contained filled">
  <i class="material-icons">add</i>
</button>
```

## Filled Tonal

Filled tonal icon buttons are a middle ground between filled and outlined icon buttons. They’re useful in contexts where the button requires slightly more emphasis than an outline would give, such as a secondary action paired with a high emphasis action.

<Preview>
    <button class="icon contained filled-tonal">
        <i class="material-icons">add</i>
    </button>
    <button class="icon contained filled-tonal" disabled>
        <i class="material-icons">add</i>
    </button>
</Preview>

```html
<button class="icon contained filled-tonal">
  <i class="material-icons">add</i>
</button>
```

## Outlined

Outlined icon buttons are medium-emphasis buttons. They’re useful when an icon button needs more emphasis than a standard icon button but less than a filled or filled tonal icon button.

<Preview>
    <button class="icon contained outlined">
        <i class="material-icons">add</i>
    </button>
    <button class="icon contained outlined" disabled>
        <i class="material-icons">add</i>
    </button>
</Preview>

```html
<button class="icon contained outlined">
  <i class="material-icons">add</i>
</button>
```
