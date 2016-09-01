# MDL Ripple

- [MDL Ripple](#mdl-ripple)
    - [An aside regarding browser support](#an-aside-regarding-browser-support)
  - [Installation](#installation)
  - [Usage](#usage)
      - [Adding the ripple Sass](#adding-the-ripple-sass)
      - [Adding the ripple JS](#adding-the-ripple-js)
        - [ES2015](#es2015)
        - [CommonJS](#commonjs)
        - [AMD](#amd)
        - [Global](#global)
    - [Unbounded Ripples](#unbounded-ripples)
      - [Using JS](#using-js)
      - [Using DOM (Component Only)](#using-dom-component-only)
    - [The mdl-ripple-surface class](#the-mdl-ripple-surface-class)
    - [Using the foundation](#using-the-foundation)
  - [Tips/Tricks](#tipstricks)
    - [Integrating ripples into MDL components](#integrating-ripples-into-mdl-components)
    - [Using a sentinel element for a ripple](#using-a-sentinel-element-for-a-ripple)
  - [Caveat: Safari](#caveat-safari)

MDL Ripple provides the Javascript and CSS required
to provide components (or any element at all) with a
material "ink ripple" interaction effect. It is designed to be efficient, un-invasive, and usable
without adding any extra DOM to your elements.

### An aside regarding browser support

In order to function correctly, MDL Ripple requires a _browser_ implementation of [CSS Variables](https://www.w3.org/TR/css-variables/). MDL Ripple uses custom properties to dynamically position pseudo elements, which allows us to not need any extra DOM for this effect.

Because we rely on scoped, dynamic CSS variables, static pre-processors such as [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) will not work as an adequate polyfill ([...yet?](https://github.com/postcss/postcss-custom-properties/issues/32)).

[Most modern browsers](http://caniuse.com/#feat=css-variables) support CSS variables, so MDL ripple will work just fine. In other cases, MDL ripple will _still work_ if you include it in your codebase. It will simply check if CSS variables are supported upon initialization and if they aren't, gracefully exit. The only exception to this rule is Safari, which does support CSS variables
but unfortunately ripples are disabled for (see [below](#caveat-safari) for an explanation).

Given this, it is important that you _provide gracefully degraded interaction states_ for browsers in which the ripple is not supported. We do this for all of our components.


## Installation

> NOTE: Installation via npm will be available after our alpha release.

## Usage

For many components, providing a ripple interaction is straightforward.

Let's say we have a `surface` element that represents a basic surface.

```html
<div class="surface" tabindex="0">
  <p>A surface</p>
</div>
```

We also have some basic styles for our surface that
use [mdl-elevation](https://github.com/google/material-design-lite/tree/master/packages/mdl-elevation) to raise it up off of its background.

```scss
@import "mdl-elevation/mixins";

.surface {
  @include mdl-elevation(2);

  position: relative;
  border-radius: 2px;
  text-align: center;
  /* Indicate to user element is interactive. */
  cursor: pointer;


  /* Use the surface's ::before pseudo-element as a basic interaction indicator */

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background-color: black;
    transition: opacity 110ms ease;
    will-change: opacity;
  }

  &:active::before {
    opacity: .18;
  }

  &:focus::before {
    opacity: .06;
  }
}
```

#### Adding the ripple Sass

When a ripple is successfully initialized on an element, it dynamically adds a `mdl-ripple` class to that element. Therefore, to add a ripple to our surface, first we include the proper Sass mixins within our surface's styles when it contains this class. We also add a few additional properties that ensure the ripple's UX is correct.

```scss
@import "mdl-elevation/mixins";
@import "mdl-ripple/mixins";

.surface.mdl-ripple {
  @include mdl-ripple-base;
  @include mdl-ripple-bg((pseudo: "::before"));
  @include mdl-ripple-fg((pseudo: "::after"));
  // ...

  /* "Bound" the ripple, preventing the pseudo-elements from bleeding out of the box. */
  overflow: hidden;
}
```

This code sets up `.surface` with the correct css variables as well as `will-change` properties to support the ripple. It then dynamically generates the correct selectors such that the surface's `::before` element functions as a background ripple, and the surface's `::after` element functions as a foreground ripple.

#### Adding the ripple JS

First import the ripple JS

##### ES2015

```javascript
import MDLRipple, {MDLRippleFoundation} from 'mdl-ripple';
```

##### CommonJS

```javascript
const MDLRipple = require('mdl-ripple').default;
const MDLRippleFoundation = require('mdl-ripple').MDLRippleFoundation;
```

##### AMD

```javascript
require('path/to/mdl-ripple', function(mdlRipple) {
  const MDLRipple = mdlRipple.default;
  const MDLRippleFoundation = mdlRipple.MDLRippleFoundation;
});
```

##### Global

```javascript
const MDLRipple = global.mdl.Ripple.default;
const MDLRippleFoundation = global.mdl.Ripple.MDLRippleFoundation;
```

Then, simply attach initialize the ripple with the correct DOM.

```javascript
const surface = document.querySelector('.surface');
const ripple = new MDLRipple(surface);
```

You can also use `attachTo()` as an alias if you don't care about retaining a reference to the
ripple.

```javascript
MDLRipple.attachTo(document.querySelector('.surface'));
```

### Unbounded Ripples

If you'd like to use _unbounded_ ripples, such as those used for checkboxes and radio buttons
(_TK_), you can do so either imperatively in JS _or_ declaratively using the DOM.

#### Using JS

You can set an `unbounded` property to specify whether or not the ripple is unbounded.

```javascript
const ripple = new MDLRipple(root);
ripple.unbounded = true;
```

If directly using our foundation, you must provide this information directly anyway, so simply have
`isUnbounded` return `true`.

```javascript
const foundation = new MDLRippleFoundation({
  isUnbounded: () => true,
  // ...
});
```

#### Using DOM (Component Only)

If you are using our vanilla component for the ripple (not our foundation class), you can add a
data attribute to your root element indicating that you wish the ripple to be unbounded:

```html
<div class="surface" data-mdl-ripple-is-unbounded>
  <p>A surface</p>
</div>
```

### The mdl-ripple-surface class

mdl-ripple contains CSS which exports an `mdl-ripple-surface` class that can turn any element into
a ripple:

```html
<style>
.my-surface {
  width: 200px;
  height: 200px;
  background: grey; /* Google Blue 500 :) */
  border-radius: 2px;
}
</style>
<!-- ... -->
<div class="mdl-ripple-surface my-surface" tabindex="0">Ripples FTW!</div>
```

Check out our demo (in the top-level `demos/` directory) to see this class in action.

### Using the foundation

The MDLRippleFoundation can be used like any other foundation component. Usually, you'll want to use
it in your component _along_ with the foundation for the actual UI element you're trying to add a
ripple to. The adapter API is as follows:

| Method Signature | Description |
| --- | --- |
| `browserSupportsCssVars() => boolean` | Whether or not the given browser supports CSS Variables. When implementing this, please take the [Safari considerations](#caveat-safari) into account. We provide a `supportsCssVariables` function within the `util.js` which we recommend using, as it handles this for you. |
| `isUnbounded() => boolean` | Whether or not the ripple should be considered unbounded. |
| `isSurfaceActive() => boolean` | Whether or not the surface the ripple is acting upon is [active](https://www.w3.org/TR/css3-selectors/#useraction-pseudos). We use this to detect whether or not a keyboard event has activated the surface the ripple is on. This does not need to make use of `:active` (which is what we do); feel free to supply your own heuristics for it. |
| `addClass(className: string) => void` | Adds a class to the ripple surface |
| `removeClass(className: string) => void` | Removes a class from the ripple surface |
| `registerInteractionHandler(evtType: string, handler: EventListener) => void` | Registers an event handler that's invoked when the ripple is interacted with using type `evtType`. Essentially equivalent to `HTMLElement.prototype.addEventListener`. |
| `deregisterInteractionHandler(evtType: string, handler: EventListener) => void` | Unregisters an event handler that's invoked when the ripple is interacted with using type `evtType`. Essentially equivalent to `HTMLElement.prototype.removeEventListener`. |
| `registerResizeHandler(handler: Function) => void` | Registers a handler to be called when the surface (or its viewport) resizes. Our default implementation adds the handler as a listener to the window's `resize()` event. |
| `deregisterResizeHandler(handler: Function) => void` | Unregisters a handler to be called when the surface (or its viewport) resizes. Our default implementation removes the handler as a listener to the window's `resize()` event. |
| `updateCssVariable(varName: string, value: (string or null)) => void` | Programmatically sets the css variable `varName` on the surface to the value specified. |
| `computeBoundingRect() => ClientRect` | Returns the ClientRect for the surface. |
| `getWindowPageOffset() => {x: number, y: number}` | Returns the `page{X,Y}Offset` values for the window object as `x` and `y` properties of an object (respectively). |

## Tips/Tricks

### Integrating ripples into MDL components

Usually, you'll want to leverage `::before` and `::after` pseudo-elements when integrating the
ripple into MDL components. Furthermore, when defining your component, you can instantiate the
ripple foundation at the top level, and share logic between those adapters.

### Using a sentinel element for a ripple

If you find you can't use pseudo-elements to style the ripple, another strategy could be to use a
sentinel element that goes inside your element and covers its surface. Doing this should get you
the same effect.

```html
<div class="my-component">
  <div class="mdl-ripple-surface"></div>
  <!-- your component DOM -->
</div>
```

## Caveat: Safari

> TL;DR ripples are disabled in Safari < 10 because of a nasty CSS variables bug.

The ripple works by updating CSS Variables which are used by pseudo-elements. This allows ripple
effects to work on elements without the need to add a bunch of extra DOM to them. Unfortunately, in
Safari 9.1, there is a nasty bug where updating a css variable on an element will _not_ trigger a
style recalculation on that element's pseudo-elements which make use of the css variable (try out
[this codepen](http://codepen.io/traviskaufman/pen/jARYOR) in Chrome, and then in Safari <= 9.1 to
see the issue). We feature-detect around this using alternative heuristics regarding different
webkit versions: Webkit builds which have this bug fixed (e.g. the builds used in Safari 10+)
support [CSS 4 Hex Notation](https://drafts.csswg.org/css-color/#hex-notation) while those do not
have the fix don't. We use this to reliably feature-detect whether we are working with a WebKit
build that can handle our usage of CSS variables.
