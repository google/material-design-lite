---
title: Text fields
description: Variations on Material Design text fields.
link: https://m3.material.io/components/text-fields
codepen: vYjzQYb
---

## Preview

<div class="preview">
  <label class="text-field filled">
    <input placeholder=" " />
    <span>Textfield</span>
  </label>
  <label class="text-field filled">
    <textarea placeholder=" "></textarea>
    <span>Textfield</span>
  </label>
  <label class="text-field filled">
    <input placeholder=" " list="browsers" />
    <span>Textfield</span>
  </label>
  <datalist id="browsers">
    <option value="Edge"></option>
    <option value="Firefox"></option>
    <option value="Chrome"></option>
    <option value="Opera"></option>
    <option value="Safari"></option>
  </datalist>
  <label class="text-field outlined">
    <input placeholder=" " />
    <span>Textfield</span>
  </label>
  <label class="text-field outlined">
    <textarea placeholder=" "></textarea>
    <span>Textfield</span>
  </label>
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
@import url('https://rodydavis.github.io/material-design-lite/css/components/text-field/style.css');
```

## Usage

Start with a **label** element and add the **text-field** class name:

```html
<label class="text-field"></div>
```

Next, add an **input** or **textarea** element:

```html
<label class="text-field">
  <input placeholder=" " />
</label>
```

Finally, add a **span** element with the text you want to display:

```html
<label class="text-field">
  <input placeholder=" " />
  <span>Textfield</span>
</label>
```

To make an auto-complete text field, add a **datalist** element:

```html
<label class="text-field">
  <input placeholder=" " list="browsers" />
  <span>Textfield</span>
</label>
<datalist>
  <option value="Edge"></option>
  <option value="Firefox"></option>
  <option value="Chrome"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
</datalist>
```

## Variants

### Filled

Filled text field styling.

<div class="preview">
  <label class="text-field filled">
    <input placeholder=" " />
    <span>Textfield</span>
  </label>
</div>

```html
<label class="text-field filled">
  <input placeholder=" " />
  <span>Textfield</span>
</label>
```

#### Textarea

Filled text field styling with textarea.

<div class="preview">
  <label class="text-field filled">
    <textarea placeholder=" "></textarea>
    <span>Textfield</span>
  </label>
</div>

```html
<label class="text-field filled">
  <textarea placeholder=" "></textarea>
  <span>Textfield</span>
</label>
```

#### Autocomplete

Filled text field styling with autocomplete.

<div class="preview">
  <label class="text-field filled">
    <input placeholder=" " list="browsers" />
    <span>Textfield</span>
  </label>
  <datalist id="browsers">
    <option value="Edge"></option>
    <option value="Firefox"></option>
    <option value="Chrome"></option>
    <option value="Opera"></option>
    <option value="Safari"></option>
  </datalist>
</div>

```html
<label class="text-field filled">
  <input placeholder=" " list="browsers" />
  <span>Textfield</span>
</label>
<datalist id="browsers">
  <option value="Edge"></option>
  <option value="Firefox"></option>
  <option value="Chrome"></option>
  <option value="Opera"></option>
  <option value="Safari"></option>
</datalist>
```

### Outlined

Outlined text field styling.

<div class="preview">
  <label class="text-field outlined">
    <input placeholder=" " />
    <span>Textfield</span>
  </label>
</div>
  
```html
<label class="text-field outlined">
  <input placeholder=" " />
  <span>Textfield</span>
</label>
```

#### Textarea

Outlined text field styling with textarea.

<div class="preview">
  <label class="text-field outlined">
    <textarea placeholder=" "></textarea>
    <span>Textfield</span>
  </label>
</div>

```html
<label class="text-field outlined">
  <textarea placeholder=" "></textarea>
  <span>Textfield</span>
</label>
```

## Design Tokens

| Token                                | Description                    | Default |
|--------------------------------------|--------------------------------|---------|
| `--md-sys-comp-text-field-caret-color` | The caret color of the container | <div class="tooltip token-box color-primary" data-tooltip="--md-sys-color-primary"></div> |

## Resources

- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [Material Design](https://m3.material.io/components/text-fields)
