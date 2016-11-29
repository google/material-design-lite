# Integrating MDLv2 into frameworks

MDLv2 was designed to be integrated as easily as possible into any and all web frameworks. This
document will walk you through strategies for integrating components into various types of
frameworks.

> NOTE: If you are interested in using MDLv2 components with custom elements, check out
> our [Integrating into custom elements](./integrating-into-custom-elements.md) guide.

## Examples

Our [examples](../examples) directory contains sample applications built in various frameworks,
such as [react](../examples/react) and [angular2](../examples/angular2) that show how to wrap our
components. If there's an example framework you'd like to see, or if you're a framework author who
wants to provide an example, please consider letting us know and we'll work with you to have it
contributed!

## Approaches

There are two approaches you can take for integrating our components into frameworks: the **simple**
approach and the **advanced** approach. Both have their benefits and drawbacks, and are explained
below.

### The Simple Approach: Wrapping MDLv2 vanilla components.

The easiest way to integrate MDLv2 into frameworks is to use our vanilla components directly. This
works well for frameworks which assume they will be executed within the context of a browser, such
as [angular v1](https://angularjs.org), [backbone.js](http://backbonejs.org/), or even things such as [jQuery plugins](https://learn.jquery.com/plugins/basic-plugin-creation/).

The simple approach can be outlined as follows:

1. Include the Component's CSS on the page any way you wish
2. Create a **wrapper component** for your framework of choice, and add a property which will be
   set to the value of the MDLv2 Component. We'll call this `mdlComponent`.
3. When the wrapper component is **initialized** (e.g. it is instantiated and attached to the DOM),
   _instantiate the MDLv2 component with a root element, and assign it to the `mdlComponent`
   property_.
4. When the wrapper component is **destroyed** (e.g. it is unbound and detached from the DOM), call
   `mdlComponent.destroy()` to clean up the MDLv2 component.

This general approach will work for almost all basic use-cases. For an example of this approach,
check out [this plunk](https://plnkr.co/edit/b4v160c186ErrPG5vNza?p=preview) which
shows how to wrap our textfield within an angular v1 component, as well as our button (with a
ripple) within an attribute directive.

### The Advanced Approach: Using foundations and adapters

Many modern front-end libraries/frameworks, such as react and angular2, wind up targeting more than
just a web browser. For these frameworks - and for some highly advanced application architectures -
a more robust approach is required. We provide foundations and adapters to accommodate this use
case.

> If you are interested in wrapping our components using foundations/adapters, you should first read
> through our [architecture overview](./architecture.md) in order to familiarize yourself with the
> general concepts behind them.

Every component comes with a complementary foundation class, which is usually called
`MDLComponentFoundation`, where `MDLComponent` is the name of a component. For example, we have an
[MDLSimpleMenuFoundation](../packages/mdl-menu/simple/foundation.js) that is used by our
[MDLSimpleMenu](../packages/mdl-menu/simple/index.js) component, and which are both exported
publicly.

In order to implement a component via a foundation, take the following steps:

1. Include the component's CSS on the page any way you wish
2. Add an instance property to your component which will be set to the proper foundation class.
   We'll calls this `mdlFoundation`.
3. Instantiate a foundation class, passing it a properly configured adapter as an argument
4. When your component is initialized, call `mdlFoundation.init()`
5. When your component is destroyed, call `mdlFoundation.destroy()`

Because of the nature of our components, some of the adapter APIs can be quite complex. However, we
are working as hard as we can to make writing adapters as easy and predictable as possible:

- Adapters are strictly versioned: _any_ change to an adapter interface - associative or not - is
  considered breaking and will cause a major version update of the component.
- Every adapter interface is thoroughly documented within each component's README
- Most adapter methods are one-liners, and for those that aren't, we provide `util` objects which
  implement those methods.
- We try and provide guidance on different ways to implement certain adapter methods that may seem
  ambiguous
- We plan on creating Type Definitions for our adapters in the future so that TypeScript users can
  validate that their interface conforms correctly to the adapter's specification.

Our [examples](../examples) directory contains sample code for various frameworks showing how
adapters can be implemented. We encourage you to take a look through those applications to get a
sense of how you might build your own.

> Please file an issue with us if there are certain snags you've ran into trying to implement an
  adapter, or if you feel that we can provide better guidance on a particular problem. This is
  definitely something we want to know about.
