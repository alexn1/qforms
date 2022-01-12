const path      = require('path');
const gulp      = require('gulp');
const uglify    = require('gulp-uglify');
const concat    = require('gulp-concat');
const less      = require('gulp-less');
const babel      = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const hash = require('gulp-hash-filename');
const myOrder = require('./myOrder');
const cleanCSS = require('gulp-clean-css');

const SRC_PATH   = './src';
const BUILD_PATH = './dist';

function frontend_common_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/common/**/*.js'))
        .pipe(myOrder())
        .pipe(sourcemaps.init())
        .pipe(concat('common.js'))
        .pipe(uglify())
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/common/js')));
}

function frontend_common_jsx() {
    return gulp.src(path.join(SRC_PATH, 'frontend/common/**/*.jsx'))
        .pipe(myOrder())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('common-jsx.js'))
        .pipe(uglify())
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/common/js')));
}

function frontend_common_less() {
    return gulp.src(path.join(SRC_PATH, 'frontend/common/**/*.less'))
        .pipe(myOrder())
        // .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('common.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        // .pipe(minifyCss())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/common/css')));
}

const frontend_common = gulp.series(
    frontend_common_js,
    frontend_common_jsx,
    frontend_common_less,
);

module.exports = frontend_common;
