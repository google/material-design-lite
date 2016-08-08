# mdl-animation

mdl-animation is a sass / css library which provides variables, mixins, and classes for Material Design animation, based off of the [motion guidelines](https://material.google.com/motion/duration-easing.html#duration-easing-common-durations). Currently, it only covers easing curves.

## Installation

> Note: Installation via the npm registry will be available after alpha.

## Usage

We currently have variables for the following 3 animation curves:

| Variable name | timing function | use case |
| --- | --- | --- |
| `$mdl-animation-fast-out-slow-in-timing-function` | `cubic-bezier(.4, 0, .2, 1)` | Standard curve; any animations that are visible from start to finish (e.g. a FAB transforming into a toolbar) |
| `$mdl-animation-linear-out-slow-in-timing-function` | `cubic-bezier(0, 0, .2, 1)` | Animations that cause objects to enter the screen (e.g. a fade in) |
| `$mdl-animation-fast-out-linear-in-timing-function` | `cubic-bezier(.4, 0, ``, 1)` | Animations that cause objects to leave the screen (e.g. a fade out) |

### SCSS

Simply drop `mdl-animation` into your build and start using the variables:

```scss
.mdl-thing--animating {
  animation: foo 175ms $mdl-animation-fast-out-slow-in-timing-function;
}
```

or the mixins, which simply assign their corresponding variables to the `animation-timing-function`
property:

```scss
.mdl-thing--on-screen {
  @include mdl-animation-fast-out-linear-in;
}
```

Every mixin has the same name as its corresponding variable, without the `-timing-function` suffix.

### CSS Classes

> NOTE: dist/ will be available when installing via NPM.

Alternatively, you can include the built stylesheet and use the classes it exports within your HTML

```html
<link href="path/to/mdl-animation/dist/mdl-animation.css" rel="stylesheet">
<!-- ... -->
<div id="my-animating-div" class="mdl-animation-fast-out-slow-in">hi</div>
```

CSS Classes have the exact same name as their mixin counterparts.

### Overriding the default curves.

All animation variables are marked with `!default`, thus they can be overridden should the need
arise.
