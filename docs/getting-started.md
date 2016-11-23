> NOTE: We have yet to publish our initial release to npm. However, once we do, the installation
instructions will work.

# Getting Started

This guide will help you get started using MDLv2 on your own sites and within your own projects.

> If you are interested in integrating MDLv2 into a framework, or building a component library for
your framework that wraps MDLv2, check out our [framework integration guide](./integrating-into-frameworks.md).

## MDL Quickstart: Building a simple greeting app

The best way to learn any new technology is to get your hands dirty and build something with it, so
that's what we'll do here! We'll be building a simple web page which lets you enter a first and/or
last name, and then greets you using your name. You can see a finished example [here](https://plnkr.co/edit/ahd84pIgOF7OTKgavvPP?p=preview).

As you go through this guide, we encourage you to code along with it. By the end, you will have
learned the fundamentals incorporating MDLv2 into simple sites, as well as worked with some of the
components we have to offer.

### Setting up the project

First, let's set up our project. Throughout this guide, we'll assume you have a recent version of
[NodeJS](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) available on your `$PATH`. You can get the latest NodeJS download [here](https://nodejs.org/en/download/), or use a
tool like [nvm](https://github.com/creationix/nvm) to install it.

Once node is installed, create a directory for the site and install MDLv2 inside of it.

```
mkdir greeting-app
cd greeting-app
npm init -y # adds a package.json file into the directory
npm install --save material-design-lite
```

This will install MDLv2 into the `node_modules` folder inside of the `greeting-app` directory.

While we're at it, let's also install [live-server](http://tapiov.net/live-server/) so we can
develop our greeting app using a local server, and have it automatically reload when we make
changes.

```
npm install --global live-server
```

The `--global` flag tells npm to install the package globally, so that the `live-server` program
will be available on your path.

### Creating the skeleton index.html file

Now that we have a sane environment set up, let's create a simple `index.html` file and include
the assets needed for MDLv2. Put the following within `index.html` in the `greeting-app` directory:

```html
<!DOCTYPE html>
<html class="mdl-typography">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Greeting App</title>
    <link rel="stylesheet" href="/node_modules/material-design-lite/dist/material-design-lite.css">
  </head>
  <body>
    <h1 class="mdl-typography--display1">Hello, World!</h1>
    <button type="button" class="mdl-button mdl-button--raised mdl-button--primary">
      Press Me
    </button>
  </body>
</html>
```

To view the page, run `live-server` within the `greeting-app` directory. This will open up your
browser to the URL which is serving our `index.html` file. You can leave `live-server` running for
the duration of this guide.

Let's take a look at a few aspects of the above HTML.

* **No javascript necessary (yet)** - Because we aren't using any dynamic components, we only need
  to include the MDLv2 CSS so that we can apply the proper CSS classes to our elements. With MDLv2,
  javascript is only necessary for dynamic components whose UI needs to be made aware of events
  happening on the page which can't be hooked into using CSS. As we develop our greeting app, we'll
  add in the necessary javascript.
* **No automatic DOM rendering** - For all components, MDL does not render _any_ DOM elements
  itself. MDLv2 is similar to [Bootsrap](http://getbootstrap.com/) in this respect; it expects rhe end user to render the DOM
  and provide the proper CSS classes. This avoids a litany of problems for integrating MDL into
  complex applications.
* **Elements are not natively styled** - Notice how above, we give the `<html>` element a class of
  `mdl-typography`, the `<h1>` element a class of `mdl-typography--display1`, and the button a class
  of `mdl-button`, along with multiple _modifier classes_. We _never_ make any assumptions about
  which elements are being used for our components, instead relying on CSS classes for maximum
  flexibility. Our CSS class names follow a slightly modified version of the [BEM](http://getbem.com/) system.

### Adding in javascript for dynamic components

Now that we've gotten the gist of MDLv2, let's build our greeting app. The app consists of
two input fields for a first and last name, as well as a submit button. Because Material Design
text input fields contain a lot of functionality, we must include javascript to provide a
full-fidelity experience for them. Furthermore, it would be nice if our submit button featured a
ripple effect. We can include that using javascript as well.

> Note that we currently have an [issue out](https://github.com/google/material-design-lite/issues/4614) to integrate ripples directly into buttons.

Replace the contents of the `<body>` tag in `index.html` with the following:

```html
<main>
  <h1 class="mdl-typography--display1">Tell us about yourself!</h1>

  <form action="#" id="greeting-form">
    <div>
      <div class="mdl-form-field">
        <div class="mdl-textfield" data-mdl-auto-init="MDLTextfield">
          <input id="firstname" type="text" class="mdl-textfield__input">
          <label for="firstname" class="mdl-textfield__label">
            First Name
          </label>
        </div>
      </div>

      <div class="mdl-form-field">
        <div class="mdl-textfield" data-mdl-auto-init="MDLTextfield">
          <input id="lastname" type="text" class="mdl-textfield__input">
          <label for="lastname" class="mdl-textfield__label">
            Last Name
          </label>
        </div>
      </div>
    </div>

    <button type="submit"
            class="mdl-button
                   mdl-button--raised
                   mdl-button--primary
                   mdl-ripple-surface"
            data-mdl-auto-init="MDLRipple">
      Print Greeting
    </button>
  </form>

  <!-- The p element below is where we'll eventually output our greeting -->
  <p class="mdl-typography--headline" id="greeting"></p>
</main>

<script src="/node_modules/material-design-lite/dist/material-design-lite.js"></script>
<script>window.mdl.autoInit();</script>
```

If you save the file return to your browser, you'll now see that we have two very nicely styled
form fields, as well as a button that - when pressed - displays a material ink ripple, albeit a
very subtle one. We'll be taking care of that shortly. For now, let's go back and take a look at
what we just wrote.

The two main things to notice are the `data-mdl-auto-init` attributes, as well as the final script
tag, which simply calls `window.mdl.autoInit()`. Unlike MDLv1, **MDLv2 does not
instantiate any components automatically.** This avoids the headaches involved with hacking around
lifecycle handlers that we saw with MDLv1 when trying to use it within more complex sites.

When `mdl.autoInit()` is called, it looks for all elements with a `data-mdl-auto-init` attribute,
and attaches the MDL JS Component with the given class name to that element (the actual
mechanics are a bit more complicated, but for now this is essentially all you need to understand about
what it's doing). So when it sees `MDLTextfield`, it instantiates a [MDLTextfield](../packages/mdl-textfield) instance
to the corresponding elements. It does the same thing for the button, attaching a [MDLRipple](../packages/mdl-ripple)
instance to the element.

It is worth noting that `mdl.autoInit` is provided _purely_ as a convenience function, and is not
required to actually use the components. It is, however, the simplest way to get up and running
quickly, and recommended for static sites that use the comprehensive `material-design-lite` library.
Speaking of which, this is a great time to talk about a fundamental aspect of MDLv2:

#### All components are modular

Although when we initially set up this project we installed the `material-design-lite` package, that
package is simply a thin wrapper around individual component packages, such as [mdl-typography](../packages/mdl-typography), [mdl-button](../packages/mdl-button), [mdl-textfield](../packages/mdl-textfield), and [mdl-ripple](../packages/mdl-ripple).
Even the `autoInit()` function [lives in its own package](../packages/mdl-auto-init), which the
`material-design-lite` package uses to register all of the individual components to their names used
within `data-mdl-auto-init`. Each component can be used as a standalone package, and can be mixed
and matched at will. This allows for custom builds requiring the minimum possible amount of CSS/JS
code. It also means that MDLv2 works extremely well with module loading systems and modern
front-end toolchains.

### Adding the business logic

Finally, let's add our (very simple) business logic to the bottom of the page, which intercepts the
form submission and uses the input field values to print out an appropriate greeting. Add the
following below the last `<script>` tag within the `<body>`:

```html
<script>
  document.getElementById('greeting-form').addEventListener('submit', function(evt) {
    evt.preventDefault();
    var firstname = evt.target.elements.firstname.value;
    var lastname = evt.target.elements.lastname.value;
    var greeting = 'Hello';
    if (firstname || lastname) {
      greeting += ', ';
      if (firstname && lastname) {
        greeting += firstname + ' ' + lastname;
      } else if (lastname) {
        greeting += 'Mx. ' + lastname;
      } else {
        greeting += firstname;
      }
    }
    greeting += '!';

    document.getElementById('greeting').textContent = greeting;
  });
</script>
```

When you save the file and the page reloads, you should be able to type your name into the form,
hit the button, and get a pleasant greeting :wave:

### Changing the Theme

You may have noticed that the button background, as well as the label and underline on focused text
input fields, defaults to the Indigo 500 (`#673AB7`) color from the [Material Design color palette](https://material.google.com/style/color.html#color-color-palette).
This is part of the default theme that ships with MDL; it uses Indigo 500 for a primary color, and
Pink A200 (`#FF4081`) for an accent color. Let's change the theme's primary color.

A common misconception when implementing Material Design is that the colors you use _must_ come from
the Material Palette. This is not true at all. The only defining guideline for color within Material
Design is that it has "bold hues juxtaposed with muted environments, deep shadows, and bright
highlights". Let's change our theme's primary color to `#0E4EAD`, the "Afternoon_Skyblue" color from
the [Deep_Skyblues Colourlovers Palette](http://www.colourlovers.com/palette/334208/Deep_Skyblues).

The easiest way to change the theme of an MDLv2 application is via [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables). Simply add the
following to the `<head>` tag of `index.html`:

```html
<style>
  :root {
    --mdl-theme-primary: #0e4ead;
  }
</style>
```

If you are using any modern browser besides Edge (which is currently [working on it](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/csscustompropertiesakacssvariables/)), you'll see that the button background as well as the focused underline and label on text
fields are now a nice, dark shade of blue.

> Note that using CSS Variables is just one way of theming using MDLv2. Check out our
[theming documentation](./theming.md) _(coming soon!)_ for more info.

### Finishing Touches: Adding some custom styles

Every site is different, and we cannot hope to build a user interface library that
anticipates every design choice a user may want. Because MDLv2 uses plain old CSS, it is
trivial to customize and modify its styles to your liking. Let's change the ripple color to be a
more opaque shade of white, as well as add some auxiliary styles to bump up the vertical spacing
between the form fields and the submit button. Add the following to the `<style>` tag within
`<head>`:

```css
.mdl-ripple-surface.mdl-ripple-upgraded.mdl-button--primary::before,
.mdl-ripple-surface.mdl-ripple-upgraded.mdl-button--primary::after {
  background-color: rgba(255, 255, 255, .2);
}

#greeting-form > button {
  margin-top: 8px;
}
```

Congrats! You've built your first MDLv2 app! In the process, you've learned the basics of MDL,
how to easily add components to a page, and how to customize and theme MDL to your liking.

## Next Steps

If you're looking to incorporate MDL Components into a framework like Angular or React, check our
[framework integration guide](./integrating-into-frameworks.md). You can also take a look at our
[examples](../examples) directory which contains examples integrating MDLv2 components into popular
front-end frameworks. It also shows how you can use our source ES2015 and SCSS files directly within
your own code, for maximum flexibility, modularity, and code size reduction.

If you'd like to contribute to
MDLv2 and build your own components, or extend one of ours to fit your own purposes, check out our
guide on [how to build a component](./how-to-build-a-component.md).
