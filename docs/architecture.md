# MDL v2 Architecture Overview

The following is an outline of the MDLv2 architecture. Many of the architectural decisions we made were in response to the problems and feedback the team has received around MDLv1. The goals of the MDLv2 architecture are to not only provide an easy way to provide a material UI for static websites, but for _dynamic websites and frameworks as well_. Essentially, _the goal of MDLv2 is to be the canonical material design implementation for the web platform_. We want MDLv2 to be:

* Accurate to the [material design spec](https://material.google.com/) with the highest possible fidelity, with graceful degredation in situations where this cannot be achieved.
* Plug-and-play for people who just want to add styles to a static site, just like MDLv1.
* Modular and un-invasive for developers who want to create more complex, dynamic sites using Material Design.
* Easy to integrate into third-party libraries and frameworks, with minimal duplication of effort. There should not be N different material design implementations for N different frameworks. We strive for _one_ universal implementation across the web, and want to facilitate library developers who want material design components for their frameworks.

## No more automatic DOM traversal and rendering

The biggest difference between MDLv1 and MDLv2 is how we handle component lifecycles and initialization. Unlike MDLv1, _there is no DOM-wide traversals, no implicit upgrading/downgrading, and no automatic rendering of DOM elements_. All rendering of DOM is left up to the client. In this way, it is very similar to [bootstrap](http://getbootstrap.com). The DOM structure of a component is considered part of its "public API"; any updates to the DOM structure will be considered a breaking change.

In fact, for a lot of components - such as [cards](../packages/mdl-card) - no Javascript is needed _at all_. Javascript is only needed for components which provide advanced interaction patterns (e.g. things with ripples), and dynamic functionality (form controls, etc.).

## Modular UI Components

Unlike MDLv1, _components are independent of one another_. We'll be providing per-component packages, similar to [angular2](https://github.com/angular/angular), as well as one comprehensive overall package. This means more flexibility and less lock-in for users with more complex setups and use cases.

## Component Architecture

### A little bit of background

As I mentioned above, our goal is to have a single UI library that can be used across the web. In order to this to be successful, we have to be able to integrate nicely with the myriad of frameworks, runtimes, and technologies that comprise the web platform, with _minimal duplication of logic_.

That last part is where it gets really tricky for us. Material Design contains a lot of intricate and subtle interaction patterns that are at best easy to get wrong, at worst intrinsic knowledge and not really documented in the spec at all. Many of these interactions - especially the ones that deal with dynamic controls - require a non-trivial amount of javascript to implement correctly. It would be a shame to have to push the burden of implementing this onto framework teams, whose job should be to focus on developing framework code. Furthermore, it makes changes to the component behaviors very hard to propagate. _We need to choose an architecture that allows our material components to be integrated eloquently into different frameworks while not requiring those frameworks reinvent the wheel_.

###  Components, Foundations, Adapters

In order to do achieve this goal, we've factored our components into three major parts: the component itself, its foundation, and its adapter.

* A **component** is a class which is part of a **host platform**. A host platform usually refers to a framework/UI library such as React, Angular, Ember, VueJS, etc. It could also mean a certain type of environment, such as the Vanilla DOM (essentially no framework), or shadow DOM, or within the context of a custom element. It could even be something like a server rendering html, or even a hybrid platform like ionic. Basically, it's an entity which is part of a runtime that uses web technologies for user interfaces.

* A **foundation** is a class which contains the core business logic of a UI component. It doesn't know anything about its **host platform** (e.g. whether it's being used as a react component, an angular component, in shadow DOM, in plain "light" DOM, etc), and therefore cannot make any assumptions about it.

* An **adapter** is an object (or a class) which is _contains methods that foundations use to interact with their host environment_. Adapters can almost be thought of as proxies which interact with a host platform on behalf of the foundation.

#### Example: An RGB Square

The best way to explain our architecture is through an example. Suppose we want to create an "RGB Square" component that just rotates through red, green, and blue backgrounds as you click it. Kind of [like this](http://codepen.io/traviskaufman/pen/YWbgZw).

The html is really straightforward:

```html
<div class="rgb-square"></div>
```

So is the CSS

```css
.rgb-square {
  width: 125px;
  height: 125px;
  border: 2px solid black;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
}

.rgb-square--r {
  background: red;
}

.rgb-square--g {
  background: green;
}

.rgb-square--b {
  background: blue;
}
```

Now let's look at the javascript. Just using vanilla JS, we can easily code up this functionality.

```javascript
class RGBSquare {
  constructor(root) {
    this.root_ = root;
    this.colorMods_  = ['r', 'g', 'b'];
    this.counter_ = -1; // no color
    this.root_.addEventListener('click', () => this.update_());
  }

  update_() {
    const oldClass = this.colorClass_(this.counter_);
    const newClass = this.colorClass_(++this.counter_);
    if (oldClass) {
      this.root_.classList.remove(oldClass);
    }
    this.root_.classList.add(newClass);
  }

  colorClass_(i) {
    if (i < 0) {
      return '';
    }
    const mod = this.colorMods_[i % this.colorMods_.length];
    return `rgb-square--${mod}`;
  }
}
```

We can now easily use this in a very simple site, such as the codepen demo

```javascript
new RGBSquare(document.querySelector('.rgb-square'));
```

But what happens when we try to reuse this component in a react app? What about in an angular app? What if we're rendering our components on the server and don't even yet have access to the DOM? We could have those frameworks use only the HTML and CSS and re-implement the JS functionality, but that is brittle and wasteful of the developers' time. So we immediately have some problems to address.

First off, this component has no notion of a lifecycle. It simply assumes that once it is instantiated it should initialize, and it will always be there. This is not the case in many dynamic applications. So in order for frameworks whose components have lifecycles to be able to use this elegantly, this is the first thing we need to implement:

```javascript
class RGBSquare {
  constructor(root) {
    this.root_ = root;
    this.colorMods_  = ['r', 'g', 'b'];
    this.counter_ = -1; // no color
    this.clickHandler_ = () => this.update_();
  }

  /** initialization lifecycle method */
  init() {
    this.root_.addEventListener('click', this.clickHandler_);
  }

  /** destruction lifecycle method */
  destroy() {
    this.root_.removeEventListener('click', this.clickHandler_);
  }  

  update_() {
    const oldClass = this.colorClass_(this.counter_);
    const newClass = this.colorClass_(++this.counter_);
    if (oldClass) {
      this.root_.classList.remove(oldClass);
    }
    this.root_.classList.add(newClass);
  }

  colorClass_(i) {
    if (i < 0) {
      return '';
    }
    const mod = this.colorMods_[i % this.colorMods_.length];
    return `rgb-square--${mod}`;
  }
}
```

Now, we're no longer doing any operations within the constructor, and we provide both initialization and destruction methods as exposed lifecycle methods. So theoretically if you wanted an `RGBSquare` as a react component, you could call `init()` within `componentDidMount()` and `destroy()` within `componentWillUnmount()`.

But there's still a major problem. Let's continue with our example of wrapping `RGBSquare` in a react component. If we were to do this, _what would the **root** parameter be_? We could defer initialization until `componentWillMount()`, but that gets ugly quickly. And it becomes even more complicated with frameworks such as angular2, which have no notion of a "virtual DOM" and use their own abstractions as well. In this case, how do we do things like "add a class", or "register a click handler"?

Essentially, we can't assume we'll have a root "element" at initialization, and we have no idea what the API for working with the host platform will look like. If we were to factor all of these platform-specific features out of what we already have, here's a sketch of what the `RGBSquare` would look like:

```javascript
class RGBSquare {
  constructor(/*???*/) {
    this.colorMods_  = ['r', 'g', 'b'];
    this.counter_ = -1; // no color
    this.clickHandler_ = () => this.update_();
  }

  /** initialization lifecycle method */
  init() {
    SOMEHOW_REGISTER_CLICK_HANDLER(this.clickHandler_);
  }

  /** destruction lifecycle method */
  destroy() {
    SOMEHOW_DEREGISTER_CLICK_HANDLER(this.clickHandler_);
  }  

  update_() {
    const oldClass = this.colorClass_(this.counter_);
    const newClass = this.colorClass_(++this.counter_);
    if (oldClass) {
      SOMEHOW_REMOVE_CLASS(oldClass);
    }
    SOMEHOW_ADD_CLASS(newClass);
  }

  colorClass_(i) {
    if (i < 0) {
      return '';
    }
    const mod = this.colorMods_[i % this.colorMods_.length];
    return `rgb-square--${mod}`;
  }
}
```

_This is essentially the **foundation** class for our RGBSquare_. It contains all of the internal state and business logic needed to make the UI function correctly, but no assumptions about how to operate on the host environment.

So now the question is: how do we tell the foundation how to do those things it needs to do? This is where an **adapter** comes in. Our `RGBSquare` needs to know how to do four things within its host environment:

- add a class to its "root" element
- remove a class from its "root" element
- add a click event handler to its "root" element
- remove a click event handler from its "root" element

Therefore, if we are provided with an adapter that can do these things, we can reuse this code within any framework that wants to use it. Let's write our final `RGBSquareFoundation` class:

```javascript
class RGBSquareFoundation {
  /**
    * All of the MDL foundation classes have a static defaultAdapter getter property, which is
    * very similar to propTypes within react.
    */
  static get defaultAdapter() {
    return {
      addClass: (/* className: string */) => {},
      removeClass: (/* className: string */) => {},
      registerClickHandler: (/* handler: Function */) => {},
      deregisterClickHandler: (/* handler: Function */) => {}
    };
  }

  /** The constructor is given an adapter by its caller. */
  constructor(adapter) {
    /** We extend the adapter using our defaults so that it will always work. */
    this.adapter_ = Object.assign(RGBSquareFoundation.defaultAdapter, adapter);
    this.colorMods_  = ['r', 'g', 'b'];
    this.counter_ = -1; // no color
    this.clickHandler_ = () => this.update_();
  }

  /** initialization lifecycle method */
  init() {
    this.adapter_.registerClickHandler(this.clickHandler_);
  }

  /** destruction lifecycle method */
  destroy() {
    this.adapter_.deregisterClickHandler(this.clickHandler_);
  }  

  update_() {
    const oldClass = this.colorClass_(this.counter_);
    const newClass = this.colorClass_(++this.counter_);
    if (oldClass) {
      this.adapter_.removeClass(oldClass);
    }
    this.adapter_.addClass(newClass);
  }

  colorClass_(i) {
    if (i < 0) {
      return '';
    }
    const mod = this.colorMods_[i % this.colorMods_.length];
    return `rgb-square--${mod}`;
  }
}
```

So now, we have an implementation of `RGBSquare` which contains all of the functionality and an interface for operating on the host platform. The last step is to plug it in. In our original Vanilla JS host environment, here's what that would look like:

```javascript
class RGBSquare {
  constructor(root) {
    this.root_ = root;
    this.foundation_ = new RGBSquareFoundation({
      addClass: className => this.root_.classList.add(className),
      removeClass: className => this.root_.classList.remove(className),
      registerClickHandler: handler => this.root_.addEventListener('click', handler),
      deregisterClickHandler: handler => this.root_.removeEventListener('click', handler)
    });
    this.foundation_.init();
  }
}
```

You can see a working demo of this [here](http://codepen.io/traviskaufman/pen/zBQXzv?editors=0010).

Similarly, a react component wouldn't be much more difficult:

```javascript
// A *very crude* react component
class RGBSquare extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      classNames: []
    };
    this.foundation_ = new RGBSquareFoundation({
      addClass: className => this.setState(({classNames}) => ({
        classNames: classNames.concat([className])
      })),
      removeClass: className => this.setState(({classNames}) => ({
        classNames: classNames.filter(cn => cn !== className)
      })),
      registerClickHandler: handler => this.refs.root.addEventListener('click', handler),
      deregisterClickHandler: handler => this.refs.root.removeEventListener('click', handler)
    });
  }

  getInitialState() {
    return {classNames: []};
  }

  componentDidMount() {
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  render() {
    return (
      <div ref="root" className={['rgb-square'].concat(this.state.classNames).join(' ')}></div>
    );
  }
}
```

You can see a working example [here](http://codepen.io/traviskaufman/pen/yJWAom?editors=0010).

To sum it all up, here's a crude diagram of the architecture:

<img src="https://docs.google.com/drawings/d/1KFLa2q4C5SRXsCoCx87SlgE58MLuD9ExgzWKlgieEeQ/pub?w=960&amp;h=720">

Although this may seem unwieldy at first, since adapters are essentially interfaces it would be easy to reuse common code either through inheritance or composition.

I should also mention that **most of this will be opaque to end users.** We're shipping MDLv2 with vanilla components that are built on top of the foundations, and can be used without requiring any knowledge of foundations, adapters, etc. We designed foundations/adapters with _framework/library authors in mind_, because we're aware of the pain they went through adapting MDLv1 for their frameworks and want to ensure a more ergonomic experience this time around. It's complicated for sure, but the state of the web right now is complicated, and thus mandates the complexity. In the future, as specifications like [Custom Elements](https://developers.google.com/web/fundamentals/primers/customelements/) begin to stabilize and gain adoption, we can start to consider those solutions instead.

## Resources

- The [mdl-checkbox](https://github.com/google/material-design-lite/tree/master/packages/mdl-checkbox) component is an example of a complex UI component which requires foundations and adapters. We also have a [react example](https://github.com/google/material-design-lite/tree/master/examples/react) where we create a React component using the foundation class.
- Our [mdl-base](https://github.com/google/material-design-lite/tree/master/packages/mdl-base) package contains the core Foundation and Component classes which all of our other MDL components derive from. If you're interested in contributing _directly_ to MDL, it's worth a read!
- As per usual our [contributing docs](https://github.com/google/material-design-lite/blob/master/CONTRIBUTING.md) contain information about how to actually develop MDL v2.
