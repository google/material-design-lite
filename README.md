# Material Design Lite

> A library of [Material Design](www.google.com/design/spec/material-design/introduction.html) components in CSS, JS and HTML


## Getting Started

### Download

Clone or [download](https://github.com/google/material-design-lite/archive/master.zip) this repository
and reference the following files in your project:

```html
<script src="js/material.min.js">
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


## License

Copyright Google, 2015. Licensed under an Apache-2 license.
