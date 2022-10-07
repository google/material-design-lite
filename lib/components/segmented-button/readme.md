---
title: Segmented Button
description: Variations on Material Design segmented buttons.
codepen: poVOVEO
link: https://m3.material.io/components/segmented-buttons
---

## Preview

<div class="preview">
  <div class="segmented-button" style="min-width: 400px">
    <input type="radio" name="platform" value="android" id="android"  checked />
    <label class="segmented-option" for="android">Android</label>
    <input type="radio" name="platform" value="windows" id="windows" />
    <label class="segmented-option" for="windows">Windows</label>
    <input type="radio" name="platform" value="web" id="web" />
    <label class="segmented-option" for="web">Web</label>
    <input type="radio" name="platform" value="linux" id="linux" />
    <label class="segmented-option" for="linux">Linux</label>
  </div>
  <div class="segmented-button" style="min-width: 400px">
    <input type="radio" name="group-editor" id="edit" checked/>
    <label class="segmented-option" for="edit">
      <i class="material-icons">edit</i>
      <span>Edit</span>
    </label>
    <input type="radio" name="group-editor" id="preview-value"  /  >
    <label class="segmented-option" for="preview-value">
      <i class="material-icons">visibility</i>
      <span>Preview</span>
    </label>
    <input type="radio" name="group-editor" id="split" />
    <label class="segmented-option" for="split">
      <i class="material-icons">view_module</i>
      <span>Split</span>
    </label>
  </div>
  <div class="segmented-button" style="min-width: 400px">
    <input id="one" type="checkbox" checked />
    <label class="segmented-option" for="one">One</label>
    <input id="two" type="checkbox" />
    <label class="segmented-option" for="two">Two</label>
    <input id="three" type="checkbox" />
    <label class="segmented-option" for="three">Three</label>
  </div>
  <div class="segmented-button" style="min-width: 400px">
    <input id="copy" type="checkbox" checked />
    <label class="segmented-option" for="copy">
      <i class="material-icons">content_copy</i>
      <span>Copy</span>
    </label>
    <input id="cut" type="checkbox" />
    <label class="segmented-option" for="cut">
      <i class="material-icons">content_cut</i>
      <span>Cut</span>
    </label>
    <input id="paste" type="checkbox" />
    <label class="segmented-option" for="paste">
      <i class="material-icons">content_paste</i>
      <span>Paste</span>
    </label>
  </div>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/segmented-button/style.css');
```

## Variants

### Default

Default segmented button styling.

<div class="preview">
  <div class="segmented-button" style="min-width: 400px">
    <input type="radio" name="sb-single" value="sb-single-1" id="sb-single-1"checked/>
    <label class="segmented-option" for="sb-single-1">Option 1</label>
    <input type="radio" name="sb-single" value="sb-single-2" id="sb-single-2" />
    <label class="segmented-option" for="sb-single-2">Option 2</label>
    <input type="radio" name="sb-single" value="sb-single-3" id="sb-single-3" />
    <label class="segmented-option" for="sb-single-3">Option 3</label>
  </div>
</div>

```html
<div class="segmented-button" style="min-width: 400px">
  <input type="radio" name="option" value="option-1" id="option-1"checked/>
  <label class="segmented-option" for="option-1">Option 1</label>
  <input type="radio" name="option" value="option-2" id="option-2" />
  <label class="segmented-option" for="option-2">Option 2</label>
  <input type="radio" name="option" value="option-3" id="option-3" />
  <label class="segmented-option" for="option-3">Option 3</label>
</div>
```

### Icon

Segmented buttons with icons.

<div class="preview">
  <div class="segmented-button" style="min-width: 400px">
    <input type="radio" name="sb-icon" value="sb-icon-1" id="sb-icon-1" checked/>
    <label class="segmented-option" for="sb-icon-1">
      <i class="material-icons">info</i>
      <span>Edit</span>
    </label>
    <input type="radio" name="sb-icon" value="sb-icon-2" id="sb-icon-2" />
    <label class="segmented-option" for="sb-icon-2">
      <i class="material-icons">info</i>
      <span>Preview</span>
    </label>
    <input type="radio" name="sb-icon" value="sb-icon-3" id="sb-icon-3" />
    <label class="segmented-option" for="sb-icon-3">
      <i class="material-icons">info</i>
      <span>Split</span>
    </label>
  </div>
</div>

```html
<div class="segmented-button" style="min-width: 400px">
  <input type="radio" name="sb-icon" value="sb-icon-1" id="sb-icon-1" checked/>
  <label class="segmented-option" for="sb-icon-1">
    <i class="material-icons">info</i>
    <span>Edit</span>
  </label>
  <input type="radio" name="sb-icon" value="sb-icon-2" id="sb-icon-2" />
  <label class="segmented-option" for="sb-icon-2">
    <i class="material-icons">info</i>
    <span>Preview</span>
  </label>
  <input type="radio" name="sb-icon" value="sb-icon-3" id="sb-icon-3" />
  <label class="segmented-option" for="sb-icon-3">
    <i class="material-icons">info</i>
    <span>Split</span>
  </label>
</div>
```

### Multi Select

Segmented buttons with multi select.

<div class="preview">
  <div class="segmented-button" style="min-width: 400px">
    <input id="sb-multi-one" type="checkbox" checked />
    <label class="segmented-option" for="sb-multi-one">One</label>
    <input id="sb-multi-two" type="checkbox" />
    <label class="segmented-option" for="sb-multi-two">Two</label>
    <input id="sb-multi-three" type="checkbox" />
    <label class="segmented-option" for="sb-multi-three">Three</label>
  </div>
</div>

```html
<div class="segmented-button" style="min-width: 400px">
  <input id="one" type="checkbox" checked />
  <label class="segmented-option" for="one">One</label>
  <input id="two" type="checkbox" />
  <label class="segmented-option" for="two">Two</label>
  <input id="three" type="checkbox" />
  <label class="segmented-option" for="three">Three</label>
</div>
```

### Multi Select Icon

Segmented buttons with multi select and icons.

<div class="preview">
  <div class="segmented-button" style="min-width: 400px">
    <input id="sb-multi-icon-cut" type="checkbox" checked />
    <label class="segmented-option" for="sb-multi-icon-cut">
      <i class="material-icons">content_cut</i>
      <span>Cut</span>
    </label>
    <input id="sb-multi-icon-paste" type="checkbox" />
    <label class="segmented-option" for="sb-multi-icon-paste">
      <i class="material-icons">content_paste</i>
      <span>Paste</span>
    </label>
  </div>
</div>

```html
<div class="segmented-button" style="min-width: 400px">
  <input id="cut" type="checkbox" checked />
  <label class="segmented-option" for="cut">
    <i class="material-icons">content_cut</i>
    <span>Cut</span>
  </label>
  <input id="paste" type="checkbox" />
  <label class="segmented-option" for="paste">
    <i class="material-icons">content_paste</i>
    <span>Paste</span>
  </label>
</div>
```

## Design Tokens

| Token                                         | Description           | Default                                                                                                         |
|-----------------------------------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------|
| `--md-sys-comp-radio-button-unselected-color` | Unselected icon color | <div class="tooltip token-box color-on-surface-variant" data-tooltip="--md-sys-color-on-surface-variant"></div> |
| `--md-sys-comp-radio-button-selected-color`   | Selected icon color   | <div class="tooltip token-box color-primary" data-tooltip="--md-sys-color-primary"></div>                       |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)
- [Material Design](https://m3.material.io/components/segmented-buttons)
