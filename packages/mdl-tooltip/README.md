# MDL Tooltip

The MDL Tooltip component is a spec-aligned tooltip component adhering to the
[Material Design tooltip requirements](https://material.google.com/components/tooltips.html).
It works without JavaScript.

## Installation

> Note: Installation via the npm registry will be available after alpha.

## Usage

To use the tooltip component add the class `mdl-tooltip` to any element.
Then provide that element an `aria-label` attribute to define what the contents of the tooltip should be.

```html
<!-- Using the material icons font for a favorite icon. -->
<i class="material-icons mdl-tooltip" aria-label="Favorite">favorite</i>
```

## Developer Notes

The tooltip takes advantage of the `::after` pseudo element.
Tooltips can only be made with elements that do not use this themselves.
To make your components work with tooltips take advantage of only `::before` within your component code.

## CSS Classes

### Block

The `mdl-tooltip` class is the block definition for the component.

### Element

This component contains no inner elements.

### Modifiers

This component contains no modifier classes.
