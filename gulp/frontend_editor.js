const path      = require('path');
const gulp      = require('gulp');
// const uglify    = require('gulp-uglify');
const concat    = require('gulp-concat');
const less      = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');
const hash = require('gulp-hash-filename');
// const order = require('gulp-order');
const myOrder = require('./myOrder');
const cleanCSS = require('gulp-clean-css');

const SRC_PATH   = './src';
const BUILD_PATH = './dist';

function frontend_editor_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/**/*.js'))
        .pipe(myOrder())
        // .pipe(sourcemaps.init())
        .pipe(concat('editor.js'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        //.pipe(uglify())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/js')));
}

function frontend_editor_jsx() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/**/*.jsx'))
        .pipe(myOrder())
        // .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('editor-jsx.js'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/js')));
}

function frontend_editor_less() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/**/*.less'))
        // .pipe(sourcemaps.init())
        .pipe(myOrder())
        .pipe(less())
        .pipe(concat('editor.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        // .pipe(minifyCss())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/css')));
}

function frontend_editor_img() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/img/**/*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/img')));
}

const frontend_editor = gulp.series(
    frontend_editor_js,
    frontend_editor_jsx,
    frontend_editor_less,
    frontend_editor_img,
);

module.exports = frontend_editor;
