const path      = require('path');
const gulp      = require('gulp');
//const uglify    = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const concat    = require('gulp-concat');
const less      = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const babel      = require('gulp-babel');
const hash = require('gulp-hash-filename');

const BUILD_PATH = './build';
const SRC_PATH   = "./src";

function frontend_app_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/app/**/*.js'))
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        //.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/app/js')));
}

function frontend_app_jsx() {
    return gulp.src(path.join(SRC_PATH, 'frontend/app/**/*.jsx'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('app-jsx.js'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/app/js')));
}

function frontend_app_less() {
    return gulp.src(path.join(SRC_PATH, 'frontend/app/**/*.less'))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        // .pipe(minifyCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/app/css')));
}


const frontend_app = gulp.series(
    frontend_app_js,
    frontend_app_jsx,
    frontend_app_less
);

module.exports = frontend_app;
