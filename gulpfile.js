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
var fs = require('fs');
var merge = require('merge-stream');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var path = require('path');
var pkg = require('./package.json');
var through = require('through2');
var swig = require('swig');
var MaterialCustomizer = require('./docs/_assets/customizer.js');
var hostedLibsUrlPrefix = 'https://storage.googleapis.com/code.getmdl.io';
var bucketProd = 'gs://www.getmdl.io';
var bucketStaging = 'gs://mdl-staging';
var bucketCode = 'gs://code.getmdl.io';
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
  return gulp.src(['src/**/*.js' , 'gulpfile.js'])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Lint JavaScript code style
gulp.task('jscs', function () {
  return gulp.src(['src/**/*.js' , 'gulpfile.js'])
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
    .pipe(gulp.dest('./dist'))
    // Minify Scripts
    .pipe($.uglify({
      sourceRoot: '.',
      sourceMapIncludeSources: true
    }))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe($.concat('material.min.js'))
    // Write Source Maps
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe($.size({title: 'scripts'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist', '.publish'], {dot: true}));

// Copy package manger and LICENSE files to dist
gulp.task('metadata', function () {
  return gulp.src(['package.json', 'bower.json', 'LICENSE'])
    .pipe(gulp.dest('./dist'));
});

// Build Production Files, the Default Task
gulp.task('default', ['clean', 'mocha'], function (cb) {
  runSequence(
    'styles',
    ['jshint', 'jscs', 'scripts', 'styles', 'assets', 'demos', 'pages',
     'templates', 'images', 'styles-grid', 'metadata'],
    cb);
});

// ***** Testing tasks ***** //

gulp.task('mocha', ['styles'], function () {
  return gulp.src('./test/index.html')
    .pipe($.mochaPhantomjs({reporter: 'tap'}));
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
gulp.task('components', ['demos'], function() {
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
gulp.task('demoresources', function () {
  return gulp.src([
      './src/**/demos.css',
      './src/**/demo.css',
      './src/**/demo.js'
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
 * Generates demo files for testing made of all the snippets and the demo file
 * put together.
 */
gulp.task('demos', ['demoresources'], function() {

  function getComponentFolders() {
    return fs.readdirSync('./src/')
      .filter(function(file) {
        return fs.statSync(path.join('./src/', file)).isDirectory();
      });
  }

  var tasks = getComponentFolders().map(function(component) {
    return gulp.src([
        './src/' + component + '/snippets/*.html',
        './src/' + component + '/demo.html'
      ])
      .pipe($.concat('/demo.html'))
      // Add basic front matter.
      .pipe($.header('---\nlayout: demo\nbodyclass: demo\ninclude_prefix: ../../\n---\n\n'))
      .pipe($.frontMatter({property: 'page', remove: true}))
      .pipe($.marked())
      .pipe((function () {
        var componentPages = [];
        return through.obj(function(file, enc, cb) {
            file.page.component = component;
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
      .pipe(gulp.dest('dist/components/' + component));
  });

  return merge(tasks);
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
    .pipe($.replace('$$hosted_libs_prefix$$', hostedLibsUrlPrefix))
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
  return gulp.src([
      'docs/_assets/**/*',
      'node_modules/clippy/build/clippy.swf',
      'node_modules/swfobject-npm/swfobject/src/swfobject.js',
      'node_modules/prismjs/prism.js',
      'node_modules/prismjs/components/prism-markup.min.js',
      'node_modules/prismjs/components/prism-javascript.min.js',
      'node_modules/prismjs/components/prism-css.min.js',
      'node_modules/prismjs/dist/prism-default/prism-default.css'
    ])
    .pipe($.if(/\.js/i, $.replace('$$version$$', pkg.version)))
    .pipe($.if(/\.js/i, $.replace('$$hosted_libs_prefix$$', hostedLibsUrlPrefix)))
    .pipe($.if(/\.(svg|jpg|png)$/i, $.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe($.if(/\.css/i, $.autoprefixer(AUTOPREFIXER_BROWSERS)))
    .pipe($.if(/\.css/i, $.csso()))
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

// Generate release archive containing just JS, CSS, Source Map deps
gulp.task('zip:mdl', function() {
  gulp.src(['dist/material.*@(js|css)?(.map)', 'LICENSE', 'bower.json', 'package.json'])
    .pipe($.zip('mdl.zip'))
    .pipe(gulp.dest('dist'));
});

// Generate release archive containing the library, templates and assets
// for templates. Note that it is intentional for some templates to include
// a customised version of the material.min.css file for their own needs.
// Others (e.g the Android template) simply use the default built version of
// the library.

// Define a filter containing only the build assets we want to pluck from the
// `dist` stream. This enables us to preserve the correct final dir structure,
// which was not occurring when simply using `gulp.src` in `zip:templates`

var fileFilter = $.filter([
  'material.*@(js|css)?(.map)',
  'templates/**/*.*',
  'assets/**/*.*',
  'LICENSE',
  'bower.json',
  'package.json']);

gulp.task('zip:templates', function() {
  // Stream of all `dist` files and other package manager files from root
  gulp.src(['dist/**/*.*', 'LICENSE', 'bower.json', 'package.json'])
  .pipe(fileFilter)
  .pipe($.zip('mdl-templates.zip'))
  .pipe(fileFilter.restore())
  .pipe(gulp.dest('dist'));
});

// Push the latest version of code resources (CSS+JS) to Google Cloud Storage.
// Public-read objects in GCS are served by a Google provided and supported
// global, high performance caching/content delivery network (CDN) service.
// This task requires gsutil to be installed and configured.
// For info on gsutil: https://cloud.google.com/storage/docs/gsutil.
//
gulp.task('publish:code', ['zip:mdl', 'zip:templates'], function() {
  // Build dest path, info message, cache control and gsutil cmd to copy
  // each object into a GCS bucket. The dest is a version specific path.
  // The gsutil -m option requests parallel copies.
  // The gsutil -h option is used to set metadata headers
  // (cache control, in this case).
  // For cache control, start with 0s (disable caching during dev),
  // but consider more helpful interval (e.g. 3600s) after launch.
  var dest = bucketCode;
  var infoMsg = 'Publishing ' + pkg.version + ' to CDN (' + dest + ')';
  var cacheControl = '-h "Cache-Control:public,max-age=0"';
  var gsutilCpCmd = 'gsutil -m cp <%= file.path %> ' + dest;
  var gsutilCacheCmd = 'gsutil -m setmeta ' + cacheControl + ' ' + dest;

  process.stdout.write(infoMsg + '\n');
  // Upload the goodies to a separate GCS bucket with versioning.
  // Using a sep bucket avoids the risk of accidentally blowing away
  // old versions in the microsite bucket.
  return gulp.src(['dist/material.*@(js|css)?(.map)', 'dist/mdl.zip', 'dist/mdl-templates.zip'],
      {read: false})
    .pipe($.tap(function(file, t) {
      file.base = path.basename(file.path);
    }))
    .pipe($.shell([
      gsutilCpCmd + '/' + pkg.version + '/<%= file.base %>',
      gsutilCacheCmd + '/' + pkg.version + '/<%= file.base %>'
    ]));
});

// Function to publish staging or prod version from local tree,
// or to promote staging to prod, per passed arg.
function mdlPublish(pubScope) {
  var cacheTtl = null;
  var src = null;
  var dest = null;
  if (pubScope === 'staging') {
    // Set staging specific vars here.
    cacheTtl = 0;
    dest = bucketStaging;
  } else if (pubScope === 'prod') {
    // Set prod specific vars here.
    cacheTtl = 3600;
    dest = bucketProd;
  } else if (pubScope === 'promote') {
    // Set promote (essentially prod) specific vars here.
    cacheTtl = 3600;
    src = bucketStaging + '/*';
    dest = bucketProd;
  }

  // Build cache control and info message.
  var cacheControl = '-h "Cache-Control:public,max-age=' + cacheTtl + '"';
  var infoMsg = 'Publishing ' + pubScope + '/' + pkg.version + ' to GCS (' + dest + ')';
  if (src) {
    infoMsg += ' from ' + src;
  }

  // Build gsutil commands to recursively sync local distribution tree
  // to the dest bucket and to recursively set permissions to public-read.
  // The gsutil -m option requests parallel copies.
  // The gsutil -R option is used for recursive file copy.
  // The gsutil -h option is used to set metadata headers (cache control, in this case).
  var gsutilSyncCmd = 'gsutil -m rsync -d -R dist ' + dest;
  var gsutilCacheCmd = 'gsutil -m setmeta ' + cacheControl + ' ' + dest + '/**';
  var gsutilCpCmd = 'gsutil -m cp -R ' + src + ' ' + dest;

  process.stdout.write(infoMsg + '\n');
  if (pubScope === 'promote') {
    // If promoting, copy staging bucket contents to prod bucket,
    // and set ACLs and cache control on dest contents.
    gulp.src('').pipe($.shell([gsutilCpCmd, gsutilCacheCmd]));
  } else {
    // If publishing to prod directly, rsync local contents to prod bucket,
    // and set ACLs and cache control on dest contents.
    gulp.src('').pipe($.shell([gsutilSyncCmd, gsutilCacheCmd]));
  }
}

// Push the local build of the MDL microsite and release artifacts to the
// production Google Cloud Storage bucket for general serving to the web.
// Public-read objects in GCS are served by a Google provided and supported
// global, high performance caching/content delivery network (CDN) service.
// This task requires gsutil to be installed and configured.
// For info on gsutil: https://cloud.google.com/storage/docs/gsutil.
//
gulp.task('publish:prod', function() {
  mdlPublish('prod');
});

// Promote the staging version of the MDL microsite and release artifacts
// to the production Google Cloud Storage bucket for general serving.
// Public-read objects in GCS are served by a Google provided and supported
// global, high performance caching/content delivery network (CDN) service.
// This task requires gsutil to be installed and configured.
// For info on gsutil: https://cloud.google.com/storage/docs/gsutil.
//
gulp.task('publish:promote', function() {
  mdlPublish('promote');
});

// Push the staged version of the MDL microsite and release artifacts
// to a production Google Cloud Storage bucket for staging and pre-production testing.
//
// This task requires gsutil to be installed and configured.
// For info on gsutil: https://cloud.google.com/storage/docs/gsutil.
//
gulp.task('publish:staging', function() {
  mdlPublish('staging');
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

gulp.task('styles:gen', ['styles'], function() {
  // TODO: This task needs refactoring once we turn MaterialCustomizer
  // into a proper Node module.
  var mc = new MaterialCustomizer();
  mc.template = fs.readFileSync('./dist/material.min.css.template').toString();

  var stream = gulp.src('');
  mc.paletteIndices.forEach(function(primary) {
    mc.paletteIndices.forEach(function(accent) {
      if (mc.forbiddenAccents.indexOf(accent) !== -1) {
        return;
      }
      var primaryName = primary.toLowerCase().replace(' ', '_');
      var accentName = accent.toLowerCase().replace(' ', '_');
      stream = stream.pipe($.file(
        'material.' + primaryName + '-' + accentName + '.min.css',
        mc.processTemplate(primary, accent)
      ));
    });
  });
  stream.pipe(gulp.dest('dist'));
});
