# Material Design Lite

This package contains the master library for Material Design Lite. It simply wraps all of its
sibling packages up into one comprehensive library for convenience.

## Installation

> Installation via npm will be available post-alpha.

## Usage

### Including the Sass

```scss
@import "material-design-lite/material-design-lite";
```

### Including the Javascript

```js
import * as mdl from 'material-design-lite';
const checkbox = new mdl.checkbox.MDLCheckbox(document.querySelector('.mdl-checkbox'));
// OR
import { checkbox } from 'material-design-lite';
const checkbox = new checkbox.MDLCheckbox(document.querySelector('.mdl-checkbox'));
```

> NOTE: Built CSS files as well as UMD JS bundles will be available as part of the package
> post-alpha.

### Auto-initialization of components

The `material-design-lite` package automatically registers all MDL components with
[mdl-auto-init](../mdl-auto-init), making it dead simple to create and initialize components
with zero configuration or manual work.

For example, say you want to use an [icon toggle](../mdl-icon-toggle). Simply render the necessary
DOM, an attach the `data-mdl-auto-init="MDLIconToggle"` attribute.

```html
<i class="mdl-icon-toggle material-icons" role="button" aria-pressed="false"
   aria-label="Add to favorites" tabindex="0"
   data-toggle-on='{"label": "Remove from favorites", "content": "favorite"}'
   data-toggle-off='{"label": "Add to favorites", "content": "favorite_border"}'
   data-mdl-auto-init="MDLIconToggle">
  favorite_border
</i>
```

Then at the bottom of your html, insert this one-line script tag:

```html
<script>mdl.autoInit()</script>
```

This will automatically initialize the icon toggle, as well as any other components marked with the
auto init data attribute. See [mdl-auto-init](../mdl-auto-init) for more info.
