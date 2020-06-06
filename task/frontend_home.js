'use strict';

const path      = require('path');
const gulp      = require('gulp');
//const uglify    = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');

const BUILD_PATH = './build';
const SRC_PATH   = "./src";

function frontend_home_class_css() {
    return gulp.src(path.join(SRC_PATH, 'frontend/home/class/**/*.less'))
        .pipe(less())
        .pipe(concat('all.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/home/class')));
}

function frontend_home_class_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/home/class/**/*.js'))
        .pipe(concat('all.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/home/class')));
}

function frontend_home_html() {
    return gulp.src(path.join(SRC_PATH, 'frontend/home/html/**/*'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/home/html')));
}

const frontend_home_class = gulp.series(frontend_home_class_js, frontend_home_class_css);
const frontend_home       = gulp.series(frontend_home_class, frontend_home_html);

module.exports = frontend_home;