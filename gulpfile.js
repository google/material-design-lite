'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;

// public URL for your website
var PUBLIC_URL = 'https://example.com';

// enable use of relative paths even though gulp is run in sub-directories
process.chdir(__dirname);

gulp.task('styles', function () {
    return gulp.src('app/styles/sass/styles.scss')
        .pipe($.rubySass({style: 'expanded', precision: 10}))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({stream: true}))
        .pipe($.size({title: 'styles'}));
});

gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'))
        .pipe(reload({stream: true, once: true}))
        .pipe($.size({title: 'jshint'}));
});

gulp.task('html', ['styles'], function () {
    return gulp.src('app/**/*.html')
        .pipe($.useref.assets())
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.csso()))
        .pipe($.useref.restore())
        .pipe($.useref())
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

gulp.task('pagespeed', function (cb) {
    pagespeed({
        // key: A developer API key if you have one
        // See http://goo.gl/RkN0vE for more details
        nokey: 'true',
        url: PUBLIC_URL,
        strategy: 'mobile',
    }, cb);
});

gulp.task('clean', rimraf.bind(null, 'dist'));

gulp.task('serve', ['styles'], function () {
    browserSync.init(null, {
        server: {
            baseDir: ['app']
        }
    });
});

gulp.task('watch', ['serve'], function () {
    gulp.watch(['app/*.html'], reload);
    gulp.watch(['app/styles/**/*.{css,scss}'], ['styles']);
    gulp.watch(['app/scripts/**/*.js'], ['jshint']);
    gulp.watch(['app/images/**/*'], ['images']);
});

gulp.task('build', ['jshint', 'html', 'images']);

gulp.task('default', ['clean'], function (cb) {
    gulp.start('build', cb);
});
