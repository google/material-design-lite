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

import pkg from './package.json';
import gulp from 'gulp';
import through from 'through2';
import path from 'path';
import fs from 'fs';
import del from 'del';

import browserSync from 'browser-sync';
const reload = browserSync.reload;

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

import MaterialCustomizer from './utils/customizer.js';
import uniffe from './utils/uniffe.js';

const banner = `
/**
 * <%= pkg.name %> - <%= pkg.description %>
 * @version v<%= pkg.version %>
 * @license <%= pkg.license %>
 * @copyright 2015 Google, Inc.
 * @link https://github.com/google/material-design-lite
 */
`;


const AUTOPREFIXER_BROWSERS = [
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

const SOURCES = [
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
  'src/snackbar/snackbar.js',
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

// Lint JavaScript
function jslint() {
  return gulp.src([
      'src/**/*.js',
      'gulpfile.babel.js'
    ])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jscs());
}

// Optimize Images
// TODO: Update image paths in final CSS to match root/images
function images() {
  return gulp.src('src/**/*.{svg,png,jpg}')
    .pipe($.flatten())
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
}

function cssPipeline(stream) {
  return stream
   // Generate Source Maps
   .pipe($.sourcemaps.init())
   .pipe($.sass({
     precision: 10,
     onError: console.error.bind(console, 'Sass error:')
   }))
   .pipe($.cssInlineImages({webRoot: 'src'}))
   .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
   .pipe($.header(banner, {pkg}))
   .pipe(gulp.dest('dist'))
   // Minify Styles
   .pipe($.if('*.css', $.csso()))
   .pipe($.rename({extname: '.min.css'}))
   .pipe($.header(banner, {pkg}))
   .pipe($.sourcemaps.write('.'))
   .pipe(gulp.dest('dist'));
}

// Compile and Automatically Prefix Stylesheets (production)
function mdlCss() {
  const stream = gulp.src('src/material-design-lite.scss')
    .pipe($.rename('material.css'));

  return cssPipeline(stream);
}

// Compile and Automatically Prefix Stylesheets (production)
function mdlThemeTemplate() {
  const stream = gulp.src('src/template.scss')
    .pipe($.rename('material.template.css'));

  return cssPipeline(stream);
}

// Only generate CSS styles for the MDL grid
function mdlGrid() {
  const stream = gulp.src('src/material-design-lite-grid.scss')
    .pipe($.rename('material-grid.css'));

  return cssPipeline(stream);
}


// Build with Google's Closure Compiler, requires Java 1.7+ installed.
function mdlClosureJs() {
  return gulp.src(SOURCES)
    .pipe($.closureCompiler({
      compilerPath: 'node_modules/google-closure-compiler/compiler.jar',
      fileName: 'material.closure.min.js',
      compilerFlags: {
        // jscs:disable closureCamelCase
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        language_in: 'ECMASCRIPT6_STRICT',
        language_out: 'ECMASCRIPT5_STRICT',
        warning_level: 'VERBOSE'
        // jscs:enable closureCamelCase
      }
    }))
    .pipe(gulp.dest('./dist'));
}

const noop = through.obj.bind(through);
// Concatenate And Minify JavaScript
function mdlJs() {
  return gulp.src(SOURCES)
    .pipe($.if(/mdlComponentHandler\.js/, noop(), uniffe()))
    .pipe($.sourcemaps.init())
    // Concatenate Scripts
    .pipe($.concat('material.js'))
    .pipe($.iife({useStrict: true}))
    .pipe(gulp.dest('dist'))
    // Minify Scripts
    .pipe($.uglify({
      sourceRoot: '.',
      sourceMapIncludeSources: true
    }))
    .pipe($.header(banner, {pkg}))
    .pipe($.rename({extname: '.min.js'}))
    // Write Source Maps
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
}

// Copy package manger and LICENSE files to dist
function metadata() {
  return gulp.src([
      'package.json',
      'bower.json',
      'LICENSE'
    ])
    .pipe(gulp.dest('dist'));
}

function mocha() {
  return gulp.src('test/index.html')
    .pipe($.mochaPhantomjs({reporter: 'tap'}));
}


function mochaClosure() {
  return gulp.src('test/index.html')
    .pipe($.replace('src="../dist/material.js"',
        'src="../dist/material.closure.min.js"'))
    .pipe($.rename('temp.html'))
    .pipe(gulp.dest('test'))
    .pipe($.mochaPhantomjs({reporter: 'tap'}))
    .on('finish', () => del.sync('test/temp.html'))
    .on('error', () => del.sync('test/temp.html'));
}

// Generate release archive containing just JS, CSS, Source Map deps
function mdlZip() {
  return gulp.src([
      'dist/material?(.min)@(.js|.css)?(.map)',
      'LICENSE',
      'bower.json',
      'package.json'
    ])
    .pipe($.zip('mdl.zip'))
    .pipe(gulp.dest('dist'));
}

function emptyStream() {
  const stream = through.obj();
  stream.end();
  return stream;
}

function mdlThemes() {
  const templatePath = path.join(__dirname, 'dist', 'material.template.min.css');
  // TODO: This task needs refactoring once we turn MaterialCustomizer
  // into a proper Node module.
  const mc = new MaterialCustomizer();
  mc.template = fs.readFileSync(templatePath).toString();

  let stream = emptyStream();
  mc.paletteIndices.forEach(primary => {
    mc.paletteIndices.forEach(accent => {
      if (primary === accent) {
        return;
      }

      if (mc.forbiddenAccents.indexOf(accent) !== -1) {
        return;
      }

      const primaryName = primary.toLowerCase().replace(' ', '_');
      const accentName = accent.toLowerCase().replace(' ', '_');

      stream = stream.pipe($.file(
        `material.${primaryName}-${accentName}.min.css`,
        mc.processTemplate(primary, accent)
      ));
    });
  });

  return stream.pipe(gulp.dest('dist'));
}

gulp.task('styles', gulp.parallel(
  mdlCss,
  gulp.series(mdlThemeTemplate, mdlThemes),
  mdlGrid
));

gulp.task('scripts', gulp.series(
  jslint,
  gulp.parallel(mdlJs, mdlClosureJs)
));

gulp.task('test', gulp.series(
  gulp.parallel('styles', 'scripts'),
  mocha,
  mochaClosure
));

gulp.task('default', gulp.series(
  gulp.parallel('styles', 'scripts', images, metadata),
  mdlZip,
  mocha,
  mochaClosure
));

function watch() {
  gulp.watch(['src/**/*.js'], gulp.series('scripts', reload));
  gulp.watch(['src/**/*.{scss,css}'], gulp.series('styles', reload));
  gulp.watch(['src/**/*.{svg,png,jpg}'], gulp.series(images, reload));
  gulp.watch(['package.json', 'bower.json', 'LICENSE'], gulp.series(metadata));
}

gulp.task('serve', () => {
  browserSync({
    notify: false,
    server: {
      baseDir: ['.']
    }
  });

  watch();
});
