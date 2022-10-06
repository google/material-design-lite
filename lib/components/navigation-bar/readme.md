---
title: Navigation Bars
description: Variations on Material Design navigation bars.
link: https://m3.material.io/components/navigation-bar
codepen: OJZoxae
---

## Preview

<div class="preview">
  <nav class="navigation-bar" style="min-width: 400px">
    <input type="radio" name="bottom-nav-icons" value="home" id="home" />
    <label class="navigation-icon" for="home">
      <i class="material-icons">home</i>
      <span>Home</span>
    </label>
    <input
      type="radio"
      name="bottom-nav-icons"
      value="profile"
      id="profile"
      checked
    />
    <label class="navigation-icon" for="profile">
      <i class="material-icons">person</i>
      <span>Profile</span>
    </label>
    <input type="radio" name="bottom-nav-icons" value="settings" id="settings" />
    <label class="navigation-icon" for="settings">
      <i class="material-icons">settings</i>
      <span>Settings</span>
    </label>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/navigation-icon/style.css');
@import url('https://rodydavis.github.io/material-design-lite/css/components/navigation-bar/style.css');
```

## Usage

Start with a **nav** or **div** element and add the **navigation-bar** class name:

```html
<div class="navigation-bar"></div>
```

### Navigation Icons

A navigation bar needs a minimum of 2 destinations. Each destination is represented by a **label** element with a **for** attribute that matches the **id** of an **input** element. The **input** element is hidden and is used to control the state of the navigation bar.

<div class="preview">
   <nav class="navigation-bar" style="min-width: 400px">
    <input type="radio" name="bottom-nav-icons-2" value="tab-1" id="tab-1" checked/>
    <label class="navigation-icon" for="tab-1">
      <i class="material-icons">info</i>
      <span>Tab 1</span>
    </label>
    <input type="radio" name="bottom-nav-icons-2" value="tab-2" id="tab-2" />
    <label class="navigation-icon" for="tab-2">
      <i class="material-icons">info</i>
      <span>Tab 2</span>
    </label>
  </nav>
</div>

```html
<div class="list">
  <nav class="navigation-bar">
    <input type="radio" name="navigation-bar" value="tab-1" id="tab-1" checked/>
    <label class="navigation-icon" for="tab-1">
      <i class="material-icons">info</i>
      <span>Tab 1</span>
    </label>
    <input type="radio" name="navigation-bar" value="tab-2" id="tab-2" />
    <label class="navigation-icon" for="tab-2">
      <i class="material-icons">info</i>
      <span>Tab 2</span>
    </label>
  </nav>
</div>
```

It is recommended to set the **checked** attribute on the default tab.

## Design Tokens

| Token                                | Description                    | Default |
|--------------------------------------|--------------------------------|---------|
| `--md-sys-comp-navigation-bar-background-color` | The foreground color of the bar | <div class="tooltip token-box color-surface" data-tooltip="--md-sys-color-surface"></div>       |
| `--md-sys-comp-navigation-bar-color` | The foreground color of the bar | <div class="tooltip token-box color-on-surface" data-tooltip="--md-sys-color-on-surface"></div>       |
| `--md-comp-navigation-bar-container-width` | The min width of the container | `100%` |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
- [Material Design](https://m3.material.io/components/navigation-bar)
