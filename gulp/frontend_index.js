const path      = require('path');
const gulp      = require('gulp');
//const uglify    = require('gulp-uglify');
// const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');
const hash = require('gulp-hash-filename');
const order = require('gulp-order');

const SRC_PATH   = './src';
const BUILD_PATH = './build';


function frontend_index_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/index/**/*.js'))
        // .pipe(sourcemaps.init())
        // .pipe(order())
        .pipe(concat('app.js'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        //.pipe(uglify())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/index/js')));
}

function frontend_index_jsx() {
    return gulp.src(path.join(SRC_PATH, 'frontend/index/**/*.jsx'))
        // .pipe(sourcemaps.init())
        .pipe(babel())
        // .pipe(order())
        .pipe(concat('app-jsx.js'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/index/js')));
}

function frontend_index_less() {
    return gulp.src(path.join(SRC_PATH, 'frontend/index/**/*.less'))
        // .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(order())
        .pipe(concat('app.css'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        // .pipe(minifyCss())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/index/css')));
}


const frontend_index = gulp.series(
    frontend_index_js,
    frontend_index_jsx,
    frontend_index_less
);

module.exports = frontend_index;
