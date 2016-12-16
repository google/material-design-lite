# Material Design Lite

[![GitHub version](https://badge.fury.io/gh/google%2Fmaterial-design-lite.svg)](https://badge.fury.io/gh/google%2Fmaterial-design-lite)
[![npm version](https://badge.fury.io/js/material-design-lite.svg)](https://badge.fury.io/js/material-design-lite)
[![Bower version](https://badge.fury.io/bo/material-design-lite.svg)](https://badge.fury.io/bo/material-design-lite)
[![Gitter version](https://img.shields.io/gitter/room/gitterHQ/gitter.svg)](https://gitter.im/google/material-design-lite)
[![Dependency Status](https://david-dm.org/google/material-design-lite.svg)](https://david-dm.org/google/material-design-lite)

> An implementation of [Material Design](http://www.google.com/design/spec/material-design/introduction.html)
components in vanilla CSS, JS, and HTML.

Material Design Lite (MDL) lets you add a Material Design look and feel to your
static content websites. It doesn't rely on any JavaScript frameworks or
libraries. Optimized for cross-device use, gracefully degrades in older
browsers, and offers an experience that is accessible from the get-go.

> ### Limited support

> Material Design Lite is now in limited support, with development having moved to the
> [Material Components for the web](https://github.com/material-components/material-components-web) repository.

> No further development is taking place in MDL by the core team, but we are happy to review PRs, fix critical bugs and
> push out new releases. No breaking changes will be accepted.

## Use MDL on your site?

**This document is targeted at developers that will contribute to or compile
MDL. If you are looking to use MDL on your website or web app please head to
[getmdl.io](http://getmdl.io).**

## Browser Support


| IE9 | IE10 | IE11 | Chrome | Opera | Firefox | Safari | Chrome (Android) | Mobile Safari |
|-----|------|------|--------|-------|---------|--------|------------------|---------------|
| B   | A    | A    | A      | A     | A       | A      | A                | A             |

A-grade browsers are fully supported. B-grade browsers will gracefully degrade
to our CSS-only experience.

### Download / Clone

Clone the repo using Git:

```bash
git clone https://github.com/google/material-design-lite.git
```

Alternatively you can [download](https://github.com/google/material-design-lite/archive/master.zip)
this repository.

Windows users, if you have trouble compiling due to line endings then make sure
you configure git to checkout the repository with `lf` (unix) line endings. This
can be achieved by setting `core.eol`.

```bash
git config core.eol lf
git config core.autocrlf input
git rm --cached -r .
git reset --hard
```

> Remember, the master branch is considered unstable. Do not use this in
production. Use a tagged state of the repository, npm, or bower for stability!

## Feature requests

MDL is currently in limited support mode, with no further development taking place by the core team.
We are happy to accept and review pull requests for new functionality, however, as long as there are no breaking
changes.

## Want to contribute?

If you found a bug, have any questions or want to contribute. Follow our
[guidelines](https://github.com/google/material-design-lite/blob/master/CONTRIBUTING.md),
and help improve the Material Design Lite. For more information visit our
[wiki](https://github.com/google/material-design-lite/wiki).

Please use the default branch, `mdl-1.x`.

## License

© Google, 2015. Licensed under an
[Apache-2](https://github.com/google/material-design-lite/blob/master/LICENSE)
license.
