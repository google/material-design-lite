# Install

To take advantage of Web Starter Kit you need to:

1. Get a copy of the code.
2. Install the dependencies if you don't already have them.
3. Modify the application to your liking.
4. Deploy your production code.

## Getting the code

[Download](https://github.com/google/web-starter-kit/releases/latest) and extract WSK to where you want to work.

## Prerequisites

### [Node.js](https://nodejs.org)

Bring up a terminal and type `node --version`.
Node should respond with a version at or above 0.10.x.
If you require Node, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

### [Gulp](http://gulpjs.com)

Bring up a terminal and type `gulp --version`.
If Gulp is installed it should return a version number at or above 3.8.x.
If you need to install/upgrade Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

*This will install Gulp globally. Depending on your user account, you may need to gain elevated permissions using `sudo` (i.e `sudo npm install --global gulp`).*


### Local dependencies

Next, install the local dependencies Web Starter Kit requires:

```sh
$ npm install
```

That's it! You should now have everything needed to use the Web Starter Kit.

-

You may also want to get used to some of the [commands](commands.md) available.
