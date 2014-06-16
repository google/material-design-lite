# Google Web Starter Kit

> A starting point for multi-device web development


## Overview

[Web Starter Kit](http://developers.google/com/web/starter-kit) is a starting point for multi-screen web development, encompassing opinionated recommendations on boilerplate and tooling for building an experience that works great across multiple devices.

The project aims to align with the mobile web recommendations made by Google's [Web Fundamentals](http://developers.google.com/web/fundamentals) and includes boilerplate, tooling and best practices that fall in line with how we think multi-screen webapps should be built.

## Features

* Mobile-optimized HTML boilerplate
* Sexy minimalist layout
* Visual component style guide
* [gulp.js](http://gulpjs.com) build tooling *(optional)*
  * LiveReload
  * Cross-device synchronization of clicks, scrolls, navigation, and form-filling
  * Image optimization
  * JavaScript minification and optimization
  * CSS optimization
  * HTML minification
  * PageSpeed performance reporting
  * CSS autoprefixing

## Quickstart

[Download](http://github.com/google/web-starter-kit/archive/master.zip) the kit or clone this repository and build on what we include in the `app` directory.

We provide 3 HTML starting points, from which you can choose:

- `index.html` - the default starting point, containing a slide-out menu,
- `alt-layout.html` - features a horizontal navigation menu, or
- `basic.html` - includes no layout.

If you would like to use the optional tooling we provide, make sure your system meets our [requirements](#requirements), then from your terminal:

```sh
# Install gulp.js globally. You will only need to to this once
$ npm install --global gulp

# Install the local dependencies from package.json
$ npm install

# Watch files / LiveReload / Cross-device sync as you develop
$ gulp watch

# Run the deployed version of your app against PageSpeed
$ gulp pagespeed

# Build the current project, ready for deployment
$ gulp
```

## Requirements

In addition to [Node](http://nodejs.org), [Ruby](https://www.ruby-lang.org/) and the [Sass gem](http://sass-lang.com/install) are also required.

## Web Performance

Web Starter Kit strives to give you a high performance starting point out of the box and we actively work on delivering the best [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) score and frame-rate possible.

## Browser Support

At present, we officially aim to support the following browsers:

* IE10, IE11, IE Mobile 10 
* FF 30, 31
* Chrome 34, 35
* Safari 7, 8
* Opera 23, 24
* iOS Safari 7, 8
* Opera Coast
* Android / Chrome 4.4, 4.4.3
* Blackberry 1.0

This is not to say that Web Starter Kit cannot be used in browsers older than those reflected, but merely that our focus will be on ensuring our layouts work great in the above.

## Inspiration

Web Starter Kit is inspired by [Mobile HTML5 Boilerplate](http://html5boilerplate.com/mobile/) and Yeoman's [generator-gulp-webapp](https://github.com/yeoman/generator-gulp-webapp), having taken input from contributors to both projects during development.

## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions, please see our [Contribution guide](https://github.com/google/web-starter-kit/wiki/Contributing) before submitting a patch.

## License

Apache 2.0  
Copyright 2014 Google Inc
