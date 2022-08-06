---
title: Top app bar
description: Variations on Material Design top app bars.
setup: |
  import Preview from "../../../components/Preview.astro";
  import Playground from "../../../components/Playground.astro";
---

<Playground>
 <header class="top-app-bar center-aligned" style="width: 300px">
    <button class="icon leading">
    <i class="material-icons">menu</i>
    </button>
    <span class="title">Title Large</span>
    <div class="actions">
    <button class="icon">
        <i class="material-icons">search</i>
    </button>
    </div>
</header>
</Playground>

## Default

<Preview>
 <header class="top-app-bar center-aligned">
    <button class="icon leading">
    <i class="material-icons">menu</i>
    </button>
    <span class="title">Title Large</span>
    <div class="actions">
    <button class="icon">
        <i class="material-icons">search</i>
    </button>
    </div>
</header>
</Preview>

```html
<header class="top-app-bar center-aligned">
  <button class="icon leading">
    <i class="material-icons">menu</i>
  </button>
  <span class="title">Title Large</span>
  <div class="actions">
    <button class="icon">
      <i class="material-icons">search</i>
    </button>
  </div>
</header>
```

## Small

<Preview>
 <header class="top-app-bar small">
    <button class="icon leading">
    <i class="material-icons">arrow_back</i>
    </button>
    <span class="title">Title Large</span>
    <div class="actions">
    <button class="icon">
        <i class="material-icons">info_outline</i>
    </button>
    <button class="icon">
        <i class="material-icons">filter_list</i>
    </button>
    <button class="icon">
        <i class="material-icons">settings</i>
    </button>
    </div>
</header>
</Preview>

```html
<header class="top-app-bar small">
  <button class="icon leading">
    <i class="material-icons">arrow_back</i>
  </button>
  <span class="title">Title Large</span>
  <div class="actions">
    <button class="icon">
      <i class="material-icons">info_outline</i>
    </button>
    <button class="icon">
      <i class="material-icons">filter_list</i>
    </button>
    <button class="icon">
      <i class="material-icons">settings</i>
    </button>
  </div>
</header>
```

## Medium

<Preview>
<header class="top-app-bar medium">
    <button class="icon leading">
    <i class="material-icons">menu</i>
    </button>
    <span class="title">Headline Small</span>
    <div class="actions">
    <button class="icon">
        <i class="material-icons">info_outline</i>
    </button>
    <button class="icon">
        <i class="material-icons">settings</i>
    </button>
    </div>
</header>
</Preview>

```html
<header class="top-app-bar medium">
  <button class="icon leading">
    <i class="material-icons">menu</i>
  </button>
  <span class="title">Headline Small</span>
  <div class="actions">
    <button class="icon">
      <i class="material-icons">info_outline</i>
    </button>
    <button class="icon">
      <i class="material-icons">settings</i>
    </button>
  </div>
</header>
```

## Large

<Preview>
 <header class="top-app-bar large">
    <button class="icon leading">
    <i class="material-icons">menu</i>
    </button>
    <span class="title">Headline Medium</span>
    <div class="actions">
    <button class="icon">
        <i class="material-icons">info_outline</i>
    </button>
    <button class="icon">
        <i class="material-icons">settings</i>
    </button>
    </div>
</header>
</Preview>

```html
<header class="top-app-bar large">
  <button class="icon leading">
    <i class="material-icons">menu</i>
  </button>
  <span class="title">Headline Medium</span>
  <div class="actions">
    <button class="icon">
      <i class="material-icons">info_outline</i>
    </button>
    <button class="icon">
      <i class="material-icons">settings</i>
    </button>
  </div>
</header>
```
