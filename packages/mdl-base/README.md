# mdl-base

> NOTE: Please do not use or rely on `adapter.js`. It is deprecated and in the process of being
> removed.

MDL base contains core foundation and component classes that serve as the base classes for all of MDL's foundation classes and components (respectively).

Most of the time, you shouldn't need to depend on `mdl-base` directly. It is useful however if you'd like to write custom components that follow MDL's pattern and elegantly integrate with the MDL ecosystem.

## Installation

First install the module:

> NOTE: Installation via the npm registry will be available after alpha.

Then include it in your code in one of the following ways:

#### ES2015+

```javascript
import MDLComponent, {MDLFoundation} from 'mdl-base';
```
#### CommonJS

```javascript
const MDLComponent = require('mdl-base').default;
const MDLFoundation = require('mdl-base').MDLFoundation;
```

#### AMD

```javascript
require(['path/to/mdl-base'], function(mdlBase) {
  const MDLComponent = mdlBase.default;
  const MDLFoundation = mdlBase.MDLFoundation;
});
```

#### Vanilla

```javascript
const MDLComponent = mdl.Base.default;
const MDLFoundation = mdl.Base.MDLFoundation;
```

## Usage

mdl-base exposes two classes: `MDLComponent` (the default export) which all components extend from, and `MDLFoundation`, which all foundation classes extend from. To learn more about foundation classes vs. components, check out our [developer guide](https://github.com/google/material-design-lite/blob/master/docs/DEVELOPER.md) (_WIP_).

### MDLFoundation

MDLFoundation provides the basic mechanisms for implementing a foundation classes. Subclasses are expected to:

- Provide implementations of the proper static getters where necessary.
- Provide `init()` and `destroy()` lifecycle methods

```javascript
import {MDLFoundation} from 'mdl-base';

export default class MyFoundation extends MDLFoundation {
  static get cssClasses() {
    return {
      ROOT: 'my-component',
      MESSAGE: 'my-component__message',
      BUTTON: 'my-component__button',
      TOGGLED: 'my-component--toggled'
    };
  }

  static get defaultAdapter() {
    return {
      toggleClass: (/* className: string */) => {},
      registerBtnClickHandler: (/* handler: Function */) => {},
      deregisterBtnClickHandler: (/* handler: Function */) => {}
    };
  }

  constructor(adapter) {
    super(Object.assign(MyFoundation.defaultAdapter, adapter));
    const {TOGGLED} = MyFoundation.cssClasses;
    this.clickHandler_ = () => this.adapter_.toggleClass(TOGGLED);
  }

  init() {
    this.adapter_.registerBtnClickHandler(this.clickHandler_);
  }

  destroy() {
    this.adapter_.deregisterBtnClickHandler(this.clickHandler_);
  }
}
```

#### Static Getters

The static getters specify constants that can be used within the foundation class, its component, and by 3rd-party code. _It's important to remember to always put constants into these getters_. This will ensure your component can interop in as many environments as possible, including those where CSS classes need to be overwritten by the host library (e.g., Closure Stylesheets), or strings need to be modified (for i18n, for example).

Note that you do not have to explicitly provide getters for constants if your component has none.

The getters which should be provided are specified below:

| getter | description |
| --- | --- |
| cssClasses | returns an object where each key identifies a css class that some code will rely on. |
| strings | returns an object where each key identifies a string constant, e.g. `ARIA_ROLE` |
| numbers | returns an object where each key identifies a numeric constant, e.g. `TRANSITION_DELAY_MS` |
| defaultAdapter | returns an object specifying the shape of the adapter. Can be used as sensible defaults for an adapter as well as a way to specify your adapter's "schema" |

#### Lifecycle Methods

Each foundation class has two lifecycle methods: `init()` and `destroy()`, which are described below:

| method | time of invocation | use case |
| --- | --- | --- |
| init() | called by a host class when a component is ready to be initialized | add event listeners, query for info via adapters, etc. |
| destroy() | called by a host class when a component is no longer in use | remove event listeners, reset any transient state, etc. |

> Please note: _the lifecycle methods are **not** a safe place to perform DOM reads/writes that would invalidate layout or cause a repaint_. If this needs to be done within these methods, it should be put into a `requestAnimationFrame()` call so that it's synchronized with the browser's refresh cycle and does not [cause jank](http://www.html5rocks.com/en/tutorials/speed/rendering/).

### MDLComponent

MDLComponent provides the basic mechanisms for implementing component classes.

```javascript
import MyComponentFoundation from './foundation';

export default class MyComponent extends MDLComponent {
  static buildDom() {
    const {ROOT, MESSAGE, BUTTON} = MyComponentFoundation.cssClasses;
    const root = document.createElement('div');
    root.classList.add(ROOT);

    const message = document.createElement('p');
    message.classList.add(MESSAGE);
    root.appendChild(message);

    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add(BUTTON);
    root.appendChild(button);

    return root;
  }

  static attachTo(root) {
    return new MyComponent(root);
  }

  getDefaultFoundation() {
    const btn = this.root.querySelector(`.${MyComponentFoundation.cssClasses.BUTTON}`);
    return new MyComponentFoundation({
      toggleClass: className => {
        if (this.root.classList.contains(className)) {
          this.root.classList.remove(className);
          return;
        }
        this.root.classList.add(className);
      },
      registerBtnClickHandler: handler => btn.addEventListener('click', handler),
      deregisterBtnClickHandler: handler => btn.removeEventListener('click', handler)
    });
  }
}
```

#### Properties

`MDLComponent` provides the following "private" properties to subclasses:

| property | description |
| --- | --- |
| `root_` | The root element passed into the constructor as the first argument. |
| `foundation_` | The foundation class for this component. This is either passed in as an optional second argument to the constructor, or assigned the result of calling `getDefaultFoundation()` |

#### Methods

`MDLComponent` provides the following methods to subclasses:

| method | description |
| --- | --- |
| `getDefaultFoundation()` | Returns an instance of a foundation class properly configured for the component. Called when no foundation instance is given within the constructor. Subclasses **must** implement this method. |
| `initialSyncWithDOM()` | Called within the constructor. Subclasses may override this method if they wish to perform initial synchronization of state with the host DOM element. For example, a slider may want to check if its host element contains a pre-set value, and adjust its internal state accordingly. Note that the same caveats apply to this method as to foundation class lifecycle methods. Defaults to a no-op. |
| `destroy()` | Subclasses may override this method if they wish to perform any additional cleanup work when a component is destroyed. For example, a component may want to deregister a window resize listener. |

#### Static Methods

In addition to methods inherited, subclasses should implement the following two static methods within their code:

| method | description |
| --- | --- |
| `buildDom(...any) => HTMLElement` | Subclasses may implement this as a convenience method to construct the proper DOM for a component. Users could then rely on this as an alternative to having to construct the DOM themselves. However, it should exist purely for convenience and _never_ be used as a dependency for the component itself. |
| `attachTo(root) => <ComponentClass>` | Subclasses must implement this as a convenience method to instantiate and return an instance of the class using the root element provided. This will be used within `mdl-auto-init`, and in the future its presence may be enforced via a custom lint rule.|

#### Foundation Lifecycle handling

`MDLComponent` calls its foundation's `init()` function within its _constructor_, and its foundation's `destroy()` function within its own _destroy()_ function. Therefore it's important to remember to _always call super() when overriding destroy()_. Not doing so can lead to leaked resources.

#### Best Practice: Keep your adapters simple

If you find your adapters getting too complex, you should consider refactoring the complex parts out into their own implementations.

```javascript
import MyComponentFoundation from './foundation';
import {toggleClass} from './util';

class MyComponent {
  // ...
  getDefaultFoundation() {
    return new MyComponentFoundation({
        toggleClass: className => util.toggleClass(this.root_, className),
        // ...
    });
  }
}
```

Where `./util` could look like:

```javascript
export function toggleClass(element, className) {
  if (root.classList.contains(className)) {
    root.classList.remove(className);
    return;
  }
  root.classList.add(className);
}
```

This not only reduces the complexity of your component class, but allows for the functionality of complex adapters to be adequately tested:

```javascript
test('toggleClass() removes a class when present on an element', t => {
  const root = document.createElement('div');
  root.classList.add('foo');

  util.toggleClass(root, 'foo');

  t.false(root.classList.contains('foo'));
  t.end();
});
```
