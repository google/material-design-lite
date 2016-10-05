# MDL Form Field

MDL Form Field provides an `mdl-form-field` helper class for easily making theme-aware, RTL-aware
form field + label combos.

## Installation

> NOTE: Installation will be available via npm post-alpha.

## Usage

The `mdl-form-field` class can be used as a wrapper element with any `input` + `label` combo:

```html
<div class="mdl-form-field">
  <input type="checkbox" id="input">
  <label for="input">Input Label</label>
</div>
```

By default, this will position the label after the input. You can change this behavior using the
`align-end` modifier class.

```html
<div class="mdl-form-field mdl-form-field--align-end">
  <input type="checkbox" id="input">
  <label for="input">Input Label</label>
</div>
```

Now the label will be positioned before the checkbox.

### Usage with MDL Components

`mdl-form-field` will work not just with `input` elements, but with _any_ element as long as its
successive sibling is a label element. This means it will work for any mdl form control, such as a
checkbox:

```html
<div class="mdl-form-field">
  <div class="mdl-checkbox">
    <input type="checkbox"
           id="my-checkbox"
           class="mdl-checkbox__native-control"/>
    <div class="mdl-checkbox__background">
      <svg version="1.1"
           class="mdl-checkbox__checkmark"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24"
           xml:space="preserve">
        <path class="mdl-checkbox__checkmark__path"
              fill="none"
              stroke="white"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
      </svg>
      <div class="mdl-checkbox__mixedmark"></div>
    </div>
  </div>
  <label for="my-checkbox" id="my-checkbox-label">This is my checkbox</label>
</div>
```

### RTL Support

`mdl-form-field` is automatically RTL-aware, and will re-position elements within an RTL context.
`mdl-form-field` will apply RTL styles whenever it, or its ancestors, has a `dir="rtl"` attribute.

### Theming

`mdl-form-field` is dark theme aware, and will change the text color to the "primary on dark" text
color when used within a dark theme.
