/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;

// public URL for your website
var PUBLIC_URL = 'https://example.com';

gulp.task('styles:components', function () {
    return gulp.src('app/styles/components/components.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['app/styles/components']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('app/styles/components'))
        .pipe($.size({title: 'styles:components'}));
})

gulp.task('styles:scss', function () {
    return gulp.src(['app/styles/**/*.scss', '!app/styles/components/components.scss'])
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['app/styles']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size({title: 'styles:scss'}));
});

gulp.task('styles:css', function () {
    return gulp.src('app/styles/**/*.css')
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('app/styles'))
        .pipe(reload({stream: true}))
        .pipe($.size({title: 'styles:css'}));
});

gulp.task('styles', ['styles:components', 'styles:scss', 'styles:css']);

gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'))
        .pipe(reload({stream: true, once: true}));
});

gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe($.if('*.css', $.uncss({ html: ['app/index.html'] })))
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe($.minifyHtml())
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html'}));
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({stream: true, once: true}))
        .pipe($.size({title: 'images'}));
});

gulp.task('pagespeed', pagespeed.bind(null, {
    // By default, we use the free (no API key) tier
    // You can use a Google Developer API key if you
    // have one. See http://goo.gl/RkN0vE for info
    // key: 'YOUR_API_KEY'
    url: PUBLIC_URL,
    strategy: 'mobile'
}));

gulp.task('clean', function (cb) {
    rimraf('dist', rimraf.bind({}, '.tmp', cb));
});

gulp.task('serve', function () {
    browserSync.init(null, {
        server: {
            baseDir: ['app', '.tmp']
        },
        notify: false
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/styles/**/*.{css,scss}'], ['styles']);
    gulp.watch(['.tmp/styles/**/*.css'], reload);
    gulp.watch(['app/scripts/**/*.js'], ['jshint']);
    gulp.watch(['app/images/**/*'], ['images']);
});

gulp.task('build', function (cb) {
    runSequence('styles', ['jshint', 'html', 'images'], cb);
});

gulp.task('default', ['clean'], function (cb) {
    gulp.start('build', cb);
});
