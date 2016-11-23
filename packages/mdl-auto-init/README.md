# MDL Auto Init

`mdl-auto-init` is a utility package that provides declarative, DOM-based method of initialization
for MDLv2 components on simple web sites. Note that for more advanced use-cases and complex sites,
manual instantiation of components will give you more flexibility. However, `mdl-auto-init` is great
for static websites, prototypes, and other use-cases where simplicity and convenience is most
appropriate.

## Installation

> NOTE: Installation via npm will be available post-alpha

## Usage

### Using as part of `material-design-lite`

If you are using mdl-auto-init as part of the [material-design-lite](../material-design-lite)
package, simply write the necessary DOM needed for a component, and attach a `data-mdl-auto-init`
attribute to the root element with its value set to the Component's class name. Then, after
writing the markup, simply insert a script tag that calls `mdl.autoInit()`.

```html
<div class="mdl-textfield" data-mdl-auto-init="MDLTextfield">
  <input class="mdl-textfield__input" type="text" id="input">
  <label for="input" class="mdl-textfield__label">Input Label</label>
</div>

<!-- at the bottom of the page -->
<script type="text/javascript">
  window.mdl.autoInit();
</script>
```

This will attach an [MDLTextfield](../mdl-textfield) instance to the root `<div>` element.

#### Accessing the component instance

When `mdl-auto-init` attaches a component to an element, it assign that instance to the element
using a property whose name is the value of `data-mdl-auto-init`. For example, given

```html
<div class="mdl-textfield" data-mdl-auto-init="MDLTextfield">
  <input class="mdl-textfield__input" type="text" id="input">
  <label for="input" class="mdl-textfield__label">Input Label</label>
</div>
```

Once `mdl.autoInit()` is called, you can access the component instance via an `MDLTextfield`
property on that element.

```js
document.querySelector('.mdl-textfield').MDLTextfield.disabled = true;
```

### Using as a standalone module

#### Registering Components

If you are using `mdl-auto-init` outside of `material-design-lite`, you must manually provide a
mapping between `data-mdl-auto-init` attribute values and the components which they map to. This can
be achieved via `mdlAutoInit.register`.

```js
import mdlAutoInit from 'mdl-auto-init';
import {MDLTextfield} from 'mdl-textfield';

mdlAutoInit.register('MDLTextfield', MDLTextfield);
```

`mdlAutoInit.register()` tells `mdl-auto-init` that when it comes across an element with a
`data-mdl-auto-init` attribute set to `"MDLTextfield"`, it should initialize an `MDLTextfield`
instance on that element. The `material-design-lite` package does this for all components for
convenience.

Also note that a component can be mapped to any string, not necessarily the name of its constructor.

```js
import mdlAutoInit from 'mdl-auto-init';
import {MDLTextfield} from 'mdl-textfield';

mdlAutoInit.register('My amazing text field!!!', MDLTextfield);
```

```html
<div class="mdl-textfield" data-mdl-auto-init="My amazing text field!!!">
  <!-- ... -->
</div>
<script>window.mdl.autoInit();</script>
```

### De-registering components

Any component can be deregistered by calling `mdlAutoInit.deregister` with the name used to register
the component.

```js
mdlAutoInit.deregister('MDLTextfield');
```

This will simply remove the name -> component mapping. It will _not_ affect any already-instantiated
components on the page.

To unregister all name -> component mappings, you can use `mdlAutoInit.deregisterAll()`.

## How `mdl-auto-init` works

`mdl-auto-init` maintains a registry object which maps string identifiers, or **names**, to
component constructors. When the default exported function - `mdlAutoInit()` - is called,
`mdl-auto-init` queries the DOM for all elements with a `data-mdl-auto-init` attribute. For each
element returned, the following steps are taken:

1. If the `data-mdl-auto-init` attribute does not have a value associated with it, throw an error
2. If the value of `data-mdl-auto-init` cannot be found in the registry, throw an error
3. If the element has an existing property whose name is the value of `data-mdl-auto-init`, it is
   assumed to have already been initialized. Therefore it is skipped, and a warning will be logged
   to the console (this behavior can be overridden).
4. Let `Ctor` be the component constructor associated with the given name in the register
5. Let `instance` be the result of calling `Ctor.attachTo()` and passing in the element as an
   argument.
6. Create a non-writable, non-enumerable property on the node whose name is the value of
   `data-mdl-auto-init` and whose value is `instance`.

### Initializing only a certain part of the page

By default, `mdl-auto-init` will query the entire document to figure out which components to
initialize. To override this behavior, you can pass in an optional `root` first argument specifying
the root node whose children will be queried for instantiation.

```html
<div id="mdl-section">
  <!-- MDL Components, etc. -->
</div>
<script>window.mdl.autoInit(document.getElementById('mdl-section'));</script>
```

In the above example, only elements within `<div id="mdl-section">` will be queried.

### Calling autoInit() multiple times

By default, `mdl-auto-init` only expects to be called once, at page-load time. However, there may be
certain scenarios where one may want to use `mdl-auto-init` and may still need to call it multiple
times, such as on a Wordpress site that contains an infinitely-scrolling list of new blog post
elements containing MDL components. `mdlAutoInit()` takes an optional second argument which is the
function used to warn users when a component is initialized multiple times. By default, this is just
`console.warn()`. However, to skip over already-initialized components without logging a
warning, you could simply pass in a nop.

```js
<script>window.mdl.autoInit(/* root */ document, () => {});</script>
```

This will suppress any warnings about already initialized elements.
