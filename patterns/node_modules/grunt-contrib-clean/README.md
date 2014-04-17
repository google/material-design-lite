# grunt-contrib-clean [![Build Status](https://travis-ci.org/gruntjs/grunt-contrib-clean.png?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-clean)

> Clean files and folders.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-clean --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-clean');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-clean/tree/grunt-0.3-stable).*



## Clean task
_Run this task with the `grunt clean` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

*Due to the destructive nature of this task, always be cautious of the paths you clean.*
### Options

#### force
Type: `Boolean`  
Default: false

This overrides this task from blocking deletion of folders outside current working dir (CWD). Use with caution.

#### no-write
Type: `Boolean`  
Default: false

Will log messages of what would happen if the task was ran but doesn't actually delete the files.

### Usage Examples

There are three formats you can use to run this task.

#### Short

```js
clean: ["path/to/dir/one", "path/to/dir/two"]
```

#### Medium (specific targets with global options)

```js
clean: {
  build: ["path/to/dir/one", "path/to/dir/two"],
  release: ["path/to/another/dir/one", "path/to/another/dir/two"]
},
```

#### Long (specific targets with per target options)

```js
clean: {
  build: {
    src: ["path/to/dir/one", "path/to/dir/two"]
  }
}
```

## Release History

 * 2013-07-15   v0.5.0   Use rimraf directly, version 2.2.1 to fix issue on Windows. Add no-write option to mimic grunt.file.delete behavior.
 * 2013-04-16   v0.4.1   Check if file exists to avoid trying to delete a non-existent file.
 * 2013-02-15   v0.4.0   First official release for Grunt 0.4.0.
 * 2013-01-18   v0.4.0rc6   Updating grunt/gruntplugin dependencies to rc6. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions.
 * 2013-01-09   v0.4.0rc5   Updating to work with grunt v0.4.0rc5. Switching to this.filesSrc api.
 * 2012-12-07   v0.4.0a   Conversion to grunt v0.4 conventions. Remove node v0.6 and grunt v0.3 support. Add force option to bypass CWD check.
 * 2012-09-23   v0.3.0   Options no longer accepted from global config key.
 * 2012-09-10   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Tim Branyen](http://tbranyen.com/)

*This file was generated on Mon Jul 15 2013 20:45:46.*
