# Integrating MDLv2 into custom elements

[Custom Elements](https://developers.google.com/web/fundamentals/getting-started/primers/customelements) is an awesome new technology that allows web developers to author their
components such that consumers can use them just like they would use any other DOM element.

Our vanilla components can seamlessly interoperate with custom elements, and in fact have been
designed such that when custom elements are supported by all browsers, we can begin to replace our
vanilla components with them.

Below is a sketch of the code you'd need to wrap pretty much any of our components within a custom
element. Note that we use `MDLComponent` to denote any arbitrary MDLv2 component.

```js
import {MDLComponent} from 'mdl-component';

window.customElements.define('mdl-component', class extends HTMLElement {
  static get observedAttributes() {
    return ['attr1', 'attr2']
  }

  constructor() {
    super();
    this.mdlComponent = null;
  }

  connectedCallback() {
    this.classList.add('mdl-component');
    this.mdlComponent = new MDLComponent(this);
  }

  disconnectedCallback() {
    this.mdlComponent.destroy();
    this.mdlComponent = null;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.mdlComponent[name] = newValue;
  }
});
```

Let's go over the general concepts:

* The component's instance properties are mapped to the custom element's observed attributes.
* The component is initialized and destroyed according to the custom element's lifecycle methods. We
  use `connectedCallback` to initialize the component, passing it the instance of the custom
  element which the component will treat as its root node. We do this in `connectedCallback` rather
  than the constructor, because the vanilla components expect DOM elements to be attached to the
  DOM before being instantiated. This is so setup code that uses things like
  `getBoundingClientRect()` and `getComputedStyle()` work correctly. We null out the component
  within `disconnectedCallback` to mitigate all possible risks of cyclical leaks.
* The component listens to all observed attributes and updates the corresponding properties on the
  component to its new value. Properties can be dealt with in the exact same manner.
* Handling events works exactly the same way as with normal DOM nodes, since all MDLv2 vanilla
  components use custom events for emission.

We can now use this custom element just like we'd use any other element:

```html
<mdl-component attr1="foo" attr2="bar"></mdl-component>
```
