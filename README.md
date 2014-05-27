# Web Starter Kit

> A starting point for multi-device development

## Overview

Web Starter Kit is a starter kit for multi-screen web development, encompassing opinionated recommendations on boilerplate and tooling for building an experience that works great across multiple devices.

The project aims to align with the mobile web recommendations made by Google's [Web Fundamentals](developers.google.com/web/fundamentals) and will include UX pattern samples and best practices that fall in line with some opinions we have about how multi-screen webapps should be built.

## Features

* Mobile-optimized HTML Boilerplate
* Sexy minimalist layout and style guide
* Gulp build tooling *(Optional)*
  * LiveReload
  * Cross-device synchronization of clicks, scrolls, navigation, form filling.
  * Image optimization
  * JavaScript minification and optimization
  * CSS optimization
  * PageSpeed integration

## Quickstart

You can use Web Starter Kit just by cloning this repository and building on what we include in the `app` directory. You will want to checkout `index.html` (the default starting point, slide-out menu), 'alt-layout.html' (if you prefer a horizontal nav) or `basic.html` (no layout).

If you would like to use the optional tooling we provide:

```
# Run to install the dependencies needed (requires Node)
$ sudo npm install 

# Build the current project
$ gulp

# Watch files / LiveReload / Cross-device sync
$ gulp watch

# Run the deployed version of your app against PageSpeed
$ gulp pagespeed
```

## What performance requirements does Web Starter Kit have?

Web Starter Kit will be striving to ship with a 60fps experience and a PageSpeed score of 100 out of the box.

We intend to give developers a high performance starting point for multi-device development, paying close attention to this requirement when deciding on the libraries and tools we prescribe. We will be employing use of PageSpeed Insights and the Chromium Telemetry tools for helping us stay on top of this.


