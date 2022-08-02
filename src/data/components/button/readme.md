---
title: Buttons
description: Variations on Material Design buttons.
setup: |
  import ComponentPreview from "../../../components/ComponentPreview.astro";
---

## Default

<ComponentPreview >
<button class="button">Button</button>
<button class="button">
    <i class="material-icons">add</i>
    <label>Label</label>
</button>
<button class="button" disabled>Disabled</button>
</ComponentPreview>

```html
<button class="button">My Button</button>
```

## Elevated

<ComponentPreview >
<button class="button elevated" >Button</button>
<button class="button elevated" >
    <i class="material-icons">add</i>
    <label>Label</label>
</button>
<button class="button elevated"  disabled>Disabled</button>
</ComponentPreview>

```html
<button class="button elevated"></button>
```

## Filled

<ComponentPreview >
<button class="button filled" >Button</button>
<button class="button filled" >
    <i class="material-icons">add</i>
    <label>Label</label>
</button>
<button class="button filled"  disabled>Disabled</button>
</ComponentPreview>

```html
<button class="button filled"></button>
```

## Filled tonal

<ComponentPreview >
<button class="button filled-tonal" >Button</button>
<button class="button filled-tonal" >
    <i class="material-icons">add</i>
    <label>Label</label>
</button>
<button class="button filled-tonal"  disabled>Disabled</button>
</ComponentPreview>

```html
<button class="button filled-tonal"></button>
```

## Outlined

<ComponentPreview >
<button class="button outlined" >Button</button>
<button class="button outlined" >
    <i class="material-icons">add</i>
    <label>Label</label>
</button>
<button class="button outlined"  disabled>Disabled</button>
</ComponentPreview>

```html
<button class="button outlined"></button>
```

## Text

<ComponentPreview >
<button class="button text" >Button</button>
<button class="button text" >
    <i class="material-icons">add</i>
    <label>Label</label>
</button>
<button class="button text"  disabled>Disabled</button>
</ComponentPreview>

```html
<button class="button text"></button>
```

## Icon

<ComponentPreview >
<button class="button" >
    <i class="material-icons">add</i>
</button>
<button class="button"  disabled><i class="material-icons">add</i></button>
</ComponentPreview>

```html
<button class="button"><i class="material-icons">add</i></button>
```

## FAB

```html
<button class="button" variant="fab"></button>
```

## Extended FAB

```html
<button class="button" variant="extended-fab"></button>
```

## Segmented

```html
<button class="button" variant="segmented"></button>
```
