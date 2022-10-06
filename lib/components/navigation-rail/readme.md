---
title: Navigation Rail
description: Variations on Material Design navigation rails.
link: https://m3.material.io/components/navigation-rail
codepen: KKRxZQr
---

## Preview

<div class="preview">
  <aside class="navigation-rail" style="min-height: 600px">
    <button class="icon-button">
      <i class="material-icons">menu</i>
    </button>
    <button class="fab">
      <i class="material-icons">add</i>
    </button>
    <nav>
      <input type="radio" name="nav-rail" value="home" id="home" checked />
      <label class="navigation-icon" for="home">
        <i class="material-icons">home</i>
        <span>Home</span>
      </label>
      <input type="radio" name="nav-rail" value="profile" id="profile" />
      <label class="navigation-icon" for="profile">
        <i class="material-icons">person</i>
        <span>Profile</span>
      </label>
      <input type="radio" name="nav-rail" value="settings" id="settings" />
      <label class="navigation-icon" for="settings">
        <i class="material-icons">settings</i>
        <span>Settings</span>
      </label>
    </nav>
  </aside>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/navigation-rail/style.css');
```

## Usage

Start with a **aside** or **div** element and add the **navigation-rail** class name:

```html
<div class="navigation-rail"></div>
```

### Navigation Icons

A navigation rail needs a minimum of 2 destinations. Each destination is represented by a **label** element with a **for** attribute that matches the **id** of an **input** element. The **input** element is hidden and is used to control the state of the navigation rail.

All the navigation icons in a navigation rail should be wrapped in a **nav** element or **div** with **navigation-rail-destinations** class name.

<div class="preview">
   <aside class="navigation-rail">
    <nav>
      <input type="radio" name="nav-rail-2" value="tab-1" id="tab-1" checked/>
      <label class="navigation-icon" for="tab-1">
        <i class="material-icons">info</i>
        <span>Tab 1</span>
      </label>
      <input type="radio" name="nav-rail-2" value="tab-2" id="tab-2" />
      <label class="navigation-icon" for="tab-2">
        <i class="material-icons">info</i>
        <span>Tab 2</span>
      </label>
    </nav>
  </aside>
</div>

```html
<div class="list">
  <aside class="navigation-rail">
    <nav>
      <input type="radio" name="nav-rail-2" value="tab-1" id="tab-1" checked/>
      <label class="navigation-icon" for="tab-1">
        <i class="material-icons">info</i>
        <span>Tab 1</span>
      </label>
      <input type="radio" name="nav-rail-2" value="tab-2" id="tab-2" />
      <label class="navigation-icon" for="tab-2">
        <i class="material-icons">info</i>
        <span>Tab 2</span>
      </label>
    </nav>
  </aside>
</div>
```

It is recommended to set the **checked** attribute on the default tab.


### Floating Action Button

A floating action button can be added to the navigation rail by adding a **button** element with the **fab** class name.

<div class="preview">
  <aside class="navigation-rail">
    <button class="fab">
      <i class="material-icons">add</i>
    </button>
  </aside>
</div>

```html
<div class="list">
  <aside class="navigation-rail">
    <button class="fab">
      <i class="material-icons">add</i>
    </button>
  </aside>
</div>
```

### Icon Button

An icon button can be added to the navigation rail by adding a **button** element with the **icon-button** class name. The icon button is typically used to open a menu.

<div class="preview">
  <aside class="navigation-rail">
    <button class="icon-button">
      <i class="material-icons">menu</i>
    </button>
  </aside>
</div>

```html
<div class="list">
  <aside class="navigation-rail">
    <button class="icon-button">
      <i class="material-icons">menu</i>
    </button>
  </aside>
</div>
```

## Variants

### Default

<div class="preview">
  <aside class="navigation-rail" style="min-height: 600px">
    <button class="icon-button">
      <i class="material-icons">menu</i>
    </button>
    <button class="fab">
      <i class="material-icons">add</i>
    </button>
    <nav>
      <input type="radio" name="nav-rail-3" value="home" id="home" checked />
      <label class="navigation-icon" for="home">
        <i class="material-icons">home</i>
        <span>Home</span>
      </label>
      <input type="radio" name="nav-rail-3" value="profile" id="profile" />
      <label class="navigation-icon" for="profile">
        <i class="material-icons">person</i>
        <span>Profile</span>
      </label>
      <input type="radio" name="nav-rail-3" value="settings" id="settings" />
      <label class="navigation-icon" for="settings">
        <i class="material-icons">settings</i>
        <span>Settings</span>
      </label>
    </nav>
  </aside>
</div>

```html
<div class="list">
  <aside class="navigation-rail">
    <button class="icon-button">
      <i class="material-icons">menu</i>
    </button>
    <button class="fab">
      <i class="material-icons">add</i>
    </button>
    <nav>
      <input type="radio" name="nav-rail" value="home" id="home" checked />
      <label class="navigation-icon" for="home">
        <i class="material-icons">home</i>
        <span>Home</span>
      </label>
      <input type="radio" name="nav-rail" value="profile" id="profile" />
      <label class="navigation-icon" for="profile">
        <i class="material-icons">person</i>
        <span>Profile</span>
      </label>
      <input type="radio" name="nav-rail" value="settings" id="settings" />
      <label class="navigation-icon" for="settings">
        <i class="material-icons">settings</i>
        <span>Settings</span>
      </label>
    </nav>
  </aside>
</div>
```

### Middle

<div class="preview">
  <aside class="navigation-rail middle" style="min-height: 600px">
    <button class="icon-button">
      <i class="material-icons">menu</i>
    </button>
    <button class="fab">
      <i class="material-icons">add</i>
    </button>
    <nav>
      <input type="radio" name="nav-rail-4" value="home" id="home" checked />
      <label class="navigation-icon" for="home">
        <i class="material-icons">home</i>
        <span>Home</span>
      </label>
      <input type="radio" name="nav-rail-4" value="profile" id="profile" />
      <label class="navigation-icon" for="profile">
        <i class="material-icons">person</i>
        <span>Profile</span>
      </label>
      <input type="radio" name="nav-rail-4" value="settings" id="settings" />
      <label class="navigation-icon" for="settings">
        <i class="material-icons">settings</i>
        <span>Settings</span>
      </label>
    </nav>
  </aside>
</div>

```html
<div class="list">
  <aside class="navigation-rail middle">
    <button class="icon-button">
      <i class="material-icons">menu</i>
    </button>
    <button class="fab">
      <i class="material-icons">add</i>
    </button>
    <nav>
      <input type="radio" name="nav-rail" value="home" id="home" checked />
      <label class="navigation-icon" for="home">
        <i class="material-icons">home</i>
        <span>Home</span>
      </label>
      <input type="radio" name="nav-rail" value="profile" id="profile" />
      <label class="navigation-icon" for="profile">
        <i class="material-icons">person</i>
        <span>Profile</span>
      </label>
      <input type="radio" name="nav-rail" value="settings" id="settings" />
      <label class="navigation-icon" for="settings">
        <i class="material-icons">settings</i>
        <span>Settings</span>
      </label>
    </nav>
  </aside>
</div>
```

### Bottom

<div class="preview">
  <aside class="navigation-rail bottom" style="min-height: 600px">
    <button class="icon-button">
      <i class="material-icons">menu</i>
    </button>
    <button class="fab">
      <i class="material-icons">add</i>
    </button>
    <nav>
      <input type="radio" name="nav-rail-5" value="home" id="home" checked />
      <label class="navigation-icon" for="home">
        <i class="material-icons">home</i>
        <span>Home</span>
      </label>
      <input type="radio" name="nav-rail-5" value="profile" id="profile" />
      <label class="navigation-icon" for="profile">
        <i class="material-icons">person</i>
        <span>Profile</span>
      </label>
      <input type="radio" name="nav-rail-5" value="settings" id="settings" />
      <label class="navigation-icon" for="settings">
        <i class="material-icons">settings</i>
        <span>Settings</span>
      </label>
    </nav>
  </aside>
</div>

```html
<div class="list">
  <aside class="navigation-rail bottom">
    <button class="icon-button">
      <i class="material-icons">menu</i>
    </button>
    <button class="fab">
      <i class="material-icons">add</i>
    </button>
    <nav>
      <input type="radio" name="nav-rail" value="home" id="home" checked />
      <label class="navigation-icon" for="home">
        <i class="material-icons">home</i>
        <span>Home</span>
      </label>
      <input type="radio" name="nav-rail" value="profile" id="profile" />
      <label class="navigation-icon" for="profile">
        <i class="material-icons">person</i>
        <span>Profile</span>
      </label>
      <input type="radio" name="nav-rail" value="settings" id="settings" />
      <label class="navigation-icon" for="settings">
        <i class="material-icons">settings</i>
        <span>Settings</span>
      </label>
    </nav>
  </aside>
</div>
```

## Design Tokens

| Token                                            | Description                     | Default                                                                                         |
|--------------------------------------------------|---------------------------------|-------------------------------------------------------------------------------------------------|
| `--md-sys-comp-navigation-rail-background-color` | The foreground color of the bar | <div class="tooltip token-box color-surface" data-tooltip="--md-sys-color-surface"></div>       |
| `--md-sys-comp-navigation-rail-color`            | The foreground color of the bar | <div class="tooltip token-box color-on-surface" data-tooltip="--md-sys-color-on-surface"></div> |
| `--md-comp-navigation-rail-container-width`      | The width of the container  | `80px`                                                                                          |
| `--md-comp-navigation-rail-container-height`      | The height of the container  | `100%`                                                                                          |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
- [Material Design](https://m3.material.io/components/navigation-rail)
