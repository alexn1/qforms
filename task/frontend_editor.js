'use strict';

const path      = require('path');
const gulp      = require('gulp');
//const uglify    = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');

const BUILD_PATH = './build';
const SRC_PATH   = "./src";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function frontend_editor_class_css() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/class/**/*.less'))
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/class')));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function frontend_editor_class_ejs() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/class/**/*.ejs'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/class')));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function frontend_editor_class_html() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/class/**/*.html'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/class')));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function frontend_editor_class_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/class/**/*.js'))
        .pipe(concat('all.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/class')));
}

function frontend_editor_lib() {
    return gulp.src(path.join(SRC_PATH, 'frontend/editor/lib/**/*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/editor/lib')));
}


const frontend_editor_class = gulp.series(frontend_editor_class_js, frontend_editor_class_css, frontend_editor_class_ejs, frontend_editor_class_html);
const frontend_editor = gulp.series(frontend_editor_class, frontend_editor_lib);

module.exports = frontend_editor;