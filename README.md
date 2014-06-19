# Google Web Starter Kit

> A starting point for multi-device web development


## Overview

[Web Starter Kit](http://developers.google.com/web/starter-kit) is a starting point for multi-screen web development. It encompassing opinionated recommendations on boilerplate and tooling for building an experience that works great across multiple devices. We help you stay aligned with the best practices outlined in Google's [Web Fundamentals](http://developers.google.com/web/fundamentals).

## Features

* Mobile-optimized HTML boilerplate
* Responsive multi-device layout
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

We provide 2 HTML starting points, from which you can choose:

- `index.html` - the default starting point, containing layout and a slide-out menu
- `basic.html` - includes no layout.

## Tooling

If you would like to use the optional tooling we provide, make sure your system has [Node](http://nodejs.org), [Ruby](https://www.ruby-lang.org/), [Gulp](http://gulpjs.com) and the [Sass gem](http://sass-lang.com/install) installed.

### Node

Let's check to see if you already have Node installed. Bring up a terminal and type `node -v`. If Node responds, and if it shows a version at or above v0.10.x, proceed to checking if you have Ruby installed too. If you require Node, go to [NodeJS.org](http://nodejs.org/) and click on the big green Install button.

### Ruby

Bring up a terminal and type `ruby -v`. If Ruby responds, and if it shows a version number at or above 1.8.7 then type `gem --version`. If you don't see any errors, proceed to installing the Sass gem. If you require Ruby, it can be installed from the [Ruby downloads](https://www.ruby-lang.org/en/downloads/) page.

### Sass gem

Bring up a terminal and type `sass -v`. If Sass is installed it should return a version number at or above 3.3.x. If you don't see any errors, proceed to the Gulp installation. If you need to install Sass, see the command-line instructions on the [Sass installation](http://sass-lang.com/install) page.

### Gulp

Bring up a terminal and type `gulp -v`. If Gulp is installed it should return a version number at or above 3.5.x. If you don't see any errors, proceed to the Gulp commands section. If you need to install Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

This will install Gulp globally. Depending on your user account, you may need to gain elevated permissions using `sudo` (i.e `sudo npm install --global gulp`). Next, install the local dependencies Web Starter Kit requires:

```sh
$ npm install
```

That's it! You should now have everything needed to use the Gulp tools in Web Starter Kit.

### Gulp Commands

You can now use Gulp with the following commands to stay productive during development:

#### Watch For Changes & Automatically Refresh Across Devices

```sh
$ gulp serve
```

This outputs an IP address you can use to locally test and another that can be used on devices connected to your network.

### Build & Optimize

```sh
$ gulp
```

Build and optimize the current project, ready for deployment. This includes linting as well as image, script, stylesheet and HTML optimization and minification.

#### Performance Insights

```sh
$ gulp pagespeed
```

Runs the deployed (public) version of your site against the [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) API to help you stay on top of where you can improve.

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

## Troubleshooting

If you find yourself running into issues during installation or running the tools, please check our [Troubleshooting](https://github.com/google/web-starter-kit) guide and then open an [issue](https://github.com/google/web-starter-kit/issues). We would be happy to discuss how they can be solved.

## Inspiration

Web Starter Kit is inspired by [Mobile HTML5 Boilerplate](http://html5boilerplate.com/mobile/) and Yeoman's [generator-gulp-webapp](https://github.com/yeoman/generator-gulp-webapp), having taken input from contributors to both projects during development.

## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions, please see our [Contribution guide](https://github.com/google/web-starter-kit/wiki/Contributing) before submitting a patch.

## License

Apache 2.0
Copyright 2014 Google Inc
