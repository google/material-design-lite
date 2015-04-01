# Material Design Lite

> A library of [Material Design](http://www.google.com/design/spec/material-design/introduction.html) components in CSS, JS and HTML

## Quick start

Four quick start options are available:

- [Download the latest release](https://github.com/google/material-design-lite/archive/master.zip).
- Clone the repo: `git clone https://github.com/google/material-design-lite.git`.
- Install with [Bower](http://bower.io): `bower install material-design-lite`.
- Install with [npm](https://www.npmjs.org): `npm install material-design-lite`.

### What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
├── css
│   ├── material.css
│   └── material.min.css
├── js
│   ├── material.js
│   ├── material.min.js
│   └── material.min.js.map
├── images
├── src
├── package.json
├── bower.json
├── gulpfile.js
├── LICENSE
├── README.md
```

We provide compiled CSS and JS (`material.*`), as well as compiled and minified CSS and JS (`material.min.*`). JS source maps (`material.*.map`) are available for use with certain browsers' developer tools. 

## Getting Started

### Download

Clone or [download](https://github.com/google/material-design-lite/archive/master.zip) this repository
and reference the following files in your project:

```html
<script src="js/material.min.js"></script>
<link rel="stylesheet" href="css/material.min.css">
```

You will want to include the entire package to ensure optional assets like images or fonts are correctly
included.

### npm

```
$ npm install --save material-design-lite
```

### bower

```
$ bower install --save material-design-lite
```


## Development

The sources (JS, Sass) and demo files for all components can be found in the `src` directory. To get started
modifying them, first install the necessary dependencies, from the root of the project:

```
$ npm install && npm install -g gulp
```

Next, run the following one-liner to preview the components:

```
$ gulp serve
```

Any changes made to files inside the `src` directory will cause the page to reload. This page can also be loaded
up on physical devices thanks to BrowserSync.

To build a production version of the components, run:

```
$ gulp
```

This will clean and update the `css`, `js` and `images` directories in the root of the project with minified and
concatenated versions of the component files. Namely, `css/material.min.css` and `js/material.min.js`.

## Browser Support

| IE8 | IE9 | IE10 | Chrome | Opera | Firefox | Safari | Chrome (Android) | Mobile Safari |
|-----|-----|------|--------|-------|---------|--------|------------------|---------------|
| B   | B   | A    | A      | A      | A       | A      | A                | A             |

A-grade browsers are fully supported. B-grade browsers will gracefully degrade to our CSS-only experience.

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, Material Design Lite is maintained under [the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up, but we'll adhere to those rules whenever possible.

## Feature requests

If you find MDL doesn't contain a particular component you think would be useful, please check the issue tracker in case work has already started on it. If not, you can request new component in the [following](https://github.com/google/material-design-lite/issues/92) thread. Please be sure to include justification for why you think the component should be implemented to help us with planning.

## In-development

Here, you can find early live previews of our work for testing or demo purposes.

* [Visual tests](http://google.github.io/material-design-lite/test/visual/) for components
* [Android.com](http://google.github.io/material-lite-samples/android-dot-com/) Material Design Lite demo
* [Theme customiser prototype](http://google.github.io/material-design-lite/customizer/customizer.html)

## License

Copyright Google, 2015. Licensed under an Apache-2 license.
