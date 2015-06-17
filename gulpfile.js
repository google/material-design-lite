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

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var path = require('path');
var pkg = require('./package.json');
var through = require('through2');
var swig = require('swig');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license.type %>',
  ' */',
  ''].join('\n');

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

// ***** Development tasks ****** //

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('src/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Lint JavaScript code style
gulp.task('jscs', function () {
  return gulp.src('src/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jscs())
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// ***** Production build tasks ****** //

// Optimize Images
// TODO: Update image paths in final CSS to match root/images
gulp.task('images', function () {
  return gulp.src('src/**/*.{svg,png,jpg}')
    .pipe($.flatten())
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});

// Compile and Automatically Prefix Stylesheets (dev)
gulp.task('styles:dev', function () {
  return gulp.src([
    'src/**/*.scss'
  ])
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.cssInlineImages({
      webRoot: 'src'
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size({title: 'styles'}));
});

// Compile and Automatically Prefix Stylesheet Templates (production)
gulp.task('styletemplates', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'src/template.scss'
  ])
    // Generate Source Maps
    .pipe ($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.cssInlineImages({
      webRoot: 'src'
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp'))
    // Concatenate Styles
    .pipe($.concat('material.css.template'))
    .pipe(gulp.dest('./dist'))
    // Minify Styles
    .pipe($.if('*.css.template', $.csso()))
    .pipe($.concat('material.min.css.template'))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe($.size({title: 'styles'}));
});

// Compile and Automatically Prefix Stylesheets (production)
gulp.task('styles', ['styletemplates'], function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'src/styleguide.scss'
  ])
    // Generate Source Maps
    .pipe ($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.cssInlineImages({
      webRoot: 'src'
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp'))
    // Concatenate Styles
    .pipe($.concat('material.css'))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist'))
    // Minify Styles
    .pipe($.if('*.css', $.csso()))
    .pipe($.concat('material.min.css'))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe($.size({title: 'styles'}));
});

// Only generate CSS styles for the MDL grid
gulp.task('styles-grid', function () {
  return gulp.src(['src/material-design-lite-grid.scss'])
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp'))
    // Concatenate Styles
    .pipe($.concat('material-grid.css'))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist'))
    // Minify Styles
    .pipe($.if('*.css', $.csso()))
    .pipe($.concat('material-grid.min.css'))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist'))
    .pipe($.size({title: 'styles-grid'}));
});

// Concatenate And Minify JavaScript
gulp.task('scripts', function () {
  var sources = [
    // Component handler
    'src/mdlComponentHandler.js',
    // Polyfills/dependencies
    'src/third_party/**/*.js',
    // Base components
    'src/button/button.js',
    'src/checkbox/checkbox.js',
    'src/icon-toggle/icon-toggle.js',
    'src/menu/menu.js',
    'src/progress/progress.js',
    'src/radio/radio.js',
    'src/slider/slider.js',
    'src/spinner/spinner.js',
    'src/switch/switch.js',
    'src/tabs/tabs.js',
    'src/textfield/textfield.js',
    'src/tooltip/tooltip.js',
    // Complex components (which reuse base components)
    'src/layout/layout.js',
    'src/data-table/data-table.js',
    // And finally, the ripples
    'src/ripple/ripple.js'
  ];
  return gulp.src(sources)
    .pipe($.sourcemaps.init())
    // Concatenate Scripts
    .pipe($.concat('material.js'))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist'))
    // Minify Scripts
    .pipe($.uglify({preserveComments: 'some', sourceRoot: '.',
        sourceMapIncludeSources: true}))
    .pipe($.concat('material.min.js'))
    // Write Source Maps
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe($.size({title: 'scripts'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist', '.publish'], {dot: true}));

// Build Production Files, the Default Task
gulp.task('default', ['clean', 'mocha'], function (cb) {
  runSequence(
    'styles',
    ['jshint', 'jscs', 'scripts', 'styles', 'assets', 'pages', 'demos', 'templates',
     'images', 'styles-grid'],
    cb);
});

// ***** Testing tasks ***** //

gulp.task('mocha', ['styles'], function () {
  return gulp.src('./test/index.html')
    .pipe($.mochaPhantomjs({reporter: 'list'}));
});

gulp.task('test', ['jshint', 'jscs', 'mocha']);

gulp.task('test:visual', function() {
  browserSync({
    notify: false,
    server: './',
    startPath: 'test/visual/index.html'
  });

  gulp.watch(['test/visual/**'], reload);
});

// ***** Landing page tasks ***** //

/**
 * Site metadata for use with templates.
 * @type {Object}
 */
var site = {};

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

    var templateFile = path.join(
        __dirname, 'docs', '_templates', file.page.layout + '.html');
    var tpl = swig.compileFile(templateFile, {cache: false});
    file.contents = new Buffer(tpl(data), 'utf8');
    this.push(file);
    cb();
  });
}

/**
 * Generates an index.html file for each README in MDL/src directory.
 */
gulp.task('components', function() {
  return gulp.src(['./src/**/README.md'], {base: './src'})
    // Add basic front matter.
    .pipe($.header('---\nlayout: component\nbodyclass: component\ninclude_prefix: ../../\n---\n\n'))
    .pipe($.frontMatter({property: 'page', remove: true}))
    .pipe($.marked())
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
      });
    })())
    .pipe(applyTemplate())
    .pipe($.rename(function (path) {
      path.basename = 'index';
    }))
    .pipe(gulp.dest('dist/components'));
});

/**
 * Copies demo files from MDL/src directory.
 */
gulp.task('demos', ['demohtml'], function () {
  return gulp.src([
      './src/**/*.css',
      './src/**/*.js'
    ], {base: './src'})
      .pipe($.if('*.scss', $.sass({
        precision: 10,
        onError: console.error.bind(console, 'Sass error:')
      })))
      .pipe($.cssInlineImages({
        webRoot: 'src'
      }))
      .pipe($.if('*.css', $.autoprefixer(AUTOPREFIXER_BROWSERS)))
      .pipe(gulp.dest('dist/components'));
});

/**
 * Generates demo files for testing.
 */
gulp.task('demohtml', function() {
  return gulp.src(['./src/**/demo.html'])
    // Add basic front matter.
    .pipe($.header('---\nlayout: demo\nbodyclass: demo\ninclude_prefix: ../../\n---\n\n'))
    .pipe($.frontMatter({property: 'page', remove: true}))
    .pipe($.marked())
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
      });
    })())
    .pipe(applyTemplate())
    .pipe(gulp.dest('dist/components'));
});

/**
 * Generates an HTML file for each md file in _pages directory.
 */
gulp.task('pages', ['components'], function() {
  return gulp.src(['docs/_pages/*.md'])
    .pipe($.frontMatter({property: 'page', remove: true}))
    .pipe($.marked())
    .pipe(applyTemplate())
    .pipe($.replace('$$version$$', pkg.version))
    /* Replacing code blocks class name to match Prism's. */
    .pipe($.replace('class="lang-', 'class="language-'))
    /* Translate html code blocks to "markup" because that's what Prism uses. */
    .pipe($.replace('class="language-html', 'class="language-markup'))
    .pipe($.rename(function(path) {
      if (path.basename !== 'index') {
        path.dirname = path.basename;
        path.basename = 'index';
      }
    }))
    .pipe(gulp.dest('dist'));
});

/**
 * Copies assets from MDL and _assets directory.
 */
gulp.task('assets', function () {
  return gulp.src(['docs/_assets/**/*'])
    .pipe($.if(/\.(svg|jpg|png)$/i, $.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe($.if(/\.css/i, $.autoprefixer(AUTOPREFIXER_BROWSERS)))
    .pipe($.if(/\.js/i, $.uglify({preserveComments: 'some', sourceRoot: '.',
      sourceMapIncludeSources: true})))
    .pipe(gulp.dest('dist/assets'));
});

/**
 * Serves the landing page from "out" directory.
 */
gulp.task('serve:browsersync', ['default'], function () {
  browserSync({
    notify: false,
    server: {
      baseDir: ['dist']
    }
  });

  gulp.watch(['src/**/*.js', '!src/**/README.md'],
      ['scripts', 'demos', 'components', reload]);
  gulp.watch(['src/**/*.{scss,css}'], ['styles', 'demos', reload]);
  gulp.watch(['src/**/*.html'], ['demos', reload]);
  gulp.watch(['src/**/README.md'], ['components', reload]);
  gulp.watch(['templates/**/*'], ['templates', reload]);
  gulp.watch(['docs/**/*'], ['pages', 'assets', reload]);
});

gulp.task('serve', ['default'], function() {
  $.connect.server({
    root: 'dist',
    port: 5000,
    livereload: true
  });

  gulp.watch(['src/**/*.js', '!src/**/README.md'],
      ['scripts', 'demos', 'components']);
  gulp.watch(['src/**/*.{scss,css}'], ['styles', 'demos']);
  gulp.watch(['src/**/*.html'], ['demos']);
  gulp.watch(['src/**/README.md'], ['components']);
  gulp.watch(['templates/**/*'], ['templates']);
  gulp.watch(['docs/**/*'], ['pages', 'assets']);

  gulp.src('./dist/index.html')
    .pipe($.open('', {url: 'http://localhost:5000'}));
});

gulp.task('publish', function(cb) {
  runSequence('default',
    ['templates', 'assets', 'pages', 'demos'],
    'publish:push',
    cb);
});

// Push the latest version to CDN (Google Cloud Storage)
// This task requires gsutil to be installed and configured.
// For more info on gsutil: https://cloud.google.com/storage/docs/gsutil.
gulp.task('publish:cdn', function() {
  var bucket = 'gs://materialdesignlite/';
  var infoMsg = 'Publishing ' + pkg.version + ' to CDN (' + bucket + ')';
  // Build gsutil command to copy each object into the dest bucket.
  // -a sets the ACL on each object to public-read
  // -m does parallel copies (no help here since one gsutil per file)
  // We copy both a default instance at the bucket root and a version
  // specific instance into a subdir.
  var gsutilCmd = 'gsutil -m cp -a public-read <%= file.path %> ' + bucket;
  process.stdout.write(infoMsg + '\n');
  return gulp.src('dist/material.*@(js|css)')
    .pipe($.tap(function(file, t) {
      file.base = path.basename(file.path);
    }))
    .pipe($.shell([gsutilCmd, gsutilCmd +
      pkg.version + '/<%= file.base %>']));
});

gulp.task('publish:push', function() {
  var push = !!process.env.GH_PUSH;
  if (!push) {
    console.log('Dry run! To push set $GH_PUSH to true');
  }

  return gulp.src('dist/**/*')
    .pipe($.ghPages({
      push: push,
    }));
});

gulp.task('templates:mdl', function() {
  return gulp.src([
    'templates/**/*.scss'
  ])
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.cssInlineImages({
      webRoot: 'src'
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.csso())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('templates:styles', function() {
  return gulp.src([
    'templates/**/*.css'
  ])
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    // FIXME: This crashes. It's a bug in gulp-csso,
    // not csso itself.
    //.pipe($.csso())
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('templates:static', function() {
  return gulp.src([
    'templates/**/*.html',
  ])
  .pipe(gulp.dest('dist/templates'));
});

gulp.task('templates:images', function() {
  return gulp.src([
    'templates/*/images/**/*'
  ])
  .pipe($.imagemin({
    progressive: true,
    interlaced: true
  }))
  .pipe(gulp.dest('dist/templates'));
});

gulp.task('templates:fonts', function() {
  return gulp.src([
    'templates/*/fonts/**/*'
  ])
  .pipe(gulp.dest('dist/templates/'));
});

gulp.task('templates', ['templates:static', 'templates:images', 'templates:mdl',
    'templates:fonts', 'templates:styles']);
