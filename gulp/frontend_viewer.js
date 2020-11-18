const gulp      = require('gulp');
const path      = require('path');
// const uglify    = require('gulp-uglify');
// const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');
const babel      = require('gulp-babel');

const SRC_PATH   = "./src";
const BUILD_PATH = './build';

function frontend_viewer_class_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/viewer/class/**/*.js'))
        .pipe(concat('viewer.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend')));
}

function frontend_viewer_jsx_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/viewer/class/View/**/*.jsx'))
        .pipe(babel())
        .pipe(concat('viewer-jsx.js'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend')));
}

function frontend_viewer_jsx_less() {
    return gulp.src(path.join(SRC_PATH, 'frontend/viewer/class/View/**/*.less'))
        .pipe(less())
        .pipe(concat('viewer-jsx.css'))
        // .pipe(minifyCss())
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend')));
}

const frontend_viewer = gulp.series(frontend_viewer_class_js, frontend_viewer_jsx_js, frontend_viewer_jsx_less);

module.exports = frontend_viewer;
