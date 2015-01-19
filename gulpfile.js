/**
 * Created by user on 19.01.2015.
 */

var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('default', ['build-css', 'build-js'], function() {

    /*gulp.watch('public/css*//*.css', function(event) {
     gulp.run('build-css');
     })*/

    //gulp.watch('public/js/**/*.js', function(event) {
    //    gulp.run('build-js');
    //})

});

gulp.task('build-css', function() {
    //admin
    gulp.src('public/admin/css/*.css')
        .pipe(concatCss("styles/bundle.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/build/admin/'));

    //front
    gulp.src('public/front/css/*.css')
        .pipe(concatCss("styles/bundle.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/build/front/'));
});

gulp.task('build-js', function() {
    //admin
    gulp.src('public/admin/js/**/*.js')
        .pipe(concat('js/bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/build/admin/'));

    //front
    gulp.src('public/front/js/**/*.js')
        .pipe(concat('js/bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/build/front/'));
});