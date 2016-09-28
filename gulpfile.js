'use strict';

var path      = require('path');
var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var concat    = require('gulp-concat');

var buildPath = path.join('./build');
var libPath   = path.join(buildPath, 'lib');

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['readme', 'root', 'lib', 'backend', 'frontend']);

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('root', function() {
    return gulp.src([
            './package.json'
    ]).pipe(gulp.dest(buildPath));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('lib', function() {
    return gulp.src([
        './lib/qforms.js',
        './lib/server.js',
        './lib/www.js'
    ]).pipe(gulp.dest(libPath));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('readme', function() {
    return gulp.src(['./README.md', './LICENSE'])
        .pipe(gulp.dest(path.join(buildPath)));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('backend', function() {
    return gulp.src('./lib/backend/**/*')
        .pipe(gulp.dest(path.join(buildPath, 'lib/backend')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend', ['frontend_common', 'frontend_editor', 'frontend_home', 'frontend_viewer'], function() {
    return gulp.src('./lib/frontend/*.*')
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_common', ['frontend_common_class', 'frontend_common_img', 'frontend_common_lib']);
gulp.task('frontend_common_class', ['frontend_common_class_js', 'frontend_common_class_css']);
gulp.task('frontend_common_class_js', function() {
    return gulp.src('./lib/frontend/common/class/**/*.js')
        .pipe(concat('all.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/common/class')));
});
gulp.task('frontend_common_class_css', function() {
    return gulp.src('./lib/frontend/common/class/**/*.css')
        .pipe(concat('all.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/common/class')));
});
gulp.task('frontend_common_img', function() {
    return gulp.src('./lib/frontend/common/img/**/*')
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/common/img')));
});
gulp.task('frontend_common_lib', function() {
    return gulp.src('./lib/frontend/common/lib/**/*')
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/common/lib')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_editor', ['frontend_editor_class', 'frontend_editor_lib']);
gulp.task('frontend_editor_class', ['frontend_editor_class_js', 'frontend_editor_class_css', 'frontend_editor_class_ejs', 'frontend_editor_class_html']);
gulp.task('frontend_editor_class_js', function() {
    return gulp.src('./lib/frontend/editor/class/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/editor/class')));
});
gulp.task('frontend_editor_class_css', function() {
    return gulp.src('./lib/frontend/editor/class/**/*.css')
        .pipe(concat('all.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/editor/class')));
});
gulp.task('frontend_editor_class_ejs', function() {
    return gulp.src('./lib/frontend/editor/class/**/*.ejs')
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/editor/class')));
});
gulp.task('frontend_editor_class_html', function() {
    return gulp.src('./lib/frontend/editor/class/**/*.html')
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/editor/class')));
});
gulp.task('frontend_editor_lib', function() {
    return gulp.src('./lib/frontend/editor/lib/**/*')
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/editor/lib')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_home', ['frontend_home_class', 'frontend_home_html']);
gulp.task('frontend_home_class', ['frontend_home_class_js', 'frontend_home_class_css']);
gulp.task('frontend_home_class_js', function() {
    return gulp.src('./lib/frontend/home/class/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/home/class')));
});
gulp.task('frontend_home_class_css', function() {
    return gulp.src('./lib/frontend/home/class/**/*.css')
        .pipe(concat('all.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/home/class')));
});
gulp.task('frontend_home_html', function() {
    return gulp.src('./lib/frontend/home/html/**/*')
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/home/html')));
});

////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('frontend_viewer', ['frontend_viewer_class']);
gulp.task('frontend_viewer_class', ['frontend_viewer_class_js', 'frontend_viewer_class_css', 'frontend_viewer_class_ejs']);
gulp.task('frontend_viewer_class_js', function() {
    return gulp.src('./lib/frontend/viewer/class/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/viewer/class')));
});
gulp.task('frontend_viewer_class_css', function() {
    return gulp.src('./lib/frontend/viewer/class/**/*.css')
        //.pipe(concat('all.css'))
        //.pipe(minifyCss())
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/viewer/class')));
});
gulp.task('frontend_viewer_class_ejs', function() {
    return gulp.src('./lib/frontend/viewer/class/**/*.ejs')
        .pipe(gulp.dest(path.join(buildPath, 'lib/frontend/viewer/class')));
});