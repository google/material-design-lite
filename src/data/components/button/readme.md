---
title: Buttons
description: Variations on Material Design buttons.
setup: |
  import Preview from "../../../components/Preview.astro";
---

## Default

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

## Elevated

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

<Preview>
    <button class="button filled" >Button</button>
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

## Icon

<Preview>
    <button class="button" >
        <i class="material-icons">add</i>
    </button>
    <button class="button"  disabled><i class="material-icons">add</i></button>
</Preview>

```html
<button class="button"><i class="material-icons">add</i></button>
```
