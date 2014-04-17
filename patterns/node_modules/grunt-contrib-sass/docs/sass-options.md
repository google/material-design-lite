# Options

## trace
Type: `Boolean`

Show a full traceback on error.

## unixNewlines
Type: `Boolean`

Force Unix newlines in written files.

## check
Type: `Boolean`

Just check syntax, don't evaluate.

## style
Type: `String`

Output style. Can be `nested` (default), `compact`, `compressed`, or `expanded`.

## precision
Type: `Number`

How many digits of precision to use when outputting decimal numbers. Defaults to 3.

## quiet
Type: `Boolean`

Silence warnings and status messages during compilation.

## compass
Type: `Boolean`

Make Compass imports available and load project configuration.

## debugInfo
Type: `Boolean`

Emit extra information in the generated CSS that can be used by the FireSass Firebug plugin.

## lineNumbers
Type: `Boolean`

Emit comments in the generated CSS indicating the corresponding source line.

## loadPath
Type: `String|Array`

Add a (or multiple) Sass import path.

## require
Type: `String|Array`

Require a (or multiple) Ruby library before running Sass.

## cacheLocation
Type: `String`

The path to put cached Sass files. Defaults to `.sass-cache`.

## noCache
Type: `Boolean`

Don't cache to sassc files.
