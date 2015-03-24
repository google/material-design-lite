/**
 *
 *  Material Design Lite
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var frontMatter = require('gulp-front-matter');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var header = require('gulp-header');
var marked = require('gulp-marked');
var path = require('path');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var swig = require('swig');
var through = require('through2');


var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

/**
 * Site metadata for use with templates.
 * @type {Object}
 */
var site = {};


/**
 * Compiled swig templates cache.
 * @type {Object}
 */
var templates = {};


var gutil = require('gulp-util');


/**
 * Generates an HTML file based on a template and file metadata.
 */
function applyTemplate() {
  return through.obj(function(file, enc, cb) {
    var data = {
      site: site,
      page: file.page,
      content: file.contents.toString()
    };
    // If template not in template cache, compile and add it.
    if (!templates[file.page.layout]) {
      var templateFile = path.join(
          __dirname, '_templates', file.page.layout + '.html');
      gutil.log('Compiling template:', gutil.colors.yellow(file.page.layout));
      templates[file.page.layout] = swig.compileFile(templateFile);
    }
    var tpl = templates[file.page.layout];
    file.contents = new Buffer(tpl(data), 'utf8');
    this.push(file);
    cb();
  })
}


/**
 * Generates an index.html file for each README in MDL/src directory.
 */
gulp.task('components', function() {
  return gulp.src('../src/**/README.md', {base: '../src'})
    // Add basic front matter.
    .pipe(header('---\nlayout: component\n---\n\n'))
    .pipe(frontMatter({property: 'page', remove: true}))
    .pipe(marked())
    .pipe((function () {
      var componentPages = [];
      return through.obj(function(file, enc, cb) {
        file.page.component = file.relative.split('/')[0];
        componentPages.push(file.page);
        this.push(file);
        cb();
      },
      function(cb) {
        site.components = componentPages;
        cb();
      })
    })())
    .pipe(applyTemplate())
    .pipe(rename(function (path) {
        path.basename = "index";
    }))
    .pipe(gulp.dest('out/components'));
});


/**
 * Copies demo files from MDL/src directory.
 */
gulp.task('demos', function () {
    return gulp.src([
        '../src/**/demo.*'
      ], {base: '../src'})
      .pipe(gulpif('*.scss', sass({
        precision: 10,
        onError: console.error.bind(console, 'Sass error:')
      })))
      .pipe(gulpif('*.css', autoprefixer(AUTOPREFIXER_BROWSERS)))
      .pipe(gulp.dest('out/components'));
});


/**
 * Generates an HTML file for each md file in _pages directory.
 */
gulp.task('pages', ['components'], function() {
  return gulp.src(['_pages/*.md'])
    .pipe(frontMatter({property: 'page', remove: true}))
    .pipe(marked())
    .pipe(applyTemplate())
    .pipe(rename(function(path) {
      if (path.basename !== 'index') {
        path.dirname = path.basename;
        path.basename = 'index';
      }
    }))
    .pipe(gulp.dest('out'));
});


/**
 * Copies assets from MDL and _assets directory.
 */
gulp.task('assets', function () {
    return gulp.src([
      '../js/material.min.*',
      '../css/material.min.*',
      '_assets/**'
    ])
    .pipe(gulp.dest('out/assets'));
});


gulp.task('default', ['assets', 'pages', 'demos', 'components']);


gulp.task('serve', ['assets', 'pages'], function () {
  browserSync({
    notify: false,
    server: ['out']
  });
});
