# Material Design Lite

[![GitHub version](https://badge.fury.io/gh/google%2Fmaterial-design-lite.svg)](https://badge.fury.io/gh/google%2Fmaterial-design-lite)
[![npm version](https://badge.fury.io/js/material-design-lite.svg)](https://badge.fury.io/js/material-design-lite)
[![Test](https://github.com/rodydavis/material-design-lite/actions/workflows/test.yml/badge.svg)](https://github.com/rodydavis/material-design-lite/actions/workflows/test.yml)
[![Demo](https://github.com/rodydavis/material-design-lite/actions/workflows/demo.yml/badge.svg)](https://github.com/rodydavis/material-design-lite/actions/workflows/demo.yml)

> An implementation of [Material Design](https://m3.material.io/)
> components in vanilla CSS, and HTML.

Material Design Lite (MDL) lets you add a Material Design look and feel to your
static content websites. It doesn't rely on any JavaScript frameworks or
libraries. Optimized for cross-device use, gracefully degrades in older
browsers, and offers an experience that is accessible from the get-go.

![](/docs/images/components-1.png)
![](/docs/images/components-2.png)
![](/docs/images/components-3.png)

### Limited support

Material Design Lite is now in community support, with development having moved to the
[Material Components for the web](https://github.com/material-components/material-components-web) repository.

## Use MDL on your site?

**This document is targeted at developers that will contribute to or compile
MDL. If you are looking to use MDL on your website or web app please head to
[getmdl.io](http://getmdl.io).**

## Browser Support

| Chrome | Opera | Firefox | Safari | Chrome (Android) | Mobile Safari |
|--------|-------|---------|--------|------------------|---------------|
| A      | A     | A       | A      | A                | A             |

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
> production. Use a tagged state of the repository, npm, or bower for stability!

## Feature requests

MDL is currently in limited support mode, with no further development taking place by the core team.
We are happy to accept and review pull requests for new functionality, however, as long as there are no breaking
changes.

## Want to contribute?

If you found a bug, have any questions or want to contribute. Follow our
[guidelines](https://github.com/google/material-design-lite/blob/mdl-1.x/CONTRIBUTING.md),
and help improve the Material Design Lite. For more information visit our
[wiki](https://github.com/google/material-design-lite/wiki).

Please use the default branch, `mdl-3.x`.

The documentation site is built using [Astro](https://github.com/withastro/astro).

Web components for the documentation site are built with [Lit](https://lit.dev/).

The CSS is bundled using [PostCSS](https://postcss.org/).

The components are tested with [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/).

## Looking for the old version?

The old version of MDL is available on the `mdl-1.x` branch. It is no longer
actively developed, but we will continue to accept pull requests for critical
bugs and security issues.

## License

© Google, 2015. Licensed under an
[Apache-2](https://github.com/google/material-design-lite/blob/master/LICENSE)
license.
