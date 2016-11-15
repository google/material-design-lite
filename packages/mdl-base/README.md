# mdl-base

MDL base contains core foundation and component classes that serve as the base classes for all of MDL's foundation classes and components (respectively).

Most of the time, you shouldn't need to depend on `mdl-base` directly. It is useful however if you'd like to write custom components that follow MDL's pattern and elegantly integrate with the MDL ecosystem.

## Installation

First install the module:

> NOTE: Installation via the npm registry will be available after alpha.

Then include it in your code in one of the following ways:

#### ES2015+

```javascript
import {MDLComponent, MDLFoundation} from 'mdl-base';
```
#### CommonJS

```javascript
const MDLComponent = require('mdl-base').MDLComponent;
const MDLFoundation = require('mdl-base').MDLFoundation;
```

#### AMD

```javascript
require(['path/to/mdl-base'], function(mdlBase) {
  const MDLComponent = mdlBase.MDLComponent;
  const MDLFoundation = mdlBase.MDLFoundation;
});
```

#### Vanilla

```javascript
const MDLComponent = mdl.base.MDLComponent;
const MDLFoundation = mdl.base.MDLFoundation;
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

### MDLComponent

MDLComponent provides the basic mechanisms for implementing component classes.

```javascript
import MyComponentFoundation from './foundation';

export class MyComponent extends MDLComponent {
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
| `initialize(...args)` | Called after the root element is attached to the component, but _before_ the foundation is instantiated. Any positional arguments passed to the component constructor after the root element, along with the optional foundation 2nd argument, will be provided to this method. This is a good place to do any setup work normally done within a constructor function. |
| `getDefaultFoundation()` | Returns an instance of a foundation class properly configured for the component. Called when no foundation instance is given within the constructor. Subclasses **must** implement this method. |
| `initialSyncWithDOM()` | Called within the constructor. Subclasses may override this method if they wish to perform initial synchronization of state with the host DOM element. For example, a slider may want to check if its host element contains a pre-set value, and adjust its internal state accordingly. Note that the same caveats apply to this method as to foundation class lifecycle methods. Defaults to a no-op. |
| `destroy()` | Subclasses may override this method if they wish to perform any additional cleanup work when a component is destroyed. For example, a component may want to deregister a window resize listener. |
| `listen(type: string, handler: EventListener)` | Adds an event listener to the component's root node for the given `type`. Note that this is simply a proxy to `this.root_.addEventListener`. |
| `unlisten(type: string, handler: EventListener)` | Removes an event listener from the component's root node. Note that this is simply a proxy to `this.root_.removeEventListener`. |
| `emit(type: string, data: Object)` | Dispatches a custom event of type `type` with detail `data` from the component's root node. This is the preferred way of dispatching events within our vanilla components. |

#### Static Methods

In addition to methods inherited, subclasses should implement the following two static methods within their code:

| method | description |
| --- | --- |
| `attachTo(root) => <ComponentClass>` | Subclasses must implement this as a convenience method to instantiate and return an instance of the class using the root element provided. This will be used within `mdl-auto-init`, and in the future its presence may be enforced via a custom lint rule.|

#### Foundation Lifecycle handling

`MDLComponent` calls its foundation's `init()` function within its _constructor_, and its foundation's `destroy()` function within its own _destroy()_ function. Therefore it's important to remember to _always call super() when overriding destroy()_. Not doing so can lead to leaked resources.

#### Initialization and constructor parameters

If you need to pass in additional parameters into a component's constructor, you can make use of the
`initialize` method, as shown above. An example of this is passing in a child component as a
dependency.

```js
class MyComponent extends MDLComponent {
  initialize(childComponent = null) {
    this.child_ = childComponent ?
      childComponent : new ChildComponent(this.root_.querySelector('.child'));
  }

  getDefaultFoundation() {
    return new MyComponentFoundation({
      doSomethingWithChildComponent: () => this.child_.doSomething(),
      // ...
    });
  }
}
```

You could call this code like so:

```js
const childComponent = new ChildComponent(document.querySelector('.some-child'));
const myComponent = new MyComponent(
  document.querySelector('.my-component'), /* foundation */ undefined, childComponent
);
// use myComponent
```

> NOTE: You could also pass in an initialized foundation if you wish. The example above simply
> showcases how you could pass in initialization arguments without instantiating a foundation.

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
