
# Contributing to Material Design Lite

We'd love for you to contribute to our source code and to make Material Design Lite even better than it is today! Here are the guidelines we'd like you to follow:

 - [Code of Conduct](#coc)
 - [Question or Problem?](#question)
 - [Issues and Bugs](#issue)
 - [Feature Requests](#feature)
 - [Submission Guidelines](#submit)
 - [Coding Rules](#rules)
 - [Signing the CLA](#cla)

## <a name="coc"></a> Code of Conduct

As contributors and maintainers of the Material Design Lite project, we pledge to respect everyone who contributes by posting issues, updating documentation, submitting pull requests, providing feedback in comments, and any other activities.

Communication through any of Material Design Lite's channels (GitHub, StackOverflow, Google+, Twitter, etc.) must be constructive and never resort to personal attacks, trolling, public or private harassment, insults, or other unprofessional conduct.

We promise to extend courtesy and respect to everyone involved in this project regardless of gender, gender identity, sexual orientation, disability, age, race, ethnicity, religion, or level of experience. We expect anyone contributing to the Material Design Lite project to do the same.

If any member of the community violates this code of conduct, the maintainers of the Material Design Lite project may take action, removing issues, comments, and PRs or blocking accounts as deemed appropriate.

If you are subject to or witness unacceptable behavior, or have any other concerns, please drop us a line at addyo@google.com.

## <a name="question"></a> Got a Question or Problem?

If you have questions about how to use Material Design Lite, please direct these to [StackOverflow][stackoverflow] and use the `material-design-lite` tag. We are also available on GitHub issues.

If you feel that we're missing an important bit of documentation, feel free to
file an issue so we can help. Here's an example to get you started:

```
Component (if any):

What are you trying to do or find out more about?

Where have you looked?

Where did you expect to find this information?
```

Or, if you're looking for a new design template:

```
Please provide a short summary of the template you’re looking for.

What makes this template interesting or challenging from a design perspective?

Please provide any URLs to good examples of this type of page that you may have come across.
```

## <a name="issue"></a> Found an Issue?
If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting an issue to our [GitHub Repository][github]. Even better you can submit a Pull Request
with a fix.

See [below](#submit) for some guidelines.

## <a name="feature"></a> Want a Feature?
You can request a new feature by submitting an issue to our [GitHub Repository][github].

Here is a template to get you started:

```
Is this a new component, or a missing feature in an existing one?
Component name:
Material Design spec URL for the component (if any):

What does this component or feature allow you to do which isn’t possible at the moment?

Please provide any URLs or screenshots of good examples of usage of this component or feature that you may have come across.
```

If you would like to implement a new feature then consider what kind of change it is:

* **Major Changes** that you wish to contribute to the project should be discussed first on our
[issue tracker][] so that we can better coordinate our efforts, prevent
duplication of work, and help you to craft the change so that it is successfully accepted into the
project.
* **Small Changes** can be crafted and submitted to the [GitHub Repository][github] as a Pull Request.

## <a name="submit"></a> Submission Guidelines

### Submitting an Issue
Before you submit your issue search the archive, maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue.
Help us to maximize the effort we can spend fixing issues and adding new
features, by not reporting duplicate issues.  Providing the following information will increase the
chances of your issue being dealt with quickly:

* **Overview of the Issue** - if an error is being thrown a non-minified stack trace helps
* **Motivation for or Use Case** - explain why this is a bug for you
* **Material Design Lite Version(s)** - is it a regression?
* **Browsers and Operating System** - is this a problem with all browsers or only IE9?
* **Reproduce the Error** - provide a live example (using JSBin) or a unambiguous set of steps.
* **Related Issues** - has a similar issue been reported before?
* **Suggest a Fix** - if you can't fix the bug yourself, perhaps you can point to what might be
  causing the problem (line of code or commit)

**If you get help, help others. Good karma rulez!**

Here's a template to get you started:

```
MDL version:
Browser:
Browser version:
Operating system:
Operating system version:
URL, if applicable (you can use a [codepen as a starting point][http://codepen.io/pen/def?fork=xGWgXa]):

What steps will reproduce the problem:
1.
2.
3.

What is the expected result?

What happens instead of that?

Please provide any other information below, and attach a screenshot if possible.
```

### Submitting a Pull Request
Before you submit your pull request consider the following guidelines:

* Search [GitHub](https://github.com/google/material-design-lite/pulls) for an open or closed Pull Request
  that relates to your submission. You don't want to duplicate effort.
* Please sign our [Contributor License Agreement (CLA)](#cla) before sending pull
  requests. We cannot accept code without this.
* Make your changes in a new git branch:

     ```shell
     git checkout -b my-fix-branch master
     ```

* Create your patch, **including appropriate test cases**.
* Follow our [Coding Rules](#rules).
* Run the full Material Design Lite test suite (`gulp test`),
  and ensure that all tests pass.
* Avoid checking in files that shouldn't be tracked (e.g `node_modules`, `gulp-cache`, `.tmp`, `.idea`). We recommend using a [global .gitignore](https://help.github.com/articles/ignoring-files/#create-a-global-gitignore) for this.
* Make sure **not** to include a recompiled version of the files found in `/css` and `/js` as part of your PR. We will generate these automatically.
* Commit your changes using a descriptive commit message.

     ```shell
     git commit -a
     ```
  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

* Build your changes locally to ensure all the tests pass:

    ```shell
   gulp
    ```

* Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

* In GitHub, send a pull request to `material-design-lite:master`.
* If we suggest changes then:
  * Make the required updates.
  * Re-run the Material Design Lite test suite to ensure tests are still passing.
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push origin my-fix-branch -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```

## <a name="rules"></a> Coding Rules

We generally follow the [Google JavaScript style guide][js-style-guide] with a few minor exceptions documented in our [JSCS configuration][jscs-config].

[JSCS](http://jscs.info) is a tool for linting code against a style guide and has plugins available for both editors and build tools. Should
you find that you would prefer to automatically format your code to match our style guide, you can use the JSCS [autoformatting][autoformatting]
feature.

## <a name="cla"></a> Signing the CLA

Please sign our Contributor License Agreement (CLA) before sending pull requests. For any code
changes to be accepted, the CLA must be signed. It's a quick process, we promise!

* For individuals we have a [simple click-through form][individual-cla].
* For corporations we'll need you to
  [print, sign and one of scan+email, fax or mail the form][corporate-cla].

*This guide was inspired by the [AngularJS contribution guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md).*

[github]: https://github.com/google/material-design-lite
[issue tracker]: https://github.com/google/material-design-lite/issues
[individual-cla]: http://code.google.com/legal/individual-cla-v1.0.html
[corporate-cla]: http://code.google.com/legal/corporate-cla-v1.0.html
[js-style-guide]: http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
[jsbin]: http://jsbin.com/
[stackoverflow]: http://stackoverflow.com/questions/tagged/material-design-lite
[global-gitignore]: https://help.github.com/articles/ignoring-files/#create-a-global-gitignore
[autoformatting]: https://medium.com/@addyosmani/auto-formatting-javascript-code-style-fe0f98a923b8
[jscs-config]: https://github.com/google/material-design-lite/blob/master/.jscsrc
