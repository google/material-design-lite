# matchdep [![Build Status](https://secure.travis-ci.org/tkellen/node-matchdep.png?branch=master)](http://travis-ci.org/tkellen/node-matchdep)

> Use [globule] to filter npm module dependencies by name.

## Examples

```js
var matchdep = require('matchdep');

// Filter dependencies (by autoloading nearest package.json)
matchdep.filter('mini*');

// Filter devDependencies (with config string indicating file to be required)
matchdep.filterDev('grunt-contrib-*', './package.json');

// Filter peerDependencies (with config string indicating file to be required)
matchdep.filterDev('foo-{bar,baz}', './some-other.json');

// Filter all dependencies (with explicit config provided)
matchdep.filterAll('*', require('./yet-another.json'));

// Filter all dependencies, exclude grunt (multiple matching patterns)
matchdep.filterAll(['*','!grunt']);
```

## Usage

```js
filter(pattern, config)
filterDev(pattern, config)
filterPeer(pattern, config)
filterAll(pattern, config)
```

### pattern
Type: `String|Array`
Default: 'none'

A [globule] compatible match pattern to filter dependencies.

### config
Type: `String` or `Object`
Default: Path to nearest package.json.

If config is a string, matchdep will attempt to require it.  If it is an object, it will be used directly.

## Release History

* 2013-10-09 - v0.3 - support multiple pattern matches using [globule]
* 2013-10-08 - v0.2 - refactor and support filtering peerDependencies
* 2012-11-27 - v0.1 - initial release


[globule]: https://github.com/cowboy/node-globule
