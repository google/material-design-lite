# Options

## separator
Type: `String`
Default: `grunt.util.linefeed`

Concatenated files will be joined on this string. If you're post-processing concatenated JavaScript files with a minifier, you may need to use a semicolon `';'` as the separator.

## banner
Type: `String`
Default: empty string

This string will be prepended to the beginning of the concatenated output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

## footer
Type: `String`
Default: empty string

This string will be appended to the end of the concatenated output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

## stripBanners
Type: `Boolean` `Object`
Default: `false`

Strip JavaScript banner comments from source files.

* `false` - No comments are stripped.
* `true` - `/* ... */` block comments are stripped, but _NOT_ `/*! ... */` comments.
* `options` object:
  * By default, behaves as if `true` were specified.
  * `block` - If true, _all_ block comments are stripped.
  * `line` - If true, any contiguous _leading_ `//` line comments are stripped.

## process
Type: `Boolean` `Object`
Default: `false`

Process source files as [templates][] before concatenating.

* `false` - No processing will occur.
* `true` - Process source files using [grunt.template.process][] defaults.
* `options` object - Process source files using [grunt.template.process][], using the specified options.
* `function(src, filepath)` - Process source files using the given function, called once for each file. The returned value will be used as source code.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

  [templates]: https://github.com/gruntjs/grunt/wiki/grunt.template
  [grunt.template.process]: https://github.com/gruntjs/grunt/wiki/grunt.template#wiki-grunt-template-process
