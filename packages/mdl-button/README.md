# MDL Button

The MDL Button component is a spec-aligned button component adhering to the
 [Material Design button requirements](https://material.google.com/components/buttons.html).
 It works without JavaScript with basic functionality for all states.
 If you initiate the JavaScript object for a button, then it will be enhanced with ripple effects. (Not yet implemented)

## Installation

> Note: Installation via the npm registry will be available after alpha.

## Usage

### Flat

```html
<button class="mdl-button">
  Flat button
</button>
```

### Colored

```html
<button class="mdl-button mdl-button--accent">
  Colored button
</button>
```

### Raised

```html
<button class="mdl-button mdl-button--raised">
  Raised button
</button>
```

### Disabled

```html
<button class="mdl-button mdl-button--raised" disabled>
  Raised disabled button
</button>
```

## Classes

### Block

The block class is `mdl-button`. This defines the top-level button element.

### Element

The button component has no inner elements.

### Modifier

The provided modifiers are:

| Class                 | Description                                           |
| --------------------- | ------------------------------------------------------|
| `mdl-button--dense`   | Compresses the button to make it slightly smaller.    |
| `mdl-button--raised`  | Elevates the button and creates a colored background. |
| `mdl-button--primary` | Colors the button with the primary color.             |
| `mdl-button--accent`  | Colors the button with the accent color.              |
