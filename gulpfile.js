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
var fs = require('fs');
var path = require('path');
var pkg = require('./package.json');
var through = require('through2');
var swig = require('swig');
var merge = require('merge-stream');
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

// Copy fonts
gulp.task('fonts', function () {
  return gulp.src([
    'src/fonts/*'
  ])
  .pipe(gulp.dest('.tmp/fonts'))
  .pipe(gulp.dest('dist/fonts'))
  // FIXME: This is rather hacky
  .pipe(gulp.dest('dist/embedded_customizer/fonts'));
});

// Compile and Automatically Prefix Stylesheets (dev)
gulp.task('styles:dev', ['fonts'], function () {
  return gulp.src([
    'src/**/*.scss'
  ])
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.base64({
      extensionsAllowed: ['.svg'],
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
    .pipe($.base64({
      extensionsAllowed: ['.svg'],
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp'))
    // Concatenate Styles
    .pipe($.concat('material.css.template'))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./dist'))
    // Minify Styles
    .pipe($.if('*.css.template', $.csso()))
    .pipe($.concat('material.min.css.template'))
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
    .pipe($.base64({
      extensionsAllowed: ['.svg'],
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
    //.pipe($.header(banner, {pkg: pkg}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe($.size({title: 'styles'}));
});

// Concatenate And Minify JavaScript
gulp.task('scripts', function () {
  var sources = [
    // Component handler
    'src/mdlComponentHandler.js',
    // Polyfills/dependencies
    'src/third_party/**/*.js',
    // Base components
    'src/animation/animation.js',
    'src/button/button.js',
    'src/checkbox/checkbox.js',
    'src/column-layout/column-layout.js',
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
    .pipe($.uglify({preserveComments: 'some', sourceRoot: '.', sourceMapIncludeSources: true}))
    .pipe($.concat('material.min.js'))
    // Write Source Maps
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe($.size({title: 'scripts'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist'], {dot: true}));

// Build Production Files, the Default Task
gulp.task('default', ['clean','mocha'], function (cb) {
  runSequence(
    'styles',
    ['jshint', 'scripts', 'fonts', 'styles', 'assets', 'pages', 'demos', 'templates', 'images'],
    cb);
});


// ***** Testing tasks ***** //

gulp.task('mocha', ['styles'], function () {
  return gulp.src('./test/index.html')
    .pipe($.mochaPhantomjs({reporter: 'list'}))
});

gulp.task('test', ['jshint', 'mocha']);

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
  })
}


/**
 * Generates an index.html file for each README in MDL/src directory.
 */
gulp.task('components', function() {
  return gulp.src('./src/**/README.md', {base: './src'})
    // Add basic front matter.
    .pipe($.header('---\nlayout: component\nbodyclass: components\ninclude_prefix: ../../\n---\n\n'))
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
      })
    })())
    .pipe(applyTemplate())
    .pipe($.rename(function (path) {
        path.basename = "index";
    }))
    .pipe(gulp.dest('dist/components'));
});


/**
 * Copies demo files from MDL/src directory.
 */
gulp.task('demos', function () {
    return gulp.src([
        './src/**/demo.*',
        './src/**/*.js'
      ], {base: './src'})
      .pipe($.if('*.scss', $.sass({
        precision: 10,
        onError: console.error.bind(console, 'Sass error:')
      })))
      .pipe($.base64({
        extensionsAllowed: ['.svg'],
      }))
      .pipe($.if('*.css', $.autoprefixer(AUTOPREFIXER_BROWSERS)))
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
  return gulp.src(['docs/_assets/**'])
    .pipe($.if(/\.(svg|jpg|png)$/i, $.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets'));
});


/**
 * Serves the landing page from "out" directory.
 */
gulp.task('serve', ['default'], function () {
  browserSync({
    notify: false,
    server: {
      baseDir: ['dist'],
      routes: {
        '/components/fonts': 'dist/fonts'
      }
    }
  });

  gulp.watch(['src/**/*.js', '!src/**/README.md'], ['scripts', 'demos', 'components', reload]);
  gulp.watch(['src/**/*.{scss,css}'], ['styles', 'demos', reload]);
  gulp.watch(['src/**/*.html'], ['demos', reload]);
  gulp.watch(['src/**/README.md'], ['components', reload]);
  gulp.watch(['templates/**/*'], ['templates', reload]);
  gulp.watch(['docs/**/*'], ['pages', 'assets', reload]);
});

gulp.task('publish', ['default', 'templates', 'assets', 'pages', 'demos'], function() {
  var push = !!process.env.GH_PUSH;
  if (!push) {
    console.log('Dry run! To push set $GH_PUSH to true');
  }

  return gulp.src('dist/**/*')
  .pipe($.ghPages({
    push: push,
  }));
});

gulp.task('templates:styles', function() {
  return gulp.src([
    'templates/**/*.scss'
  ])
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.base64({
      extensionsAllowed: ['.svg'],
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.if('*.css', $.csso()))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/templates'))
});

gulp.task('templates:static', function() {
  return gulp.src([
    'templates/**/*.html',
    'templates/**/*.css'
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
    'src/fonts/**/*'
  ], {base: '.'})
  .pipe(gulp.dest('dist/templates/'));
})

gulp.task('templates', ['templates:static', 'templates:images', 'templates:styles', 'templates:fonts']);
