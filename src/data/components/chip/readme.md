---
title: Chips
description: Variations on Material Design chips.
setup: |
  import Preview from "../../../components/Preview.astro";
---

## Default

<Preview>
   <div class="chip">
     Default
    </div>
     <div class="chip">
        <i class="material-icons">add</i>
        <label>Default</label>
    </div>
</Preview>

```html
<div class="chip"></div>
```

## Assist

<Preview>
    <div class="chip assist">
        <label>Assist</label>
    </div>
    <div class="chip assist">
        <i class="material-icons">info</i>
        <label>Assist</label>
    </div>
</Preview>

```html
<div class="chip assist">
  <i class="material-icons">info</i>
  <label>Assist</label>
</div>
```

## Filter

<Preview>
    <div class="chip filter">
        <label>Filter</label>
    </div>
    <div class="chip filter">
        <i class="material-icons">filter_list</i>
        <label>Filter</label>
    </div>
</Preview>

```html
<div class="chip filter">
  <i class="material-icons">filter_list</i>
  <label>Filter</label>
</div>
```

## Input

<Preview>
    <div class="chip input">
        <label>Input</label>
    </div>
    <div class="chip input">
        <i class="material-icons">add</i>
        <label>Input</label>
    </div>
</Preview>

```html
<div class="chip input">
  <label>Input</label>
  <i class="material-icons">add</i>
</div>
```

## Suggestion

<Preview>
    <div class="chip suggestion">
        <label>Suggestion</label>
    </div>
    <div class="chip suggestion">
        <i class="material-icons">help</i>
        <label>Suggestion</label>
    </div>
</Preview>

```html
<div class="chip suggestion">
  <i class="material-icons">help</i>
  <label>Suggestion</label>
</div>
```
