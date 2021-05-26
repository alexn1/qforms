const gulp      = require('gulp');
const path      = require('path');
// const uglify    = require('gulp-uglify');
// const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');
const babel      = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const SRC_PATH   = "./src";
const BUILD_PATH = './build';

function frontend_viewer_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/viewer/**/*.js'))
        .pipe(sourcemaps.init())
        .pipe(concat('viewer.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/js')));
}

function frontend_viewer_jsx() {
    return gulp.src(path.join(SRC_PATH, 'frontend/viewer/**/*.jsx'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('viewer-jsx.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/js')));
}

function frontend_viewer_less() {
    return gulp.src(path.join(SRC_PATH, 'frontend/viewer/**/*.less'))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('viewer.css'))
        // .pipe(minifyCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/css')));
}

const frontend_viewer = gulp.series(
    frontend_viewer_js,
    frontend_viewer_jsx,
    frontend_viewer_less,
);

module.exports = frontend_viewer;
