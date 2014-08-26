# Installation

To take advantage of Web Starter Kit you need to:
1. Install the dependencies if you don't already have them.
1. Get a copy of the code.
1. Modify the application to your liking.
1. Deploy your production code.

## Dependencies

The dependencies are:
* [Node.js](http://nodejs.org)
* [Ruby](https://www.ruby-lang.org/)
* [gulp.js](http://gulpjs.com)
* [Sass](http://sass-lang.com/install)

### Node

Bring up a terminal and type `node --version`.
If Node responds with a version at or above v0.10.x then check for a [Ruby](#ruby) installation.
If you require Node, go to [nodejs.org](http://nodejs.org/) and click on the big green Install button.

### Ruby

Bring up a terminal and type `ruby --version`.
If Ruby responds with a version number at or above 1.8.7 then type `gem --version`.
If you don't see any errors then you may proceed looking for [Sass](#sass).
If you require Ruby, it can be installed from the [Ruby downloads](https://www.ruby-lang.org/en/downloads/) page.

### Sass

Make sure you have [Ruby](#ruby) installed before proceeding.
Bring up a terminal and type `sass --version`.
If Sass is installed it should return a version number at or above 3.3.x.
If you don't see any errors, proceed to check for [gulp](#gulp).
If you need to install Sass, see the command-line instructions on the [Sass installation](http://sass-lang.com/install) page.

### Gulp

Bring up a terminal and type `gulp --version`.
If Gulp is installed it should return a version number at or above 3.5.x.
If you need to install Gulp, open up a terminal and type in the following:

```sh
$ npm install --global gulp
```

This will install Gulp globally. Depending on your user account, you may need to gain elevated permissions using `sudo` (i.e `sudo npm install --global gulp`). Next, install the local dependencies Web Starter Kit requires:

```sh
$ sudo npm install
```

That's it! You should now have everything needed to use the Web Starter Kit.

# Getting the code

Once you have all of the dependencies installed, you only need to get the code.
[Download](https://github.com/google/web-starter-kit/archive/v0.4.0.zip) a zip of version 0.4.0.
Extract the files where you want to work from.
Then start building awesome things!

You may also want to get used to some of the [commands](commands.md) available.