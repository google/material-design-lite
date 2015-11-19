## Introduction

Textfields allow users to provide custom data to the site.
These are represented using the `input` and `textarea` elements.

## Basic Usage

Textfields are required to have a parent element with the `mdl-textfield` and `mdl-js-textfield` classes.
Labels are required as a sibling element with the `mdl-textfield__label` class.
The input itself is required to have the `mdl-textfield__input` class.
You are encouraged to provide an error message using an inline element with the `mdl-textfield__error` class.

## Examples

### Single Line

```html
<div class="mdl-textfield mdl-js-textfield">
  <input class="mdl-textfield__input" type="text" pattern="[0-9]*" id="phone">
  <label class="mdl-textfield__label" for="phone">Phone</label>
  <span class="mdl-textfield__error">Digits only</span>
</div>
```

### Disabled

```html
<div class="mdl-textfield mdl-js-textfield is-disabled">
  <input disabled class="mdl-textfield__input" type="text" pattern="[0-9]*" id="phone">
  <label class="mdl-textfield__label" for="phone">Phone</label>
  <span class="mdl-textfield__error">Digits only</span>
</div>
```

### Invalid

```html
<div class="mdl-textfield mdl-js-textfield is-invalid">
  <input class="mdl-textfield__input" type="text" pattern="[0-9]*" id="phone">
  <label class="mdl-textfield__label" for="phone">Phone</label>
  <span class="mdl-textfield__error">Digits only</span>
</div>
```

### Multi-line

```html
<div class="mdl-textfield mdl-js-textfield">
  <textarea class="mdl-textfield__input" type="text" rows="3" maxrows="6"
   id="schools"></textarea>
  <label class="mdl-textfield__label" for="schools">Schools attended (max. 6)</label>
</div>
```

### Expandable

```html
<div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
  <label class="mdl-button mdl-js-button mdl-button--icon" for="search-expandable">
    <i class="material-icons">search</i>
  </label>
  <div class="mdl-textfield__expandable-holder">
    <input class="mdl-textfield__input" type="text" id="search-expandable">
    <label class="mdl-textfield__label" for="search-expandable">Search text</label>
  </div>
</div>
```

## CSS

### Blocks

| MDL Class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-textfield` | Defines container as an MDL component | Required on "outer" div element |
| `mdl-button` | Defines label as an MDL icon button | For expandable input fields, required on "outer" div's label element |

### Elements

| MDL class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-textfield__input` | Defines element as textfield input | Required on input or textarea element |
| `mdl-textfield__label` | Defines element as textfield label | Required on label element for input or textarea elements |
| `mdl-textfield__error` | Defines span as an MDL error message | Optional; goes on span element for MDL input element with *pattern*|
| `mdl-input__expandable-holder` | Defines a container as an MDL component | For expandable input fields, required on "inner" div element |

### Modifiers

| MDL class | Effect | Remarks |
|-----------|--------|---------|
| `mdl-textfield--floating-label` | Applies *floating label* effect | Optional; goes on "outer" div element |
| `mdl-textfield--expandable` | Defines a div as an MDL expandable text field container | For expandable input fields, required on "outer" div element |
| `mdl-button--icon` | Defines label as an MDL icon container | For expandable input fields, required on "outer" div's label element |
| `is-invalid` | Defines the textfield as invalid on initial load. | Optional on `mdl-textfield` element |

>**Note:** Disabled versions of each text field type are provided, and are invoked with the standard HTML boolean attribute `disabled`. `<input class="mdl-textfield mdl-js-textfield" type="text" disabled>`
>This attribute may be added or removed programmatically via scripting.

## JavaScript

The methods provided can be accessed through the **MaterialTextfield** property on the element where `mdl-js-textfield` is applied.

<figure>
```document.querySelector(‘.mdl-js-textfield’).MaterialTextfield.checkDisabled(); ```
  <figcaption>
    Checking if the first textfield on a document is disabled to update the view.
  </figcaption>
</figure>

### Methods

| Name | Parameters | Function |
|------|------------|---------|
| checkDisabled | None | Checks the input elements current disabled state and updates the view accordingly. |
| checkValidity | None | Checks the input elements current validation state and updates the view accordingly. |
| checkDiry | None | Checks if the input element has been modified from its original state and updates the view accordingly. |
| disable | None | Disables the input element. |
| enable | None | Enables the input element. |
| change | String |  |
