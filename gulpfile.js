/**
 *
 *  Web Starter Kit
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
var pagespeed = require('psi');
var reload = browserSync.reload;

// Lint JavaScript
gulp.task('jshint', function() {
  return gulp.src(['app/scripts/**/*.js', 'app/styleguide/**/*.js'])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Optimize Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function() {
  return gulp.src([
    'app/*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
});

// Copy image files from the Styleguide
gulp.task('styleguide-images', function() {
  return gulp.src('app/styleguide/**/*.{svg,png,jpg}')
    .pipe(gulp.dest('dist/styleguide/'))
    .pipe($.size({title: 'styleguide-images'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function() {
  return gulp.src(['app/fonts/**'])
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function() {

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

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'app/**/*.scss',
    'app/styles/**/*.css'
  ])
    .pipe($.changed('.tmp/styles', {extension: '.css'}))
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp'))
    // Concatenate And Minify Styles
    .pipe($.if('*.css', $.csso()))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'styles'}));
});

// Concatenate And Minify JavaScript
gulp.task('scripts', function() {
  var sources = [
    // Scripts
    'app/scripts/**/*.js',
    // Component handler
    'app/styleguide/wskComponentHandler.js',
    // Polyfills/dependencies
    'app/styleguide/third_party/**/*.js',
    // Base components
    'app/styleguide/animation/animation.js',
    'app/styleguide/button/button.js',
    'app/styleguide/checkbox/checkbox.js',
    'app/styleguide/column-layout/column-layout.js',
    'app/styleguide/icon-toggle/icon-toggle.js',
    'app/styleguide/item/item.js',
    'app/styleguide/radio/radio.js',
    'app/styleguide/slider/slider.js',
    'app/styleguide/spinner/spinner.js',
    'app/styleguide/switch/switch.js',
    'app/styleguide/tabs/tabs.js',
    'app/styleguide/textfield/textfield.js',
    'app/styleguide/tooltip/tooltip.js',
    // Complex components (which reuse base components)
    'app/styleguide/layout/layout.js',
    // And finally, the ripples
    'app/styleguide/ripple/ripple.js'
  ];
  return gulp.src(sources)
    .pipe($.concat('main.min.js'))
    .pipe($.uglify({preserveComments: 'some'}))
    // Output Files
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.size({title: 'scripts'}));
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function() {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/**/**/*.html')
    .pipe(assets)
    // Remove Any Unused CSS
    // Note: If not using the Style Guide, you can delete it from
    // the next line to only include styles your project uses.
    .pipe($.if('*.css', $.uncss({
      html: [
        'app/index.html',
        'app/styleguide.html'
      ],
      // CSS Selectors for UnCSS to ignore
      ignore: []
    })))

    // Concatenate And Minify Styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    // Minify Any HTML
    .pipe($.if('*.html', $.minifyHtml()))
    // Output Files
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Watch Files For Changes & Reload
gulp.task('serve', ['styles'], function() {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app']
  });

  gulp.watch(['app/**/**/**/*.html'], reload);
  gulp.watch(['app/**/**/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/scripts/**/*.js','app/styleguide/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function() {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    baseDir: "dist"
  });
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function(cb) {
  runSequence('styles', ['jshint', 'html', 'scripts', 'images', 'styleguide-images', 'fonts', 'copy'], cb);
});

// Run PageSpeed Insights
gulp.task('pagespeed', function (cb) {
  // Update the below URL to the public URL of your site
  pagespeed.output('example.com', {
    strategy: 'mobile'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb);
});

// Load custom tasks from the `tasks` directory
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
