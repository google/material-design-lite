---
title: Buttons
description: Variations on Material Design buttons.
setup: |
  import Preview from "../../../components/Preview.astro";
---

## Default

<Preview>
     <button class="button fab">
        <i class="material-icons">add</i>
    </button>
    <button class="button fab" disabled>
        <i class="material-icons">add</i>
    </button>
</Preview>

```html
<button class="button fab"></button>
```

## FAB Small

<Preview>
     <button class="button fab small">
        <i class="material-icons">add</i>
    </button>
    <button class="button fab small" disabled>
        <i class="material-icons">add</i>
    </button>
</Preview>

```html
<button class="button fab small"></button>
```

## FAB Large

<Preview>
     <button class="button fab large">
        <i class="material-icons">add</i>
    </button>
    <button class="button fab large" disabled>
        <i class="material-icons">add</i>
    </button>
</Preview>

```html
<button class="button fab large"></button>
```

## Extended FAB

<Preview>
    <button class="button fab extended">Button</button>
    <button class="button fab extended">
        <i class="material-icons">add</i>
        <label>Button</label>
    </button>
     <button class="button fab extended" disabled>Button</button>
</Preview>

```html
<button class="button fab extended"></button>
```

## Segmented

```html
<button class="button" variant="segmented"></button>
```
