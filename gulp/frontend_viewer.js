const gulp      = require('gulp');
const path      = require('path');
// const uglify    = require('gulp-uglify');
// const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');
const babel      = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const hash = require('gulp-hash-filename');
const order = require('gulp-order');

const BUILD_PATH = './build';
const SRC_PATH   = "./src";

function frontend_viewer_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/viewer/**/*.js'))
        // .pipe(sourcemaps.init())
        // .pipe(order())
        .pipe(concat('viewer.js'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        //.pipe(uglify())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/viewer/js')));
}

function frontend_viewer_jsx() {
    return gulp.src(path.join(SRC_PATH, 'frontend/viewer/**/*.jsx'))
        // .pipe(sourcemaps.init())
        .pipe(babel())
        // .pipe(order())
        .pipe(concat('viewer-jsx.js'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/viewer/js')));
}

function frontend_viewer_less() {
    return gulp.src(path.join(SRC_PATH, 'frontend/viewer/**/*.less'))
        // .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(order())
        .pipe(concat('viewer.css'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        // .pipe(minifyCss())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/viewer/css')));
}

const frontend_viewer = gulp.series(
    frontend_viewer_js,
    frontend_viewer_jsx,
    frontend_viewer_less,
);

module.exports = frontend_viewer;
