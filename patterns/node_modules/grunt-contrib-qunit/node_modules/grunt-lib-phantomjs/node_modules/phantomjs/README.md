phantom
=======

An NPM wrapper for [PhantomJS](http://phantomjs.org/), headless webkit with JS API.

Building and Installing
-----------------------

```shell
npm install phantomjs
```

Or grab the source and

```shell
node ./install.js
```

What this is really doing is just grabbing a particular "blessed" (by
this module) version of Phantom. As new versions of Phantom are released
and vetted, this module will be updated accordingly.

The package has been set up to fetch and run Phantom for MacOS (darwin),
Linux based platforms (as identified by nodejs), and -- as of version 0.2.0 --
Windows (thanks to [Domenic Denicola](https://github.com/domenic)).  If you
spot any platform weirdnesses, let us know or send a patch.

Running
-------

```shell
bin/phantomjs [phantom arguments]
```

And npm will install a link to the binary in `node_modules/.bin` as
it is wont to do.

Running via node
----------------

The package exports a `path` string that contains the path to the
phantomjs binary/executable.

Below is an example of using this package via node.

```javascript
var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path

var childArgs = [
  path.join(__dirname, 'phantomjs-script.js'),
  'some other argument (passed to phantomjs script)'
]

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  // handle results
})

```

Versioning
----------

The NPM package version tracks the version of PhantomJS that will be installed,
with an additional build number that is used for revisions to the installer.

As such `1.8.0-1` will `1.8.0-2` will both install PhantomJs 1.8 but the latter
has newer changes to the installer.

A Note on PhantomJS
-------------------

PhantomJS is not a library for NodeJS.  It's a separate environment and code
written for node is unlikely to be compatible.  In particular PhantomJS does
not expose a Common JS package loader.

This is an _NPM wrapper_ and can be used to conveniently make Phantom available
It is not a Node JS wrapper.

I have had reasonable experiences writing standalone Phantom scripts which I
then drive from within a node program by spawning phantom in a child process.

Read the PhantomJS FAQ for more details: http://phantomjs.org/faq.html

### Linux Note

An extra note on Linux usage, from the PhantomJS download page:

 > This package is built on CentOS 5.8. It should run successfully on Lucid or
 > more modern systems (including other distributions). There is no requirement
 > to install Qt, WebKit, or any other libraries. It is however expected that
 > some base libraries necessary for rendering (FreeType, Fontconfig) and the
 > basic font files are available in the system.

Contributing
------------

Questions, comments, bug reports, and pull requests are all welcome.  Submit them at
[the project on GitHub](https://github.com/Obvious/phantomjs/).  If you haven't contributed to an
[Obvious](http://github.com/Obvious/) project before please head over to the
[Open Source Project](https://github.com/Obvious/open-source#note-to-external-contributors) and fill
out an OCLA (it should be pretty painless).

Bug reports that include steps-to-reproduce (including code) are the
best. Even better, make them in the form of pull requests.

Author
------

[Dan Pupius](https://github.com/dpup)
([personal website](http://pupius.co.uk)), supported by
[The Obvious Corporation](http://obvious.com/).

License
-------

Copyright 2012 [The Obvious Corporation](http://obvious.com/).

Licensed under the Apache License, Version 2.0.
See the top-level file `LICENSE.txt` and
(http://www.apache.org/licenses/LICENSE-2.0).
