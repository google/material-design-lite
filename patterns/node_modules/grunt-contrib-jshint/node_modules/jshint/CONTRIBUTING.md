How to contribute
=================

The best way to make sure your issue is addressed is to submit a patch. We accept
patches through all mediums: pull requests, email, issue comment, tweet with a link
to a snippet, graffiti outside of Anton's apartment, etc.

However, before sending a patch, please make sure that the following applies:

* Your commit message links to that issue.
* Your commit message is very descriptive ([example](https://github.com/jshint/jshint/commit/5751c5ed249b7a035758a3ae876cfa1a360fd144)).
* Your patch doesn't have useless merge commits.
* Your coding style is similar to ours (see below).
* Your patch is 100% tested. We don't accept any test regressions.
* All tests and lint checks pass (`node make.js test` and `node make.js lint`).
* You understand that we're super grateful for your patch.

Coding Style
------------

This section describes our coding style guide. You might not agree with it and that's
fine but if you're going to send us patches treat this guide as a law.

### Our main rule is simple:

> All code in any code-base should look like a single person typed it, no matter how
many people contributed. —[idiomatic.js](https://github.com/rwldrn/idiomatic.js/)

### Whitespace:

* We use hard tabs everywhere.
* [Smart tabs](http://www.emacswiki.org/SmartTabs) are okay.
* Use one space after `if`, `for`, `while`, etc.
* Use one space after `function` for anonymous functions but not for named functions:

```javascript
var a = function () {};
function a() {}
```

* Feel free to indent variable assignments or property definitions if it makes the code look better. But don't abuse that:

```javascript
// Good
var next = token.peak();
var prev = token.peak(-1);
var cur  = token.current;

var scope = {
  name:   "(global)",
  parent: parentScope,
  vars:   [],
  uses:   []
};

// Bad
var cur         = token.current;
var isSemicolon = cur.isPunctuator(";");
```

* Wrap multi-line comments with new lines on both sides.

### Variables

* Use one `var` per variable unless you don't assign any values to it (and it's short enough):

```javascript
var token = tokens.find(index);
var scope = scopes.current;
var next, prev, cur;
```

* Don't be overly descriptive with your variable names but don't abuse one-letter variables either. Find a sweet spot somewhere in between.

### Comments

* Use `//` for all comments.
* Comment everything that is not obvious.
* If you're adding a new check, write a comment describing why this check is important and what it checks for.

### Misc

* Always use strict mode.
* Always use strict comparisons: `===` and `!==`.
* Use semicolons.
* Don't use comma-first notation.
* Try not to chain stuff unless it **really** helps (e.g. in tests).
* Don't short-circuit expressions if you're not assigning the result:

```javascript
// Good
token = token || tokens.find(0);

// Bad
token.isPunctuator(";") && report.addWarning("W001");

// Good
if (token.isPunctuator(";"))
  report.addWarning("W001");
```

Today we use JSHint's `white:true` to enforce some of these rules. Eventually we'll switch to JSHint Next style enforcing component. But it's not ready yet.
