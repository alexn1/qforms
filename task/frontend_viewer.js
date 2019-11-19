'use strict';

const gulp      = require('gulp');
const path      = require('path');
const uglify    = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');

const BUILD_PATH = path.join('./build');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function frontend_viewer_class_css() {
    return gulp.src('./lib/frontend/viewer/class/**/*.less')
        .pipe(less())
        //.pipe(concat('all.css'))
        //.pipe(minifyCss())
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/viewer/class')));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function frontend_viewer_class_ejs() {
    return gulp.src('./lib/frontend/viewer/class/**/*.ejs')
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/viewer/class')));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function frontend_viewer_class_js() {
    return gulp.src('./lib/frontend/viewer/class/**/*.js')
        .pipe(concat('all.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/viewer/class')));
}

const frontend_viewer_class     = gulp.series(frontend_viewer_class_js, frontend_viewer_class_css, frontend_viewer_class_ejs);
const frontend_viewer           = gulp.series(frontend_viewer_class);

module.exports = frontend_viewer;