---
title: Buttons
description: Variations on Material Design buttons.
layout: ../../../layouts/MainLayout.astro
setup: |
  import ComponentPreview from "../../../components/ComponentPreview.astro";
---

<ComponentPreview >
<button>Button</button>
<button>
    <i class="material-icons">add</i>
    <label>Label</label>
</button>
<button disabled>Disabled</button>
</ComponentPreview>

```html
<button>My Button</button>
```

## Elevated

<ComponentPreview >
<button  variant="elevated">Button</button>
<button  variant="elevated">
    <i class="material-icons">add</i>
    <label>Label</label>
</button>
<button  variant="elevated" disabled>Disabled</button>
</ComponentPreview>

```html
<button variant="elevated">Elevated</button>
```

## Filled

<ComponentPreview >
<button  variant="filled">Button</button>
<button  variant="filled">
    <i class="material-icons">add</i>
    <label>Label</label>
</button>
<button  variant="filled" disabled>Disabled</button>
</ComponentPreview>

```html
<button variant="filled"></button>
```

## Filled tonal

<ComponentPreview >
<button  variant="filled-tonal">Button</button>
<button  variant="filled-tonal">
    <i class="material-icons">add</i>
    <label>Label</label>
</button>
<button  variant="filled-tonal" disabled>Disabled</button>
</ComponentPreview>

```html
<button variant="filled-tonal"></button>
```

## Outlined

<ComponentPreview >
<button  variant="outlined">Button</button>
<button  variant="outlined">
    <i class="material-icons">add</i>
    <label>Label</label>
</button>
<button  variant="outlined" disabled>Disabled</button>
</ComponentPreview>

```html
<button variant="outlined"></button>
```

## Text

<ComponentPreview >
<button  variant="text">Button</button>
<button  variant="text">
    <i class="material-icons">add</i>
    <label>Label</label>
</button>
<button  variant="text" disabled>Disabled</button>
</ComponentPreview>

```html
<button variant="text"></button>
```

## Icon

<ComponentPreview >
<button >
    <i class="material-icons">add</i>
</button>
<button  disabled><i class="material-icons">add</i></button>
</ComponentPreview>

```html
<button><i class="material-icons">add</i></button>
```

## Segmented

```html
<button variant="segmented"></button>
```

## FAB

```html
<button variant="fab"></button>
```

## Extended FAB

```html
<button variant="extended-fab"></button>
```
