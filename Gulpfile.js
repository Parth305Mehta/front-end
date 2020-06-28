'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

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

gulp.task('clean',function(){
    return del(['dist']);
});

gulp.task('copyfonts',function(){
    return gulp.src('./node_modules/font-awesome/fonts/*.*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin',function(){
    return gulp.src('img/*.{jpeg,png,jpg,gif}')
    .pipe(imagemin({ optimizationLevel: 3, progressive:true, interlaced:true}))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin',function(){
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream,file){
        return stream
        .pipe(usemin({
            css:[rev()],
            html:[ function(){return htmlmin({collapseWhitespace:true})}],
            js: [uglify(),rev()],
            inlinejs:[uglify()],
            inlinecss:[cleanCss(),'concat']
        }))
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build',gulp.series('clean',gulp.parallel('copyfonts','imagemin','usemin'),
    function (done) { done(); }
));

