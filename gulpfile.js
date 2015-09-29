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
var uniffe = require('./utils/uniffe.js');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var codeFiles = '';
var reload = browserSync.reload;
var path = require('path');
var pkg = require('./package.json');
var through = require('through2');
var swig = require('swig');
var hostedLibsUrlPrefix = 'https://storage.googleapis.com/code.getmdl.io';
var bucketProd = 'gs://www.getmdl.io';
var bucketStaging = 'gs://mdl-staging';
var bucketCode = 'gs://code.getmdl.io';
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' * @copyright 2015 Google, Inc.',
  ' * @link https://github.com/google/material-design-lite',
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
gulp.task('jshint', function() {
  return gulp.src(['src/**/*.js' , 'gulpfile.js'])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Lint JavaScript code style
gulp.task('jscs', function() {
  return gulp.src(['src/**/*.js' , 'gulpfile.js'])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jscs())
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// ***** Production build tasks ****** //

// Optimize Images
// TODO: Update image paths in final CSS to match root/images
gulp.task('images', function() {
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
gulp.task('styles:dev', function() {
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
gulp.task('styletemplates', function() {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'src/template.scss'
  ])
    // Generate Source Maps
    .pipe($.sourcemaps.init())
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
gulp.task('styles', function() {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'src/material-design-lite.scss'
  ])
    // Generate Source Maps
    .pipe($.sourcemaps.init())
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
gulp.task('styles-grid', function() {
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
gulp.task('scripts', ['jscs', 'jshint'], function() {
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
    .pipe($.if(/mdlComponentHandler\.js/, $.util.noop(), uniffe()))
    .pipe($.sourcemaps.init())
    // Concatenate Scripts
    .pipe($.concat('material.js'))
    .pipe($.iife({
      useStrict: true,
    }))
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
gulp.task('metadata', function() {
  return gulp.src(['package.json', 'bower.json', 'LICENSE'])
    .pipe(gulp.dest('./dist'));
});

// Build Production Files, the Default Task
gulp.task('default', ['clean', 'mocha'], function(cb) {
  runSequence(
    ['styles', 'styles-grid'],
    ['scripts'],
    cb);
});

// Build production files and microsite
gulp.task('all', ['clean', 'mocha'], function(cb) {
  runSequence(
    ['default', 'styletemplates'],
    ['styles:gen'],
    ['jshint', 'jscs', 'scripts',  'assets', 'demos', 'pages',
     'templates', 'images', 'styles-grid', 'metadata'],
    ['zip'],
    cb);
});

// ***** Testing tasks ***** //

gulp.task('mocha', ['styles'], function() {
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
    .pipe((function() {
      return through.obj(function(file, enc, cb) {
        file.page.component = file.relative.split('/')[0];
        this.push(file);
        cb();
      });
    })())
    .pipe(applyTemplate())
    .pipe($.rename(function(path) {
      path.basename = 'index';
    }))
    .pipe(gulp.dest('dist/components'));
});

/**
 * Copies demo files from MDL/src directory.
 */
gulp.task('demoresources', function() {
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
  /**
   * Retrieves the list of component folders.
   */
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
      .pipe((function() {
        return through.obj(function(file, enc, cb) {
            file.page.component = component;
            this.push(file);
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
gulp.task('assets', function() {
  return gulp.src([
      'docs/_assets/**/*',
      'node_modules/clippy/build/clippy.swf',
      'node_modules/swfobject-npm/swfobject/src/swfobject.js',
      'node_modules/prismjs/prism.js',
      'node_modules/prismjs/components/prism-markup.min.js',
      'node_modules/prismjs/components/prism-javascript.min.js',
      'node_modules/prismjs/components/prism-css.min.js',
      'node_modules/prismjs/components/prism-bash.min.js',
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
 * Defines the list of resources to watch for changes.
 */
function watch() {
  gulp.watch(['src/**/*.js', '!src/**/README.md'],
    ['scripts', 'demos', 'components', reload]);
  gulp.watch(['src/**/*.{scss,css}'],
    ['styles', 'styles-grid', 'styletemplates', reload]);
  gulp.watch(['src/**/*.html'], ['pages', reload]);
  gulp.watch(['src/**/*.{svg,png,jpg}'], ['images', reload]);
  gulp.watch(['src/**/README.md'], ['pages', reload]);
  gulp.watch(['templates/**/*'], ['templates', reload]);
  gulp.watch(['docs/**/*'], ['pages', 'assets', reload]);
  gulp.watch(['package.json', 'bower.json', 'LICENSE'], ['metadata']);
}

/**
 * Serves the landing page from "out" directory.
 */
gulp.task('serve:browsersync', function() {
  browserSync({
    notify: false,
    server: {
      baseDir: ['dist']
    }
  });

  watch();
});

gulp.task('serve', function() {
  $.connect.server({
    root: 'dist',
    port: 5000,
    livereload: true
  });

  watch();

  gulp.src('./dist/index.html')
    .pipe($.open('', {url: 'http://localhost:5000'}));
});

// Generate release archive containing just JS, CSS, Source Map deps
gulp.task('zip:mdl', function() {
  return gulp.src(['dist/material?(.min)@(.js|.css)?(.map)', 'LICENSE', 'bower.json', 'package.json'])
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
  'material?(.min)@(.js|.css)?(.map)',
  'templates/**/*.*',
  'assets/**/*.*',
  'LICENSE',
  'bower.json',
  'package.json']);

gulp.task('zip:templates', function() {
  // Stream of all `dist` files and other package manager files from root
  return gulp.src(['dist/**/*.*', 'LICENSE', 'bower.json', 'package.json'])
  .pipe(fileFilter)
  .pipe($.zip('mdl-templates.zip'))
  .pipe(fileFilter.restore())
  .pipe(gulp.dest('dist'));
});

gulp.task('zip', ['zip:templates', 'zip:mdl']);

gulp.task('genCodeFiles', function() {
  return gulp.src(['dist/material.*@(js|css)?(.map)', 'dist/mdl.zip', 'dist/mdl-templates.zip'],
      {read: false})
    .pipe($.tap(function(file, t) {
      codeFiles += ' dist/' + path.basename(file.path);
    }));
});

// Push the latest version of code resources (CSS+JS) to Google Cloud Storage.
// Public-read objects in GCS are served by a Google provided and supported
// global, high performance caching/content delivery network (CDN) service.
// This task requires gsutil to be installed and configured.
// For info on gsutil: https://cloud.google.com/storage/docs/gsutil.
gulp.task('pushCodeFiles', function() {
  var dest = bucketCode;
  process.stdout.write('Publishing ' + pkg.version + ' to CDN (' + dest + ')\n');

  // Build cache control and gsutil cmd to copy
  // each object into a GCS bucket. The dest is a version specific path.
  // The gsutil -m option requests parallel copies.
  // The gsutil -h option is used to set metadata headers
  // (cache control, in this case).
  // Code files should NEVER be touched after uploading, therefore
  // 30 days caching is a safe value.
  var cacheControl = '-h "Cache-Control:public,max-age=2592000"';
  var gsutilCpCmd = 'gsutil -m cp -z js,css,map ';
  var gsutilCacheCmd = 'gsutil -m setmeta -R ' + cacheControl;

  // Upload the goodies to a separate GCS bucket with versioning.
  // Using a sep bucket avoids the risk of accidentally blowing away
  // old versions in the microsite bucket.
  return gulp.src('')
    .pipe($.shell([
      gsutilCpCmd + codeFiles + ' ' + dest + '/' + pkg.version,
      gsutilCacheCmd + ' ' + dest + '/' + pkg.version
    ]));
});

gulp.task('publish:code', function(cb) {
  runSequence(
    ['zip:mdl', 'zip:templates'],
    'genCodeFiles',
    'pushCodeFiles',
    cb);
});

/**
 * Function to publish staging or prod version from local tree,
 * or to promote staging to prod, per passed arg.
 * @param {string} pubScope the scope to publish to.
 */
function mdlPublish(pubScope) {
  var cacheTtl = null;
  var src = null;
  var dest = null;
  if (pubScope === 'staging') {
    // Set staging specific vars here.
    cacheTtl = 0;
    src = 'dist/*';
    dest = bucketStaging;
  } else if (pubScope === 'prod') {
    // Set prod specific vars here.
    cacheTtl = 60;
    src = 'dist/*';
    dest = bucketProd;
  } else if (pubScope === 'promote') {
    // Set promote (essentially prod) specific vars here.
    cacheTtl = 60;
    src = bucketStaging + '/*';
    dest = bucketProd;
  }

  var infoMsg = 'Publishing ' + pubScope + '/' + pkg.version + ' to GCS (' + dest + ')';
  if (src) {
    infoMsg += ' from ' + src;
  }
  process.stdout.write(infoMsg + '\n');

  // Build gsutil commands:
  // The gsutil -h option is used to set metadata headers.
  // The gsutil -m option requests parallel copies.
  // The gsutil -R option is used for recursive file copy.
  var cacheControl = '-h "Cache-Control:public,max-age=' + cacheTtl + '"';
  var gsutilCacheCmd = 'gsutil -m setmeta ' + cacheControl + ' ' + dest + '/**';
  var gsutilCpCmd = 'gsutil -m cp -r -z html,css,js,svg ' + src + ' ' + dest;

  gulp.src('').pipe($.shell([gsutilCpCmd, gsutilCacheCmd]));
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

gulp.task('_release', function() {
  return gulp.src(['dist/material?(.min)@(.js|.css)?(.map)', 'LICENSE',
    'README.md', 'bower.json', 'package.json', '.jscsrc', '.jshintrc',
    './sr?/**/*', 'gulpfile.js', './util?/**/*'])
    .pipe(gulp.dest('_release'));
});

gulp.task('publish:release', ['_release'], function() {
  return gulp.src('_release')
  .pipe($.subtree({
    remote: 'origin',
    branch: 'release'
  }))
  .pipe(vinylPaths(del));
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
  var MaterialCustomizer = require('./docs/_assets/customizer.js');
  var templatePath = path.join(__dirname, 'dist', 'material.min.css.template');
  // TODO: This task needs refactoring once we turn MaterialCustomizer
  // into a proper Node module.
  var mc = new MaterialCustomizer();
  mc.template = fs.readFileSync(templatePath).toString();

  var stream = gulp.src('');
  mc.paletteIndices.forEach(function(primary) {
    mc.paletteIndices.forEach(function(accent) {
      if (primary === accent) {
        return;
      }
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
