# MDL FAB

The MDL FAB component is a spec-aligned button component adhering to the
 [Material Design FAB requirements](https://material.google.com/components/buttons-floating-action-button.html).
 It works without JavaScript with basic functionality for all states.
 If you initiate the JavaScript object for a button, then it will be enhanced with ripple effects. (Not yet implemented)

## Installation

> Note: Installation via the npm registry will be available after alpha.

## Usage

The demonstrations use the [Material Design Icon Font](https://design.google.com/icons/).
You may include this to use them as shown or use any other icon method you wish.

### Default

```html
<button class="mdl-fab material-icons" aria-label="Favorite">
  favorite
</button>
```

### Mini

```html
<button class="mdl-fab mdl-fab--mini material-icons" aria-label="Favorite">
  favorite
</button>
```

### Plain

```html
<button class="mdl-fab mdl-fab--plain material-icons" aria-label="favorite">
  favorite
</button>
```

### Absolutely positioned

By default the FAB rests in the page where it sits in the content flow.
Developers must position it as-needed within their applications designs.

```html
<!--
  This will position the FAB in the bottom-right corner.
  Modify to fit your designs requirements.
-->
<style>
.app-fab--absolute.app-fab--absolute {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

@media(min-width: 1024px) {
   .app-fab--absolute.app-fab--absolute {
    bottom: 3rem;
    right: 5rem;
  }
}
</style>
<!--
  You may also use SVG icons instead of an icon font.
  `fill` is to `currentColor` so you don't need to set the color value in the SVG.
-->
<button class="mdl-fab app-fab--absolute" aria-label="Edit">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
</button>
```

## Classes

### Block

The block class is `mdl-fab`. This defines the top-level button element.

### Element

The button component has no inner elements.

### Modifier

The provided modifiers are:

| Class             | Description                             |
| ------------------| --------------------------------------- |
| `mdl-fab--mini`   | Makes the fab smaller (40 x 40 pixels). |
| `mdl-fab--plain`  | Makes the FAB have a white background.  |
