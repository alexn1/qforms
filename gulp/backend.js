const path = require('path');
const gulp = require('gulp');

const backend_ts = require('./backend_ts');

const SRC_PATH   = "./src";
const BUILD_PATH = './build';

function backend_ejs() {
    return gulp.src(path.join(SRC_PATH, 'backend/**/*.ejs'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend')));
}

function backend_json() {
    return gulp.src(path.join(SRC_PATH, 'backend/**/*.json'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend')));
}

function backend_js() {
    return gulp.src(path.join(SRC_PATH, 'backend/**/*.js'))
        .pipe(gulp.dest(path.join(BUILD_PATH, 'lib/backend')));
}

const backend = gulp.series(backend_ejs, backend_json, backend_js, backend_ts);

module.exports = backend;
