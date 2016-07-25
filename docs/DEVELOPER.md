# MDL V2 Developer's Guide


## Overview

Material Design Lite (MDL) was originally envisioned as UI component library with minimal dependencies, providing an easy way to add a Material Design look and feel to any website. Following the spirit of MDL V1, MDL V2 strives to seamlessly incorporate into an even wider range of usage contexts, from simple static websites to complex, Javascript-heavy applications to hybrid client/server rendering systems. In short, whether you're already heavily invested in another framework or not, it should be easy to incorporate material components into your site in a lightweight, idiomatic fashion.

To make this possible, our new component library is internally split into two parts:

- **MDL V2 Vanilla**: ready-to-use components (what the majority of our current users are interested in)
- **MDL V2 Foundation**: shared UI code (for lower-level usage by other frameworks or complex rendering scenarios)

On the whole, many of these changes will be transparent to Vanilla end-users, and are primarily intended to enable MDL to work across the entire web platform.

## Component Architecture

There are several key design decisions that underpin MDL V2 Foundation:

- Event handling and DOM rendering responsibilities delegated to host framework
- Heavy reliance on CSS for code simplicity, portability, and graceful degradation
- Minimal assumptions about component lifecycle

The aim being to push forward a clear separation of concerns, with the Foundation code being entirely about UI-related matters - as opposed to data-binding, templating, key/input handling, etc. In the case of Vanilla, we take a plain JS approach towards wrapping Foundation and providing the necessary code to make things usable out-of-the-box.

> NOTE: This next section is currently being reworked. See [#4568](https://github.com/google/material-design-lite/issues/4568)

Foundation components are implemented as [functional mixins](http://raganwald.com/2015/06/17/functional-mixins.html) and thus must be bound to a host class in order to be used. The mixin automatically binds when called with the host prototype as the receiver. Additionally, each mixin must be passed in an `adapter` implementation at creation time which is the contract by which the component communicates with its host.

```javascript
class MyHostComponent {
  constructor() {
    this.rootElement_ = document.createElement('div');
  }
}

MDLComponentMixin.call(MyHostComponent, {
  // Adapter implementation.
  addClass(className) {
    this.rootElement_.classList.add(className);
  }
  // ...
});
```

## Infrastructure and Tooling

### Build System

[Webpack](https://webpack.github.io/) is our build system of choice, which provides:

- Bundling of SASS/JS into umbrella or per-component distributions
- Fast, modern development environment (incremental compilation, source maps, live reloading, etc.)

Check out our `webpack.config.js` for more details!

### A-la-carte Components

We use [Lerna JS](https://lernajs.io/) to allow individual components to co-exist and be built within the same repository. Builds via webpack will produce artifacts for each component, which can then be used independently or via the umbrella package (`material-design-lite`).

When cloning the repo for the first time, you must run `lerna bootstrap` which installs all subpackage dependencies and symlinks any project cross-dependencies.

In this manner, each MDL component is isolated and can be versioned and published independently.

