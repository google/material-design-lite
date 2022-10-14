---
title: Themes
description: Prebuilt Material Themes
tab: "overview"
---

## Static Color

There are prebuilt themes for every [CSS color name](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color).

```html
<link
  rel="stylesheet"
  href="https://rodydavis.github.io/material-design-lite/css/themes/${name}.css"
/>
```

## Dynamic Color

For dynamic color you can use the [Material Color Utilities](https://github.com/material-foundation/material-color-utilities/tree/main/typescript) package on [npm](https://npmjs.com/package/@material/material-color-utilities).

```js
import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";

// Get the theme from a hex color
const theme = themeFromSourceColor(argbFromHex('#f82506'), [
  {
    name: "custom-1",
    value: argbFromHex("#ff0000"),
    blend: true,
  },
]);

// Print out the theme as JSON
console.log(JSON.stringify(theme, null, 2));

// Check if the user has dark mode turned on
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Apply the theme to the body by updating custom properties for material tokens
applyTheme(theme, {target: document.body, dark: systemDark});
```