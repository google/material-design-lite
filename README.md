# [![Web Starter Kit](https://cloud.githubusercontent.com/assets/170270/3343034/ceef6e92-f899-11e3-96b9-5d9d69d97a00.png)](https://github.com/google/web-starter-kit/releases/latest)

## Overview

[Web Starter Kit](https://developers.google.com/web/starter-kit) is an opinionated boilerplate for web development. Tools for building a great experience [across many devices](https://google.github.io/web-starter-kit/hello-world/) and [performance oriented](#web-performance). Helping you to stay productive following the best practices outlined in Google's [Web Fundamentals](https://developers.google.com/web/fundamentals). A solid starting point for both professionals and newcomers to the industry.

[![](https://cloud.githubusercontent.com/assets/170270/3343033/ceee251e-f899-11e3-9dd9-e313cf2522ec.png)](https://developers.google.com/web/starter-kit/ 'Features')

## Quickstart

[Download](https://github.com/google/web-starter-kit/releases/latest) the kit or clone this repository and build on what is included in the `app` directory.

There are two HTML starting points, from which you can choose:

- `index.html` - (IE10+) the default starting point, containing layout and a slide-out menu
- `basic.html` - (IE8+) no layout, but still includes our minimal mobile best-practices

Be sure to look over the [installation docs](docs/install.md) to verify your environment is prepared to run WSK.
Once you have verified that your system can run WSK, check out the [commands](docs/commands.md) available to get started.

## Web Performance

Web Starter Kit strives to give you a high performance starting point out of the box and we actively work on delivering the best [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) score and frame-rate possible.

In terms of CSS, opting to just use the minimal layout (main.css, h5bp.css) weighs in at ~7KB before modifications are made. Opting to use the Style Guide styles (the default) will take this up to ~39KB. It is your choice which path makes the most sense for your project, however notes on excluding Style Guide styles are in our gulpfile.

## Browser Support

At present, we officially aim to support the following browsers:

* IE9, IE10, IE11, IE Mobile 10
* FF 30, 31
* Chrome 34, 35
* Safari 7, 8
* Opera 23, 24
* iOS Safari 7, 8
* Opera Coast
* Android / Chrome 4.4, 4.4.3
* BlackBerry 10

This is not to say that Web Starter Kit cannot be used in browsers older than those reflected, but merely that our focus will be on ensuring our layouts work great in the above.

## Web Starter Kit and [Bootstrap](http://getbootstrap.com) or other CSS libraries?

Web Starter Kit doesn't aim to compete with CSS libraries like Bootstrap, Foundation and Pure. These libraries provide an excellent solution for prototyping your initial project. The biggest challenge they present is it’s almost too easy to get stuck using their look and feel for the lifetime of your site. We think this leads to a poorer experience on the multi-screen web.

Web Starter Kit provides boilerplate styles & a visual style guide for projects, but encourages customising these to fit your own site. This may need a little more work, but the reality is that any serious project is going to have its own look and feel. We want you to feel comfortable changing the kit to suit your own needs.

If you wish to use Bootstrap or other CSS libraries in your Web Starter Kit project, you have the flexibility to do so.

## Troubleshooting

If you find yourself running into issues during installation or running the tools, please check our [Troubleshooting](https://github.com/google/web-starter-kit/wiki/Troubleshooting) guide and then open an [issue](https://github.com/google/web-starter-kit/issues). We would be happy to discuss how they can be solved.

## A Boilerplate-only Option

If you would prefer not to use any of our tooling, delete the following files from the project: `package.json`, `gulpfile.js`, `.jshintrc` and `.travis.yml`. You can now safely use the boilerplate with an alternative build-system or no build-system at all if you choose.

## Extras

Optional additions, such as web server configurations, can be found at [WSK Extras
repository](https://github.com/google/web-starter-kit-extras).

## Inspiration

Web Starter Kit is inspired by [Mobile HTML5 Boilerplate](http://html5boilerplate.com/mobile/) and Yeoman's [generator-gulp-webapp](https://github.com/yeoman/generator-gulp-webapp), having taken input from contributors to both projects during development. Our [FAQs](https://github.com/google/web-starter-kit/wiki/FAQ) attempt to answer commonly asked questions about the project.

## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions to Web Starter Kit, please see our [Contribution guide](CONTRIBUTING.md) before submitting a pull request. [Website](https://developers.google.com/web/starter-kit/) related issues should be filed on the [Web Fundamentals](https://github.com/google/WebFundamentals/issues/new) issue tracker.

## License

Apache 2.0  
Copyright 2014 Google Inc
