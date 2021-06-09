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


function frontend_monitor_js() {
    return gulp.src(path.join(SRC_PATH, 'frontend/monitor/**/*.js'))
        // .pipe(sourcemaps.init())
        // .pipe(order())
        .pipe(concat('monitor.js'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        //.pipe(uglify())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/monitor/js')));
}

function frontend_monitor_jsx() {
    return gulp.src(path.join(SRC_PATH, 'frontend/monitor/**/*.jsx'))
        // .pipe(sourcemaps.init())
        .pipe(babel())
        // .pipe(order())
        .pipe(concat('monitor-jsx.js'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/monitor/js')));
}

function frontend_monitor_less() {
    return gulp.src(path.join(SRC_PATH, 'frontend/monitor/**/*.less'))
        // .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(order())
        .pipe(concat('monitor.css'))
        .pipe(hash({"format": "{name}.{hash}{ext}"}))
        // .pipe(minifyCss())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/frontend/monitor/css')));
}


const frontend_monitor = gulp.series(
    frontend_monitor_js,
    frontend_monitor_jsx,
    frontend_monitor_less
);

module.exports = frontend_monitor;
