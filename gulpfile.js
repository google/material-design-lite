'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// load plugins
var $ = require('gulp-load-plugins')();

// hosted URL for your page
var hostedUrl = 'https://example.com';

gulp.task('styles', function () {
    return gulp.src('app/styles/sass/styles.scss')
        .pipe($.rubySass({style: 'expanded', precision: 10}))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({stream: true}))
        .pipe($.size());
});

gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'))
        .pipe(reload({stream: true, once: true}))
        .pipe($.size());
});

gulp.task('html', ['styles'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/**/*.html')
        .pipe($.useref.assets())
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({stream: true, once: true}))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return gulp.src('**/*.{eot,svg,ttf,woff}')
        .pipe($.flatten())
        .pipe(gulp.dest('dist/images/icons'))
        .pipe($.size());
});

gulp.task('pagespeed', function () {
    require('opn')('https://developers.google.com/speed/pagespeed/insights/?url=' + encodeURIComponent(hostedUrl));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], {read: false}).pipe($.clean());
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('serve', ['styles'], function () {
    browserSync.init(null, {
        server: {
            baseDir: ['app', '.tmp']
        },
    });
});

gulp.task('watch', ['serve'], function () {
    gulp.watch(['app/*.html'], reload);
    gulp.watch(['app/styles/**/*.scss','app/styles/**/*.css'], ['styles']);
    gulp.watch('app/scripts/**/*.js', ['jshint']);
    gulp.watch('app/images/**/*', ['images']);
});
