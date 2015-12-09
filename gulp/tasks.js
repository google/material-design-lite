import pkg from '../package.json';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();
import * as config from './config';
import * as util from './util';
import MaterialCustomizer from '../utils/customizer.js';
import uniffe from '../utils/uniffe.js';
import del from 'del';
import path from 'path';
import fs from 'fs';



// Lint JavaScript
export function jslint() {
  return gulp.src([
      'src/**/*.js',
      'gulpfile.babel.js'
    ])
    .pipe($.jshint())
    .pipe($.jscs());
}

// Optimize Images
// TODO: Update image paths in final CSS to match root/images
export function images() {
  return gulp.src('src/**/*.{svg,png,jpg}')
    .pipe($.flatten())
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
}

// Compile and Automatically Prefix Stylesheets (production)
export function mdlCss() {
  const stream = gulp.src('src/material-design-lite.scss')
    .pipe($.rename('material.css'));

  return util.cssPipeline(stream);
}

// Compile and Automatically Prefix Stylesheets (production)
export function mdlThemeTemplate() {
  const stream = gulp.src('src/template.scss')
    .pipe($.rename('material.template.css'));

  return util.cssPipeline(stream);
}

// Only generate CSS styles for the MDL grid
export function mdlGrid() {
  const stream = gulp.src('src/material-design-lite-grid.scss')
    .pipe($.rename('material-grid.css'));

  return util.cssPipeline(stream);
}


// Build with Google's Closure Compiler, requires Java 1.7+ installed.
export function mdlClosureJs() {
  return gulp.src(config.SOURCES)
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

// Concatenate And Minify JavaScript
export function mdlJs() {
  return gulp.src(config.SOURCES)
    .pipe($.if(/mdlComponentHandler\.js/, util.noop(), uniffe()))
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
    .pipe($.header(config.BANNER, {pkg}))
    .pipe($.rename({extname: '.min.js'}))
    // Write Source Maps
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
}

// Copy package manger and LICENSE files to dist
export function metadata() {
  return gulp.src([
      'package.json',
      'bower.json',
      'LICENSE'
    ])
    .pipe(gulp.dest('dist'));
}

export function mocha() {
  return gulp.src('test/index.html')
    .pipe($.mochaPhantomjs({reporter: 'tap'}));
}


export function mochaClosure() {
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
export function mdlZip() {
  return gulp.src([
      'dist/material?(.min)@(.js|.css)?(.map)',
      'LICENSE',
      'bower.json',
      'package.json'
    ])
    .pipe($.zip('mdl.zip'))
    .pipe(gulp.dest('dist'));
}

export function mdlThemes() {
  const templatePath = path.join(__dirname, '..', 'dist', 'material.template.min.css');
  // TODO: This task needs refactoring once we turn MaterialCustomizer
  // into a proper Node module.
  const mc = new MaterialCustomizer();
  mc.template = fs.readFileSync(templatePath).toString();

  let stream = util.emptyStream();
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

export function prepareRelease() {
  return gulp.src([
      'dist/material?(.min)@(.js|.css)?(.map)',
      'LICENSE',
      'README.md',
      'bower.json',
      'package.json',
      '.jscsrc',
      '.jshintrc',
      './sr?/**/*',
      'gulpfile.babel.js',
      './util?/**/*'
    ])
    .pipe(gulp.dest('release'));
}

export function publishRelease(cb) {
  if(process.env.PUSH !== 'true') {
    console.log('$PUSH NOT SET TO "true". NOT PUSHING');
    cb();
    return;
  }
  return gulp.src('release')
    .pipe($.subtree({
      remote: 'origin',
      branch: 'release'
    }));
}
