# MDL Ripple

- [MDL Ripple](#mdl-ripple)
    - [An aside regarding browser support](#an-aside-regarding-browser-support)
  - [Installation](#installation)
  - [Usage](#usage)
      - [Adding the ripple Sass](#adding-the-ripple-sass)
        - [The full Sass API](#the-full-sass-api)
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
    - [Using the vanilla DOM adapter](#using-the-vanilla-DOM-adapter)
  - [Tips/Tricks](#tipstricks)
    - [Integrating ripples into MDL components](#integrating-ripples-into-mdl-components)
    - [Using a sentinel element for a ripple](#using-a-sentinel-element-for-a-ripple)
    - [Keyboard interaction for custom UI components](#keyboard-interaction-for-custom-ui-components)
    - [Specifying known element dimensions](#specifying-known-element-dimensions)
  - [Caveat: Safari](#caveat-safari)
  - [Caveat: Theme Custom Variables](#caveat-theme-custom-variables)

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

##### The full Sass API

Both `mdl-ripple-bg` and `mdl-ripple-fg` take an `$config` map as an optional
argument, with which you can specify the following parameters:

| Parameter | Description | Default |
| --- | --- | --- |
| `pseudo` | The name of the pseudo-element you want to use to style the ripple. Using pseudo-elements to style ripples obviates the need for any extra DOM and is recommended. However,
if given `null` it will style the element directly, rather than attaching styles to the pseudo element. | `null` |
| `radius` | For _bounded_ ripples, specifies radii of the ripple circles. Can be any valid numeric CSS unit. | `100%` |
| `theme-style` | When provided, will use a style specified by `mdl-theme` to provide colors to the ripple. For example, passing `(theme-style: primary)` would make the ripples the color of the theme's primary color. Note that there are some current limitations here. See [below](#caveat-theme-custom-variables) | `null` |
| `base-color` | The RGB color (_without_ an alpha component) of the ripple. This will only be used if `theme-style` isn't specified. | `black` |
| `opacity` | A unitless number from `0-1` specifying the opacity that either the `base-color` or the `theme-style` color will take on. | `.06` |

#### Adding the ripple JS

First import the ripple JS

##### ES2015

```javascript
import {MDLRipple, MDLRippleFoundation} from 'mdl-ripple';
```

##### CommonJS

```javascript
const MDLRipple = require('mdl-ripple').MDLRipple;
const MDLRippleFoundation = require('mdl-ripple').MDLRippleFoundation;
```

##### AMD

```javascript
require('path/to/mdl-ripple', function(mdlRipple) {
  const MDLRipple = mdlRipple.MDLRipple;
  const MDLRippleFoundation = mdlRipple.MDLRippleFoundation;
});
```

##### Global

```javascript
const MDLRipple = mdl.ripple.MDLRipple;
const MDLRippleFoundation = mdl.ripple.MDLRippleFoundation;
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

If you'd like to use _unbounded_ ripples, such as those used for checkboxes and radio buttons, you
can do so either imperatively in JS _or_ declaratively using the DOM.

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

There are also modifier classes that can be used for styling ripple surfaces using the configured
theme's primary and accent colors

```html
<div class="mdl-ripple-surface mdl-ripple-surface--primary my-surface" tabindex="0">
  Surface with a primary-colored ripple.
</div>
<div class="mdl-ripple-surface mdl-ripple-surface--accent my-surface" tabindex="0">
  Surface with an accent-colored ripple.
</div>
```

Check out our demo (in the top-level `demos/` directory) to see these classes in action.

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

### Using the vanilla DOM adapter

Because ripples are used so ubiquitously throughout our codebase, `MDLRipple` has a static
`createAdapter(instance)` method that can be used to instantiate an adapter object that can be used by
any `MDLComponent` that needs to instantiate an `MDLRippleFoundation` with custom functionality.

```js
class MyMDLComponent extends MDLComponent {
  constructor() {
    super(...arguments);
    this.ripple_ = new MDLRippleFoundation(Object.assign(MDLRipple.createAdapter(this), {
      isSurfaceActive: () => this.isActive_
    }));
    this.ripple_.init();
  }

  // ...
}
```

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

### Keyboard interaction for custom UI components

Different keyboard events activate different elements. For example, the space key activate buttons, while the enter key activates links. Handling this by sniffing the key/keyCode of an event is brittle and error-prone, so instead we take the approach of using `adapter.isSurfaceActive()`. The
way in which our default vanilla DOM adapter determines this is by using
`element.matches(':active')`. However, this approach will _not_ work for custom components that
the browser does not apply this pseudo-class to.

If you want your component to work properly with keyboard events, you'll have to listen for both `keydown` and `keyup` and set some sort of state that the adapter can use to determine whether or
not the surface is "active", e.g.

```js
class MyComponent {
  constructor(el) {
    this.el = el;
    this.active = false;
    this.ripple_ = new MDLRippleFoundation({
      // ...
      isSurfaceActive: () => this.active
    });
    this.el.addEventListener('keydown', evt => {
      if (isSpace(evt)) {
        this.active = true;
      }
    });
    this.el.addEventListener('keyup', evt => {
      if (isSpace(evt)) {
        this.active = false;
      }
    });
  }
}
```

### Specifying known element dimensions

If you asynchronously load style resources, such as loading stylesheets dynamically via scripts
or loading fonts, then `adapter.getClientRect()` may by default return _incorrect_ dimensions when
the ripple foundation is initialized. For example, if you put a ripple on an element that uses an
icon font, and the size of the icon font isn't specified at initialization time, then if that icon
font hasn't loaded it may report the intrinsic width/height incorrectly. In order to prevent this,
you can override the default behavior of `getClientRect()` to return the correct results. For
example, if you know an icon font sizes its elements to `24px` width/height, you can do the
following:

```js
this.ripple_ = new MDLRippleFoundation({
  // ...
  computeBoundingRect: () => {
    const {left, top} = element.getBoundingClientRect();
    const dim = 24;
    return {
      left,
      top,
      width: dim,
      height: dim,
      right: left + dim,
      bottom: top + dim
    };
  }
});
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

## Caveat: Theme Custom Variables

> TL;DR theme custom variable changes will not propagate to ripples if the browser does not support
> [CSS 4 color-mod functions](https://drafts.csswg.org/css-color/).

The way that [mdl-theme works](https://github.com/google/material-design-lite/tree/master/packages/mdl-theme#mdl-theme-prop-mixin) is that it emits two properties: one with the hard-coded sass variable, and another for a
CSS variable that can be interpolated. The problem is that ripple backgrounds need to have an opacity, and currently there's no way to opacify a pre-existing color defined by a CSS variable.
There is an editor's draft for a `color-mod` function (see link in TL;DR) that _can_ do this:

```css
background: color(var(--mdl-theme-primary) a(6%));
```

But as far as we know, no browsers yet support it. We have added a `@supports` clause into our code
to make sure that it can be used as soon as browsers adopt it, but for now this means that _changes
to your theme via a custom variable will not propagate to ripples._ We don't see this being a gigantic issue as we envision most users configuring one theme via sass. For places where you do need this, special treatment will have to be given.
