const path      = require('path');
const gulp      = require('gulp');
//const uglify    = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');
const babel      = require('gulp-babel');

const BUILD_PATH = './build';
const SRC_PATH   = "./src";

function frontend_common_jsx_less() {
    return gulp.src(path.join(SRC_PATH, 'frontend/common/jsx/**/*.less'))
        .pipe(less())
        .pipe(concat('common-jsx.css'))
        // .pipe(minifyCss())
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/css')));
}

function frontend_common_jsx_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/common/jsx/**/*.jsx'))
        .pipe(babel())
        .pipe(concat('common-jsx.js'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/js')));
}

function frontend_common_class_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/common/class/**/*.js'))
        .pipe(concat('common.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/js')));
}

function frontend_common_lib() {
    return gulp.src(path.join(SRC_PATH, 'frontend/common/lib/**/*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/lib')));
}

const frontend_common_class = gulp.series(frontend_common_class_js, frontend_common_jsx_less, frontend_common_jsx_js);
const frontend_common       = gulp.series(frontend_common_class, frontend_common_lib);

module.exports = frontend_common;
