'use strict';

var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var path   = require('path');

var pkg = require('./package.json');

var buildPath = path.join('../build', pkg.version);

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['root', 'backend', 'frontend']);

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('root', function() {
    return gulp.src([
            'package.json',
            'qforms.js',
            'server.js',
            'www.js'])
        .pipe(gulp.dest(buildPath));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('backend', function() {
    return gulp.src('backend/**/*').pipe(gulp.dest(path.join(buildPath, 'backend')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend', ['frontend_common', 'frontend_editor', 'frontend_home', 'frontend_viewer'], function() {
    return gulp.src('frontend/*.*').pipe(gulp.dest(path.join(buildPath, 'frontend')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_common', ['frontend_common_class', 'frontend_common_img', 'frontend_common_lib']);


////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_common_class', ['frontend_common_class_js', 'frontend_common_class_css']);

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_common_class_js', function() {
    return gulp.src('frontend/common/class/**/*.js')
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(buildPath, 'frontend/common/class')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_common_class_css', function() {
    return gulp.src('frontend/common/class/**/*.css')
        .pipe(gulp.dest(path.join(buildPath, 'frontend/common/class')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_common_img', function() {
    return gulp.src('frontend/common/img/**/*').pipe(gulp.dest(path.join(buildPath, 'frontend/common/img')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_common_lib', function() {
    return gulp.src('frontend/common/lib/**/*').pipe(gulp.dest(path.join(buildPath, 'frontend/common/lib')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_editor', function() {
    return gulp.src('frontend/editor/**/*').pipe(gulp.dest(path.join(buildPath, 'frontend/editor')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_home', function() {
    return gulp.src('frontend/home/**/*').pipe(gulp.dest(path.join(buildPath, 'frontend/home')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_viewer', function() {
    return gulp.src('frontend/viewer/**/*').pipe(gulp.dest(path.join(buildPath, 'frontend/viewer')));
});