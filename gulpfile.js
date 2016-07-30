'use strict';

var path      = require('path');
var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var concat    = require('gulp-concat');

var pkg = require('./package.json');

var buildPath = path.join('./build', pkg.version);

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['readme', 'root', 'backend', 'frontend']);

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
gulp.task('readme', function() {
    return gulp.src(['../../README.md', '../../LICENSE'])
        .pipe(gulp.dest(path.join(buildPath)));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('backend', function() {
    return gulp.src('backend/**/*')
        .pipe(gulp.dest(path.join(buildPath, 'backend')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend', ['frontend_common', 'frontend_editor', 'frontend_home', 'frontend_viewer'], function() {
    return gulp.src('frontend/*.*')
        .pipe(gulp.dest(path.join(buildPath, 'frontend')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_common', ['frontend_common_class', 'frontend_common_img', 'frontend_common_lib']);
gulp.task('frontend_common_class', ['frontend_common_class_js', 'frontend_common_class_css']);
gulp.task('frontend_common_class_js', function() {
    return gulp.src('frontend/common/class/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(buildPath, 'frontend/common/class')));
});
gulp.task('frontend_common_class_css', function() {
    return gulp.src('frontend/common/class/**/*.css')
        .pipe(concat('all.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.join(buildPath, 'frontend/common/class')));
});
gulp.task('frontend_common_img', function() {
    return gulp.src('frontend/common/img/**/*')
        .pipe(gulp.dest(path.join(buildPath, 'frontend/common/img')));
});
gulp.task('frontend_common_lib', function() {
    return gulp.src('frontend/common/lib/**/*')
        .pipe(gulp.dest(path.join(buildPath, 'frontend/common/lib')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_editor', ['frontend_editor_class', 'frontend_editor_lib']);
gulp.task('frontend_editor_class', ['frontend_editor_class_js', 'frontend_editor_class_css', 'frontend_editor_class_ejs', 'frontend_editor_class_html']);
gulp.task('frontend_editor_class_js', function() {
    return gulp.src('frontend/editor/class/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(buildPath, 'frontend/editor/class')));
});
gulp.task('frontend_editor_class_css', function() {
    return gulp.src('frontend/editor/class/**/*.css')
        .pipe(concat('all.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.join(buildPath, 'frontend/editor/class')));
});
gulp.task('frontend_editor_class_ejs', function() {
    return gulp.src('frontend/editor/class/**/*.ejs')
        .pipe(gulp.dest(path.join(buildPath, 'frontend/editor/class')));
});
gulp.task('frontend_editor_class_html', function() {
    return gulp.src('frontend/editor/class/**/*.html')
        .pipe(gulp.dest(path.join(buildPath, 'frontend/editor/class')));
});
gulp.task('frontend_editor_lib', function() {
    return gulp.src('frontend/editor/lib/**/*')
        .pipe(gulp.dest(path.join(buildPath, 'frontend/editor/lib')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_home', ['frontend_home_class', 'frontend_home_html']);
gulp.task('frontend_home_class', ['frontend_home_class_js', 'frontend_home_class_css']);
gulp.task('frontend_home_class_js', function() {
    return gulp.src('frontend/home/class/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(buildPath, 'frontend/home/class')));
});
gulp.task('frontend_home_class_css', function() {
    return gulp.src('frontend/home/class/**/*.css')
        .pipe(concat('all.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.join(buildPath, 'frontend/home/class')));
});
gulp.task('frontend_home_html', function() {
    return gulp.src('frontend/home/html/**/*')
        .pipe(gulp.dest(path.join(buildPath, 'frontend/home/html')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_viewer', ['frontend_viewer_class']);
gulp.task('frontend_viewer_class', ['frontend_viewer_class_js', 'frontend_viewer_class_css', 'frontend_viewer_class_ejs']);
gulp.task('frontend_viewer_class_js', function() {
    return gulp.src('frontend/viewer/class/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(buildPath, 'frontend/viewer/class')));
});
gulp.task('frontend_viewer_class_css', function() {
    return gulp.src('frontend/viewer/class/**/*.css')
        //.pipe(concat('all.css'))
        //.pipe(minifyCss())
        .pipe(gulp.dest(path.join(buildPath, 'frontend/viewer/class')));
});
gulp.task('frontend_viewer_class_ejs', function() {
    return gulp.src('frontend/viewer/class/**/*.ejs')
        .pipe(gulp.dest(path.join(buildPath, 'frontend/viewer/class')));
});