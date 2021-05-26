const path      = require('path');
const gulp      = require('gulp');
// const uglify    = require('gulp-uglify');
// const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');

const BUILD_PATH = './build';
const SRC_PATH   = "./src";

function frontend_editor_class_css() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/class/**/*.less'))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('editor.css'))
        // .pipe(minifyCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/css')));
}

function frontend_editor_class_html() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/class/**/*.html'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/class')));
}

function frontend_editor_class_ejs() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/class/**/*.ejs'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/class')));
}

function frontend_editor_class_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/class/**/*.js'))
        .pipe(sourcemaps.init())
        .pipe(concat('editor.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/js')));
}

function frontend_editor_jsx_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/class/**/*.jsx'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('editor-jsx.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/js')));
}

function frontend_editor_jsx_less() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/class/**/*.less'))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('editor-jsx.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/css')));
}


/*function frontend_editor_lib() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/lib/!**!/!*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/lib')));
}*/


const frontend_editor = gulp.series(
    frontend_editor_class_js,
    frontend_editor_class_css,
    frontend_editor_class_html,
    frontend_editor_class_ejs,
    frontend_editor_jsx_js,
    frontend_editor_jsx_less,
    /*frontend_editor_lib,*/

);

module.exports = frontend_editor;
