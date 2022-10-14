---
title: Tabs
description: Variations on Material Design tabs.
codepen: XWqPxRj
---

## Preview

<div class="preview">
  <nav class="tabs" style="min-width: 400px">
      <input type="radio" name="tab-nav" value="tab-1" id="tab-1" checked />
      <label class="tab" for="tab-1">Tab 1</label>
      <input type="radio" name="tab-nav" value="tab-2" id="tab-2"  />
      <label class="tab" for="tab-2">Tab 2</label>    
      <input type="radio" name="tab-nav" value="tab-3" id="tab-3"  />
      <label class="tab" for="tab-3">Tab 3</label>    
  </nav>
</div>

## Installation

To import just the component styles, copy the following into your project's **styles.css** file:

```css
/* Core Styles */
@import url('https://rodydavis.github.io/material-design-lite/css/core.css');
/* Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
/* Roboto Font */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap');
/* Component Styles */
@import url('https://rodydavis.github.io/material-design-lite/css/components/tabs/style.css');
```

## Usage

Start with a **nav** element and add the **tabs** class name:

```html
<nav class="tabs"></nav>
```

Tabs need at least two tabs to work.

```html
<nav class="tabs">
  <input type="radio" name="tab-nav" value="tab-1" id="tab-1" checked />
  <label class="tab" for="tab-1">Tab 1</label>
  <input type="radio" name="tab-nav" value="tab-2" id="tab-2" />
  <label class="tab" for="tab-2">Tab 2</label>
</nav>
```

## Variants

### Default

Default tab styling.

<div class="preview">
  <nav class="tabs">
    <input type="radio" name="nav-2" value="nav-2-tab-1" id="nav-2-tab-1" checked />
    <label class="tab" for="nav-2-tab-1">Tab 1</label>
    <input type="radio" name="nav-2" value="nav-2-tab-2" id="nav-2-tab-2" />
    <label class="tab" for="nav-2-tab-2">Tab 2</label>
  </nav>
</div>

```html
<nav class="tabs">
  <input type="radio" name="tab-nav" value="tab-1" id="tab-1" checked />
  <label class="tab" for="tab-1">Tab 1</label>
  <input type="radio" name="tab-nav" value="tab-2" id="tab-2" />
  <label class="tab" for="tab-2">Tab 2</label>
</nav>
```

### Scrolling

To make tabs scrollable, add the **scrollable** class name:

<div class="preview">
  <nav class="tabs scrollable" style="min-width: 400px">
    <input type="radio" name="nav-3" value="nav-3-tab-1" id="nav-3-tab-1" checked />
    <label class="tab" for="nav-3-tab-1">Tab 1</label>
    <input type="radio" name="nav-3" value="nav-3-tab-2" id="nav-3-tab-2" />
    <label class="tab" for="nav-3-tab-2">Tab 2</label>
    <input type="radio" name="nav-3" value="nav-3-tab-3" id="nav-3-tab-3" />
    <label class="tab" for="nav-3-tab-3">Tab 3</label>
    <input type="radio" name="nav-3" value="nav-3-tab-4" id="nav-3-tab-4" />
    <label class="tab" for="nav-3-tab-4">Tab 4</label>
    <input type="radio" name="nav-3" value="nav-3-tab-5" id="nav-3-tab-5" />
    <label class="tab" for="nav-3-tab-5">Tab 5</label>
    <input type="radio" name="nav-3" value="nav-3-tab-6" id="nav-3-tab-6" />
    <label class="tab" for="nav-3-tab-6">Tab 6</label>
    <input type="radio" name="nav-3" value="nav-3-tab-7" id="nav-3-tab-7" />
    <label class="tab" for="nav-3-tab-7">Tab 7</label>
    <input type="radio" name="nav-3" value="nav-3-tab-8" id="nav-3-tab-8" />
    <label class="tab" for="nav-3-tab-8">Tab 8</label>
    <input type="radio" name="nav-3" value="nav-3-tab-9" id="nav-3-tab-9" />
    <label class="tab" for="nav-3-tab-9">Tab 9</label>
    <input type="radio" name="nav-3" value="nav-3-tab-10" id="nav-3-tab-10" />
    <label class="tab" for="nav-3-tab-10">Tab 10</label>
  </nav>
</div>

```html
<nav class="tabs scrollable" style="min-width: 400px">
    <input type="radio" name="nav" value="tab-1" id="tab-1" checked />
    <label class="tab" for="tab-1">Tab 1</label>
    <input type="radio" name="nav" value="tab-2" id="tab-2" />
    <label class="tab" for="tab-2">Tab 2</label>
    <input type="radio" name="nav" value="tab-3" id="tab-3" />
    <label class="tab" for="tab-3">Tab 3</label>
    <input type="radio" name="nav" value="tab-4" id="tab-4" />
    <label class="tab" for="tab-4">Tab 4</label>
    <input type="radio" name="nav" value="tab-5" id="tab-5" />
    <label class="tab" for="tab-5">Tab 5</label>
    <input type="radio" name="nav" value="tab-6" id="tab-6" />
    <label class="tab" for="tab-6">Tab 6</label>
    <input type="radio" name="nav" value="tab-7" id="tab-7" />
    <label class="tab" for="tab-7">Tab 7</label>
    <input type="radio" name="nav" value="tab-8" id="tab-8" />
    <label class="tab" for="tab-8">Tab 8</label>
    <input type="radio" name="nav" value="tab-9" id="tab-9" />
    <label class="tab" for="tab-9">Tab 9</label>
    <input type="radio" name="nav" value="tab-10" id="tab-10" />
    <label class="tab" for="tab-10">Tab 10</label>
  </nav>
```

## Design Tokens

| Token                                | Description                    | Default |
|--------------------------------------|--------------------------------|---------|
| `--md-comp-tabs-container-min-width` | The min width of the container | `100px` |
| `--md-sys-comp-tabs-container-background-color` | The background color of the container | <div class="tooltip token-box color-surface" data-tooltip="--md-sys-color-surface"></div> |
| `--md-sys-comp-tabs-container-color` | The foreground color of the container | <div class="tooltip token-box color-on-surface" data-tooltip="--md-sys-color-on-surface"></div> |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
