# Contributing to Material Design Lite

We'd love for you to contribute to our source code and to make Material Design Lite even better than it is today! Here are the guidelines we'd like you to follow:


- [Code of Conduct](#code-of-conduct)
- [Development Process](#development-process)
  - [Setting up your development environment](#setting-up-your-development-environment)
  - [Building Components](#building-components)
  - [Running the development server](#running-the-development-server)
  - [Building MDL](#building-mdl)
  - [Linting / Testing / Coverage Enforcement](#linting--testing--coverage-enforcement)
    - [Running Tests across browsers](#running-tests-across-browsers)
  - [Coding Style](#coding-style)
  - [Signing the CLA](#signing-the-cla)
  - [Submitting Pull Requests](#submitting-pull-requests)
- [Questions / Problems](#questions--problems)
- [Issues / Bugs](#issues--bugs)
- ["What's the core team up to?"](#whats-the-core-team-up-to)

## Code of Conduct

As contributors and maintainers of the Material Design Lite project, we pledge to respect everyone who contributes by posting issues, updating documentation, submitting pull requests, providing feedback in comments, and any other activities.

Communication through any of Material Design Lite's channels (GitHub, StackOverflow, Google+, Twitter, etc.) must be constructive and never resort to personal attacks, trolling, public or private harassment, insults, or other unprofessional conduct.

We promise to extend courtesy and respect to everyone involved in this project regardless of gender, gender identity, sexual orientation, disability, age, race, ethnicity, religion, or level of experience. We expect anyone contributing to the Material Design Lite project to do the same.

If any member of the community violates this code of conduct, the maintainers of the Material Design Lite project may take action, removing issues, comments, and PRs or blocking accounts as deemed appropriate.

If you are subject to or witness unacceptable behavior, or have any other concerns, please drop us a line at sgomes@google.com.

## Development Process

> NOTE: As we are still in **pre-alpha** for v2, this section may be incomplete, in flux, and/or lacking some info. We hope to stabilize it by the time we reach alpha. If you have additional follow-up questions about our development process or find something confusing / ambiguous, reach out to us on [gitter](https://gitter.im/google/material-design-lite) and we may be able to help.

We strive to make developing Material Design Lite as frictionless as possible, both for ourselves and for our community. This section should get you up and running working on the Material Design Lite codebase. Before beginning development, you may want to read through our brief [v2 developer guide](https://github.com/google/material-design-lite/blob/master/docs/DEVELOPER.md) to get a better understanding of our overall architecture.

### Setting up your development environment

You'll need a recent version of [nodejs](https://nodejs.org/en/) to work on MDL. We [test our builds](https://travis-ci.org/google/material-design-lite) using both the latest and LTS node versions, so use of one of those is recommended. You can use [nvm](https://github.com/creationix/nvm) to easily install and manage different versions of node on your system.

Once node is installed, simply clone our repo (or your fork of it) and run `npm install`

```
git clone git@github.com:google/material-design-lite.git  # or a path to your fork
cd material-design-lite && npm i
```

### Building Components

Each component requires the following items in order to be complete:

- A **foundation class** which is integrated into actual components
- A **component class** using vanilla JS + SCSS
- A **README.md** in its subdir which contains developer documentation on the component, including usage.
- A **set of unit tests** within `test/unit/` with adequate coverage (which we enforce automatically).
- A **demo page** within `demos/` that shows example usage of the component.

### Running the development server

```
npm run dev
open http://localhost:8080
```

`npm run dev` runs a [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) instance that uses `demos/` as its content base. This should aid you in initial development of a component. It's served on port 8080.

### Building MDL

```
npm run build # Builds an unminified version of MDL within build/
npm run build:min # Same as above, but enables minification
npm run dist # Cleans out build/ and runs both of the above commands sequentially
```

### Linting / Testing / Coverage Enforcement

```
npm run lint:js # Lints javascript using eslint
npm run lint:css # Lints (S)CSS using stylelint
npm run lint # Runs both of the above commands in parallel

npm run fix:js # Runs eslint with the --fix option enabled
npm run fix:css # Runs stylefmt, which helps fix simple stylelint errors
npm run fix # Runs both of the above commands in parallel

npm run test:watch # Runs karma on Chrome, re-running when source files change

npm test # Lints all files, runs karma, and then runs coverage enforcement checks.
```

#### Running Tests across browsers

If you're making big changes or developing new components, we encourage you to be a good citizen and test your changes across browsers! A super simple way to do this is to use [sauce labs](https://saucelabs.com/), which is how we tests our collaborator PRs on TravisCI:

1. [Sign up](https://saucelabs.com/beta/signup) for a sauce labs account (choose "Open Sauce" as your selected plan; [it's free](https://saucelabs.com/opensauce/)!)
2. [Download sauce connect](https://wiki.saucelabs.com/display/DOCS/Setting+Up+Sauce+Connect) for your OS and make sure that the `bin` folder in the downloaded zip is somewhere on your `$PATH`.
3. Navigate to your dashboard, scroll down to where it says "Access Key", and click "Show"
4. Enter your password when prompted
5. Copy your access key
6. Run `SAUCE_USERNAME=<your-saucelabs-username> SAUCE_ACCESS_KEY=<your-saucelabs-access-key> npm test`

This will have karma run our unit tests across all browsers we support, and ensure your changes will not introduce regressions.

Alternatively, you can run `npm run test:watch` and manually open browsers / use VMs / use emulators to test your changes.

### Coding Style

Our entire coding style is enforced automatically through the use of linters. Check out our [eslint config](https://github.com/google/material-design-lite/blob/master/.eslintrc.yaml) (heavily influenced by [Google's Javascript Styleguide](js-style-guide)) as well as our [stylelint config](css-style-guide) (heavily annotated, with justifications for each rule) for further details.

### Signing the CLA

Please sign our Contributor License Agreement (CLA) before sending pull requests. For any code
changes to be accepted, the CLA must be signed. It's a quick process, we promise!

* For individuals we have a [simple click-through form][individual-cla].
* For corporations we'll need you to
  [print, sign and one of scan+email, fax or mail the form][corporate-cla].


### Submitting Pull Requests

We prefer small, incremental changes over large, sweeping ones, so please try to adhere to this when submitting PRs. Also, make sure you're following our commit message conventions (which are the same as [angular's](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit)); our `commit-msg` hook should automatically enforce this. We also support [commitizen](https://www.npmjs.com/package/commitizen), which you can
use to auto-format commit messages for you.

If you've done some experimental work on your branch/fork and committed these via `git commit --no-verify`, you can rebase them into one correctly-formatted commit before submitting.

Finally, it helps to make sure that your branch/fork is up to date with what's currently on master. You can ensure this by running `git pull --rebase origin master` on your branch.

> **NOTE**: Please do _not merge_ master into your branch. _Always_ `pull --rebase` instead. This ensures a linear history by always putting the work you've done after the work that's already on master, regardless of the date in which those commits were made.

To submit code for v2, open a PR for your fork/branch against `master` (_not_ `mdl-1.x`, which is currently our default branch).

Once you've submitted a PR, it'll be assigned to a core team member for review. If all CI tests pass and you get a `LGTM` from a reviewer, your code will be merged into master.

## Questions / Problems

If you have questions about how to use Material Design Lite, please direct these to [StackOverflow][stackoverflow] and use the `material-design-lite` tag.

If you feel that we're missing an important bit of documentation, feel free to
file an issue so we can help. Here's an example to get you started:

```
Component (if any):

What are you trying to do or find out more about?

Where have you looked?

Where did you expect to find this information?
```

## Issues / Bugs

If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting an issue to our [GitHub Repository][github]. Even better, you can submit a Pull Request with a fix. Before submitting issues, please ensure that you've read through our [issue template](https://github.com/google/material-design-lite/blob/mdl-1.x/.github/ISSUE_TEMPLATE.md) to ensure a fast and helpful response from the maintainers.

## "What's the core team up to?"

The core team maintains a [public Pivotal Tracker](https://www.pivotaltracker.com/n/projects/1664011) (**tracker** for short) which details all the items we're working on within our current two-week [iteration](https://www.agilealliance.org/glossary/iteration/). This tracker mirrors in what's in our GH issues. It is used _purely for planning and prioritization purposes, **not** for discussions or community issue filing_. That being said, it's a great place to look at the overall state of our project as well as some the big ticket issues we're working on.

Each tracker story contains a link to its corresponding GH issue within its description. Each GH issue present in tracker is tagged with an `in-tracker` label. This will hopefully make it easy to move between the two if so desired.


[github]: https://github.com/google/material-design-lite
[individual-cla]: http://code.google.com/legal/individual-cla-v1.0.html
[corporate-cla]: http://code.google.com/legal/corporate-cla-v1.0.html
[js-style-guide]: https://github.com/google/material-design-lite/blob/master/.eslintrc.yaml
[css-style-guide]: https://github.com/google/material-design-lite/blob/master/.stylelintrc.yaml
[jsbin]: http://jsbin.com/
[stackoverflow]: http://stackoverflow.com/questions/tagged/material-design-lite
[global-gitignore]: https://help.github.com/articles/ignoring-files/#create-a-global-gitignore
