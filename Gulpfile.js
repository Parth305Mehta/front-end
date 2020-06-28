'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('sass',function(){
    return gulp.src('./CSS/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./CSS'));
});

gulp.task('sass:watch',function(){
    gulp.watch('./CSS/*.scss',['sass'])
});

gulp.task('browser-sync',function(){
    var files = [
    './*.html',
    './CSS/*.css',
    './JS/*.js',
    './img/*.{png,jpg,jpeg,gif}'
    ];

    browserSync.init(files, {
    server: {
    baseDir: "./"
    }
    });
});

gulp.task('default', gulp.series ('browser-sync', gulp.parallel('sass:watch'),

    function (done) { done(); }
));
